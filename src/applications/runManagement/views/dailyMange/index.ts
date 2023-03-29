import { onMounted, ref, reactive, getCurrentInstance, nextTick } from "vue";
import http from "@/api";
import store from "@/store";
import { ElMessage } from "element-plus";
export const useHandler = () => {
  const state = reactive({
    unusualPonintList: [], //异常测点
    unusualEquipmentList: [], //异常设备
    unusualInfo: [
      // {
      //   pointId: "", //异常测点
      //   deviceId: "", //异常设备
      //   startTime: "", //异常时间段
      //   endTime: "", //异常时间段
      //   exceptionContent: "", //异常z信息
      // },
    ], //异常信息
    showHandover: false, //日报交接弹框
    unusualShow: false, //异常信息显隐
    title: "新建", //新建
    showAdd: false, //新建显隐

    siteName: [], //站点名称
    stationList: [], //台站
    fillPeople: "", //填写人
    fillPeopleList: [], //填写人
    dutyTime: "", //开始 截止 时间
    unitId: "", //站点
    unitIdList: [], //站点列表
    checkStatus: "", //审核状态
    checkStatusList: [
      {
        value: 1,
        label: "未审核",
      },
      {
        value: 2,
        label: "已审核",
      },
    ], //审核状态
    replacePeoele: "", //交接人员
    replacePeoeleList: [], //交接人员
    replaceStatus: "", //交接状态
    replaceStatusList: [
      {
        value: 1,
        label: "未交接",
      },
      {
        value: 2,
        label: "已交接",
      },
    ], //交接状态
    userType: null, //人员类型
    stationArr: [], //初始化需要站台数组
    linkageData: [], //表格数据
    linkageColumns: [
      {
        prop: "pointName",
        label: "单位名称",
        width: 130,
      },
      {
        prop: "writer",
        label: "填写人",
        width: 130,
      },
      {
        prop: "reviser",
        label: "修改人",
        width: 130,
      },
      {
        prop: "createTime",
        label: "日报时间",
      },
      {
        prop: "content",
        label: "日报内容",
        width: 130,
      },
      {
        prop: "checker",
        label: "审核人",
        width: 130,
      },
      {
        prop: "checkStatusu",
        label: "审核状态",
        width: 130,
      },
      {
        prop: "replacer",
        label: "交接者",
        width: 130,
      },
      {
        prop: "replaceStatuss",
        label: "交接状态",
        width: 130,
      },
    ], //表头
    total: 10,
    pageSize: 10,
    pageNum: 1,
    //动态按钮名
    editRow: {
      title: "",
      content: "",
      updateUnitId: "", //所选站点
      dailyTime: "", //日报时间
    }, //编辑/新建的数据
    showExamine: false, //审核弹窗
    examineData: "", //审核数据
    idUpdate: "", //修改id
    stationId: "", //修改台站id
    examineId: "", //审核id
    dailyInfo: "", //日报交接id

    dataInfo: "", //日报详情
    unresolvedException: "", //日报信息  未解决信息
    solvedException: "", //日报信息    已解决信息
    exceptionLength: 0, //已经存在的异常信息长度进行删除
    idList: [], //删除已经存在的异常信息的id
    personId: "", //人员id
    personName: "", //人员名称
    dailyTimeList: [], //填写日报时间
    isAdmin: null, //当前账号是否是管理员
  });

  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;

  onMounted(() => {
    init().then((res) => {});
  });
  const init = async () => {
    personUserId(); // 查询日报表格信息
    await administrator(); //获取是否是管理员
    await unitIdListFun(); //站点数据
    if (state.userType == 1) {
      await stationApi(state.stationArr); //台网查询台站
    }
    await writerFun(); //查询填写人和交接人
  };
  // 异常信息添加
  const addUnusual = () => {
    //如果点击异常信息说明state.unusualInfo新增了obj  下面做判断的时候能拿到值
    if (!state.editRow.updateUnitId) {
      ElMessage.error("请选择站点");
      return;
    }
    let obj = {
      pointId: "", //异常测点
      deviceId: "", //异常设备
      startTime: "", //异常时间段
      endTime: "", //异常时间段
      exceptionContent: "", //异常z信息
      exceptionName: "", //异常z信息
      id: 0,
    };
    state.unusualInfo.push(obj);
    state.unusualShow = true;
  };
  //异常信息获取
  const unusualInfoFun = () => {
    //获取日报内容 获取异常信息
    let params = {
      id: "",
      stationId: state.editRow.updateUnitId,
      date: state.editRow.dailyTime,
    };
    http.dutyManage.updateList(params).then((res: any) => {
      if (res.code == 0) {
        state.unusualInfo = [...res.data.exceptions];
        state.unusualInfo.forEach((item: any) => {
          if (item) {
            unusualPonintChange(item.pointId); //查询设备
          }
          if (item.startTime) {
            let timeUp = item.startTime.split(" ");
            item.startTime = timeUp[1];
          }
        });
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //值班时间
  const dateChange = () => {
    unusualInfoFun();
  };
  // 异常信息删除
  const delUnusual = (item: any, index: any) => {
    if (item.id == 0) {
      //删除自己新增的
      state.unusualInfo.splice(index, 1);
    } else if (item.id != 0) {
      state.idList.push(item.id);
      state.unusualInfo.splice(index, 1);
    }
  };
  // 删除原有的异常数据（回显的数据）
  const delUnusualInfo = () => {
    let data = {
      idList: state.idList.toString(),
    };
    http.disposalCheck.deletaAbnormal(data).then((res: any) => {
      if (res.code === 0) {
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 新建 （填写日报）
  const fillReport = () => {
    state.title = "填写日报";
    state.showAdd = true;
    state.unusualShow = false;
    state.unusualInfo = [];
    state.editRow.title = "";
    state.editRow.content = "";
    state.editRow.updateUnitId = "";
    state.editRow.dailyTime = "";
  };
  // 编辑
  const edit = (row: any) => {
    if (row.operate == 2) {
      ElMessage.info("暂无权限");
      return;
    }
    state.title = "编辑";
    state.idUpdate = row.id;
    state.stationId = row.stationId;
    state.editRow.dailyTime = row.createTime;
    state.showAdd = true;
    state.unusualShow = true;
    let params = {
      id: row.id,
      stationId: "",
      date: state.editRow.dailyTime,
    };
    //获取异常信息
    state.editRow.updateUnitId = row.stationId;
    http.dutyManage.updateList(params).then((res: any) => {
      if (res.code == 0) {
        state.editRow.title = res.data.title;
        state.editRow.content = res.data.content;
        // unitIdChange(state.editRow.updateUnitId);
        listPointApi(state.editRow.updateUnitId);
        state.unusualInfo = [];
        state.unusualInfo = res.data.exceptions;
        state.unusualInfo.forEach((item: any) => {
          if (item) {
            unusualPonintChange(item.pointId); //查询设备
            if (item.startTime) {
              let timeUp = item.startTime.split(" ");
              item.startTime = timeUp[1];
            }
          }
        });
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 审核
  const examine = (row: any) => {
    //管理员且未审核才让审核
    if (state.isAdmin) {
      if (row.checkStatus != 1) {
        ElMessage.info("已审核");
        return;
      }
    } else if (!state.isAdmin) {
      ElMessage.info("暂无权限");
      return;
    }
    state.examineId = row.id;
    state.title = "审核";
    state.showExamine = true;
    state.examineData = "";
  };
  //确定审核
  const examineConfirm = () => {
    if (!state.examineData) {
      ElMessage.error("请输入审核意见");
      return;
    }
    state.showExamine = false;
    let params = {
      //审核日报所需字段
      id: state.examineId,
      advice: state.examineData, //审核意见
      checker: state.personName, //审核人名称
      checkerId: state.personId, //审核人ID
    };
    updateApi(params);
  };
  const administrator = () => {
    http.dutyManage.adjustAdmin({}).then((res: any) => {
      if (res && res.code == 0) {
        state.isAdmin = res.data.isAdmin;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 日报交接
  const handover = (row: any) => {
    if (row.replace == 2) {
      ElMessage.info("暂无权限");
      return;
    }
    state.title = "日报交接";
    state.dailyInfo = row.id;
    state.showHandover = true;
    state.dataInfo = row.content;
    http.dutyManage.dataContent(row.id).then((res: any) => {
      if (res.code == 0) {
        state.unresolvedException = res.data.unresolvedException;
        state.solvedException = res.data.solvedException;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //确定日报交接
  const handoverConfirm = () => {
    state.showHandover = false;
    let params = {
      id: state.dailyInfo,
      replacer: state.personName, //交接人名称
      replacerId: state.personId, //交接人ID
    };
    updateApi(params);
  };
  // 删除
  const confirmDelete = (v: any) => {
    if (v.operate == 2) {
      ElMessage.info("暂无权限");
      return;
    }
    http.dutyManage.batchList(v.id).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success(res.message);
        getJulist();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 新建/编辑确定
  const confirm = () => {
    //新增
    if (state.title == "填写日报") {
      if (!state.editRow.content) {
        ElMessage.error("日报内容不能为空");
        return;
      }
      if (!state.editRow.updateUnitId) {
        ElMessage.error("请选择站点");
        return;
      }
      state.showAdd = false;
      // 删除原有的异常数据（回显的数据）
      if (state.idList.length > 0) {
        delUnusualInfo();
      }
      let parmas = {
        content: state.editRow.content, //日报内容
        officer: state.personName, //值班人名称
        officerType: state.userType, //人员类型
        writerId: state.personId, //填写人ID
        unitId: state.editRow.updateUnitId, //台站/台网
        exceptionReportDTOList: state.unusualInfo, //异常信息列表
        createTime: state.editRow.dailyTime,
        reviser: state.personName,
        reviserId: state.personId,
      };
      http.dutyManage.addList(parmas).then((res: any) => {
        if (res.code == 0) {
          getJulist();
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      });
    }
    //修改
    if (state.title == "编辑") {
      if (!state.editRow.content) {
        ElMessage.error("日报内容不能为空");
        return;
      }
      state.showAdd = false;
      // 删除原有的异常数据（回显的数据）
      if (state.idList.length > 0) {
        delUnusualInfo();
      }
      let params = {
        id: state.idUpdate,
        reviser: state.personName, //修改人
        reviserId: state.personId, //修改人ID
        content: state.editRow.content, //日报内容
        exceptionReportDTOList: state.unusualInfo, //异常信息列表
        commitStatus: 1,
        createTime: state.editRow.dailyTime,
        unitId: state.stationId,
        officerType: state.userType, //人员类型
      };
      updateApi(params);
    }
  };
  //修改接口的api
  const updateApi = (params: any) => {
    http.dutyManage.updatePort(params).then((res: any) => {
      if (res.code == 0) {
        getJulist();
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //查询表格接口
  const getJulist = () => {
    let unitId: any;
    let stationId: any;
    //台网用户 台网有值
    if (state.userType == 1 && state.unitId) {
      unitId = [state.unitId];
    } else if (
      //台网用户 台网没值  台站有值
      state.userType == 1 &&
      !state.unitId &&
      state.siteName.length > 0
    ) {
      unitId = [];
    } else if (
      //台网用户 台网没值  台站没值
      state.userType == 1 &&
      !state.unitId &&
      state.siteName.length == 0
    ) {
      unitId = state.stationArr;
    }
    if (state.userType == 1) {
      stationId = state.siteName;
    }
    //台站用户  台站有值
    if (state.userType == 2 && state.unitId.length > 0) {
      stationId = state.unitId;
      //台站用户  台站没值
    } else if (state.userType == 2 && state.unitId.length == 0) {
      stationId = state.stationArr;
    }
    let params = {
      pageNum: state.pageNum,
      pageSize: state.pageSize,
      //以下为查询条件
      stationId: stationId, //站点名称
      officer: state.fillPeople, //填写人值班人
      checkStatus: state.checkStatus, //审核状态
      startTime: state.dutyTime ? state.dutyTime[0] : "",
      endTime: state.dutyTime ? state.dutyTime[1] : "",
      replacer: state.replacePeoele, //交接人员
      replaceStatus: state.replaceStatus, //交接状态
      networkId: unitId, //台站/台网ID  所选站点
      userType: state.userType, //人员类型
      userId: state.personId,
    };
    http.dutyManage.getList(params).then((res: any) => {
      if (res.code == 0) {
        state.linkageData = res.data.list;
        state.total = res.data.total;
        state.linkageData.forEach((item: any) => {
          if (item.checkStatus == 1) {
            item.checkStatusu = "未审核";
          } else if (item.checkStatus == 2) {
            item.checkStatusu = "已审核";
          }
          if (item.replaceStatus == 1) {
            item.replaceStatuss = "未交接";
          } else if (item.replaceStatus == 2) {
            item.replaceStatuss = "已交接";
          }
        });
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 查询
  const searchList = () => {
    getJulist();
  };
  //切换页
  const pageChange = (pageNum: any) => {
    state.pageNum = pageNum;
    getJulist();
  };
  //分页大小
  const sizeChange = (pageSize: any) => {
    state.pageSize = pageSize;
    getJulist();
  };
  //获取 站点数据
  const unitIdListFun = () => {
    //判断是台网还是台站
    if (store.state.user.stationInfo) {
      state.unitIdList = JSON.parse(store.state.user.stationInfo);
      state.userType = state.unitIdList[0].userType
        ? state.unitIdList[0].userType
        : "";
      // 站点数据的id
      state.stationArr = [];
      state.unitIdList.forEach((item) => {
        if (item.unitId) {
          state.stationArr.push(item.unitId);
        }
      });
      //台网默认给值
      if (state.userType == 1) {
        state.unitId = state.stationArr[0];
      }
    } else {
      ElMessage.error("无用户站点信息");
    }
  };
  // 站点查测点
  const unitIdChange = (val: any) => {
    //查询日期时间接口
    dailyReportDate(val);
    if (val) {
      //站点查测点
      listPointApi(val);
    }
    state.unusualShow = true;
  };
  //站点查测点api
  const listPointApi = (val: any) => {
    http.dutyManage.listPoint(val).then((res: any) => {
      if (res.code == 0) {
        state.unusualPonintList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //测点查设备
  const unusualPonintChange = (val: any) => {
    if (val) {
      http.dutyManage.unusualPonint(val).then((res: any) => {
        if (res.code == 0) {
          state.unusualEquipmentList = res.data;
        } else {
          ElMessage.error(res.message);
        }
      });
    }
  };
  //撤回消息
  const recallFun = (row: any) => {
    if (row.operate == 2) {
      ElMessage.info("暂无权限");
      return;
    }
    let params = {
      id: row.id,
      commitStatus: 2,
    };
    updateApi(params);
  };
  //台网/台站用户  台网查询台站
  const netChange = (val: any) => {
    //如果是台网用户 台网查询台站
    if (state.userType == 1) {
      val = val ? [val] : state.stationArr;
      stationApi(val);
    }
    //如果是台网用户 台网查询填写人和交接人
    let params: any;
    if (state.userType == 1) {
      params = {
        unitId: val,
      };
      //如果是台站用户 台站查询填写人和交接人
    } else if (state.userType == 2) {
      params = {
        stationId:
          val.length > 0 ? val.toString() : state.stationArr.toString(),
      };
    }
    if (params.unitId || params.stationId) {
      //台网/台站查询填写人和交接人
      writerApi(params);
    }
  };
  //查询台站api
  const stationApi = (val: any) => {
    http.dutyManage.seatchStation(val).then((res: any) => {
      if (res.code == 0) {
        state.stationList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //台网用户中台站查询  填写人和交接人
  const netStationChange = (val: any) => {
    let params: any;
    //如果台站有数据
    if (val.length > 0) {
      params = {
        stationId: val.toString(),
      };
      //如果台站没数据 台网有数据
    } else if (val.length == 0 && state.unitId) {
      params = {
        unitId: state.unitId,
      };
    }
    if (params.unitId || params.stationId) {
      //台网/台站查询填写人和交接人
      writerApi(params);
    }
  };
  //查询填写人和交接人
  const writerFun = () => {
    let params: any;
    if (state.userType == 1) {
      params = {
        unitId: state.stationArr.toString(),
      };
      //如果是台站用户 台站查询填写人和交接人
    } else if (state.userType == 2) {
      params = {
        stationId: state.stationArr.toString(),
      };
    }
    if (state.stationArr.length > 0) {
      //台网/台站查询填写人和交接人
      writerApi(params);
    }
  };
  //查询填写人和交接人Api
  const writerApi = (params: any) => {
    http.dutyManage.getStaffId(params).then((res: any) => {
      if (res.code == 200) {
        let fillPeopleNewList = res.data.writer.filter((item: any) => {
          return item.officer;
        });
        let replacePeoeleNewList = res.data.replace.filter((item: any) => {
          return item.replacer;
        });
        state.fillPeopleList = fillPeopleNewList;
        state.replacePeoeleList = replacePeoeleNewList;
      } else {
        // ElMessage.error(res.message);
      }
    });
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
        nextTick(() => {
          getJulist();
        });
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //查询日期时间接口
  const dailyReportDate = (val: any) => {
    let stationId = "";
    let unitNetId = "";
    if (state.userType == 1) {
      unitNetId = val;
    } else if (state.userType == 2) {
      stationId = val;
    }
    let params = {
      stationId: stationId,
      unitId: unitNetId,
      userId: state.personId,
    };
    http.dutyManage.dailyReportDate(params).then((res: any) => {
      if (res.code == 200) {
        let arr: any = [];
        res.data.forEach((item: any) => {
          if (item.date) {
            let obj = {
              label: item.date,
              value: item.date,
            };
            arr.push(obj);
          }
        });
        state.dailyTimeList = arr;
        if (state.dailyTimeList[0].value) {
          state.editRow.dailyTime = state.dailyTimeList[0].value;
          unusualInfoFun();
        }
        if (state.dailyTimeList.length == 0) {
          ElMessage.error("不可填写");
        }
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  return {
    state,
    addUnusual,
    unusualInfoFun,
    dateChange,
    delUnusual,
    delUnusualInfo,
    fillReport,
    edit,
    examine,
    examineConfirm,
    handover,
    handoverConfirm,
    confirmDelete,
    confirm,
    updateApi,
    getJulist,
    searchList,
    pageChange,
    sizeChange,
    unitIdListFun,
    unitIdChange,
    listPointApi,
    unusualPonintChange,
    recallFun,
    netChange,
    stationApi,
    netStationChange,
    writerFun,
    writerApi,
    personUserId,
    dailyReportDate,
  };
};
