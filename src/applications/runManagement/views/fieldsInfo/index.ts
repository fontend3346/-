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
        prop: "name",
        label: "名称",
      },
      {
        prop: "title",
        label: "标题",
      },
      {
        prop: "length",
        label: "长度",
      },
      {
        prop: "id",
        label: "表明类型ID",
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
        collectionName: "DM_META_FIELD_TYPE_INFO",
        outputGeobuf: false,
        pageCount: state.pageSize,
        pageNum: state.pageNum,
        queryConditionList: [
          {
            compareOp: "LIKE",
            fieldName: "name",
            fieldValue: state.orderNum,
            relationNextOne: "OR",
          },
        ],
        queryResultList: [],
      };
    } else if (state.length) {
      params = {
        collectionName: "DM_META_FIELD_TYPE_INFO",
        outputGeobuf: false,
        pageCount: state.pageSize,
        pageNum: state.pageNum,
        queryConditionList: [
          {
            compareOp: "=",
            fieldName: "length",
            fieldValue: Number(state.length),
            relationNextOne: "OR",
          },
        ],
        queryResultList: [],
      };
    } else if (state.title) {
      params = {
        collectionName: "DM_META_FIELD_TYPE_INFO",
        outputGeobuf: false,
        pageCount: state.pageSize,
        pageNum: state.pageNum,
        queryConditionList: [
          {
            compareOp: "LIKE",
            fieldName: "title",
            fieldValue: state.title,
            relationNextOne: "OR",
          },
        ],
        queryResultList: [],
      };
    } else {
      params = {
        collectionName: "DM_META_FIELD_TYPE_INFO",
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
    if (!state.addName) {
      ElMessage.error("请输入名称");
      return;
    }
    if (!state.addTitle) {
      ElMessage.error("请输入标题");
      return;
    }
    if (!state.addLength) {
      ElMessage.error("请输入长度");
      return;
    }
    let params = {
      collectionName: "DM_META_FIELD_TYPE_INFO",
      features: [
        {
          properties: {
            name: state.addName,
            title: state.addTitle,
            length: state.addLength,
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
    state.updateName = row.properties.name;
    state.updateTitle = row.properties.title;
    state.updateLength = row.properties.length;
    state.showUpdate = true;
  };
  //修改-取消
  const updateCancel = () => {
    state.showUpdate = false;
  };
  //修改-确定
  const updateConfirm = () => {
    if (!state.updateName) {
      ElMessage.error("请输入名称");
      return;
    }
    if (!state.updateTitle) {
      ElMessage.error("请输入标题");
      return;
    }
    if (!state.updateLength) {
      ElMessage.error("请输入长度");
      return;
    }
    let params = {
      collectionName: "DM_META_FIELD_TYPE_INFO",
      features: [
        {
          properties: {
            name: state.updateName,
            title: state.updateTitle,
            length: state.updateLength,
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
      collectionName: "DM_META_FIELD_TYPE_INFO",
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
