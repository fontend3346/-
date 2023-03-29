/*
 * @Author: zf
 * @Date: 2022-04-29 10:24:10
 * @Description: AI 相关通用处理
 */

/* 文件url前缀 */
const urlPre = (window as any).gateway.filePrefix
const baseUrl = (window as any).gateway.gateway

/* 获取文件访问路径 */
export const getFileUrl = (path: string): string => {
  if (path.startsWith('/')) {
    return `${urlPre}${path}`
  } else if (path.startsWith('http')) {
    return path
  } else {
    const key = path.replace(/^.*pie-engine-ai\//, '/')
    return `${urlPre}${key}`
  }
}

/* 获取网关请求地址 */
export function getGatewayUrl(path?: string) {
  if (path) {
    return `${baseUrl}/${path.replace(/^\//, '')}`
  } else {
    return `${baseUrl}/gateway/api`
  }
}

/* 框架信息组织 */
export function getFrameList(frames: any) {
  if (!Array.isArray(frames) || frames.length === 0) {
    return []
  } else {
    const used = frames.filter((fr) => fr.frameworkVersion)
    if (used.length === 0) {
      return []
    } else {
      let list: [] = []
      used.forEach((fr) => addFrame(list, fr))
      return list
    }
  }
}

/* 添加框架信息 */
function addFrame(list: any, frame: any) {
  const { frameworkName } = frame
  const exist = list.find((fr: any) => fr.name === frameworkName)
  if (exist) {
    addFmVer(exist.versions, frame)
  } else {
    const versions: [] = []
    addFmVer(versions, frame)
    const info = {
      name: frameworkName,
      img: frame.frameworkImagePath,
      originPath: frame.originPath, // s3地址，需要传给后台
      versions,
    }
    list.push(info)
  }
}
/* 添加版本信息 */
function addFmVer(versions: any, frame: any) {
  versions.push({
    label: frame.frameworkVersion,
    id: frame.id,
  })
}
