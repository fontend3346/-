import request from "@/utils/request";
// let BASEURL = (window as any).gateway.baseUrl + "/api/v1/operation";
let BASEURL = (window as any).gateway.baseUrl + "/api/v1/operation/system";
let STATIONURL = (window as any).gateway.baseUrl + "/api/v2";
let POWERURL = (window as any).gateway.agentUrl;

const instrumentRegistration = {
  // 添加维护信息接口
  maintenanceInfo(data: Object) {
    return request({
      url: BASEURL + "/basic/insertInstrMainLog",
      method: "post",
      data: data,
    });
  },
  // 搜索-查设备类型
  getDeviceTypeApi(data: Object) {
    return request({
      url: BASEURL + "/instrCateDic/queryInstDict",
      method: "get",
      params: data,
    });
  },
  // 查询表格
  getInstrument(data: Object) {
    return request({
      url: BASEURL + "/basic/queryDeviceBasic",
      method: "get",
      params: data,
    });
  },
  // 设备类型
  deviceTypeList(data: Object) {
    return request({
      url: BASEURL + "/instrCateDic",
      method: "get",
      params: data,
    });
  },
  // 设备厂家
  getEquipmentFactory(data: Object) {
    return request({
      url: BASEURL + "/mf/mfInfo",
      method: "get",
      params: data,
    });
  },
  // 设备型号
  deviceModelList(data: Object) {
    return request({
      url: BASEURL + "/instModel/modelInfo",
      method: "get",
      params: data,
    });
  },
  // 添加设备
  addDevice(data: Object) {
    return request({
      url: BASEURL + "/basic/createDeviceBasic",
      method: "POST",
      data: data,
    });
  },
  // 查询台网
  getNetList(data: Object) {
    return request({
      url:
        STATIONURL +
        "/dataEngine/featureCollection/queryFeatureByQueryParameter",
      method: "post",
      data: data,
    });
  },
  // 查询台站
  getSelectStation(data: Object) {
    return request({
      url: BASEURL + "/stationBaseInfo",
      method: "get",
      params: data,
    });
  },
  // 查询测点
  getPoint(data: Object) {
    return request({
      url: BASEURL + "/detectionPoint/getList",
      method: "get",
      params: data,
    });
  },
  // 台站查测点
  getPointCopy(data: Object) {
    return request({
      url: BASEURL + "/detectionPoint",
      method: "get",
      params: data,
    });
  },
  // 查询传输协议
  queryProtocol() {
    return request({
      url: BASEURL + "/protocol/queryProtocol",
      method: "get",
      // params: data,
    });
  },
  // 查询采集设备通道
  queryChan(data: Object) {
    return request({
      url: BASEURL + "/chan/queryChan",
      method: "get",
      params: data,
    });
  },
  // 获取编辑回显的数据
  getUpdateData(instId: any) {
    return request({
      url: BASEURL + `/basic/echoInfo/${instId}`,
      method: "get",
    });
  },
  // 编辑设备
  editDevice(data: Object) {
    return request({
      url: BASEURL + "/basic",
      method: "PUT",
      data: data,
    });
  },
  // 删除设备
  delDevice(data: Object) {
    return request({
      url: BASEURL + "/basic",
      method: "delete",
      params: data,
    });
  },

  // 挂接设备-确定
  insertHook(data: Object) {
    return request({
      url: BASEURL + "/device/device/insertHook",
      method: "post",
      data: data,
    });
  },
  // 查询设备已挂接的通道
  selectHookChannel(data: Object) {
    return request({
      url: BASEURL + "/device/device/selectHookChannel",
      method: "get",
      params: data,
    });
  },
  // 查询挂接设备
  hookDevice(data: Object) {
    return request({
      url: BASEURL + "/device/device/hookDevice",
      method: "get",
      params: data,
    });
  },
  // 设备学科
  addDiscipline(data: Object) {
    return request({
      url: BASEURL + "/device/device/subject",
      method: "get",
      params: data,
    });
  },
  // 设备测项
  changeDevice(data: Object) {
    return request({
      url: BASEURL + "/device/device/testItem",
      method: "get",
      params: data,
    });
  },
  // 工作方式
  addWorkWay(data: Object) {
    return request({
      url: BASEURL + "/device/device/workWay",
      method: "get",
      params: data,
    });
  },
  // 设备来源
  addSource(data: Object) {
    return request({
      url: BASEURL + "/device/device/source",
      method: "get",
      params: data,
    });
  },

  // 根据参数查询设备类型表
  getDeviceType(data: Object) {
    return request({
      url: BASEURL + "/device/search/deviceType",
      method: "get",
      params: data,
    });
  },

  // 查询设备类型id和名字
  getSelectIdAndNamen(data: Object) {
    return request({
      url: BASEURL + "/device/type/selectIdAndName",
      method: "get",
      params: data,
    });
  },

  // 根据id查询设备
  selectDeviceById(data: Object) {
    return request({
      url: BASEURL + "/device/device/selectDeviceById",
      method: "get",
      params: data,
    });
  },

  //查询测点部署的设备
  selectEquip(data: Object) {
    return request({
      url: BASEURL + "/device/detection/point/deveice",
      method: "get",
      params: data,
    });
  },
  //查询设备类型为供电设备的详情
  getSelectEquip(id: any) {
    return request({
      url: POWERURL + `/api/v1/iot/server/device/${id}`,
      method: "get",
      // params: data,
    });
  },
};

export default instrumentRegistration;
