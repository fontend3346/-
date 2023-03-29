import request from "@/utils/request";
let DATA = (window as any).gateway.baseUrl;
let NEWURL = (window as any).gateway.baseUrl + "/api/v1/operation";
let POINTURL = (window as any).gateway.baseUrl + "/api/v2";
// let URL12 = "http://10.1.7.64:8082/api/v1";
const converge = {
  // 接收配置
  getReception(data: any) {
    return request({
      url: NEWURL + "/system/basic/queryObsDeviceBasic",
      method: "get",
      params: data,
    });
  },
  // 接收配置-开启接口
  startPort(data: any) {
    return request({
      url: NEWURL + "/system/observer/dataReceive/start",
      method: "POST",
      data: data,
    });
  },
  // 获取数据引接服务
  getEquipListPort(data: any) {
    return request({
      url: NEWURL + "/system/dataReceive",
      method: "get",
      params: data,
    });
  },
  // 接收配置查看-波形
  lookEcharts(data: any) {
    return request({
      url: NEWURL + "/system/waveform",
      method: "get",
      params: data,
    });
  },
  // 点击接收配置获取地图点的数据
  configPointsApi(data: any) {
    return request({
      url:
        POINTURL + "/dataEngine/featureCollection/queryFeatureByQueryParameter",
      method: "post",
      data: data,
    });
  },
  // 点击接收配置查看日志波形
  logApi(data: any) {
    return request({
      url: NEWURL + "/system/productorLog",
      method: "get",
      params: data,
    });
  },
  // 关闭设备
  closeEquip(data: any) {
    return request({
      url: NEWURL + "/system/observer/dataReceive/close",
      method: "delete",
      params: data,
    });
  },

  // 添加-接收配置
  addReception(data: any) {
    return request({
      url: DATA + "/api/v1/receive/collect/device/selectSCbyDeviceParam",
      method: "get",
      params: data,
    });
  },
  //接收配置-删除
  deleteClose(data: any) {
    return request({
      url: DATA + "/api/v1/receive/collect/receive/close",
      method: "POST",
      data: data,
    });
  },
  // 获取台站列表
  getStations(data: any) {
    return request({
      url: DATA + "/api/v1/receive/collect/search/units/station",
      method: "get",
      params: data,
    });
  },
  // 获取台阵列表
  getTaiwanese(data: any) {
    return request({
      url: DATA + "/api/v1/receive/collect/search/units/stationArray",
      method: "get",
      params: data,
    });
  },
  // 查省列表
  getProvince() {
    return request({
      url: DATA + "/api/v1/receive/collect/search/units",
      method: "get",
    });
  },
  // 修改设备
  updateEquip(data: any) {
    return request({
      url: DATA + "/api/v1/receive/collect/device",
      method: "put",
      data: data,
    });
  },
  // 添加设备
  addEquip(data: any) {
    return request({
      url: DATA + "/api/v1/receive/collect/device",
      method: "post",
      data: data,
    });
  },
  // 删除设备
  deleteEquip(data: any) {
    return request({
      url: DATA + "/api/v1/receive/collect/device",
      method: "delete",
      params: data,
    });
  },
  // 查询设备类型id和名字
  getType(data: any) {
    return request({
      url: DATA + "/api/v1/receive/collect/search/deviceType",
      method: "get",
      params: data,
    });
  },

  //根据设备获取Topic名
  getTopicByDevice(data: any) {
    return request({
      url: DATA + "/api/v1/receive/collect/device/getTopicByDevice",
      method: "post",
      data: data,
    });
  },
  //添加配置的数据
  addSeleteList(data: any) {
    return request({
      url: DATA + "/api/v1/receive/collect/receive",
      method: "post",
      data: data,
    });
  },
  //更新设备
  device(data: any) {
    return request({
      url: DATA + "/api/v1/receive/collect/device",
      method: "PUT",
      data: data,
    });
  },
};

export default converge;
