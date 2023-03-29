import {
  reactive,
  onMounted,
  ref,
  getCurrentInstance,
  onBeforeUnmount,
} from "vue";
import http from "../../api/index";
import store from "@/store";
import { ElMessage } from "element-plus";
export const useHandler = () => {
  const state = reactive({
    subjectName: "", //学科
    subjectNameList: [], //学科
    //表格
    sourceData: [], //表格数据
    sourceColumns: [
      {
        prop: "name",
        label: "名称",
      },
      {
        prop: "description",
        label: "描述",
      },
      {
        prop: "code",
        label: "编码",
      },
      {
        prop: "parent_code",
        label: "父学科编码",
      },
    ], //表头
    total: 10, //总条数
    pageSize: 10, //分页尺寸
    pageNum: 1, //当前页
    showAdd: false,
    title: "新增",
    ruleForm: {
      name: "", //名称
      desc: "", //备注
      code:"",//编码
      parent_code:"",//父学科编码
    }, // 虚拟数据
    Id: "",
    selectionList: [],
  });

  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  onMounted(() => {
    getList();
  });
  onBeforeUnmount(() => {});
  // 查询
  const getList = () => {
    let params = {};
    if (state.subjectName) {
      params = {
        collectionName: "META_DATA_SUBJECT_INFO",
        outputGeobuf: false,
        pageCount: state.pageSize,
        pageNum: state.pageNum,
        queryConditionList: [
          {
            compareOp: "LIKE",
            fieldName: "name",
            fieldValue: state.subjectName,
          },
        ],
        queryResultList: [],
      };
    } else {
      params = {
        collectionName: "META_DATA_SUBJECT_INFO",
        outputGeobuf: false,
        pageCount: state.pageSize,
        pageNum: state.pageNum,
        queryConditionList: [],
        queryResultList: [],
      };
    }

    http.metaDataManage.subjectSearch(params).then((res: any) => {
      if (res.code == 0) {
        state.sourceData = res.data.data;
        state.total = res.data.total_count;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //查询
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
  // 取消弹出框
  const cancel = () => {
    state.showAdd = false;
    state.title = "新增";
    state.ruleForm.name = "";
    state.ruleForm.desc = "";
    state.ruleForm.code = "";
    state.ruleForm.parent_code = "";
  };
  // 新增权限列表
  const confirm = (data: any) => {
    //新增
    if (state.title == "新增") {
      if (!state.ruleForm.name) {
        ElMessage.error("名称不能为空");
      } else {
        let parmas = {
          collectionName: "META_DATA_SUBJECT_INFO",
          features: [
            {
              properties: {
                code: state.ruleForm.code,
                parent_code: state.ruleForm.parent_code,
                name: state.ruleForm.name,
                description: state.ruleForm.desc,
              },
            },
          ],
        };
        http.metaDataManage.subjectAdd(parmas).then((res: any) => {
          if (res.code == 0) {
            getList();
            state.showAdd = false;
            ElMessage.success("新增成功");
          } else {
            ElMessage.error(res.message);
          }
        });
      }
    }
    //修改
    if (state.title == "修改") {
      if (!state.ruleForm.name) {
        ElMessage.error("名称不能为空");
      } else {
        let parmas = {
          collectionName: "META_DATA_SUBJECT_INFO",
          features: [
            {
              properties: {
                name: state.ruleForm.name,
                description: state.ruleForm.desc,
                code: state.ruleForm.code,
                parent_code: state.ruleForm.parent_code,
              },
            },
          ],
          queryConditionList: [
            {
              compareOp: "=",
              fieldName: "id",
              fieldValue: state.Id,
            },
          ],
        };
        http.metaDataManage.subjectUpdate(parmas).then((res: any) => {
          if (res.code == 0) {
            ElMessage.success("修改成功");
            getList();
            state.showAdd = false;
          } else {
            ElMessage.error(res.message);
          }
        });
      }
    }
  };
  //新增
  const addConfig = () => {
    state.showAdd = true;
    state.title = "新增";
    state.ruleForm.name = "";
    state.ruleForm.desc = "";
  };
  //修改权限列表
  const update = (row: any) => {
    state.Id = row.properties.id;
    state.showAdd = true;
    state.title = "修改";
    state.ruleForm.name = row.properties.name;
    state.ruleForm.desc = row.properties.description;
    state.ruleForm.code = row.properties.code;
    state.ruleForm.parent_code = row.properties.parent_code;
  };
  //全选
  const onSelectAll = (selection: any) => {
    state.selectionList = selection;
  };
  //修改权限列表
  const confirmDelete = (row: any) => {
    let data = {
      collectionName: "META_DATA_SUBJECT_INFO",
      queryConditionList: [
        {
          compareOp: "=",
          fieldName: "id",
          fieldValue: row.properties.id,
        },
      ],
    };
    http.metaDataManage.subjectDelete(data).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success("删除成功");
        getList();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  return {
    state,
    pageChange,
    sizeChange,
    cancel,
    confirm,
    update,
    addConfig,
    searchData,
    confirmDelete,
    onSelectAll,
  };
};
