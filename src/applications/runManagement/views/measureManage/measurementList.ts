import { onMounted, ref, reactive, getCurrentInstance, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import http from "@/api/index";
const router = useRouter();
export const useHandler = () => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  // 返回
  const backConfig = () => {
    emit("backConfig");
  };
  const state = reactive({
    pointName: "", // 测点名称
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
    dynamicBtnName: [{ value: "编辑", label: "编辑" }], //动态按钮名
    linkageColumns: [
      {
        prop: "name",
        label: "测点名称",
      },

      {
        prop: "networkname",
        label: "台网",
      },
      {
        prop: "stationname",
        label: "台站",
      },

      {
        prop: "latitude",
        label: "纬度",
      },
      {
        prop: "longitude",
        label: "经度",
      },
      {
        prop: "elevation",
        label: "高程",
      },
      {
        prop: "code",
        label: "编码",
      },
    ], //表头
    linkageData: [], //表格数据
    editData: {
      name: "",
      code: "",
      stationId: "",
      longitude: "",
      latitude: "",
      elevation: "",
    }, //新增、修改数据
    updateId: "",
    // 详情弹框
    detailModal: false,  //详情弹框
    addRecord: false,   //添加维修记录弹框
    apparatuName: '',   //仪器名称
    apparatuType: null,  //维护类型
    apparatuTime: null,  //维护时间
    apparatuContent: '',   //维护内容
    apparatuStaff: '',  //维修人
    apparatuOrg: null,  //维修机构
    recordArr: [     //维修记录字段
      {
        label: '仪器名称',
        value: 0
      },
      {
        label: '维护类型',
        value: 1
      },
      {
        label: '维护时间',
        value: 2
      },
      {
        label: '维护内容',
        value: 3
      },
      {
        label: '维修人',
        value: 4
      },
      {
        label: '维修机构',
        value: 5
      },
      {
        label: '维修结果',
        value: 6
      },
      {
        label: '送修人',
        value: 7
      }
    ],
    typeList: [
      {
        label: '类型1',
        value: 1
      },
      {
        label: '类型2',
        value: 2
      },
    ],
    installList: {},//安装记录
    keepList: [],//维修记录
  });

  onMounted(() => {
    init().then((res) => { });
  });
  //动态按钮方法
  const dynamicBtn = (row: any, index: any, item: any) => {
    if (item.value == "编辑") {
      editItem(row);
    }
  };
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
      name: state.pointName, //测点名称
      networkId: state.selectNetwork, //台网
      // stationType: state.stationArray, //台阵
      stationId: state.stationChild, //台站ID
      pageNum: state.pageNum,
      pageSize: state.pageSize,
    };
    http.measurementPoint.getPoint(params).then((res: any) => {
      if (res.code == 0) {
        state.linkageData = res.data.list;
        state.total = res.data.total;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 确认删除(单独删除)
  const confirmDelete = (row: any) => {
    let params = {
      pointId: row.point_id,
    };
    deletePoint(params);
  };
  // 单独删除接口
  const deletePoint = (params: any) => {
    http.measurementPoint.delPoint(params).then((res: any) => {
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
    state.editData.name = "";
    state.editData.code = "";
    state.editData.stationId = "";
    state.editData.longitude = "";
    state.editData.latitude = "";
    state.editData.elevation = "";
  };
  //编辑
  const editItem = (row: any) => {
    state.title = "编辑";
    state.showAdd = true;
    state.editData.name = row.name;
    state.editData.code = row.code;
    state.editData.stationId = row.stationid;
    state.editData.longitude = row.longitude;
    state.editData.latitude = row.latitude;
    state.editData.elevation = row.elevation;
    state.updateId = row.point_id;
  };
  //确认新建 / 编辑
  const confirmEdit = () => {
    if (!state.editData.name) {
      ElMessage.error("测点名称不能为空");
      return;
    }
    if (!state.editData.stationId) {
      ElMessage.error("关联台站不能为空");
      return;
    }
    if (!state.editData.longitude) {
      ElMessage.error("经度不能为空");
      return;
    }
    if (!state.editData.latitude) {
      ElMessage.error("纬度不能为空");
      return;
    }
    if (!state.editData.elevation) {
      ElMessage.error("高程不能为空");
      return;
    }
    state.showAdd = false;
    if (state.title == "编辑") {
      let params = {
        name: state.editData.name,
        longitude: state.editData.longitude,
        latitude: state.editData.latitude,
        stationId: state.editData.stationId,
        elevation: state.editData.elevation,
        code: state.editData.code,
        pointId: state.updateId,
      };
      editPoint(params);
    } else if (state.title == "新增") {
      let params = state.editData;
      addPoint(params);
    }
  };

  //编辑接口
  const editPoint = (params: object) => {
    http.measurementPoint.editPoint(params).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success(res.message);
        getList();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //新增接口
  const addPoint = (params: object) => {
    http.measurementPoint.addPoint(params).then((res: any) => {
      if (res.code == 0) {
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
  // 获取台阵列表
  const getTaiwanese = () => {
    // let data = {
    //   unitId: "",
    // };
    // provinceTaiwanese(data);
  };
  // 台阵api
  const provinceTaiwanese = (data: any) => {
    // http.stationsInfoManage.getTaiwanese(data).then((res: any) => {
    //   if (res.code == 0) {
    //     state.stationArrayList = res.data;
    //   } else {
    //     ElMessage({
    //       message: res.message,
    //       type: "error",
    //     });
    //   }
    // });
  };

  // 获取子台站列表
  const getStations = () => {
    let params = {
      networkId: "",
      // stationTypeId: "",
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
    // // 点击台网查询台阵
    // let params = {
    //   unitId: val,
    // };
    // provinceTaiwanese(params);
    let data = {
      networkId: val,
      // stationTypeId: state.stationArray,
    };
    stationsTotal(data); // 点击台网查询子台站
  };
  //台阵改变事件
  const stationArrayChange = (v: any) => {
    // let params = {
    //   unitId: state.selectNetwork,
    //   stationTypeId: v,
    // };
    // stationsTotal(params); // 点击台网查询子台站
  };
  // 初始化
  const init = async () => {
    getList(); //查询表格数据
    await getProvince(); //台网
    // await getTaiwanese(); //台阵
    await getStations(); //台站
  };
  // 点击详情
  const detail = (row: any) => {
    state.title = "详情";
    state.detailModal = true
    // queryInfo(row.point_id) //查询设备信息
    queryInfo(60) //查询设备信息
  }
  // 点击添加维修记录
  const addCard = () => {
    state.detailModal = false
    state.addRecord = true
    state.title = '新增记录';
  }
  // 关闭新增记录弹框
  const recordCancel = () => {
    state.addRecord = false
    state.title = "详情";
    state.detailModal = true
  }
  // 新增记录确认
  const recordConfirm = () => {
    recordCancel()
  }
  // 根据设备id查询信息
  const queryInfo = (id: any) => {
    http.measurementPoint.queryInfo(id).then((res: any) => {
      if (res.code == 0) {
        if (res.data.detection) {
          state.installList = res.data.detection//安装
          if (state.installList.isFlow == true) {
            state.installList.isFlowType = '固定测点'
          } else {
            state.installList.isFlowType = '流动测点'
          }
          if (state.installList.properties == 0) {
            state.installList.propertiesType = '临时'
          } else {
            state.installList.propertiesType = '永久'
          }
          if (state.installList.status == 0) {
            state.installList.state = '失效'
          } else {
            state.installList.state = '生效'
          }
        }
        if (res.data.relationship) {
          state.keepList = res.data.relationship//维护
          state.keepList.map((item: any) => {
            if (item.status == 1) {
              item.state = '生效'
            } else {
              item.state = '失效'
            }
          })
        }
      } else {
        ElMessage.error(res.message);
      }
    });
  }
  return {
    state,
    init,
    backConfig,
    dynamicBtn,
    pageChange,
    sizeChange,
    cancel,
    getList,
    confirmDelete,
    deletePoint,
    addConfig,
    editItem,
    confirmEdit,
    getProvince,
    getTaiwanese,
    provinceTaiwanese,
    getStations,
    stationsTotal,
    networkChange,
    stationArrayChange,
    addCard,
    recordCancel,
    recordConfirm,
    detail
  };
};
