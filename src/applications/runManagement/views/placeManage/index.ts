import { onMounted, ref, reactive, getCurrentInstance, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import http from "@/api/index";
import utils from "@/utils/utils";
export const useHandler = () => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  const state: any = reactive({
    pointName: "", // 观测场地名称
    placeId: "", // 观测场地ID
    selectNetwork: "", // 台网
    selectNetList: [], // 台网列表
    stationArray: "", //台阵
    stationArrayList: [], //台阵列表
    stationChild: "", //台站
    stationChildList: [], //台站列表
    selectionList: [], //批量数据
    total: 10, //总条数
    pageSize: 10, //分页尺寸
    pageNum: 1, //当前页
    title: "新增",
    showAdd: false, //新增 / 修改弹框
    dynamicBtnName: [
      { value: "编辑", label: "编辑" },
      { value: "启用", label: "启用" },
    ], //动态按钮名
    linkageColumns: [
      {
        prop: "name",
        label: "场地名称",
      },
      {
        prop: "description",
        label: "场地描述",
      },
      {
        prop: "statusName",
        label: "状态",
      },
      {
        prop: "onTime",
        label: "启用时间",
      },

      {
        prop: "offTime",
        label: "禁用时间",
      },
    ], //表头
    linkageData: [], //表格数据
    editData: {
      unitId: "", // 台网ID
      stationId: "", // 台站ID,
      name: "", // 场地名称
      description: "", // 场地描述
      placeId: "", // 场地ID
      status: "", // 状态
    }, //新增、修改数据
    editstationChildList: [], //新增/编辑 台站下拉框列表
    editBtn: false, // 编辑按钮
    placeName: "", // 观测场地
    loading: false, // 模糊查询加载
    placesList: [], // 模糊查询选项列表
  });

  onMounted(() => {
    init().then((res) => {});
  });
  // 切换页
  const pageChange = (pageNum: any) => {
    state.pageNum = pageNum;
    getList();
  };
  //分页大小
  const sizeChange = (pageSize: any) => {
    state.pageSize = pageSize;
    getList();
  };

  // 取消弹出框
  const cancel = () => {
    state.showAdd = false;
  };

  // 查询按钮
  const getList = () => {
    let params = {
      stationId: state.stationArray, //台站ID
      pageNum: state.pageNum,
      pageSize: state.pageSize,
      id: state.placeId, // 观测场地ID
      networkId: state.selectNetwork,
    };
    http.placeManage.getPlaces(params).then((res: any) => {
      if (res.code == 0) {
        // 时间格式化 状态
        res.data.list.forEach((item: any) => {
          item.onTime = item.onTime ? utils.formatDate(item.onTime, 0) : "";
          item.offTime = item.offTime ? utils.formatDate(item.offTime, 0) : "";
          // item.status  1代表启用，0代表禁用
          if (item.status == 1) {
            item.statusName = "启用";
            state.dynamicBtnName = [{ value: "禁用", label: "禁用" }];
          } else if (item.status == 0) {
            item.statusName = "禁用";
            state.dynamicBtnName = [
              { value: "编辑", label: "编辑" },
              { value: "启用", label: "启用" },
            ];
          }
        });
        state.linkageData = res.data.list;
        state.total = res.data.total;
      } else {
        ElMessage.error(res.message);
      }
    });
  };

  // 观测场地状态变化
  const statusChange = (status: Number, params: any) => {
    // status == 1 进行禁用操作，status == 0 进行启用操作
    if (status == 1) {
      http.placeManage.disablePlaces(params).then((res: any) => {
        if (res.code == 0) {
          ElMessage.success(res.message);
          getList();
        } else {
          ElMessage.error(res.message);
        }
      });
    } else if (status == 0) {
      http.placeManage.enablePlaces(params).then((res: any) => {
        if (res.code == 0) {
          ElMessage.success(res.message);
          getList();
        } else {
          ElMessage.error(res.message);
        }
      });
    }
  };

  // 全选
  const onSelectAll = (selectionAll: any) => {
    state.selectionList = selectionAll;
  };
  // 单选
  const select = (selection: any) => {
    state.selectionList = selection;
  };

  // 确认删除(单独删除)
  const confirmDelete = (row: any) => {
    let params = {
      id: row.placeId,
    };
    deletePlace(params);
  };
  // 单独删除接口
  const deletePlace = (params: any) => {
    http.placeManage.deletePlaces(params).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success(res.message);
        getList();
      } else {
        ElMessage.error(res.message);
      }
    });
  };

  //添加 新建
  const addConfig = () => {
    state.title = "新增";
    state.showAdd = true;
    state.editData = {
      unitId: "", // 台网ID
      stationId: "", // 台站ID,
      name: "", // 场地名称
      description: "", // 场地描述
      placeId: "", // 场地ID
      status: "", // 状态
    };
    // let params = {
    //   unitId: "",
    //   stationTypeId: "",
    // };
    // editSelectStation(params);
  };
  //编辑
  const editItem = (row: any) => {
    state.title = "编辑";
    state.showAdd = true;
    state.editData.unitId = row.unitId;
    editStationChange(row.unitId);
    state.editData.stationId = row.stationId;
    state.editData.name = row.name;
    state.editData.description = row.description;
    state.editData.placeId = row.placeId;
    state.editData.status = row.status;
  };

  //新建、编辑弹窗查询台站列表
  const editSelectStation = (params: any) => {
    http.stationsInfoManage.getStationsEarth(params).then((res: any) => {
      if (res.code == 0) {
        state.editstationChildList = res.data;
      } else {
        ElMessage({
          message: res.message,
          type: "error",
        });
      }
    });
  };
  //新建、编辑弹窗，台网选择后查询台站
  const editStationChange = (val: any) => {
    state.editData.stationId = "";
    let params = {
      name: "",
      networkId: val,
      pageNum: 1,
      pageSize: 10000,
    };
    http.instrumentRegistration.getSelectStation(params).then((res: any) => {
      if (res.code == 0) {
        state.editstationChildList = res.data.list;
      } else {
        ElMessage({
          message: res.message,
          type: "error",
        });
      }
    });
  };

  //确认新建 / 编辑
  const confirmEdit = () => {
    if (!state.editData.unitId) {
      ElMessage.error("请选择台网！");
      return;
    }
    if (!state.editData.stationId) {
      ElMessage.error("请选择台站！");
      return;
    }
    if (!state.editData.name) {
      ElMessage.error("场地名称不能为空！");
      return;
    }
    if (state.title == "编辑") {
      let params = {
        name: state.editData.name,
        stationId: state.editData.stationId,
        unitId: state.editData.unitId,
        description: state.editData.description,
        placeId: state.editData.placeId,
        status: state.editData.status,
      };
      editPlaces(params);
    } else if (state.title == "新增") {
      let params = state.editData;
      addPlaces(params);
    }
  };

  //编辑接口
  const editPlaces = (params: object) => {
    http.placeManage.editPlaces(params).then((res: any) => {
      if (res.code == 0) {
        state.showAdd = false;
        ElMessage.success(res.message);
        getList();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //新增接口
  const addPlaces = (params: object) => {
    http.placeManage.addPlaces(params).then((res: any) => {
      if (res.code == 0) {
        state.showAdd = false;
        ElMessage.success(res.message);
        getList();
      } else {
        ElMessage.error(res.message);
      }
    });
  };

  // 获取台网列表
  const getProvince = () => {
    http.stationsInfoManage.getCountry().then((res: any) => {
      if (res.code == 0) {
        state.selectNetList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
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
      if (res.code == 0) {
        state.stationChildList = res.data;
      } else {
        ElMessage({
          message: res.message,
          type: "error",
        });
      }
    });
  };
  //台网改变事件
  const networkChange = (val: any) => {
    // 点击台网查询台站
    let data = {
      networkId: val,
    };
    state.stationArray = null;
    stationsTotal(data); // 点击台网查询子台站
  };
  // 观测场地模糊查询
  const remoteMethodPlace = (query: string) => {
    if (query) {
      setTimeout(() => {
        state.placesList = state.linkageData.filter((item: any) => {
          return item.name.includes(query);
        });
      }, 200);
    } else {
      state.placesList = [];
    }
  };
  const init = async () => {
    getList(); // 查询表格数据
    await getProvince(); // 台网
    await getStations(); // 台站
  };
  return {
    state,
    init,
    pageChange,
    sizeChange,
    cancel,
    getList,
    statusChange,
    onSelectAll,
    select,
    confirmDelete,
    deletePlace,
    addConfig,
    editItem,
    editSelectStation,
    editStationChange,
    confirmEdit,
    getProvince,
    getStations,
    stationsTotal,
    networkChange,
    remoteMethodPlace,
  };
};
