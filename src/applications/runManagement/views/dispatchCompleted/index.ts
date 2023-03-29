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
    //搜索
    netWorkName: "", //台网名称
    netWorkList: [], //台网数据
    stationName: "", //台站名称
    dataBaseList: [], //台站名称数据
    orderNum: "", //单号
    conductor: "", //处理人
    conductorList: [
      {
        value: "",
        label: "",
      },
    ], //处理人
    textItem: "", //测项
    textItemList: [
      {
        value: "",
        label: "",
      },
    ], //测项数据
    value1: "", //派单时间

    //表格
    sourceData: [], //表格数据
    sourceColumns: [
      {
        prop: "workOrderId",
        label: "工单号",
      },
      {
        prop: "networkName",
        label: "台网",
      },
      {
        prop: "stationName",
        label: "台站名称",
      },
      {
        prop: "faultPhenomenon",
        label: "故障原因",
      },
      {
        prop: "description",
        label: "处理说明",
      },
      {
        prop: "handlerName",
        label: "现场维护人",
      },
      {
        prop: "dispatcherName",
        label: "派单人",
      },
      {
        prop: "isCaseData",
        label: "案例",
        width: 100,
      },
      {
        prop: "createTime",
        label: "派单时间",
      },
      {
        prop: "duration",
        label: "历时",
      },
    ], //表头
    total: 0, //总条数
    pageSize: 10, //分页尺寸
    pageNum: 1, //当前页

    //详情
    isHobby: false, //详情弹框
    title: "", //标题
    detailShowList: {
      code: "PIE19120900",
      name: "涉县",
      desc: "其他中断报警(10.5.80.17)",
      cause: "网络故障、重启无效",
      stationName: "涉县",
      disposeName: "测试人员",
      stationAddress: "测试人员",
      ticketsTime: "2019-12-09 20:14:23",
      stationDeal: "测震",
      ticketsName: "测试人员",
    },
    activeStep: "3", //步骤
    stepsInfo: [], //步骤条

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
    selectId: [],
    titleFileImg: "查看附件",
  });

  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  onMounted(() => {
    getData();
    networkList();
    getSubject();
  });
  onBeforeUnmount(() => {});

  //查询
  const searchData = () => {
    getData();
  };
  //表格查询
  const getData = () => {
    let params = {
      networkId: state.netWorkName,
      stationId: state.stationName,
      endTime: state.value1[1],
      startTime: state.value1[0],
      workOrderId: state.orderNum, //工单id
      page: state.pageNum,
      pageSize: state.pageSize,
      measurement: state.textItem, //测项
      handlerId: store.state.user.userId, //处理人
      status: 4,
    };
    http.dispatchPending.getDataList(params).then((res: any) => {
      if (res) {
        if (res.code == 0) {
          state.sourceData = res.data.list;
          state.sourceData.forEach((item) => {
            if (item.caseData) {
              item.isCaseData = "是";
            } else {
              item.isCaseData = "否";
            }
          });
          state.total = res.data.total;
        } else {
          ElMessage.error(res.message);
        }
      }
    });
  };
  // 获取台网
  const networkList = () => {
    let params = {
      pageNum: 1,
      pageSize: 1000,
      userId: store.state.user.userId,
    };
    http.dispatchPending.getNetList(params).then((res: any) => {
      if (res && res.code == 0) {
        state.netWorkList = res.data.list;
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
        state.dataBaseList = arr;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //目标台站修改
  const changeType = (val: any) => {
    state.conductor = "";
    state.conductorList = [];
    if (val) {
      let params = {
        stationId: val,
      };
      http.dispatchOpen.conductor(params).then((res: any) => {
        if (res.code == 0) {
          state.conductorList = res.data;
        } else {
          ElMessage.error(res.message);
        }
      });
    }
  };
  // 获取隶属学科
  const getSubject = () => {
    let params = {
      collectionName: "META_DATA_SUBJECT_INFO",
      outputGeobuf: false,
      pageCount: 0,
      pageNum: 100,
      queryConditionList: [],
      queryResultList: [],
    };
    http.stationsInfoManage.getSubject(params).then((res: any) => {
      let arr: any = [];
      if (res.code == 0) {
        res.data.data.forEach((item) => {
          arr.push(item.properties);
        });
        state.textItemList = arr;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //重置
  const resetbtn = () => {
    state.netWorkName = "";
    state.stationName = "";
    state.orderNum = "";
    state.conductor = "";
    state.textItem = "";
    state.value1 = "";
  };
  //选中数据
  const onSelectionChange = (row: any) => {
    state.selectId = row;
  };
  //导出
  const exportBtn = () => {
    let newArr = [];
    if (state.selectId.length > 0) {
      state.selectId.forEach((item) => {
        newArr.push(item.workOrderId);
      });
    }
    let params = {
      ids: newArr.toString(),
    };
    if (newArr.length !== 0) {
      http.dispatchCompleted.exportData(params).then((res: any) => {
        const blob = new Blob([res]); // 接受文档流
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        let filename = "运维工单信息列表" + ".xlsx"; // 设置导出的文件名
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        getData();
      });
    } else {
      ElMessage.warning("请选择导出文件");
    }
  };
  //添加案例
  const addCase = () => {
    let newArr = [];
    if (state.selectId.length > 0) {
      state.selectId.forEach((item) => {
        newArr.push(item.workOrderId);
      });
    }
    if (newArr.length !== 0) {
      http.dispatchCompleted.addCase(newArr).then((res: any) => {
        if (res) {
          if (res.code == 0) {
            getData();
            ElMessage.success(res.message);
          } else {
            ElMessage.error(res.message);
          }
        }
      });
    } else {
      ElMessage.warning("请选择导出文件");
    }
  };
  //详情按钮
  const detailClick = (row: any) => {
    state.isHobby = true;
    state.title = "详情";
    state.detailShowList = row;
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
  //分页
  const pageChange = (pageNum: any) => {
    state.pageNum = pageNum;
    getData();
  };
  //分页
  const sizeChange = (pageSize: any) => {
    state.pageSize = pageSize;
    getData();
  };
  //确定取消按钮
  const cancel = () => {};
  //查看附件
  const fileModal = (row: any) => {
    state.fileData = row;
    state.isFileTable = true;
    state.titleFileImg = "查看附件";
  };
  // 查看图片
  const imagesModal = (row: any) => {
    state.titleFileImg = "查看图片";
    state.isFileTable = true;
    state.fileData = row;
  };
  //附件表格取消
  const cancelFun = () => {
    state.isFileTable = false;
    state.isHobby = true;
  };
  //附件表格下载
  const downLoadBtn = (row: any) => {
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

  return {
    state,
    detailClick,
    searchData,
    resetbtn,
    exportBtn,
    addCase,
    pageChange,
    sizeChange,
    onSelectionChange,
    cancel,
    fileModal,
    downLoadBtn,
    cancelFun,
    imagesModal,
    changeType,
  };
};
