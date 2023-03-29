import { onMounted, watch, reactive, ref } from "vue";
import { Emits, Props } from "./interfaces";
import http from "../../../src/api/index";
import { ElMessage } from "element-plus";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const state: any = reactive({
    cutActive: 0, // 切换默认显示  0 是台站类型   1是学科类型
    isShowOldSearch: false, // 下半部分默认不显示
    active: 0, // 台站类型选中
    activeSubject: 0, // 台站类型选中v
    selectNetwork: "", // 选择台网
    netCode: "", //台网编号
    stationCode: "", // 台站编号
    subjectList: "", // 隶属学科
    foreignValue: "", // 选择国家级
    selectStationPro: "", // 选择省级
    stationChild: "", // 台站名称
    watchPoint: "", // 观测点
    deviceName: "", // 设备名称
    equipmentCode: "", // 设备编号
    subjectType: "", // 学科类型
    equipmentType: "", // 设备类型
  });
  // 弹窗关闭事件
  const cancelSelect = (e: any) => {
    emit("cancelSelect", e);
  };
  // 标签页切换点击事件
  const handleClick = (msg: any) => {
    // 清空其他值
    state.equipmentCode = ""; // 设备编号
    state.selectNetwork = ""; // 台网
    state.netCode = ""; //台网编号
    state.subjectList = ""; //台网编号
    state.selectStationPro = ""; //省级
    state.stationChild = ""; // 台站名称
    state.watchPoint = ""; // 观测点
    state.stationCode = ""; // 台站编号
    state.foreignValue = ""; // 国家级
    state.deviceName = ""; // 设备名称
    state.subjectType = ""; // 学科类型
    state.equipmentType = ""; // 设备类型
    emit("handleClick", msg);
  };
  //台网tab栏 - 台网名称改变事件
  const networkChange1 = (item: any) => {
    state.netCode = item.code;
    emit("networkChange1", item);
  };
  //台网tab栏 - 台网编号改变事件
  const netCodeChange = (item: any) => {
    state.selectNetwork = item.cname;
    emit("netCodeChange", item);
  };
  //台站tab栏 - 台网改变事件
  const stationNetworkChange = (item: any) => {
    //台网改变值的时候  台站和台站编号清空(换了台网下没这个台站的时候)重新选择
    if (item.networkId) {
      state.stationChild = "";
      state.stationCode = "";
    }
    emit("stationNetworkChange", item);
  };
  // 国家级改变事件
  const foreignChang = (item: any) => {
    // 清空其他值
    state.selectStationPro = ""; //省级
    state.stationChild = ""; // 台站名称
    state.watchPoint = ""; // 台站编号
    emit("foreignChang", item);
  };
  // 省级改变事件
  const networkChange = (item: any) => {
    state.stationChild = ""; // 台站名称
    emit("networkChange", item);
  };
  //台站tab栏 - 台站名称改变事件
  const stationChildChange = (item: any) => {
    state.stationCode = item.code;
    emit("stationChildChange", item);
  };
  //台站tab栏 - 台站类型事件
  const subjectListChange = (item: any) => {
    if (item) {
      state.stationChild = "";
      state.stationCode = "";
    }
    emit("subjectListChange", item);
  };
  //设备tab栏-设备中台站改变事件
  const stationEquipChange = (item: any) => {
    if (item.name) {
      state.deviceName = "";
      state.equipmentCode = "";
    }
    emit("stationEquipChange", item);
  };
  // 设备tab栏-设备中台网改变事件
  const equipNetworkChange = (item: any) => {
    //当台网改变的时候 台站和台站设备名称和设备编号为空 重新选择
    if (item.networkId) {
      state.stationChild = "";
      state.deviceName = "";
      state.equipmentCode = "";
    }
    emit("equipNetworkChange", item);
  };
  // 台站编号改变事件
  const stationCodeChange = (item: any) => {
    state.stationChild = item.name; // 台站名称
    emit("stationCodeChange", item);
  };
  // 台站编号输入框改变事件
  const inputChange = (val: any) => {
    emit("inputChange", val);
  };
  // 设备tab栏-设备名称改变事件
  const queryDeviceName = (val: any) => {
    state.equipmentCode = val.inst_code;
    emit("queryDeviceName", val);
  };
  // 设备tab栏-设备编号改变事件
  const deviceCodeChange = (val: any) => {
    state.deviceName = val.name;
    emit("deviceCodeChange", val);
  };
  // 台站表格点击事件
  const TestSelect = (row: any) => {
    emit("TestSelect", row);
  };
  // 设备表格行点击事件
  const stationSelect = (row: any) => {
    emit("stationSelect", row);
  };
  //台站tab栏-学科类型改变事件
  const subjectTypeChange = (row: any) => {
    if (row) {
      state.stationChild = "";
      state.stationCode = "";
    }
    emit("subjectTypeChange", row);
  };
  //设备tab栏-设备类型改变事件
  const equipmentTypeChange = (row: any) => {
    emit("equipmentTypeChange", row);
  };
  //高级检测 显示下面的搜索内容
  const isShowSearch = (isShowNet: any) => {
    //重置到台站类型
    state.cutActive = 0;
    //台站类型和学科类型 样式重置
    state.active = 0;
    state.isShowOldSearch = !state.isShowOldSearch;
    emit("isShowSearch", isShowNet);
  };
  //点击台站类型
  const statinoTypeClick = (item: any, index) => {
    state.active = index;
    emit("statinoTypeClick", item);
  };
  //点击台站类型
  const subjectTypeClick = (id: any, index: any) => {
    state.activeSubject = index;
    emit("subjectTypeClick", id);
  };
  //切换台站类型
  const cutFun = () => {
    if (state.cutActive == 0) {
      state.cutActive = 1; //学科类型
    } else {
      state.cutActive = 0; //台站类型
    }
    //台站类型和学科类型 样式重置
    state.active = 0;
    state.activeSubject = 0;
    emit("cutFun", state.cutActive);
  };
  onMounted(() => {});
  return {
    cutFun,
    subjectTypeClick,
    cancelSelect,
    handleClick,
    networkChange1,
    stationNetworkChange,
    netCodeChange,
    foreignChang,
    networkChange,
    stationChildChange,
    subjectListChange,
    stationEquipChange,
    equipNetworkChange,
    stationCodeChange,
    inputChange,
    queryDeviceName,
    deviceCodeChange,
    TestSelect,
    stationSelect,
    subjectTypeChange,
    equipmentTypeChange,
    isShowSearch,
    statinoTypeClick,
    state,
  };
};
