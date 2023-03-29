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
    equipmentTypeList: [], // 设备型号数据
    subjectionPlatformList: [], // 隶属站台数据
    equipmentModelList: [], // 设备类型数据
    measurementPointList: [], // 测点数据
  });
  //删除
  const delInfo = () => {
    emit("delInfo", props.id);
  };
  //编辑
  const updateInfo = () => {
    emit("updateInfo", props.pointData);
  };
  //取消
  const cancel = () => {
    emit('update:showModal', false)
    emit("cancel", props.pointData);
  }


  //提交
  const submitForm = () => {
    emit("submitForm", props.valueData, props.id);
  };
  //配置
  const configInfo = () => {
    emit("configInfo", props.valueData);
  };
  // 根据根据参数查询设备类型表
  const getDeviceTypeList = () => {
    let params = {
      unitId: "",
      stationType: "",
      stationId: "",
    };
    http.instrumentRegistration.getDeviceType(params).then((res: any) => {
      if (res.code == 0) {
        res.data.forEach((item: any) => {
          let obj = {
            label: item.name,
            value: item.id,
          };
          state.equipmentTypeList.push(obj);
        });
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 查询隶属台站
  const getSelectStationList = () => {
    let params = {
      name: state.subjectionPlatform,
    };
    http.instrumentRegistration.getSelectStation(params).then((res: any) => {
      if (res.code == 0) {
        res.data.list.forEach((item: any) => {
          let obj = {
            label: item.stationName,
            value: item.id,
            longitude: item.longitude,
            latitude: item.latitude,
          };
          state.subjectionPlatformList.push(obj);
        });
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 查询设备类型id和名字
  const getSelectIdAndNamenList = () => {
    let params = {
      name: "",
    };
    http.instrumentRegistration.getSelectIdAndNamen(params).then((res: any) => {
      if (res.code == 0) {
        res.data.forEach((item: any) => {
          let obj = {
            label: item.name,
            value: item.id,
          };
          state.equipmentModelList.push(obj);
        });
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 查询测点
  const getPointList = () => {
    let params = {
      pointId: "",
      unit: "",
      stationType: "",
      pointName: "",
      stationId: "",
      pageNum: 1,
      pageSize: 10,
    };
    http.instrumentRegistration.getPoint(params).then((res: any) => {
      if (res.code == 0) {
        res.data.list.forEach((item: any) => {
          let obj = {
            label: item.name,
            value: item.id,
          };
          state.measurementPointList.push(obj);
        });
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 切换台站同时切换经纬度
  const changeSelect = (item: any) => {
    props.valueData[8].name = item.latitude;
    props.valueData[7].name = item.longitude;
  };

  onMounted(() => {
    getDeviceTypeList();
    getSelectStationList();
    getSelectIdAndNamenList();
    getPointList();
  });
  return {
    state,
    delInfo,
    updateInfo,
    submitForm,
    // loadIcon,
    configInfo,
    changeSelect,
    cancel,
  };
};
