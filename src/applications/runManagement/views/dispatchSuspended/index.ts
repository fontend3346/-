import {
  reactive,
  onMounted,
  ref,
  getCurrentInstance,
  onBeforeUnmount,
} from "vue";
import { ElMessage } from "element-plus";
import http from "@/api/index";
import store from "@/store";
export const useHandler = () => {
  const state = reactive({
    pageNum: 1,
    pageSize: 10,
    titleFileImg: "查看附件", //查看附件
    netWorkName: "", //台网
    netWorkNameList: [], //台网下拉框
    stationName: "", //台站
    stationNameList: [], //台站下拉框
    dispatchMainTitle: "已挂起列表", //待处理列表
    dispatchMainList: [
      // {
      //   code: "PIE19120900",
      //   name: "涉县",
      //   desc: "其他中断报警(10.5.80.17)",
      //   cause: "网络故障、重启无效",
      //   stationName: "涉县",
      //   disposeName: "测试人员",
      //   stationAddress: "测试人员",
      //   ticketsTime: "2019-12-09 20:14:23",
      //   stationDeal: "测震",
      //   ticketsName: "测试人员",
      // },
    ], //左侧数据
    detailShowList: {}, //详情数据
    activeIndex: 0,
    disposeTickets: false, //处理
    settleTickets: false, //是否解决
    suspendTickets: false, //是否挂起
    faultCause: "", //故障原因
    faultCauseList: [], //故障原因数据
    settleManner: "", //解决方式
    settleMannerList: [], //解决方式数据
    settleIllustrate: "", //解决说明
    imagesFiles: null, //上传图片
    imagesFilesArray: [], //图片数组
    filesInfo: null, //上传文件
    filesInfoArray: [], //文件数组
    activeStep: "3", //步骤
    stepsInfo: [
      // {
      //   title: "第1步[处理]",
      //   info: "设备值进人员处理结果:测试人员18839476440 历时:2天12小时27分5秒",
      //   isResolve: "未解决",
      //   description: "待运营商协商",
      //   src: "https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg?source=1940ef5c",
      //   time: "2019-12-09 20:14:23-2019-12-12 08:41:28 1人18839476440",
      //   file: "查看附件(1)>>",
      // },
    ], //步骤条
    //附件弹框
    isFileTable: false,
    fileData: [], //附件表格
    fileColumns: [
      {
        prop: "fileName",
        label: "名称",
      },
      {
        prop: "createTime",
        label: "上传时间",
      },
    ], //附件表头
    //表头
    totalNum: 10,
    selections: [], //附件下载
  });
  const imageUrl = ref(""); //上传图片路径
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  onMounted(() => {
    getList();
    networkList();
  });
  onBeforeUnmount(() => {});
  // 搜索
  const searchPending = () => {
    getList();
  };
  const networkList = () => {
    let params = {
      pageNum: 1,
      pageSize: 1000,
      userId: store.state.user.userId,
    };
    http.dispatchPending.getNetList(params).then((res: any) => {
      if (res && res.code == 0) {
        state.netWorkNameList = res.data.list;
        let nameArray = res.data.list[0].stationName.split(",");
        let arr = [];
        let obj;
        res.data.list[0].stationList.forEach((item, index) => {
          obj = {
            label: nameArray[index],
            value: item,
          };
          arr.push(obj);
        });
        state.stationNameList = arr;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 重置
  const clearPending = () => {
    state.netWorkName = "";
    state.stationName = "";
  };
  // 获取数据
  const getList = () => {
    let params = {
      networkId: state.netWorkName,
      stationId: state.stationName,
      page: state.pageNum,
      pageSize: state.pageSize,
      status: 3,
      handlerId: store.state.user.userId,
    };
    http.dispatchPending.getDataList(params).then((res: any) => {
      if (res) {
        if (res.code == 0) {
          state.dispatchMainList = res.data.list;
          state.totalNum = res.data.total;
          //判断空对象
          let count = res.data.list.length;
          if (count > 0) {
            state.detailShowList = state.dispatchMainList[0];
            //获取步骤条
            workTicketApi(state.dispatchMainList[0].workOrderId);
          } else {
            state.detailShowList = [];
            state.stepsInfo = [];
          }
        } else {
          ElMessage.error(res.message);
        }
      }
    });
  };
  // 点击某一个工单
  const workTickets = (row: any, index: any) => {
    state.detailShowList = state.dispatchMainList[index];
    workTicketApi(row.workOrderId);
  };
  //获取步骤条
  const workTicketApi = (val: any) => {
    let params = {
      workOrderId: val,
    };
    http.dispatchPending.processList(params).then((res: any) => {
      if (res) {
        if (res.code == 0) {
          state.stepsInfo = res.data;
          state.activeStep = res.data.length;
          state.stepsInfo.map((item) => {
            if (item.workOrderStatus == 1) {
              item.workOrderStatusTitle = "待处理";
            } else if (item.workOrderStatus == 2) {
              item.workOrderStatusTitle = "处理中";
            } else if (item.workOrderStatus == 3) {
              item.workOrderStatusTitle = "已挂起";
            } else if (item.workOrderStatus == 4) {
              item.workOrderStatusTitle = "已完成";
            }
            // if (item.images.length > 0) {
            //   item.images.forEach((items) => {
            //     items.imagePath = window.gateway.baseUrl + item.filePath;
            //   });
            //   //
            // }
            item.title =
              "第" +
              item.processStep +
              "步" +
              "[" +
              item.workOrderStatusTitle +
              "]";
            item.info =
              "设备值班人员处理结果：" +
              item.handlerName +
              "\xa0" +
              "," +
              item.handlerPhone +
              "\xa0" +
              item.duration;
            item.time =
              item.createTime +
              "\xa0" +
              "-" +
              "\xa0" +
              item.endTime +
              "\xa0" +
              item.handlerName +
              "," +
              "\xa0" +
              item.handlerPhone;
          });
        } else {
          ElMessage.error(res.message);
        }
      }
    });
  };
  // 处理-取消
  const disposeTicketsCancel = () => {
    state.disposeTickets = false;
  };
  // 处理-确定
  const disposeTicketsConfirm = () => {
    let obj = {
      cause: state.faultCause, //故障原因
      description: state.settleIllustrate, //解决说明
      handlerId: store.state.user.userId, //userId
      resolve: state.settleTickets, //是否解决
      solution: state.settleManner, //解决方式
      suspend: state.suspendTickets, //是否挂起
      workOrderId: state.detailShowList.workOrderId, //工单id
    };
    let imagesFile = new FormData();
    state.imagesFilesArray.forEach((item) => {
      imagesFile.append("images", item);
    });
    state.filesInfoArray.forEach((item) => {
      imagesFile.append("files", item);
    });
    imagesFile.append("json", JSON.stringify(obj));
    http.dispatchPending.addProcessList(imagesFile).then((res: any) => {
      if (res) {
        if (res.code == 0) {
          state.disposeTickets = false;
          //刷新流程图
          getList();
          // workTicketApi(state.detailShowList.workOrderId);
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      }
    });
  };
  // 处理
  const handlePending = () => {
    //判断空对象
    let count = Object.keys(state.detailShowList).length;
    if (count > 0) {
      state.disposeTickets = true;
    } else {
      ElMessage.error("请选择工单进行处理");
    }
  };
  // 查看附件
  const fileModal = (row: any) => {
    state.isFileTable = true;
    state.titleFileImg = "查看附件";
    state.fileData = row;
  };
  // 查看图片
  const imagesModal = (row: any) => {
    state.titleFileImg = "查看图片";
    state.isFileTable = true;
    state.fileData = row;
  };
  //选中附件
  const onSelectionFile = (row: any) => {
    state.selections = row;
  };
  //附件和图片下载
  const downLoadBtn = (row: any) => {
    state.isFileTable = false;
    let params = {
      filePath: row.filePath,
    };
    if (row.filePath) {
      http.dispatchPending.exportData(params).then((res: any) => {
        const blob = new Blob([res]); // 接受文档流
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        let filename = row.fileName; // 设置导出的文件名
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
    }
  };
  // 上传图片
  const httpRequestUploadM = (item: any) => {
    // state.imagesFiles = item.file;
    state.imagesFilesArray.push(item.file);
  };
  const beforeAvatarUpload = (rawFile: any) => {
    if (
      rawFile.type !== "image/jpg" &&
      rawFile.type !== "image/jpeg" &&
      rawFile.type !== "image/png"
    ) {
      ElMessage.error("支持JPG、JPEG、PNG格式图片小于1M。");
      return false;
    } else if (rawFile.size / 1024 / 1024 > 1) {
      ElMessage.error("图片小于1M");
      return false;
    }
    return true;
  };
  // 上传文件
  const httpRequestFile = (item: any) => {
    // state.filesInfo = item.file;
    state.filesInfoArray.push(item.file);
  };
  const pageChange = (val: any) => {
    state.pageNum = val;
    getList();
  };
  const sizeChange = (val: any) => {
    state.pageSize = val;
    getList();
  };
  return {
    state,
    searchPending,
    clearPending,
    handlePending,
    workTickets,
    disposeTicketsCancel,
    disposeTicketsConfirm,
    imageUrl,
    httpRequestUploadM,
    beforeAvatarUpload,
    httpRequestFile,
    fileModal,
    imagesModal,
    onSelectionFile,
    downLoadBtn,
    sizeChange,
    pageChange,
  };
};
