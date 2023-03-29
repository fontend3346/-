import { onMounted, ref, reactive, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import http from "@/api/index";
export const useHandler = () => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  const state = reactive({
    defaultProps: {
      children: "children",
      label: "name",
    }, //tree结构
    defaultExpandedKeys: [], //选中值
    dataList: [], //树
    columns: [
      {
        prop: "name",
        label: "资源名称",
      },
      {
        prop: "desc",
        label: "资源描述",
      },

      {
        prop: "url",
        label: "资源链接",
      },
    ], //树标题
    tableData: [], //树数据
    isModal: false, //修改弹出框
    title: "新建", //弹框标题
    currentObj: "", //当前选中

    name: "", //资源名称
    url: "", //资源路径
    desc: "", //资源描述
    draggingNode: "", //被拖拽的目标
    dropNode: "", //拖拽到的目标
    dropType: "", //拖拽方式

    code: "", //资源编码 更新id
    menuTitle: "菜单列表",
    sourceType: "menu", //列表类型
    requestList: [
      {
        id: 1,
        label: "GET",
        value: "GET",
      },
      {
        id: 2,
        label: "POST",
        value: "POST",
      },
      {
        id: 3,
        label: "PUT",
        value: "PUT",
      },
      {
        id: 4,
        label: "DELETE",
        value: "DELETE",
      },
    ],
  });
  //列表切换
  const changeList = () => {
    if (state.menuTitle == "菜单列表") {
      state.menuTitle = "API列表";
      state.sourceType = "api";
      state.columns[1].label = "请求类型";
    } else if (state.menuTitle == "API列表") {
      state.menuTitle = "菜单列表";
      state.sourceType = "menu";
      state.columns[1].label = "资源描述";
    }
    getData();
  };
  //拖拽事件
  const handleDrop = (draggingNode: any, dropNode: any, dropType: any) => {
    draggingNode = draggingNode.data.code;
    dropNode = dropNode.data;
    dropType = dropType;
    let param = {
      code: draggingNode,
      resourcesDto: { ...dropNode },
      type: dropType,
    };
    http.systemResourceManage.updateResourceManage(param).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success("更新成功");
        getData();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //获取树结构
  const getData = () => {
    let param = {
      resourceType: state.sourceType,
    };
    http.systemResourceManage.selectResourceInfo(param).then((res: any) => {
      if (res.code == 0) {
        state.dataList = res.data;
        state.tableData = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //目录列表点击事件
  const handleNodeClick = (data: any) => {
    state.currentObj = data.resourceId;
    if (data.children != null) {
      state.tableData = data.children;
    } else {
      state.tableData = [data];
    }
  };
  //新建
  const addNode = () => {
    state.isModal = true;
    state.title = "新建";
    state.name = "";
    state.url = "";
    state.desc = "";
  };
  //修改
  const update = (row: any) => {
    state.isModal = true;
    state.title = "更新";
    state.name = row.name;
    state.url = row.url;
    state.desc = row.desc;
    state.code = row.code;
  };
  //确认
  const confirm = () => {
    if (state.name == "") {
      ElMessage.warning("请填写资源名称");
    } else if (state.url == "") {
      ElMessage.warning("请填写资源路径");
    } else {
      if (state.title == "新建") {
        let param = {
          desc: state.desc,
          name: state.name,
          url: state.url,
          parentId: state.currentObj,
          visibility: 0,
          resourceType: state.sourceType,
        };
        http.systemResourceManage.insertResourceInfo(param).then((res: any) => {
          if (res.code == 0) {
            ElMessage.success("添加成功");
            getData();
            state.isModal = false;
            state.currentObj = "";
          } else {
            ElMessage.error(res.message);
          }
        });
      } else if (state.title == "更新") {
        let param = {
          code: state.code,
          desc: state.desc,
          name: state.name,
          url: state.url,
          sort: 0,
          visibility: 0,
          resourceType: state.sourceType,
        };
        http.systemResourceManage.updateResourceInfo(param).then((res: any) => {
          if (res.code == 0) {
            ElMessage.success("更新成功");
            getData();
            state.isModal = false;
          } else {
            ElMessage.error(res.message);
          }
        });
      }
    }
  };
  //删除
  const confirmDelete = (row: any) => {
    let param = {
      code: row.code,
      status: 0,
      resourceType: state.sourceType,
    };
    http.systemResourceManage.deleteResourceInfo(param).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success("删除成功");
        getData();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  const cancel = () => {
    state.isModal = false;
  };
  onMounted(() => {
    getData();
  });
  return {
    state,
    changeList,
    handleDrop,
    getData,
    handleNodeClick,
    addNode,
    update,
    confirm,
    confirmDelete,
    cancel,
  };
};
