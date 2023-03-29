import {
  reactive,
  onMounted,
  ref,
  getCurrentInstance,
  onBeforeUnmount,
} from "vue";
import http from "../../api/index";
import { ElMessage } from "element-plus";
export const useHandler = () => {
  const state = reactive({
    orderNum: "", //名称
    sourceData: [], //表格数据
    sourceColumns: [
      {
        prop: "type_name",
        label: "名称",
      },
      {
        prop: "description",
        label: "描述",
      },
    ], //表头
    total: 0, //总条数
    pageSize: 10, //分页尺寸
    pageNum: 1, //当前页
    showAdd: false, //添加
    stationName: "", //名称
    stationDesc: "", //描述
    // 编辑
    updatestationName: "", //名称
    updatestationDesc: "", //描述
    updateId: "", //id
    showUpdate: false, //编辑
  });

  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  onMounted(() => {
    getList();
  });
  // 查询
  const getList = () => {
    let params = {};
    if (state.orderNum) {
      params = {
        collectionName: "META_DATA_STATION_TYPE",
        outputGeobuf: false,
        pageCount: state.pageSize,
        pageNum: state.pageNum,
        queryConditionList: [
          {
            compareOp: "LIKE",
            fieldName: "type_name",
            fieldValue: state.orderNum,
          },
        ],
        queryResultList: [],
      };
    } else {
      params = {
        collectionName: "META_DATA_STATION_TYPE",
        outputGeobuf: false,
        pageCount: state.pageSize,
        pageNum: state.pageNum,
        queryConditionList: [],
        queryResultList: [],
      };
    }
    http.metaDataManage.stationSearch(params).then((res: any) => {
      if (res.code == 0) {
        state.sourceData = res.data.data;
        state.total = res.data.total_count;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //添加
  const addStation = () => {
    state.showAdd = true;
    state.stationName = "";
    state.stationDesc = "";
  };
  //添加-确定
  const addConfirm = () => {
    if (!state.stationName) {
      ElMessage.error("请输入名称");
      return;
    }
    if (!state.stationDesc) {
      ElMessage.error("请输入描述");
      return;
    }
    let params = {
      collectionName: "META_DATA_STATION_TYPE",
      features: [
        {
          properties: {
            type_name: state.stationName,
            description: state.stationDesc,
          },
        },
      ],
    };
    http.metaDataManage.stationAdd(params).then((res: any) => {
      if (res.code == 0) {
        state.showAdd = false;
        ElMessage.success("添加成功");
        getList();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //添加-取消
  const addCancel = () => {
    state.showAdd = false;
  };
  //修改
  const edit = (row: any) => {
    state.updateId = row.properties.id;
    state.updatestationDesc = row.properties.description;
    state.updatestationName = row.properties.type_name;
    state.showUpdate = true;
  };
  //修改-取消
  const updateCancel = () => {
    state.showUpdate = false;
  };
  //修改-确定
  const updateConfirm = () => {
    if (!state.updatestationName) {
      ElMessage.error("请输入名称");
      return;
    }
    if (!state.updatestationDesc) {
      ElMessage.error("请输入描述");
      return;
    }
    let params = {
      collectionName: "META_DATA_STATION_TYPE",
      features: [
        {
          properties: {
            type_name: state.updatestationName,
            description: state.updatestationDesc,
          },
        },
      ],
      queryConditionList: [
        {
          compareOp: "=",
          fieldName: "id",
          fieldValue: state.updateId,
        },
      ],
    };
    http.metaDataManage.stationUpdate(params).then((res: any) => {
      if (res.code == 0) {
        state.showUpdate = false;
        ElMessage.success("编辑成功");
        getList();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //删除
  const deleted = (row: any) => {
    let params = {
      collectionName: "META_DATA_STATION_TYPE",
      queryConditionList: [
        {
          compareOp: "=",
          fieldName: "id",
          fieldValue: row.properties.id,
        },
      ],
    };
    http.metaDataManage.stationDelete(params).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success("删除成功");
        getList();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //搜索
  const searchData = () => {
    getList();
  };
  //分页
  const pageChange = (obj: any) => {
    state.pageNum = obj;
    getList();
  };
  //分页
  const sizeChange = (obj: any) => {
    state.pageSize = obj;
    getList();
  };
  return {
    state,
    searchData,
    pageChange,
    sizeChange,
    deleted,
    edit,
    addCancel,
    addConfirm,
    addStation,
    updateCancel,
    updateConfirm,
  };
};
