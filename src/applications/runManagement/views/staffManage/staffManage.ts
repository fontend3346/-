import { reactive, onMounted, ref } from "vue";
import { ElMessage, UploadProps } from "element-plus";
import http from "@/api/index";
import store from "@/store";
export const useHandler = () => {
  let importUpload = ref(); //导入
  let state = reactive({
    filesImport: null, //导入xlsx文件
    netData: "", //台网搜索
    stationData: "", //台站搜索
    netDataList: [], //台网下拉框数据
    stationDataList: [], //台站下拉框数据
    staffData: "", //人员名称
    statusVal: "", //状态
    linkageData: [], //表格数据
    linkageColumns: [
      {
        prop: "name",
        label: "人员名称",
      },
      {
        prop: "account",
        label: "绑定账户",
      },
      {
        prop: "phone",
        label: "手机号",
      },
      {
        prop: "email",
        label: "邮箱",
      },
      {
        prop: "networkName",
        label: "台网名称",
      },
      {
        prop: "stationName",
        label: "台站名称",
      },
      {
        prop: "state",
        label: "状态",
      },
    ], //表头
    total: 10,
    pageSize: 10,
    pageNum: 1,
    showAdd: false, //新建显隐
    title: "新建", //新建显隐
    ruleForm: {
      name: "",
      phone: "",
      email: "",
      unitType: "1", //单位类型
      unitTitle: "", //单位名称
      unitTitleCopy: "", //单位名称
      unitTitleArr: [], //单位名称
    },
    unitTypeList: [
      {
        value: 1,
        label: "台网",
      },
      {
        value: 2,
        label: "台站",
      },
    ], //单位类型
    unitTitleList: [], //单位名称
    unitTitleListCopy: [], //单位名称
    statusBindArry: [
      {
        value: 0,
        label: "未绑定",
      },
      {
        value: 1,
        label: "已绑定",
      },
    ],
    id: "", //跟新id
    codeArray: [], //批量删除的code
    selectionList: [], //批量数据
    showUpdate: false, //修改显隐
    updateData: {
      name: "",
      phone: "",
      email: "",
      unitType: "", //单位类型
      unitTitle: "", //台网  类型为1
      unitTitleCopy: "", //台网  类型为2
      unitTitleArr: [], //台站
    },
    storeUserId: store.state.user.userId,
  });
  onMounted(() => {
    init().then((res) => {});
  });
  const init = async () => {
    getJulist(); // 查询用户列表
    await networkSelect(); //查询台网
    await stationSelect({ networkId: "" }, state.storeUserId); //查询台站
  };
  //渲染权限列表
  const getJulist = () => {
    let params = {
      pageNum: state.pageNum,
      userId: state.storeUserId,
      pageSize: state.pageSize,
      name: state.staffData,
      status: state.statusVal,
      teamId: localStorage.getItem("engine-teamid"),
      networkId: state.netData,
      stationId: state.stationData,
    };
    http.staffManage
      .getList(params, state.pageNum, state.pageSize)
      .then((res: any) => {
        if (res.code == 0) {
          state.linkageData = res.data.list;
          state.linkageData.map((item: any) => {
            if (item.status == 0) {
              item.state = "未绑定";
            } else if (item.status == 1) {
              item.state = "已绑定";
            }
            // if (!item.networkName) {
            //   item.networkName = "/";
            // }
            if (!item.stationName) {
              item.stationName = "/";
            }
          });
          state.total = res.data.total;
        } else {
          ElMessage.error(res.message);
        }
      });
  };
  // 导入
  const onChangeImport = (file: any) => {
    state.filesImport = new FormData();
    state.filesImport.append("file", file.raw);
    if (file.status == "ready") {
      http.staffManage.importStaff(state.filesImport).then((res: any) => {
        if (res.code == 0) {
          ElMessage.success("导入成功");
          getJulist(); //查询列表
        } else {
          ElMessage.error(res.message);
        }
      });
    }
  };
  // 搜索
  const searchName = () => {
    getJulist();
  };
  // 选择单位类型
  const unitTypeFun = (v: any) => {
    state.ruleForm.unitTitle = ""; //清空单位名称
    state.ruleForm.unitTitleCopy = ""; //清空单位名称
    state.ruleForm.unitTitleArr = [];
    state.updateData.unitTitle = ""; //清空单位名称
    state.updateData.unitTitleCopy = ""; //清空单位名称
    state.updateData.unitTitleArr = [];
    if (v == "1") {
      // 查台网
      getProvince();
    } else if (v == "2") {
      // 查台网
      getProvince();
      // 查台站
      getSelectStationList("");
    }
  };
  // 通过网查台站
  const seleteData = (v: any) => {
    getSelectStationList(v);
    state.ruleForm.unitTitleArr = [];
    state.updateData.unitTitleArr = [];
  };
  // 查台网
  const getProvince = () => {
    http.staffManage.networkSelect(state.storeUserId).then((res: any) => {
      if (res.code == 0) {
        state.unitTitleList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 查台站
  const getSelectStationList = (v: any) => {
    let networkId: any;
    if (v) {
      networkId = v;
    } else {
      networkId = "";
    }
    let params = {
      networkId: networkId,
    };
    http.staffManage
      .stationSelect(params, state.storeUserId)
      .then((res: any) => {
        if (res.code == 0) {
          state.unitTitleListCopy = res.data;
        } else {
          ElMessage.error(res.message);
        }
      });
  };
  // 新增
  const addConfig = () => {
    // 新增配置
    state.showAdd = true;
    state.title = "新建";
    state.staffData = "";
    state.ruleForm.name = "";
    state.ruleForm.phone = "";
    state.ruleForm.email = "";
    state.ruleForm.unitType = "1";
    state.ruleForm.unitTitle = ""; //清空单位名称
    state.updateData.unitTitle = ""; //清空单位名称
    state.updateData.unitTitleCopy = ""; //清空单位名称
    state.updateData.unitTitleArr = []; //清空单位名称
    // // 查台网
    getProvince();
  };
  // 编辑
  const update = (row: any) => {
    if (row.userType == 1) {
      // 查台网
      getProvince();
    } else if (row.userType == 2) {
      // 查台网
      getProvince();
      // 查台站
      getSelectStationList("");
    }
    state.showUpdate = true;
    state.title = "修改";
    state.updateData.name = row.name;
    state.updateData.phone = row.phone;
    state.updateData.email = row.email;
    state.updateData.unitType = row.userType + "";
    state.updateData.unitTitleArr = row.stationList; //单位名称-台站
    state.updateData.unitTitle = row.networkId; //单位名称-台网  row.userType = 1
    state.updateData.unitTitleCopy = row.networkId; //单位名称-台网  row.userType = 2
    state.id = row.id;
  };
  // 新增取消弹出框
  const cancel = () => {
    state.showAdd = false;
    state.ruleForm.name = "";
    state.ruleForm.phone = "";
    state.ruleForm.email = "";
    state.ruleForm.unitTitle = ""; //清空单位名称
    state.ruleForm.unitTitleArr = [];
    state.ruleForm.unitTitleCopy = "";
  };
  // 新建确定
  const confirm = () => {
    let unitId: any;
    let reg_tel = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/;
    // 域名类似“** .** .** .**”组成。   名称@域名”，需要使用“^”匹配邮箱的开始部分，用“$”匹配邮箱结束部分以保证邮箱前后不能有其他字符
    let reg_email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

    if (!state.ruleForm.name) {
      ElMessage.error("人员名称不能为空");
    } else if (!reg_tel.test(state.ruleForm.phone)) {
      ElMessage.error("请输入正确的手机号码");
    } else if (!reg_email.test(state.ruleForm.email)) {
      ElMessage.error("请输入正确的邮箱号码");
    } else if (!state.ruleForm.unitType) {
      ElMessage.error("请输入单位类型");
    } else if (
      !state.ruleForm.unitTitle &&
      !state.ruleForm.unitTitleArr.length > 0
    ) {
      ElMessage.error(
        state.ruleForm.unitType == "1" ? "请输入台网" : "请输入台站"
      );
    } else {
      if (state.ruleForm.unitType == "1") {
        unitId = [state.ruleForm.unitTitle];
      } else {
        unitId = state.ruleForm.unitTitleArr;
      }
      state.showAdd = false;
      let parmas = {
        name: state.ruleForm.name,
        phone: state.ruleForm.phone,
        email: state.ruleForm.email,
        userType: Number(state.ruleForm.unitType), //单位类型
        unitIdList: unitId, //单位名称
        id: state.id,
      };
      http.staffManage.createList(parmas).then((res: any) => {
        if (res.code == 0) {
          getJulist();
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      });
    }
  };
  // 修改确定
  const updateconfirm = () => {
    let unitIds: any;
    let reg_tel_update = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/;

    let reg_email_update = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    //修改
    if (!state.updateData.name) {
      ElMessage.error("人员名称不能为空");
    } else if (!reg_tel_update.test(state.updateData.phone)) {
      ElMessage.error("请输入正确的手机号码");
    } else if (!reg_email_update.test(state.updateData.email)) {
      ElMessage.error("请输入正确的邮箱号码");
    } else if (!state.updateData.unitType) {
      ElMessage.error("请输入单位类型");
    } else if (
      !state.updateData.unitTitle &&
      !state.updateData.unitTitleArr.length > 0
    ) {
      ElMessage.error(
        state.ruleForm.unitType == "1" ? "请输入台网" : "请输入台站"
      );
    } else {
      if (state.updateData.unitType == "1") {
        unitIds = [state.updateData.unitTitle];
      } else {
        unitIds = state.updateData.unitTitleArr;
      }
      state.showUpdate = false;
      let parmas = {
        id: state.id, //备注
        name: state.updateData.name,
        phone: state.updateData.phone,
        email: state.updateData.email,
        userType: state.updateData.unitType, //单位类型
        unitIdList: unitIds, //单位名称
      };
      http.staffManage.updateList(parmas).then((res: any) => {
        if (res.code == 0) {
          ElMessage.success("修改成功");
          getJulist();
        } else {
          ElMessage.error(res.message);
        }
      });
    }
  };
  // 修改取消
  const updatecancel = () => {
    state.showUpdate = false;
    state.updateData.name = "";
    state.updateData.phone = "";
    state.updateData.email = "";
    state.updateData.unitType = "";
    state.updateData.unitTitle = ""; //清空单位名称
    state.updateData.unitTitleArr = []; //清空单位名称
  };
  // 切换当前页
  const pageChange = (current: any) => {
    state.pageNum = current;
    getJulist();
  };
  // 切换分页尺寸
  const sizeChange = (pageSize: any) => {
    state.pageSize = pageSize;
    getJulist();
  };
  //删除列表
  const confirmDelete = (val: any) => {
    let params = {
      id: val.id,
    };
    delApi(params);
  };
  const delApi = (data: any) => {
    http.staffManage.batchList(data).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success("删除成功");
        getJulist();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //查询搜索表格的台网下拉框
  const networkSelect = () => {
    http.staffManage.networkSelect(state.storeUserId).then((res: any) => {
      if (res.code == 0) {
        state.netDataList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //台网下拉框搜索表格的台站下拉框
  const netDataChange = (v: any) => {
    let params = {
      networkId: v,
    };
    stationSelect(params, state.storeUserId);
  };
  //查询搜索表格的台站下拉框
  const stationSelect = (data, userIds) => {
    http.staffManage.stationSelect(data, userIds).then((res: any) => {
      if (res.code == 0) {
        state.stationDataList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  return {
    state,
    searchName,
    addConfig,
    update,
    confirmDelete,
    pageChange,
    sizeChange,
    cancel,
    updateconfirm,
    updatecancel,
    unitTypeFun,
    seleteData,
    confirm,
    netDataChange,
    onChangeImport,
    importUpload,
  };
};
