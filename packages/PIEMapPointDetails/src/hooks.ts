import { onMounted, watch, reactive, ref } from "vue";
import { Emits, Props } from "./interfaces";
import http from "../../../src/api/index";
import { ElMessage } from "element-plus";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const state = reactive({
    equipmentTypeLis: [],
    addStationList: [],
    showPlaceholder: "",
    editRow: [], //编辑弹框绑定的值
    activeIndexs: 0
  });
  //删除
  const delInfo = () => {
    emit("delInfo", props.valueData);
  };
  //编辑
  const updateInfo = () => {
    state.editRow = Object.assign({}, props.valueData);
    emit("updateInfo", props.pointData);
  };
  //点击台网里设备
  const facilityNetworkFun = (item, index) => {
    state.activeIndexs = index;
    emit("facilityNetworkFun", item);
  };
  //提交
  const submitForm = () => {
    emit("submitForm", state.editRow);
  };
  //配置
  const configInfo = () => {
    emit("configInfo", props.valueData);
  };
  //取消
  const cancel = () => {
    emit("cancel", props.valueData);
    emit("update:showInfo", false);
  };
  // //获取经纬度
  // const loadIcon = (v: any) => {
  //   let clickTai = "1";
  //   let valueData = props.valueData;
  //   emit("loadIcon", v, valueData, clickTai);
  // };
  // watch(
  //   () => props,
  //   () => { },
  //   {
  //     deep: true,
  //   }
  // );
  // // 查询设备类型id和名字
  // const getType = () => {
  //   http.converge.getType().then((res: any) => {
  //     if (res.code == 0) {
  //       state.equipmentTypeLis = res.data;
  //     } else {
  //       ElMessage({
  //         message: res.message,
  //         type: "warning",
  //       });
  //     }
  //   });
  // };
  // // 查询台站
  // const searchStationList = () => {
  //   let params = {
  //     unitId: "",
  //     stationTypeId: "",
  //   };
  //   http.converge.getStations(params).then((res: any) => {
  //     if (res.code == 0) {
  //       state.addStationList = res.data;
  //     } else {
  //       ElMessage({
  //         message: res.message,
  //         type: "error",
  //       });
  //     }
  //   });
  // };
  onMounted(() => {
    // getType();
    // searchStationList();
  });
  return {
    state,
    delInfo,
    updateInfo,
    submitForm,
    // loadIcon,
    configInfo,
    cancel,
    facilityNetworkFun,
  };
};
