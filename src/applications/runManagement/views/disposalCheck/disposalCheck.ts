import { onMounted, ref, reactive, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import store from "@/store";
import http from "@/api/index";
import utils from "@/utils/utils";
export const useHandler = () => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  const state = reactive({
    idList: [], //删除数据
    selectionList: [], //选中数据
    title: "新建", //新建
    showAdd: false, //新建显隐
    addRow: {
      stationValue: "", //台站
      stationList: [
        {
          unitId: "",
          unitName: "",
        },
      ], //台站数据
      pointValue: "", //测点
      pointList: [
        {
          id: "",
          name: "",
        },
      ], //测点数据
      equipmentValue: "", //设备
      equipmentList: [
        {
          device_name: "",
          id:""
        }
      ], //设备数据
      eventName: "", //异常名称
      eventType: "", //异常类型
      evenContent: "", //异常内容
      startTime: null, //开始时间
      endTime: null, //结束时间
      updateId: "", //编辑id
      dutyStatus: "", //状态
    },
    eventName: "", //事件名称
    eventType: "", //事件类型
    dutyPeople: "", //值班人员
    dutyStatus: "", //状态
    dutyStatusList: [
      {
        id: 1,
        name: "未处理",
      },
      {
        id: 2,
        name: "已处理",
      },
    ], //状态
    dutyTime: [], //开始 截止 时间
    startTime: "", //开始 截止 时间
    endTime: "", //开始 截止 时间
    sheetNumber: "", //处置单单号
    isFile: "1", //是否归档，默认是
    linkageData: [], //表格数据
    linkageColumns: [
      {
        prop: "exceptionName",
        label: "突发事件名称",
      },
      {
        prop: "exceptionType",
        label: "突发事件类型",
      },
      {
        prop: "dutyOfficerName",
        label: "值班人员",
      },
      {
        prop: "startTime",
        label: "填写时间",
      },
      {
        prop: "exceptionContent",
        label: "突发事件内容",
      },
      {
        prop: "state",
        label: "状态",
      },
    ], //表头

    total: 10,
    pageSize: 10,
    pageNum: 1,
    //动态按钮名
    dynamicBtnName: [
      { value: "查看", label: "查看" },
      { value: "编辑", label: "编辑" },
    ],

    editRow: {}, //编辑/新建的数据
    showExamine: false, //审核弹窗
    examineData: {
      deviceName: "数据采集器",
      dutyOfficerName: "testAdmin1",
      endTime: "2022-11-16 00:00:00",
      exceptionContent: "异常",
      exceptionName: "测试12",
      exceptionType: "异常",
      pointName: "湟源-山洞",
      startTime: "2022-11-08 00:00:00",
      stationName: "湟源",
      status: "",
    }, //查看数据
    stationList: [], //登录后获取id组合
    personId: "", //人员id
    personName: "", //人员名称
  });
  onMounted(() => {
    // //查询接口
    // getList();
    personUserId();
    judgmentStatus();
  });
  //动态按钮方法
  const dynamicBtn = (row: any, index: any, item: any) => {
    if (item.value == "查看") {
      examine(row);
    } else if (item.value == "编辑") {
      edit(row);
    }
  };
  // 查询
  const searchList = () => {
    getList();
  };
  // 登录后获取台站点
  const judgmentStatus = () => {
    state.stationList = [];
    if (store.state.user.stationInfo) {
      let info = store.state.user.stationInfo;
      let data = JSON.parse(info);
      let list = JSON.parse(info);
      state.addRow.stationList = list;
      data.map((item: any) => {
        state.stationList.push(item.unitId);
      });
      getList();
    }
  };
  // 通过台站查测点
  const getPonint = () => {
    let stationId = state.addRow.stationValue;
    http.dutyManage.listPoint(stationId).then((res: any) => {
      if (res.code === 0) {
        state.addRow.pointList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 通过测点查设备
  const getEquipMent = () => {
    let pointId = state.addRow.pointValue;
    http.dutyManage.unusualPonint(pointId).then((res: any) => {
      if (res.code === 0) {
        state.addRow.equipmentList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //查询接口
  const getList = () => {
    let startTime: any;
    let endTime: any;
    if (
      state.dutyTime !== undefined &&
      state.dutyTime != null &&
      state.dutyTime.length > 0
    ) {
      startTime = utils.formatDate(state.dutyTime[0], 0);
      endTime = utils.formatDate(state.dutyTime[1], 0);
    } else {
      startTime = "";
      endTime = "";
    }
    let params = {
      dutyOfficer: state.dutyPeople, //值班人员
      status: state.dutyStatus, //值班人员
      exceptionName: state.eventName, //突发事件名称
      exceptionType: state.eventType, //突发事件类型
      pageNum: state.pageNum,
      pageSize: state.pageSize,
      startTime: startTime,
      endTime: endTime,
      stationIds: state.stationList,
    };
    http.disposalCheck.getAbnormal(params).then((res: any) => {
      if (res.code === 0) {
        state.linkageData = res.data.list;
        state.linkageData.map((item: any) => {
          if (item.status == 1) {
            item.state = "未处理";
          } else if (item.status == 2) {
            item.state = "已处理";
          }
        });
        state.total = res.data.total;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //导出
  const exportList = () => {
    if (state.selectionList.length == 0) {
      ElMessage.info("请选中要导出的数据");
    } else {
      let newArr = [] as any[];
      state.selectionList.map((item: any) => {
        newArr.push(item.id);
      });
      let params = {
        ids: newArr.toString(),
      };
      http.disposalCheck.exportAbnormal(params).then((res: any) => {
        ElMessage.success("导出成功");
        let data = res;
        let url = window.URL.createObjectURL(new Blob([data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        const name = new Date().getTime();
        link.setAttribute("download", "突发事件" + ".xlsx"); // 需要文件名字
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); //下载完成移除元素
        window.URL.revokeObjectURL(url); //释放掉blob对象
      });
    }
  };
  // 新建
  const addEvent = () => {
    state.title = "添加突发事件";
    state.showAdd = true;
    clear();
  };
  const clear = () => {
    state.addRow.equipmentValue = "";
    state.addRow.evenContent = "";
    state.addRow.eventName = "";
    state.addRow.eventType = "";
    state.addRow.pointValue = "";
    state.addRow.stationValue = "";
    state.addRow.startTime = null;
    state.addRow.endTime = null;
    state.addRow.dutyStatus = "";
  };
  //新建-编辑-取消
  const cancel = () => {
    clear();
  };
  // 新建（编辑）确定
  const confirm = () => {
    if (state.title == "添加突发事件") {
      if (!state.addRow.stationValue) {
        ElMessage.info("台站不能为空");
      } else if (!state.addRow.pointValue) {
        ElMessage.info("测点不能为空");
      } else if (!state.addRow.equipmentValue) {
        ElMessage.info("设备不能为空");
      } else if (!state.addRow.eventName) {
        ElMessage.info("突发事件名称不能为空");
      } else {
        let startTime = "";
        let endTime = "";
        if (state.addRow.startTime) {
          startTime = utils.formatDate(state.addRow.startTime, 0);
        } else {
          startTime = "";
        }
        if (state.addRow.endTime) {
          endTime = utils.formatDate(state.addRow.endTime, 0);
        } else {
          endTime = "";
        }
        let params = {
          deviceId: state.addRow.equipmentValue,
          dutyOfficer: state.personName,
          dutyOfficerId: state.personId,
          exceptionContent: state.addRow.evenContent,
          exceptionName: state.addRow.eventName,
          exceptionType: state.addRow.eventType,
          pointId: state.addRow.pointValue,
          stationId: state.addRow.stationValue,
          startTime: startTime,
          endTime: endTime,
        };
        http.disposalCheck.addAbnormal(params).then((res: any) => {
          if (res.code === 0) {
            state.showAdd = false;
            getList();
            ElMessage.success(res.message);
          } else {
            ElMessage.error(res.message);
          }
        });
      }
    } else if (state.title == "编辑") {
      let startTime = "";
      let endTime = "";
      if (state.addRow.startTime) {
        startTime = utils.formatDate(state.addRow.startTime, 0);
      } else {
        startTime = "";
      }
      if (state.addRow.endTime) {
        endTime = utils.formatDate(state.addRow.endTime, 0);
      } else {
        endTime = "";
      }
      let params = {
        id: state.addRow.updateId,
        deviceId: state.addRow.equipmentValue,
        exceptionContent: state.addRow.evenContent,
        exceptionName: state.addRow.eventName,
        exceptionType: state.addRow.eventType,
        pointId: state.addRow.pointValue,
        stationId: state.addRow.stationValue,
        startTime: startTime,
        endTime: endTime,
        status: state.addRow.dutyStatus,
      };
      http.disposalCheck.updateAbnormal(params).then((res: any) => {
        if (res.code === 0) {
          state.showAdd = false;
          getList();
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      });
    }
  };

  // 编辑
  const edit = (row: any) => {
    state.title = "编辑";
    state.showAdd = true;
    state.addRow.equipmentValue = row.deviceId;
    state.addRow.evenContent = row.exceptionContent;
    state.addRow.eventName = row.exceptionName;
    state.addRow.eventType = row.exceptionType;
    state.addRow.pointValue = row.pointId;
    state.addRow.stationValue = row.stationId;
    state.addRow.startTime = row.startTime;
    state.addRow.endTime = row.endTime;
    state.addRow.updateId = row.id;
    state.addRow.dutyStatus = row.status;
    // 通过台站查测点
    getPonint();
    // 通过测点查设备
    getEquipMent();
  };
  // 查看
  const examine = (row: any) => {
    state.title = "查看";
    state.showExamine = true;
    state.examineData.stationName = row.stationName;
    state.examineData.pointName = row.pointName;
    state.examineData.deviceName = row.deviceName;
    state.examineData.exceptionName = row.exceptionName;
    state.examineData.exceptionType = row.exceptionType;
    state.examineData.exceptionContent = row.exceptionContent;
    state.examineData.exceptionContent = row.exceptionContent;
    state.examineData.dutyOfficerName = row.dutyOfficerName;
    state.examineData.dutyOfficerName = row.dutyOfficerName;
    state.examineData.startTime = row.startTime;
    state.examineData.endTime = row.endTime;
    if (row.status == 1) {
      state.examineData.status = "未处理";
    } else if (row.status == 2) {
      state.examineData.status = "已处理";
    }
  };
  //确定查看-取消
  const examineConfirm = () => {
    state.showExamine = false;
  };
  // 删除
  const confirmDelete = (row: any) => {
    state.idList = [];
    state.idList.push(row.id);
    let params = {
      idList: state.idList.toString(),
    };
    deleteFun(params);
  };
  // 删除
  const deleteFun = (params: any) => {
    http.disposalCheck.deletaAbnormal(params).then((res: any) => {
      if (res.code === 0) {
        getList();
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //复选框选中
  const onSelectionChange = (selection: any) => {
    state.selectionList = selection;
  };
  //批量删除
  const batchesDelete = () => {
    if (state.selectionList.length == 0) {
      ElMessage.error("请选中要删除的数据");
    } else {
      let newArr = [] as any[];
      state.selectionList.map((item: any) => {
        newArr.push(item.id);
      });
      let params = {
        idList: newArr.toString(),
      };
      deleteFun(params);
    }
  };
  //切换页
  const pageChange = (pageNum: any) => {
    state.pageNum = pageNum;
    getList();
  };
  //分页大小
  const sizeChange = (pageSize: any) => {
    state.pageSize = pageSize;
    getList();
  };
  //人员id
  const personUserId = () => {
    //通过用户id获取人员的id
    let loginUser = store.state.user.userId;
    http.dutyManage.getPersonnalId(loginUser).then((res: any) => {
      if (res.code == 0) {
        if (res.data) {
          state.personId = res.data.id;
          state.personName = res.data.name;
        }
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  return {
    state,
    personUserId,
    sizeChange,
    pageChange,
    batchesDelete,
    onSelectionChange,
    deleteFun,
    confirmDelete,
    examineConfirm,
    examine,
    edit,
    confirm,
    cancel,
    clear,
    addEvent,
    exportList,
    getList,
    getEquipMent,
    getPonint,
    judgmentStatus,
    searchList,
    dynamicBtn,
  };
};
