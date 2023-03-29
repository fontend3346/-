import { onMounted, ref, reactive, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import http from "@/api/index";
import utils from "@/utils/utils";
import store from "@/store";
export const useHandler = () => {
  onMounted(() => {
    judgmentStatus();
  });
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
    eventName: "", //事件名称
    eventType: "", //事件类型
    dutyPeople: "", //值班人员
    dutyTime: [], //开始 截止 时间
    startTime: "", //开始 截止 时间
    endTime: "", //开始 截止 时间
    warnLevel: "", //预警级别
    warnStatus: "", //预警状态
    warnStatusList: [
      {
        id: 1,
        name: "未发布",
      },
      {
        id: 2,
        name: "已发布",
      },
    ], //预警状态
    linkageData: [], //表格数据
    linkageColumns: [
      {
        prop: "warningName",
        label: "预警信息名称",
      },
      {
        prop: "warningType",
        label: "预警信息类型",
      },
      {
        prop: "warningLevel",
        label: "预警级别",
      },
      {
        prop: "dutyOfficerName",
        label: "登记人员",
      },
      {
        prop: "createTime",
        label: "填写时间",
      },
      {
        prop: "warnigContent",
        label: "内容",
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
      { value: "release", label: "发布预警" },
      { value: "编辑", label: "编辑" },
    ],

    editRow: {
      stationValue: "", //台站
      stationList: [
        {
          unitId: "",
          unitName: "",
        },
      ], //台站数据
      eventName: "", //预警名称
      warnLevel: "", //预警级别
      content: "", //预警内容
      warnType: "", //预警级别
      startTime: "", //开始时间
      endTime: "", //结束时间
      createTime: "", //创建时间
      updateId: "", //编辑id
      dutyStatus: "", //状态
    }, //编辑/新建的数据
    showExamine: false, //审核弹窗
    examineData: {}, //查看数据
    stationList: [], //登录后获取id组合
  });

  //动态按钮方法
  const dynamicBtn = (row: any, index: any, item: any) => {
    if (item.value == "release") {
      examine(row);
    } else if (item.value == "编辑") {
      edit(row);
    }
  };
  // 查询
  const searchList = () => {
    getList();
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
      warningLevel: state.warnLevel, //预警级别
      warningName: state.eventName, //预警名称
      warningType: state.eventType, //预警类型
      status: state.warnStatus, //预警状态
      pageNum: state.pageNum,
      pageSize: state.pageSize,
      startTime: startTime,
      endTime: endTime,
      stationIds: state.stationList,
    };
    http.warnInfoCheck.getWarn(params).then((res: any) => {
      if (res.code === 0) {
        state.linkageData = res.data.list;
        state.linkageData.map((item: any) => {
          if (item.status == 1) {
            item.state = "未发布";
          } else if (item.status == 2) {
            item.state = "已发布";
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
      http.warnInfoCheck.exportWarn(params).then((res: any) => {
        ElMessage.success("导出成功");
        let data = res;
        let url = window.URL.createObjectURL(new Blob([data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        const name = new Date().getTime();
        link.setAttribute("download", "预警信息" + ".xlsx"); // 需要文件名字
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); //下载完成移除元素
        window.URL.revokeObjectURL(url); //释放掉blob对象
      });
    }
  };
  // 新建
  const addEvent = () => {
    state.title = "添加预警信息";
    state.showAdd = true;
    clear();
  };
  const clear = () => {
    state.editRow.content = "";
    state.editRow.eventName = "";
    state.editRow.warnType = "";
    state.editRow.warnLevel = "";
    state.editRow.stationValue = "";
    state.editRow.dutyStatus = "";
  };
  // 新建（编辑）确定
  const confirm = () => {
    if (state.title == "添加预警信息") {
      if (!state.editRow.stationValue) {
        ElMessage.info("台站不能为空");
      } else if (!state.editRow.eventName) {
        ElMessage.info("预警名称不能为空");
      } else if (!state.editRow.warnLevel) {
        ElMessage.info("预警级别不能为空");
      } else if (!state.editRow.warnType) {
        ElMessage.info("预警类型不能为空");
      } else {
        let params = {
          dutyOfficer: store.state.user.userName,
          dutyOfficerId: store.state.user.userId,
          warnigContent: state.editRow.content,
          warningName: state.editRow.eventName,
          warningLevel: state.editRow.warnLevel,
          warningType: state.editRow.warnType,
          stationId: state.editRow.stationValue,
        };
        http.warnInfoCheck.addWarn(params).then((res: any) => {
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
      let params = {
        id: state.editRow.updateId,
        dutyOfficer: store.state.user.userName,
        dutyOfficerId: store.state.user.userId,
        warnigContent: state.editRow.content,
        warningName: state.editRow.eventName,
        warningLevel: state.editRow.warnLevel,
        warningType: state.editRow.warnType,
        stationId: state.editRow.stationValue,
        status: state.editRow.dutyStatus,
        createTime: utils.formatDate(state.editRow.createTime, 0),
      };
      http.warnInfoCheck.updateWarn(params).then((res: any) => {
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
    state.editRow.content = row.warnigContent;
    state.editRow.eventName = row.warningName;
    state.editRow.warnType = row.warningType;
    state.editRow.warnLevel = row.warningLevel;
    state.editRow.stationValue = row.stationId;
    state.editRow.dutyStatus = row.status;
    state.editRow.updateId = row.id;
    state.editRow.createTime = row.createTime;
  };
  // 发布预警
  const examine = (row: any) => {
    state.title = "详情";
    // state.showExamine = true;
    // state.examineData = row;
  };
  //确定预警？？？
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
    http.warnInfoCheck.deleteWarn(params).then((res: any) => {
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
  // 登录后获取台站点
  const judgmentStatus = () => {
    state.stationList = [];
    if (store.state.user.stationInfo) {
      let info = store.state.user.stationInfo;
      let data = JSON.parse(info);
      let list = JSON.parse(info);
      state.editRow.stationList = list;
      data.map((item: any) => {
        state.stationList.push(item.unitId);
      });
      getList();
    }
  };

  return {
    state,
    judgmentStatus,
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
    clear,
    addEvent,
    exportList,
    getList,
    searchList,
    dynamicBtn,
  };
};
