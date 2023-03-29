import http from "@/api";
import store from "@/store";
import { ElMessage } from "element-plus";
import {
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  nextTick,
  ref,
} from "vue";
import utils from "@/utils/utils";

export const useHandler = () => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  let treeMenu = ref("");
  let treeApi = ref("");
  const state = reactive({
    menuTitle: "菜单列表", //切换名称
    //权限名称code
    authoritiesCode: "",
    showLimitLevel: true, //权限级别是否显示
    limitLevel: [], //权限级别
    //树结构数据
    defaultProps: {
      children: "children",
      label: "name",
    },
    checkedKeysMenu: [], //选择数据
    checkedKeysApi: [], //选择数据
    // currCode: "", //节点数据
    //数目
    dataListMenu: [], //菜单树
    dataListApi: [], //API树
    //资源
    limitTitle: "资源管理",
    //资源管理弹窗
    showLimit: false,
    /* 分页的数据 */
    total: 10,
    pageSize: 10,
    pageNum: 1,
    fitData: "", //权限名称

    title: "创建权限",
    showAdd: false, //新增弹框

    ruleForm: {
      name: "", //名称
      desc: "", //备注
      code: "", //编号  //修改时候这个相当于id
      roleLevel: "", //类型
      // type: 0, //类型
      // status: 1, //修改
    }, // 虚拟数据
    linkageColumns: [
      {
        prop: "authoritiesName",
        label: "权限名称",
      },
      {
        prop: "gmtCreate",
        label: "创建时间",
      },
      {
        prop: "authoritiesDesc",
        label: "备注",
      },
    ], // table栏
    linkageData: [], // table数据

    createArrMenu: [], //添加code的数组
    createArrApi: [], //添加code的数组
    parentIdMenu: [], //父节点的id数组
    childrenArrMenu: [], //子节点的id数组
    parentIdArrApi: [], //父节点的id数组
    childrenArrArrApi: [], //子节点的id数组

    codeArray: [], //批量删除的code
    selectionList: [], //批量数据
    allArr: [], //合并menu和api
  });
  onMounted(() => {
    getJulist();
    getRolesByUserLevel();
  });
  //资源添加按钮
  const getCheckedNodes = () => {
    // state.createArrMenu = treeMenu.value.getCheckedKeys(); //true的时候只返回子节点的id数组  默认false
    // state.createArrApi = treeApi.value.getCheckedKeys(); //true的时候只返回子节点的id数组  默认false
    state.parentIdMenu = treeMenu.value.getHalfCheckedKeys(); //Menu最外层code
    state.childrenArrMenu = treeMenu.value.getCheckedKeys(); //Menu选中的code
    state.createArrMenu = state.childrenArrMenu //Menu选中？加上Menu最外层code    没选中  直接给没选中的code
      ? state.parentIdMenu.concat(state.childrenArrMenu)
      : state.childrenArrMenu;

    state.parentIdArrApi = treeApi.value.getHalfCheckedKeys();
    state.childrenArrArrApi = treeApi.value.getCheckedKeys();
    state.createArrApi = state.parentIdArrApi
      ? state.parentIdArrApi.concat(state.childrenArrArrApi)
      : state.parentIdArrApi;

    state.allArr = [];
    state.allArr = state.createArrMenu.concat(state.createArrApi); //Menu + Api
    let parmas = {
      authorityCode: state.authoritiesCode,
      resourceCodeList: state.allArr,
    };
    http.authorityLimit.createSource(parmas).then((res: any) => {
      if (res.code == 0) {
        getData();
        ElMessage.success("保存成功！");
      } else {
        ElMessage.error(res.message);
      }
    });
    state.showLimit = false;
  };

  //资源取消按钮
  const cancelLimit = () => {
    state.showLimit = false;
  };
  //点击资源事件
  const sourceManage = (row: any) => {
    // if (row.authoritiesCode == "29ua4cZVKNZmqJf7bHsHo") {
    //   ElMessage.info("暂无权限查看资源");
    //   return;
    // }
    state.showLimit = true;
    state.authoritiesCode = row.authoritiesCode;
    state.checkedKeysMenu = [];
    state.checkedKeysApi = [];
    state.createArrMenu = [];
    state.createArrApi = [];
    //树结构
    getData();
  };
  //获取树结构
  const getData = () => {
    let param = {
      authorityCode: state.authoritiesCode,
    };
    http.authorityLimit.getSource(param).then((res: any) => {
      if (res.code == 0) {
        state.dataListMenu = res.data.menu;
        state.dataListApi = res.data.api;
        forListMenu(state.dataListMenu);
        forListApi(state.dataListApi);
      }
    });
  };
  // //遍历方法
  const forListMenu = (data: any) => {
    nextTick(() => {
      data.map((item: any) => {
        if (item.isAllotted) {
          state.checkedKeysMenu.push(item.code);
          treeMenu.value.setCheckedKeys(state.checkedKeysMenu); //获取已经设置的资源后渲染
        }
        if (item.children != null) {
          forListMenu(item.children);
        }
      });
    });
  };
  // //遍历方法
  const forListApi = (data: any) => {
    nextTick(() => {
      data.map((item: any) => {
        if (item.isAllotted) {
          state.checkedKeysApi.push(item.code);
          treeApi.value.setCheckedKeys(state.checkedKeysApi); //获取已经设置的资源后渲染
        }
        if (item.children != null) {
          forListApi(item.children);
        }
      });
    });
  };
  //渲染权限列表
  const getJulist = () => {
    let params = {
      page: state.pageNum,
      limit: state.pageSize,
      name: state.fitData,
    };
    http.authorityLimit.getList(params).then((res: any) => {
      if (res.code == 0) {
        state.linkageData = res.data.list;
        state.total = res.data.total;
        state.linkageData.forEach((item: any) => {
          item.gmtCreate = utils.formatDate(item.gmtCreate, 0);
        });
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //搜索名字
  const searchName = () => {
    getJulist();
  };
  // 新增权限列表
  const confirm = (data: any) => {
    //新增
    if (state.title == "创建权限") {
      if (!state.ruleForm.name) {
        ElMessage.error("权限名称不能为空");
      } else {
        state.showAdd = false;

        let parmas = {
          name: data.name,
          desc: data.desc,
          type: data.roleLevel,
          // userId: store.state.user.userId,
        };
        http.authorityLimit
          .createList(data.name, data.desc, data.roleLevel)
          .then((res: any) => {
            if (res.code == 0) {
              getJulist();
              ElMessage.success("添加权限成功");
            } else {
              ElMessage.error("添加权限失败");
            }
          });
      }
    }
    //修改
    if (state.title == "修改") {
      if (!state.ruleForm.name) {
        ElMessage.error("权限名称不能为空");
      } else {
        state.showAdd = false;
        let parmas = {
          code: data.code, //备注
          name: data.name,
          desc: data.desc,
        };
        http.authorityLimit.updateList(parmas).then((res: any) => {
          if (res.code == 0) {
            ElMessage.success("修改成功");
            getJulist();
          } else {
            ElMessage.error(res.message);
          }
        });
      }
    }
  };
  //修改权限列表
  const update = (row: any) => {
    state.showAdd = true;
    state.title = "修改";
    state.showLimitLevel = false;
    state.ruleForm.name = row.authoritiesName;
    state.ruleForm.code = row.authoritiesCode;
    state.ruleForm.desc = row.authoritiesDesc;
  };
  //获取权限级别
  const getRolesByUserLevel = () => {
    http.authorityLimit.rolesByUserLevel().then((res: any) => {
      if (res.code == 0) {
        state.limitLevel = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 取消弹出框
  const cancel = () => {
    state.showAdd = false;
    state.title = "创建权限";
    state.ruleForm.name = "";
    state.ruleForm.code = "";
    state.ruleForm.desc = "";
  };
  // 新增配置
  const addConfig = () => {
    state.showAdd = true;
    state.showLimitLevel = true;
    state.ruleForm.name = "";
    state.ruleForm.code = "";
    state.ruleForm.desc = "";
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
  //全选
  const onSelectAll = (selection: any) => {
    state.selectionList = selection;
  };
  //批量删除
  const deleteBatch = () => {
    state.selectionList.map((item: any) => {
      state.codeArray.push(item.authoritiesCode);
    });
    if (state.codeArray.length > 0) {
      let params = {
        codeArray: state.codeArray.toString(),
      };
      http.authorityLimit.batchList(params).then((res: any) => {
        if (res.code == 0) {
          ElMessage.success("删除成功！");
          getJulist();
        } else {
          ElMessage.error(res.message);
        }
      });
      state.codeArray = [];
    } else {
      ElMessage.warning("请选择需要删除的数据");
    }
  };

  //删除列表
  const confirmDelete = (delData: any) => {
    let data = {
      codeArray: delData.authoritiesCode,
    };
    http.authorityLimit.batchList(data).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success("删除成功");
        getJulist();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  return {
    state,
    treeMenu,
    treeApi,
    getCheckedNodes,
    cancelLimit,
    sourceManage,
    searchName,
    confirm,
    update,
    getRolesByUserLevel,
    cancel,
    addConfig,
    pageChange,
    sizeChange,
    onSelectAll,
    deleteBatch,
    confirmDelete,
  };
};
