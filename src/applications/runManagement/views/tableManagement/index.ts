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
    title: "", //标题
    length: "", //长度
    sourceData: [], //表格数据
    sourceColumns: [
      {
        prop: "level_id",
        label: "等级",
      },
      {
        prop: "describe",
        label: "描述",
      },
    ], //表头
    total: 0, //总条数
    pageSize: 10, //分页尺寸
    pageNum: 1, //当前页
    showAdd: false, //添加

    // 新增
    addName: "", //名称
    addTitle: "", //标题
    addLength: "", //长度
    // 编辑
    updateName: "", //名称
    updateTitle: "", //标题
    updateLength: "", //长度
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
        collectionName: "META_DATA_LEVEL",
        outputGeobuf: false,
        pageCount: state.pageSize,
        pageNum: state.pageNum,
        queryConditionList: [
          {
            compareOp: "=",
            fieldName: "level_id",
            fieldValue: state.orderNum,
            relationNextOne: "OR",
          },
        ],
        queryResultList: [],
      };
    } else if (state.title) {
      params = {
        collectionName: "META_DATA_LEVEL",
        outputGeobuf: false,
        pageCount: state.pageSize,
        pageNum: state.pageNum,
        queryConditionList: [
          {
            compareOp: "LIKE",
            fieldName: "describe",
            fieldValue: state.title,
            relationNextOne: "OR",
          },
        ],
        queryResultList: [],
      };
    } else {
      params = {
        collectionName: "META_DATA_LEVEL",
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
    state.addName = "";
    state.addTitle = "";
    state.addLength = "";
  };
  //添加-确定
  const addConfirm = () => {
    // if (!state.addName) {
    //   ElMessage.error("请输入等级");
    //   return;
    // }
    if (!state.addTitle) {
      ElMessage.error("请输入描述");
      return;
    }
    let params = {
      collectionName: "META_DATA_LEVEL",
      features: [
        {
          properties: {
            // level_id: state.addName,
            describe: state.addTitle,
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
    state.updateId = row.properties.level_id;
    state.updateName = row.properties.level_id;
    state.updateTitle = row.properties.describe;
    state.showUpdate = true;
  };
  //修改-取消
  const updateCancel = () => {
    state.showUpdate = false;
  };
  //修改-确定
  const updateConfirm = () => {
    // if (!state.updateName) {
    //   ElMessage.error("请输入等级");
    //   return;
    // }
    if (!state.updateTitle) {
      ElMessage.error("请输入标题");
      return;
    }
    let params = {
      collectionName: "META_DATA_LEVEL",
      features: [
        {
          properties: {
            // level_id: state.updateName,
            describe: state.updateTitle,
          },
        },
      ],
      queryConditionList: [
        {
          compareOp: "=",
          fieldName: "level_id",
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
      collectionName: "META_DATA_LEVEL",
      queryConditionList: [
        {
          compareOp: "=",
          fieldName: "level_id",
          fieldValue: row.properties.level_id,
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
