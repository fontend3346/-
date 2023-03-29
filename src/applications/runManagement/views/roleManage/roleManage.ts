import { onMounted, ref, reactive, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import utils from "@/utils/utils";
import http from "@/api";
import store from "@/store";
export const useHandler = () => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  const state = reactive({
    remark: "角色管理是天基授权管理服务的",
    pageTotal: 10, //总条数
    pageSize: 10, //分页尺寸
    pageNum: 1, //当前页
    title: "新增", //标题
    showAdd: false, //新增弹框
    userLevel: [], //角色级别
    showUserLevel: true, //角色是否显示
    roleVisibilityList: [
      {
        label: "超管私有的",
        value: 0,
      },
      {
        label: "团队间共享的",
        value: 2,
      },
      {
        label: "团队私有的",
        value: 4,
      },
    ], //角色可见性jn
    roleLevelList: [
      {
        label: "管理员",
        value: 3,
      },
      {
        label: "办公室主任",
        value: 5,
      },
      {
        label: "值班人员",
        value: 7,
      },
      {
        label: "普通用户",
        value: 9,
      },
    ], //角色等级
    limitRangeList: [
      {
        label: "普通权限",
        value: "普通权限",
      },
      {
        label: "管理员权限",
        value: "管理员权限",
      },
      {
        label: "超级管理员权限",
        value: "超级管理员权限",
      },
    ], //权限列表
    statusList: [
      {
        label: "正常",
        value: 1,
      },
      {
        label: "删除",
        value: 0,
      },
    ], //角色状态列表
    // table
    tableData: [], //表格数据
    columns: [
      {
        prop: "roleName",
        label: "角色名称",
      },
      {
        prop: "gmtCreate",
        label: "创建时间",
      },
      {
        prop: "roleDesc",
        label: "角色描述",
      },
    ], //表头
    roleName: "", //角色名称
    roleName1: "", //搜索的角色名称
    selectionList: [], //批量删除
    roleCode: "", //角色编码
    limitModal: false, //权限弹出框
    // groupModal: false, //群组弹框
    group: "", //群组
    groupList: [], //群组列表
    limitRange: "", //权限
    limitTableData: [], //权限数据
    ruleForm: {},

    //新权限
    limitList: [], //全部的权限
    limitsValue: [], //已经有的权限
    disposeBefore: [],
  });
  //查询列表
  const getData = () => {
    let params = {
      roleName: state.roleName1,
      pageNum: state.pageNum,
      pageSize: state.pageSize,
      teamId: localStorage.getItem("engine-teamid"),
      userId: store.state.user.userId,
    };

    // params.roleName = state.roleName1;
    http.roleManage.queryRoleList(params).then((res: any) => {
      if (res.code == 0) {
        state.tableData = res.data.data;
        state.tableData.map((item: any) => {
          item.gmtCreate = utils.formatDate(item.gmtCreate, 0);
        });
        state.pageTotal = res.data.total;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //查询权限列表
  const getAuthoritiesList = () => {
    let params = {
      page: 1,
      limit: 100,
    };
    http.authorityLimit.getList(params).then((res: any) => {
      if (res.code == 0) {
        state.limitRangeList = res.data.list;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //点击搜索
  const search = () => {
    if (state.roleName1) {
      state.pageSize = 10;
      state.pageNum = 1;
    }
    getData();
  };
  //删除接口
  const deleteForRole = (params: any) => {
    http.roleManage.deleteForRole(params).then((res: any) => {
      if (res.code == 0) {
        getData();
        ElMessage.success("删除成功");
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //批量删除
  const batchesDelete = () => {
    if (state.selectionList.length == 0) {
      ElMessage.error("请选择");
    } else {
      let newArr = [] as any[];
      state.selectionList.map((item: any) => {
        newArr.push(item.roleCode);
      });
      let param = {
        ids: newArr.toString(),
      };
      deleteForRole(param);
    }
  };
  //确认删除
  const confirmDelete = (row: any) => {
    let param = {
      ids: row.roleCode,
    };
    deleteForRole(param);
  };
  // 提交表单
  const confirm = (form: any) => {
    if (state.title == "新增") {
      if (form.roleName == "") {
        ElMessage.error("请填写角色名称");
      } else {
        let params = {
          appKey: "XUJrK8DITuMApg9Myt1hQdS5jxf3luuE", //暂时写死
          roleName: form.roleName,
          roleDesc: form.roleDes,
          // roleVisibility: form.roleVisibility,
          // roleLevel: form.roleLevel,
          roleTeamId: "0",
          roleLevel: form.roleLevel,
        };
        http.roleManage.createRoles(params).then((res: any) => {
          if (res.code == 0) {
            getData();
            ElMessage.success("新建成功");
          } else {
            ElMessage.error(res.message);
          }
        });
      }
    } else if (state.title == "修改") {
      let params = {
        appKey: "XUJrK8DITuMApg9Myt1hQdS5jxf3luuE", //！暂时写死
        roleName: form.roleName,
        roleCode: form.roleCode,
        roleDesc: form.roleDes,
        status: form.status,
        roleLevel: form.roleLevel,
      };
      http.roleManage.updateRoles(params).then((res: any) => {
        if (res.code == 0) {
          ElMessage.success("修改成功");
          getData();
        } else {
          ElMessage.error(res.message);
        }
      });
    }
    state.showAdd = false;
  };
  //修改任务
  const update = (row: any) => {
    state.showAdd = true;
    state.title = "修改";
    state.showUserLevel = false;
    state.ruleForm.roleName = row.roleName;
    state.ruleForm.roleCode = row.roleCode;
    state.ruleForm.roleDes = row.roleDesc;
    state.ruleForm.roleLevel = row.roleLevel;
    // state.ruleForm.status = row.status;
  };
  // 取消弹出框
  const cancel = () => {
    // state.groupModal = false;
    state.limitModal = false;
    state.showAdd = false;
    state.ruleForm.roleName = "";
    // state.ruleForm.roleCode = "";
    state.ruleForm.roleDes = "";
    state.ruleForm.roleLevel = "";
    state.ruleForm.roleVisibility = "";
  };
  // 新增配置
  const addConfig = () => {
    state.title = "新增";
    state.showAdd = true;
    state.ruleForm.roleName = "";
    // state.ruleForm.roleCode = "";
    state.ruleForm.roleDes = "";
    state.ruleForm.roleLevel = "";
    state.ruleForm.roleVisibility = "";
    state.showUserLevel = true;
  };
  //角色级别
  const getRolesByUserLevel = () => {
    http.roleManage.rolesByUserLevel().then((res: any) => {
      if (res.code == 0) {
        state.userLevel = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //权限
  const limit = (row: any) => {
    state.limitModal = true;
    state.roleCode = row.roleCode;
    // state.roleName = row.roleName;
    // getAuthoritiesList();
    getRoleLimit();
  };
  //查询角色下权限
  const getRoleLimit = () => {
    let param = {
      pageSize: 10000,
      pageNum: 1,
      roleCode: state.roleCode,
    };
    http.roleManage.getRolesAuthorityInfo(param).then((res: any) => {
      if (res.code == 0) {
        let arr: any = [];
        let arrCheck: any = [];
        state.disposeBefore = res.data.list;
        res.data.list.forEach((item: any) => {
          if (item.isAdded == 1) {
            arrCheck.push(item.authorityCode);
          }
          let obj = {
            label: item.authorityName,
            key: item.authorityCode,
          };
          arr.push(obj);
        });
        state.limitTableData = arr;
        state.limitsValue = arrCheck;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  const confirmLimit = () => {
    let param = {
      authoeityCodeList: state.limitsValue,
      roleCode: state.roleCode,
    };
    http.roleManage.insertRolesAuthority(param).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success("操作成功");
        state.limitModal = false;
        getRoleLimit();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //复选框选中
  const onSelectionChange = (selection: any) => {
    state.selectionList = selection;
  };
  // 改变分页尺寸
  const handleSizeChange = (obj: any) => {
    state.pageSize = obj;
    getData();
  };
  // 换页
  const handleNumChange = (obj: any) => {
    state.pageNum = obj;
    getData();
  };
  onMounted(() => {
    getData();
    getRolesByUserLevel();
  });
  return {
    state,
    search,
    batchesDelete,
    confirmDelete,
    confirm,
    update,
    cancel,
    addConfig,
    limit,
    confirmLimit,
    onSelectionChange,
    handleSizeChange,
    handleNumChange,
  };
};
