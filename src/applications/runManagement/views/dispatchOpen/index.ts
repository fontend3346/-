import {
  reactive,
  onMounted,
  ref,
  getCurrentInstance,
  onBeforeUnmount,
} from "vue";
import http from "@/api/index";
import store from "@/store";
import { ElMessage } from "element-plus";
export const useHandler = () => {
  const state = reactive({
    //搜索
    orderNum: "", //单号
    netWrokId: "", //台网
    netWrokIdList: [], //台网数据
    textItem: "", //测项
    textItemList: [
      {
        value: "",
        label: "",
      },
    ], //测项数据
    stationName: "", //台站名称
    dataBaseList: [
      {
        value: "",
        label: "",
      },
    ], //台站名称数据

    netWorkName: "", //台网名称
    netWorkList: [
      {
        value: "",
        label: "",
      },
    ], //台网数据
    conductor: "", //处理人
    conductorList: [
      {
        value: "",
        label: "",
      },
    ], //处理人
    statusValue: "", //状态
    statusList: [
      {
        value: "1",
        label: "待处理",
      },
      {
        value: "2",
        label: "处理中",
      },
      {
        value: "3",
        label: "已挂起",
      },
      {
        value: "4",
        label: "已完成",
      },
    ], //状态列表
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
        prop: "statusVal",
        label: "状态",
        width: 100,
      },
      // {
      //   prop: "isCaseData",
      //   label: "案例",
      //   width: 100,
      // },
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
    detailShowList: {},
    activeStep: "3", //步骤
    stepsInfo: [
      {
        title: "第1步[处理]",
        info: "设备值进人员处理结果:测试人员18839476440 历时:2天12小时27分5秒",
        isResolve: "未解决",
        description: "待运营商协商",
        src: "https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg?source=1940ef5c",
        time: "2019-12-09 20:14:23-2019-12-12 08:41:28 1人18839476440",
        file: "查看附件(1)>>",
      },
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

    //派单
    isSendModal: false, //是否显示派单
    testOption: "", //选择测项
    testOptionList: [
      {
        id: "",
        name: "",
      },
    ], //选择测项
    targetNetwork: "", //台网
    networkList: [
      {
        value: "",
        label: "",
      },
    ], //目标台网
    targetStation: "", //目标台站
    targetStationList: [], //目标台站
    conductorSend: "", //处理人
    conductorListSend: [
      {
        id: "",
        name: "",
      },
    ], //处理人
    malFunction: "", //故障现象
    explain: "", //初步说明
    stationIdWrap: "", //初步说明
    titleFileImg: "查看附件",
    selectId: [],
  });

  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  onMounted(() => {
    getDataList();
    getNetWork();
    getStations();
    //获取隶属学科
    getSubject();
  });
  onBeforeUnmount(() => {});

  //查询
  const searchData = () => {
    getDataList();
  };
  //查表格数据
  const getDataList = () => {
    let params = {
      networkId: state.netWrokId,
      stationId: state.stationName,
      endTime: state.value1[1],
      startTime: state.value1[0],
      workOrderId: state.orderNum, //工单id
      page: state.pageNum,
      pageSize: state.pageSize,
      measurement: state.textItem, //测项
      handlerId: state.conductor ? state.conductor : store.state.user.userId, //处理人
      status: state.statusValue ? state.statusValue : "",
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
            if (item.status == 1) {
              item.statusVal = "待处理";
            } else if (item.status == 2) {
              item.statusVal = "处理中";
            } else if (item.status == 3) {
              item.statusVal = "已挂起";
            } else if (item.status == 4) {
              item.statusVal = "已完成";
            }
          });
          state.total = res.data.total;
        } else {
          ElMessage.error(res.message);
        }
      }
    });
  };
  //查询台网
  const getNetWork = () => {
    http.stationsInfoManage.getCountry().then((res: any) => {
      if (res) {
        if (res.code == 0) {
          state.netWrokIdList = res.data;
        } else {
          ElMessage.error(res.message);
        }
      }
    });
  };
  //台网改变事件
  const netChange = (val: any) => {
    state.stationName = "";
    let params = {
      networkId: val,
    };
    stationsTotal(params);
  };
  // 获取子台站列表
  const getStations = () => {
    let params = {
      networkId: "",
    };
    stationsTotal(params);
  };
  // 台站api
  const stationsTotal = (data: any) => {
    http.stationsInfoManage.getStationsEarth(data).then((res: any) => {
      if (res) {
        if (res.code == 0) {
          state.dataBaseList = res.data;
        } else {
          ElMessage({
            message: res.message,
            type: "error",
          });
        }
      }
    });
  };
  //台站改变事件
  const stationNameChange = (val: any) => {
    state.conductor = "";
    state.conductorList = [];
    //处理人接口
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

  //重置
  const resetbtn = () => {
    state.orderNum = "";
    state.netWrokId = "";
    state.textItem = "";
    state.stationName = "";
    state.conductor = "";
    state.statusValue = "";
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
        getDataList();
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
  //分页
  const pageChange = (pageNum: any) => {
    state.pageNum = pageNum;
    getDataList();
  };
  //分页
  const sizeChange = (pageSize: any) => {
    state.pageSize = pageSize;
    getDataList();
  };
  //详情取消按钮
  const cancel = () => {
    state.isHobby = false;
  };
  //附件表格取消
  const cancelFun = () => {
    state.isFileTable = false;
    state.isHobby = true;
  };
  //附件图片下载
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
  //添加派单
  const sendOrders = () => {
    state.testOption = "";
    state.targetStation = "";
    state.conductorSend = "";
    state.malFunction = "";
    state.explain = "";
    state.isSendModal = true;
    state.title = "手动派单";
  };
  //目标台站修改
  const changeType = (val: any) => {
    //处理人接口
    let params = {
      stationId: val.station_id,
    };
    http.dispatchOpen.conductor(params).then((res: any) => {
      if (res.code == 0) {
        state.conductorListSend = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
    //查到台网id
    let param = {
      stationId: val.station_id,
    };
    http.dispatchOpen.searchNetId(param).then((res: any) => {
      if (res.code == 0) {
        state.stationIdWrap = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
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
        state.testOptionList = arr;
        state.testOption = arr[0].id;
        if (state.testOption) {
          //查询目标台站
          stationApi(state.testOption);
        }
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //测试项改变 - 查询目标台站
  const testOptionChange = (val: any) => {
    stationApi(val);
  };
  //查询目标台站API
  const stationApi = (val: any) => {
    http.dispatchOpen.targetStationApi(val).then((res: any) => {
      if (res.code == 0) {
        state.targetStationList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //确定
  const confirmFun = () => {
    if (!state.testOption) {
      ElMessage.error("请输选择测项");
      return;
    }
    if (!state.targetStation) {
      ElMessage.error("请输选择目标台站");
      return;
    }
    if (!state.conductorSend) {
      ElMessage.error("请选择处理人");
      return;
    }
    if (!state.malFunction) {
      ElMessage.error("请输入故障现象");
      return;
    }
    if (!state.explain) {
      ElMessage.error("请输入初步说明");
      return;
    }
    let params = {
      description: state.explain, //初步说明
      dispatcherId: store.state.user.userId, //当前登陆人的id
      handlerId: state.conductorSend, //处理人的id
      faultPhenomenon: state.malFunction, //故障现象
      measurement: state.testOption, //学科
      networkId: state.stationIdWrap, //台网id
      stationId: state.targetStation.station_id, //台站id
      workOrderName: state.targetStation.name + state.malFunction, //工单名称
    };
    http.dispatchOpen.addOrder(params).then((res: any) => {
      if (res) {
        if (res.code == 0) {
          state.isSendModal = false;
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      }
    });
  };
  return {
    state,
    detailClick,
    stationNameChange,
    searchData,
    resetbtn,
    pageChange,
    sizeChange,
    onSelectionChange,
    cancel,
    fileModal,
    downLoadBtn,
    sendOrders,
    changeType,
    confirmFun,
    testOptionChange,
    imagesModal,
    cancelFun,
    exportBtn,
    netChange,
  };
};
