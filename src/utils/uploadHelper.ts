/*
 * @Author: zf
 * @Description: 上传文件通用处理
 * 上传文件，需要设置允许跨域，且允许取header中的e-tag的内容
 */

import { getSignInfo, mergeFileParts } from '@/api/uploadFile'
import axios from 'axios'

const dftPartSize = 1024 * 1024 * 5 //5M分块
const dftBatch = 3 //3个请求并发
const bucketName = 'pie-engine-ai' //桶名称
const dftTryNum = 2 //失败时重试次数

export default class UploadClass {
  progressInfo: any
  fileList: any[]
  s3path: any
  partSize: number
  isCover: boolean
  setPgDetail: any
  fileResultPath: any[]
  resolve?: (value: any) => void
  reject?: (reason?: any) => void
  preSignedData: any
  chunkInfo?: any[]
  // 设置回调加进度，以及异常处理
  constructor(options = {}) {
    const { files, path, size, noTmp, setPg } = options
    if (Array.isArray(files)) {
      this.fileList = files
    } else {
      this.fileList = [files]
    }
    // 数据集不能在临时文件路径里。。
    if (noTmp && path) {
      this.s3path = path
    } else {
      this.s3path = getTempPath(path)
    }
    this.partSize = getPartSize(size)
      ; (this.isCover = true), // 默认覆盖原文件
        // 文件及进度
        (this.progressInfo = {
          fileIndex: 0, // 当前上传文件序号
          fileSending: 0, // 当前文件上传进度10%
          fileLen: this.fileList.length, // 文件总数
        })
    this.setPgDetail = setPg || this.setPgDft // 上传最终s3位置
    this.fileResultPath = [] // 上传最终s3位置
  }
  /* 获取进度信息 */
  getProgressInfo() {
    return this.progressInfo
  }

  // 上传文件
  sendFiles() {
    if (this.fileList.length) {
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
        this.getSignUrl(0)
      })
    }
  }

  /* 1.获取预签名 */
  getSignUrl(idx: number, retry = 0) {
    const file = this.fileList[idx]
    // 没有文件，说明已经都上传了
    if (file === undefined) {
      this.handleSuccess()
      return
    } else {
      this.setPgDetail(0, idx)
    }
    const fileLength = file.size
    let data = {
      multiFileName: file.name,
      multiSize: Math.ceil(fileLength / this.partSize),
      bucketName,
      prePath: this.s3path,
      fileLength,
      cover: this.isCover,
    }
    getSignInfo(data)
      .then((res) => {
        // 有重试，故此处捕获异常，防止影响
        try {
          // 文件已存在，直接跳过
          if (res.msg === 'exist') {
            this.handleFileExist(res.data.multiFileKey, idx)
            return
          }
          const { code, data } = res
          if (code === 200 && data) {
            this.preSignedData = data
            this.uploadFileEach()
          }
          // 这里多试几次
          else if (retry < dftTryNum) {
            retry++
            setTimeout(() => {
              this.getSignUrl(idx, retry)
            }, retry * 5)
          } else {
            this.handleError('暂时无法上传文件，请稍后再试。' + res.msg)
          }
        } catch (error) {
          console.log(error)
          this.handleError(error)
        }
      })
      .catch((err) => {
        console.log('获取预签名失败')
        // 这里多试几次
        if (retry < dftTryNum) {
          retry++
          setTimeout(() => {
            this.getSignUrl(idx, retry)
          }, retry * 5)
        } else {
          this.handleError('文件上传错误,' + err.msg)
        }
      })
  }
  /* 文件已存在处理逻辑 */
  handleFileExist(multiFileKey: string, idx: number) {
    this.setPgDetail(100)
    this.fileResultPath.push(multiFileKey)
    this.getSignUrl(idx + 1)
  }

  /* 2.1文件上传 */
  uploadFileEach() {
    // 分片情况--每个文件开始之前重置
    this.chunkInfo = []
    let { fileIndex } = this.progressInfo

    const file = this.fileList[fileIndex]
    const bacth = Math.min(dftBatch, file.size / this.partSize)
    for (let i = 0; i < bacth; i++) {
      this.uploadFilePart()
    }
  }

  /* 2.2分片上传 */
  uploadFilePart(idx?: number) {
    const fileIdx = this.progressInfo.fileIndex
    const file = this.fileList[fileIdx]
    const fileTotal = file.size
    let start = 0
    // 有idx,说明是重试
    if (idx === undefined) {
      idx = this.chunkInfo?.length
      start = this.partSize * idx
      if (start >= fileTotal) {
        this.mergeFile()
        return
      }

      this.chunkInfo?.push({
        idx,
        retry: 0,
        loaded: 0,
        etag: '',
      })
    } else {
      start = this.partSize * idx
    }
    // 这里需要考虑溢出
    let end = Math.min(start + this.partSize, file.size)
    let filePart = file.slice(start, end)

    const url = this.preSignedData.preSignedUrlMap[idx + 1]

    let onUploadProgress = (progressEvent) => {
      if (progressEvent.lengthComputable) {
        this.chunkInfo[idx].loaded = progressEvent.loaded
        let sended = this.chunkInfo?.reduce(
          (prev, next) => next.loaded + prev,
          0
        )
        let val = +((sended / fileTotal) * 100).toFixed(2) // 保留两位小数
        this.setPgDetail(val)
      }
    }
    // 此处不能用formdata对象，会导致文件头不对，可能是多了参数信息
    uploadAws(url, filePart, onUploadProgress)
      .then((res) => {
        this.chunkInfo[idx].etag = res
        // 继续上传
        try {
          // 会重试，故此处单独捕获错误
          this.uploadFilePart()
        } catch (error) {
          console.log(error)
          this.handleError(error)
        }
      })
      .catch((err) => {
        console.log(err)
        // 重试
        const chunk = this.chunkInfo[idx]
        if (chunk.retry < dftTryNum) {
          chunk.retry++
          setTimeout(() => {
            this.uploadFilePart(chunk.idx)
          }, chunk.retry * 5)
        } else {
          this.handleError(
            '重试多次，文件依然上传失败，请确保网络通畅然后再尝试！'
          )
        }
      })
  }

  /* 2.3合并文件 */
  mergeFile(retry = 0) {
    let tags = {}
    let allDone = this.chunkInfo?.every((chunk, idx) => {
      const etag = chunk.etag
      tags[idx + 1] = etag
      return etag !== ''
    })
    // 确保都完成了，才能合并
    if (allDone) {
      /* 合并完成，开始下一个回调? */
      const { multiFileKey, uploadId } = this.preSignedData
      let params = {
        multiFileKey,
        bucketName,
        etag: JSON.stringify(tags),
        uploadId,
      }
      mergeFileParts(params)
        .then((res) => {
          this.fileResultPath.push(multiFileKey)
          // 继续下一个文件上传
          const { fileIndex, fileLen } = this.progressInfo
          if (fileIndex < fileLen - 1) {
            this.getSignUrl(fileIndex + 1)
          } else {
            this.handleSuccess()
          }
        })
        .catch((err) => {
          console.log('文件合并失败', err) // 这里需要重试么？
          // 这里多试几次
          if (retry < dftTryNum) {
            retry++
            setTimeout(() => {
              this.mergeFile(retry)
            }, retry * 5)
          } else {
            this.handleError('文件合并错误,' + err.msg)
          }
        })
    }
  }
  /* 3上传完成 */
  handleSuccess() {
    // 这里不校验是否有长度？
    if (this.fileResultPath.length === 1) {
      this.resolve?.(this.fileResultPath.join())
    } else {
      this.resolve?.(this.fileResultPath)
    }
  }
  /* 4上传失败 */
  handleError(err: any) {
    if (typeof err === 'string') {
      this.reject?.({
        code: 500,
        msg: err,
      })
    } else {
      const { name, message } = err
      this.reject?.({
        code: 500,
        msg: `${name}: ${message}`,
      })
    }
  }
  /* 5设置进度详情 */
  setPgDft(pg: number, idx: number) {
    this.progressInfo.fileSending = pg
    if (idx !== undefined) {
      this.progressInfo.fileIndex = idx
    }
  }
}

/* 设置分片大小（单位是字节） */
function getPartSize(size: number) {
  if (typeof size === 'number') {
    return Math.max(size, dftPartSize)
  } else {
    return dftPartSize
  }
}

/* 获取文件临时目录 */
function getTempPath(path = new Date().toISOString()) {
  return `devel/tmp/${path}`
}

// s3文件上传
function uploadAws(url: string, fd: any, onUploadProgress = () => { }) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, fd, {
        header: {
          'Content-Type': 'application/octet-stream',
          'x-amz-acl': 'public-read',
        },
        withCredentials: false,
        onUploadProgress,
        timeout: 0,
      })
      .then((res) => {
        // 拦截返回的是response.data，故此处不能走request
        if (res.status === 200) {
          const etag = res.headers.etag || ''
          resolve(etag.replace(/"/g, ''))
        } else {
          reject(res)
        }
      })
      .catch((err) => {
        reject(err)
        console.log(err.response)
      })
  })
}
