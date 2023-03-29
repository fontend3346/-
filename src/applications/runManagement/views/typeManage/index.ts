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
        prop: "classify",
        label: "设备类型",
      },
      {
        prop: "code",
        label: "设备编码",
      },
      {
        prop: "state",
        label: "状态",
      },
      {
        prop: "description",
        label: "描述",
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
      code: "", //编码
      statusInstrument: null, //状态
      statusType: "", //设备类型
    }, // 虚拟数据
    Id: "",
    selectionList: [],
    statusList: [
      {
        label: "无效的",
        value: 0,
      },
      {
        label: "有效的",
        value: 1,
      },
    ],
    statusTypeList: [
      // {
      //   label: "无效的",
      //   value: 0,
      // },
      // {
      //   label: "暂不确定具体是什么",
      //   value: 1,
      // },
    ], //设备数据
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
    let params;
    if (state.subjectName) {
      params = {
        collectionName: "INSTR_CATE_DIC",
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
        collectionName: "INSTR_CATE_DIC",
        outputGeobuf: false,
        pageCount: state.pageSize,
        pageNum: state.pageNum,
        queryConditionList: [],
        queryResultList: [],
      };
    }

    http.metaDataManage.instrumentSearch(params).then((res: any) => {
      if (res.code == 0) {
        state.sourceData = res.data.data;
        let arr = [];
        state.sourceData.forEach((item: any) => {
          arr.push(item.properties);
        });
        arr.forEach((item: any) => {
          if (item.status == 0) {
            item.state = "无效的";
          } else if (item.status == 1) {
            item.state = "有效的";
          }
        });
        state.sourceData = arr;
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
    state.ruleForm.statusInstrument = null;
    state.ruleForm.statusType = "";
  };
  // 新增
  const confirm = () => {
    //新增
    if (state.title == "新增") {
      if (!state.ruleForm.name) {
        ElMessage.error("名称不能为空");
      } else if (!state.ruleForm.statusType) {
        ElMessage.error("请输入设备类型");
      } else if (isNaN(Number(state.ruleForm.statusType))) {
        ElMessage.error("请输入设备类型格式为数字");
      } else if (state.ruleForm.statusInstrument === "") {
        ElMessage.error("状态不能为空");
      } else if (!state.ruleForm.desc) {
        ElMessage.error("描述不能为空");
      } else if (!state.ruleForm.code) {
        ElMessage.error("编码不能为空");
      } else {
        let parmas = {
          collectionName: "INSTR_CATE_DIC",
          features: [
            {
              properties: {
                name: state.ruleForm.name,
                classify: Number(state.ruleForm.statusType),
                code: state.ruleForm.code,
                status: Number(state.ruleForm.statusInstrument),
                description: state.ruleForm.desc,
              },
            },
          ],
        };
        http.metaDataManage.instrumentAdd(parmas).then((res: any) => {
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
      } else if (!state.ruleForm.statusType) {
        ElMessage.error("请输入设备类型");
      } else if (isNaN(Number(state.ruleForm.statusType))) {
        ElMessage.error("请输入设备类型格式为数字");
      } else if (state.ruleForm.statusInstrument === "") {
        ElMessage.error("状态不能为空");
      } else if (!state.ruleForm.desc) {
        ElMessage.error("描述不能为空");
      } else if (!state.ruleForm.code) {
        ElMessage.error("编码不能为空");
      } else {
        let parmas = {
          collectionName: "INSTR_CATE_DIC",
          features: [
            {
              properties: {
                name: state.ruleForm.name,
                classify: Number(state.ruleForm.statusType),
                status: Number(state.ruleForm.statusInstrument),
                description: state.ruleForm.desc,
                code: state.ruleForm.code,
              },
            },
          ],
          queryConditionList: [
            {
              compareOp: "=",
              fieldName: "cate_id",
              fieldValue: state.Id,
            },
          ],
        };
        http.metaDataManage.instrumentUpdate(parmas).then((res: any) => {
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
  const addConfig = (row: any) => {
    state.showAdd = true;
    state.title = "新增";
    state.ruleForm.name = "";
    state.ruleForm.desc = "";
  };
  //修改
  const update = (row: any) => {
    state.Id = row.cate_id;
    state.showAdd = true;
    state.title = "修改";
    state.ruleForm.name = row.name;
    state.ruleForm.desc = row.description;
    state.ruleForm.statusInstrument = row.status;
    state.ruleForm.statusType = row.classify;
    state.ruleForm.code = row.code;
  };
  //全选
  const onSelectAll = (selection: any) => {
    state.selectionList = selection;
  };
  //删除
  const confirmDelete = (row: any) => {
    let data = {
      collectionName: "INSTR_CATE_DIC",
      queryConditionList: [
        {
          compareOp: "=",
          fieldName: "cate_id",
          fieldValue: row.cate_id,
        },
      ],
    };
    http.metaDataManage.instrumentDelete(data).then((res: any) => {
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
