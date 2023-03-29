import http from "@/api";
import md5 from "js-md5";
import { ElMessage } from "element-plus";
import { reactive, toRefs, onMounted, getCurrentInstance, nextTick } from "vue";
import store from "@/store";
import utils from "@/utils/utils";

export const useHandler = () => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  const state = reactive({
    roleCode: "", //用户id
    groupName: [], //角色名称
    groupNameList: [], //群组列表
    groupColumns: [
      // {
      //   prop: "roleName",
      //   label: "角色名称",
      // },
      {
        prop: "name",
        label: "角色名称",
      },
    ], //群组表头
    groupTableData: [], //群组数据
    //用户操作
    groupModal: false, //群组弹框

    arr: [], //数据
    /* 时间相应的数据 */
    isHobby1: false, //修改弹框

    modifyActivationTime: "", // 修改激活时间的数据
    AddActivationTime: "", // 激活时间

    teamId: "", //台网
    userName: "", //账号
    userPass: "", //密码
    mechanism: "", //请选择台网
    mechanismArry: [], //台网列表
    mechanismList: [], //台站列表
    assetUserArry: [], //绑定人员列表
    stateArry: [
      {
        value: 1,
        label: "激活",
      },
      {
        value: 2,
        label: "未激活",
      },
    ], //激活状态
    role: "", //角色
    roleArry: [
      {
        value: 1,
        label: "管理员",
      },
      {
        value: 2,
        label: "用户",
      },
    ], //用户
    state: "", //用户状态
    creatTime: "", //创建时间
    address: "", //地址
    mechanism1: "", //台网名
    mechanism2: "", //台站名称
    isHobby: false, //偏好设置
    value1: "", //时间
    title: "", //标题
    fitData: "", //搜索单位名
    // 联动设备table栏
    linkageColumns: [
      {
        prop: "account",
        label: "账号",
      },
      {
        prop: "name",
        label: "昵称",
      },
      {
        prop: "networkName",
        label: "台网名称",
      },
      {
        prop: "stationName",
        label: "台站名称",
      },
      {
        prop: "createTime",
        label: "创建时间",
      },
      {
        prop: "statusU",
        label: "用户状态",
        width: "100",
      },
    ],
    // 联动设备数据
    linkageData: [],
    total: 0, //总条数
    pageSize: 10, //分页尺寸
    pageNum: 1, //当前页
    selectionList: [], //批量删除
    startDate: "", //开始
    endDate: "", //结束
    ruleForm: {
      // teamId: "", //台网
      nickname: "", //昵称
      userName: "", //账号
      userPass: "", //密码
      userPass1: "", //确认密码
      assetUser: "", //绑定资产人员
      // deptId: "",
    }, //增加弹框值
    ruleForm1: {
      password: "", //密码
      nickname: "", //昵称
      passwordConfirm: "", //确认密码
      activeState: "", //状态
      teamId: "",
      userId: "",
      account: "",
    }, //修改值
    batchNewArr: [], //批量删除的数据
    storeUserId: store.state.user.userId,
  });
  //用户列表
  const groupEvent = (row: any) => {
    state.title == "用户";
    state.groupModal = true;
    state.roleCode = row.userId;
    getRoleGroup(); //查询角色下角色表格
    getGroupList(); //查询角色下拉框
  };
  //获取所有的角色   下拉框
  const getGroupList = () => {
    let params = {
      pageNum: 1,
      pageSize: 1000,
      teamId: localStorage.getItem("engine-teamid"),
      userId: store.state.user.userId,
    };
    http.roleManage.queryRoleList(params).then((res: any) => {
      if (res.code == 0) {
        state.groupNameList = res.data.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //查询用户下的角色  表格
  const getRoleGroup = () => {
    let param = {
      teamId: localStorage.getItem("engine-teamid"),
      userId: state.roleCode,
    };
    http.userManagement.getRoleUsre(param).then((res: any) => {
      if (res.code == 0) {
        state.groupTableData = res.data.roles;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //给用户新增角色
  const insertRoleGroup = () => {
    if (state.groupName.length <= 0) {
      ElMessage.error("请选择角色");
    } else {
      let param = {
        allotId: state.roleCode,
        roleIds: state.groupName,
        teamId: localStorage.getItem("engine-teamid"),
        userId: store.state.user.userId,
      };
      http.userManagement.addRoleUser(param).then((res: any) => {
        if (res.code == 0) {
          ElMessage.success("操作成功");
          getRoleGroup();
          // getGroupList();
          state.groupName = [];
        } else {
          ElMessage.error(res.message);
        }
      });
    }
  };
  //删除用户下的角色
  const deleteRoleGroup = (row: any) => {
    let param = {
      allotId: state.roleCode,
      roleId: row.roleId,
      teamId: localStorage.getItem("engine-teamid"),
      userId: store.state.user.userId,
    };
    http.userManagement.clearForRole(param).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success("操作成功");
        getRoleGroup();
        // getGroupList();
      } else {
        ElMessage.error(res.message);
      }
    });
  };

  // 限制时间组件的方法
  const parseTime = (time: any, pattern: any) => {
    // if (arguments.length === 0 || !time) {
    //   return null;
    // }
    const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
    let date;
    if (typeof time === "object") {
      date = time;
    } else {
      if (typeof time === "string" && /^[0-9]+$/.test(time)) {
        time = parseInt(time);
      } else if (typeof time === "string") {
        time = time.replace(new RegExp(/-/gm), "/");
      }
      if (typeof time === "number" && time.toString().length === 10) {
        time = time * 1000;
      }
      date = new Date(time);
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay(),
    };
    const time_str = format.replace(
      /{(y|m|d|h|i|s|a)+}/g,
      (result: any, key: any) => {
        let value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === "a") {
          return ["日", "一", "二", "三", "四", "五", "六"][value];
        }
        if (result.length > 0 && value < 10) {
          value = "0" + value;
        }
        return value || 0;
      }
    );
    return time_str;
  };
  // 修改激活时间的数据
  const UnactivationTimeChange = (value: any) => {
    state.modifyActivationTime = value;
  };
  // 激活时间
  const activationTimeChange = (value: any) => {
    state.AddActivationTime = value;
  };
  const timeScope = () => {
    let ab = parseTime(
      new Date().setMinutes(new Date().getMinutes() + 1),
      "{hh}:{ii}:{ss}"
    );
    let timeArr = ab.split(":");
    return timeArr;
  };

  const disabledDate = (time: Date) => {
    const dateTime = new Date();
    const startDateTime = dateTime.setDate(dateTime.getDate() - 1);
    const endDateTime = dateTime.setDate(dateTime.getDate() + 30000); //30000为当前日期之后多少天
    return (
      time.getTime() < new Date(startDateTime).getTime() ||
      time.getTime() > new Date(endDateTime).getTime()
    );
  };
  const makeRange = (start: number, end: number) => {
    const result: number[] = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  };
  let times: any;
  const disabledHours = () => {
    times = timeScope();
    return makeRange(0, times[0] - 1);
  };
  const disabledMinutes = (hour: number) => {
    let minutes = Number(times[1]) - 1;
    return makeRange(0, minutes);
  };
  // 启用变禁用
  const confirmCloseUse = (row: any) => {
    let params = {
      activeState: "2",
      userId: row.userId,
    };
    http.userManagement.accountList(params).then((res) => {
      if (res.code == 0) {
        getData();
        ElMessage.success("禁用成功");
      }
    });
  };
  // 禁用变启用
  const confirmStartUse = (row: any) => {
    let params = {
      activeState: "1",
      userId: row.userId,
    };
    http.userManagement.accountList(params).then((res) => {
      if (res.code == 0) {
        getData();
        ElMessage.success("启用成功");
      }
    });
  };
  // 修改用户
  const update = (row: any) => {
    state.isHobby1 = true;
    state.title = "修改";
    state.ruleForm1 = JSON.parse(JSON.stringify(row));
    // state.modifyActivationTime = row.telephone;
    state.ruleForm1.nickname = row.name;
  };
  // 复选框选中
  const onSelectionChange = (selection: any) => {
    state.selectionList = selection;
  };
  // 批量删除
  const batchesDelete = () => {
    state.batchNewArr = [];
    let code: any;
    state.selectionList.forEach((item) => {
      state.batchNewArr.push(item.userId);
    });
    if (state.batchNewArr.length > 0) {
      let param = {
        userId: state.batchNewArr.toString(),
      };
      deleteForRole(param);
    } else {
      ElMessage.warning("请选择需要删除的账户");
    }
  };
  // 搜索
  const searchClick = () => {
    if (state.value1) {
      state.startDate = dateFormat(state.value1[0]);
      state.endDate = dateFormat(state.value1[1]);
    } else {
      state.startDate = "";
      state.endDate = "";
    }
    if (state.fitData || state.mechanism1 || state.mechanism2) {
      state.pageSize = 10;
      state.pageNum = 1;
    }
    getData();
  };
  // 查询角色
  const getRole = () => {};
  // 查询台网
  const getOrganization = () => {
    let userId = store.state.user.userId;
    http.staffManage.networkSelect(userId).then((res: any) => {
      if (res.code == 0) {
        state.mechanismArry = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 台网选择台站
  const changeDept = (v: any) => {
    state.ruleForm.teamId = v;
    let param = {
      networkId: v,
    };
    getDataList(param, state.storeUserId);
  };
  //获取台站列表
  const getDataList = (data: any, userIds: any) => {
    http.staffManage.stationSelect(data, userIds).then((res: any) => {
      if (res.code == 0) {
        state.mechanismList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //查询资产绑定人员
  const getAssetUserArry = () => {
    let params = {
      pageNum: 1,
      pageSize: 1000,
      status: 0,
      userId: store.state.user.userId,
    };
    http.userManagement.getAssetUser(params).then((res) => {
      if (res.code == 0) {
        state.assetUserArry = res.data.list;
      } else {
        ElMessage.error(res.message);
      }
    });
  };

  // 时间转化
  const dateFormat = (dateData: any) => {
    let date = new Date(dateData);
    let y = date.getFullYear();
    let m: any = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    let d: any = date.getDate();
    d = d < 10 ? "0" + d : d;
    const time = y + "-" + m + "-" + d;
    return time;
  };
  // 切换页码
  const pageChange = (pageNum: any) => {
    state.pageNum = pageNum;
    getData();
  };
  // 分页大小
  const sizeChange = (pageSize: any) => {
    state.pageSize = pageSize;
    getData();
  };
  // 查询用户列表
  const getData = () => {
    let params = {
      pageNum: state.pageNum,
      pageSize: state.pageSize,
      startDate: state.startDate,
      endDate: state.endDate,
      account: state.fitData,
      stationId: state.mechanism2, //台站
      networkId: state.mechanism1, //台网
      teamId: localStorage.getItem("engine-teamid"),
      userId: store.state.user.userId,
    };
    http.userManagement.queryUserRoleList(params).then((res) => {
      if (res.code == 0) {
        if (res.data.length == 0) {
          state.linkageData = res.data;
          state.total = 0;
        } else {
          state.total = res.data.total;
          state.linkageData = res.data.list;
          if (state.linkageData) {
            state.linkageData.forEach((item: any) => {
              item.createTime = utils.formatDate(item.createTime, 0);
              if (item.status == 0) {
                item.statusU = "禁用";
              } else if (item.status == 1) {
                item.statusU = "启用";
              }
              if (!item.stationName) {
                item.stationName = "/";
              }
            });
          }
        }
      } else {
        ElMessage.error(res.message);
      }
    });
  };

  // 取消弹窗
  const cancel = () => {
    if (state.title == "新增") {
      state.isHobby = false;
      state.AddActivationTime = "";
      state.ruleForm.userName = "";
      state.ruleForm.userPass = "";
      state.ruleForm.userPass1 = "";
      // state.ruleForm.teamId = "";
      // state.ruleForm.deptId = "";
      state.ruleForm.assetUser = "";
      // state.ruleForm.nickname = "";
    } else if (state.title == "修改") {
      state.modifyActivationTime = "";
      state.isHobby1 = false;
      state.ruleForm1.nickname = "";
      state.ruleForm1.password = "";
      state.ruleForm1.passwordConfirm = "";
    } else if (state.title == "用户") {
      state.groupModal = false;
      state.groupName = [];
    }
  };
  // 新增
  const commit = () => {
    state.isHobby = true;
    state.title = "新增";
    state.AddActivationTime = "";
    state.ruleForm.userName = "";
    state.ruleForm.userPass = "";
    state.ruleForm.userPass1 = "";
    // state.ruleForm.teamId = "";
    // state.ruleForm.deptId = "";
    state.ruleForm.assetUser = "";
    // state.ruleForm.nickname = "";
    getAssetUserArry();
  };
  // 确认弹窗
  const confirm = () => {
    if (state.title == "新增") {
      const reg = /^[a-zA-Z][a-zA-Z0-9]{5,19}$/;
      if (reg.test(state.ruleForm.userName) == false) {
        state.ruleForm.userName = "";
        ElMessage.warning("用户名只支持字母开头的6-20位纯字母和数字组合");
        return false;
      }
      if (!state.ruleForm.userPass) {
        ElMessage.warning("密码不能为空");
        state.ruleForm.userPass = "";
        return false;
      }
      // if (!state.ruleForm.teamId) {
      //   ElMessage.warning("台网不能为空");
      //   state.ruleForm.teamId = "";
      //   return false;
      // }
      if (state.ruleForm.userPass != state.ruleForm.userPass1) {
        ElMessage.warning("两次输入的密码不一致请重新输入");
        state.ruleForm.userPass1 = "";
        return false;
      }
      if (!state.ruleForm.assetUser) {
        ElMessage.warning("绑定人员不能为空");
        state.ruleForm.assetUser = "";
        return false;
      }
      let params = {
        teamId: localStorage.getItem("engine-teamid"),
        // nickName: state.ruleForm.nickname,
        userName: state.ruleForm.userName,
        userPass: md5(state.ruleForm.userPass),
        // mainDeptId: state.ruleForm.teamId, //台网
        // deptId: state.ruleForm.deptId, //台站
        assetUserId: state.ruleForm.assetUser,
        userId: store.state.user.userId,
      };
      http.userManagement.addUserList(params).then((res: any) => {
        if (res.code == 0) {
          state.isHobby = false;
          getData();
          ElMessage.success("新增成功");
        } else {
          ElMessage.error(res.message);
        }
      });
    } else {
      if (!state.ruleForm1.nickname) {
        ElMessage.warning("昵称不能为空");
      } else if (!state.ruleForm1.password) {
        ElMessage.warning("修改密码");
      } else if (!state.ruleForm1.passwordConfirm) {
        ElMessage.warning("确认密码");
      } else if (state.ruleForm1.password != state.ruleForm1.passwordConfirm) {
        ElMessage.warning("两次输入的密码不一致请重新输入");
        state.ruleForm1.passwordConfirm = "";
      } else {
        let params = {
          nickName: state.ruleForm1.nickname,
          teamId: state.ruleForm1.teamId,
          userId: state.ruleForm1.userId,
          account: state.ruleForm1.account,
          newPwd: state.ruleForm1.password,
          confirmPwd: state.ruleForm1.passwordConfirm,
        };
        http.userManagement.updataUserList(params).then((res) => {
          if (res.code == 0) {
            state.isHobby1 = false;
            getData();
            ElMessage.success("修改成功");
          } else {
            ElMessage.error(res.message);
          }
        });
      }
    }
  };

  // 确认删除
  const confirmDelete = (row: any) => {
    let param = row.userId;
    deleteForRole(param);
  };
  // 删除接口
  const deleteForRole = (params: any) => {
    http.userManagement.deleteUserList(params).then((res) => {
      if (res.code == 0) {
        getData();
        ElMessage.success("删除成功");
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  onMounted(() => {
    init().then((res) => {});
  });
  const init = async () => {
    getData(); // 查询用户列表
    await getOrganization(); //查询台网
    await getDataList({ networkId: "" }, state.storeUserId); //获取台站列表
  };
  return {
    state,
    groupEvent,
    insertRoleGroup,
    deleteRoleGroup,
    confirmCloseUse,
    confirmStartUse,
    update,
    onSelectionChange,
    batchesDelete,
    searchClick,
    getRole,
    changeDept,
    pageChange,
    sizeChange,
    cancel,
    commit,
    confirm,
    confirmDelete,
  };
};
