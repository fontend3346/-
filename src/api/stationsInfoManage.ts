import request from "@/utils/request";
let BASES = (window as any).gateway.baseUrl;
let BASEURL = (window as any).gateway.baseUrl + "/api/v1/operation/device";
let ROOTURL = (window as any).gateway.publishUrl; // 等值线
let baseUrls = (window as any).gateway.baseUrl + "/api/v1/operation/system";
let subjectUrls = (window as any).gateway.baseUrl + "/api/v2/dataEngine"; //搜索tab学科类型
const stationsInfoManage = {
  // // 搜索-根据台站类型台网
  netStationType(data: any) {
    return request({
      url: BASES + `/api/v1/operation/system/netWorkBaseInfo/specificNetwork`,
      method: "get",
      params: data,
    });
  },
  // // 搜索-根据台站类型查询 查询所有台站类型
  stationTypeAll(stationTypeId: any) {
    return request({
      url: BASES + `/api/v1/operation/system/stationType`,
      method: "get",
    });
  },
  // 搜索-根据台站类型查询 台站正常异常数
  abnormalStation(stationTypeId: any) {
    return request({
      url:
        BASES +
        `/api/v1/operation/system/statistics/statusCountByStationType/${stationTypeId}`,
      method: "get",
    });
  },
  // 搜索-学科、台站类型查询台站
  getSubjectTable(data: Object) {
    return request({
      url: BASES + "/api/v1/operation/system/stationBaseInfo",
      method: "get",
      params: data,
    });
  },
  // 搜索-查设备学科
  getSubject(data: Object) {
    return request({
      url: subjectUrls + "/featureCollection/queryFeatureByQueryParameter",
      method: "post",
      data: data,
    });
  },
  // 设备管理-查测点
  pointApi(data: Object) {
    return request({
      url: baseUrls + "/detectionPoint/index",
      method: "get",
      params: data,
    });
  },
  //树结构获取台网、台站、测点、设备
  getTreeTotal(data: Object) {
    return request({
      url: BASEURL + "/search/selectTree",
      method: "get",
      params: data,
    });
  },
  // 根据id查弹框数据
  searchId(data: Object) {
    return request({
      url: baseUrls + "/stationBaseInfo",
      method: "get",
      params: data,
    });
  },
  // 根据id查设备弹框数据
  searchfacility(data: Object) {
    return request({
      url: baseUrls + "/basic",
      method: "get",
      params: data,
    });
  },
  // 波形图
  waveform(data: Object) {
    return request({
      url: BASEURL + "/wave",
      method: "get",
      params: data,
    });
  },
  //新增波形样本
  addZoomData(data: Object) {
    return request({
      url: BASEURL + "/Sample/addWaveformSample",
      method: "post",
      data: data,
    });
  },
  //新增波形样本
  addWaveList(data: Object) {
    return request({
      url: BASES + "/api/v1/observer/storage/waveformSample/add",
      method: "post",
      data: data,
    });
  },
  //查询波形样本列表
  queryWaveTable(data: Object) {
    return request({
      url: BASEURL + "/Sample/selectWaveformList",
      method: "get",
      params: data,
    });
  },
  //查询波形样本列表
  searchWaveTable(data: Object) {
    return request({
      url: BASES + "/api/v1/observer/storage/waveformSample",
      method: "get",
      params: data,
    });
  },
  //根据样本名查询波形样本数据
  //点击查看后回显
  lookEcharts(data: Object) {
    return request({
      url: BASEURL + "/Sample/selectWaveformByName",
      method: "get",
      params: data,
    });
  },
  //批量删除数据
  deleteWave(data: Object) {
    return request({
      url: BASEURL + "/Sample/deleteBatch",
      method: "post",
      data: data.list,
    });
  },
  //删除数据
  deleteData(data: Object) {
    return request({
      url: BASES + "/api/v1/observer/storage/waveformSample/delete",
      method: "delete",
      params: data,
    });
  },
  // 根据id查设备条数
  facilityNum(data: any) {
    return request({
      url: baseUrls + `/basic/count/${data.stationId}`,
      method: "get",
      // params: data,
    });
  },
  // 查询台网点数据
  getAddPoint(data: Object) {
    return request({
      url:
        BASES +
        "/api/v2/dataEngine/featureCollection/getGeobufByQueryParameter",
      method: "post",
      data: data,
      responseType: "arraybuffer",
    });
  },
  // 根据台网id查询台站数据
  getNetPoint(data: any) {
    return request({
      url: baseUrls + `/stationBaseInfo/selectEquipmentByStationConditions`,
      method: "post",
      data: data,
    });
  },
  // 根据台站id查询测点数据
  getMeasurePoint(data: any) {
    return request({
      url: baseUrls + `/detectionPoint/param/${data.stationId}`,
      method: "get",
      data: data,
    });
  },
  // 查询台站
  getStation(data: Object) {
    return request({
      url:
        BASES +
        "/api/v2/dataEngine/featureCollection/queryFeatureByQueryParameter",
      method: "post",
      data: data,
      responseType: "arraybuffer",
    });
  },
  //表格页面的接口
  //表格查询台站
  getStations(data: Object) {
    return request({
      url: baseUrls + "/stationBaseInfo/boundsList",
      // url: baseUrls + "/stationBaseInfo",
      method: "post",
      data: data,
    });
  },
  // 增加台站
  addStations(data: Object) {
    return request({
      url: baseUrls + "/stationBaseInfo",
      method: "post",
      data: data,
    });
  },
  // 更新台站
  editStations(data: Object) {
    return request({
      url: baseUrls + "/stationBaseInfo",
      method: "put",
      data: data,
    });
  },
  // 删除台站
  delStations(data: any) {
    return request({
      url: baseUrls + `/stationBaseInfo/${data}`,
      method: "delete",
      // params: data,
    });
  },
  // 获取搜索的台网
  getCountry(data: Object) {
    return request({
      url: baseUrls + "/netWorkBaseInfo/index",
      method: "get",
      params: data,
    });
  },
  // 搜索根据台站获取设备
  equipmentList(data: Object) {
    return request({
      url: baseUrls + "/basic/engine",
      method: "get",
      params: data,
    });
  },
  // 根据国家级获取省级单位
  getStationCountry(data: any) {
    return request({
      url: baseUrls + `/netWorkBaseInfo/provincial/${data.countryId}`,
      method: "get",
    });
  },
  // 获取台网单位列表
  getNetWork(data: Object) {
    return request({
      url: BASEURL + "/search/units",
      method: "get",
      params: data,
    });
  },
  // 获取台阵列表
  getTaiwanese(data: any) {
    return request({
      url: BASEURL + "/search/stationArray",
      method: "get",
      params: data,
    });
  },
  //台站管理页面-- 获取台阵列表
  getTaiwan(data: any) {
    return request({
      url: baseUrls + "/stationType/network",
      method: "get",
      params: data,
    });
  },
  // 地图的台站列表
  getStationsEarth(data: any) {
    return request({
      url: baseUrls + "/index/station",
      method: "get",
      params: data,
    });
  },
  // 搜索隶属学科
  getSubjectList(data: any) {
    return request({
      url: baseUrls + "/stationType/network",
      method: "get",
      params: data,
    });
  },
  //台网管理组件 netManage.vue
  //查询台网
  getNetWorkList(data: any) {
    return request({
      url: baseUrls + `/netWorkBaseInfo/extension/${data.id}`,
      method: "get",
      // params: data,
    });
  },
  getNetWorkLists(data: Object) {
    return request({
      url: baseUrls + "/netWorkBaseInfo",
      method: "get",
      params: data,
    });
  },
  //根据台网id获取指定状态的设备 点击台网弹框中的设备 查询表格
  getNetList(data: Object) {
    return request({
      url: baseUrls + "/basic",
      method: "get",
      params: data,
    });
  },
  //根据台网id获取台站数据 点击台网弹框中的台站 查询表格
  getStationList(data: Object) {
    return request({
      url: baseUrls + "/stationBaseInfo",
      method: "get",
      params: data,
    });
  },
  //根据台网id获取测点数据 点击台网弹框中的测点 查询表格
  getMeasureList(data: any) {
    return request({
      url: baseUrls + `/detectionPoint/network/${data.networkId}`,
      method: "get",
      params: data,
    });
  },
  //增加台网
  addNetWork(data: Object) {
    return request({
      // url: BASEURL + "/network/insert",
      url: baseUrls + "/netWorkBaseInfo",
      method: "post",
      data: data,
    });
  },
  //更新台网
  editNetWork(data: Object) {
    return request({
      url: baseUrls + "/netWorkBaseInfo",
      // url: BASEURL + "/network/update",
      method: "put",
      data: data,
    });
  },
  //删除台网
  delNetWork(id: any) {
    return request({
      url: baseUrls + `/netWorkBaseInfo/${id}`,
      // url: BASEURL + "/network/delete",
      method: "delete",
      params: {},
    });
  },
  //地图发布  等值线
  publish(data: Object) {
    return request({
      url: ROOTURL + "/EarthMapToolbox/MapPublishServer/v1/publish",
      method: "post",
      data: data,
    });
  },

  //地理/逆地理编码
  getLocation(address: Object) {
    return request({
      url: `http://restapi.amap.com/v3/geocode/geo/?address=${address}&output=XML&key=ecf79664c77e3a81530c53403a39bf6c`,
      // url: `/map/v3/geocode/geo?address=${address}&output=XML&key=ecf79664c77e3a81530c53403a39bf6c`,
      // url: "http://api.map.baidu.com/geocoding/v3/?address=北京市海淀区上地十街10号&output=json&ak=O0YdkGzpWwnGDa3AS1IZ6ayHkbEDWMsY&callback=showLocation",
      method: "get",
    });
  },
  //查询以发生的地震事件
  seismicQuery(data: Object) {
    return request({
      url: baseUrls + "/event",
      method: "get",
      params: data,
    });
  },
  //根据userId查询台网、台站、测点、设备
  searchAll(userId: Object) {
    return request({
      url: BASEURL + `/search/all/${userId}`,
      method: "get",
    });
  },
  // 获取是否为管理员
  isAdmin(params) {
    return request({
      url: BASEURL + `/search/adjust`,
      method: "get",
      params,
    });
  },
  // 获取站点设备波形图
  getData(data: any) {
    return request({
      // url: BASES + `/api/v1/observer/storage/waveform/device`,
      url: BASES + `/api/v1/observer/storage/waveform/live/device`,
      method: "get",
      params: data,
    });
  },
  // 根据StreamID查询波形数据
  searchStreamID(data: any) {
    return request({
      url: BASES + `/api/v1/observer/storage/waveform/stream`,
      method: "get",
      params: data,
    });
  },
  // 查询设备接口
  equipmentTypeFun(data: any) {
    return request({
      url:
        BASES +
        `/api/v2/dataEngine/featureCollection/queryFeatureByQueryParameter`,
      method: "post",
      data: data,
    });
  },
  // 根据设备id查询相关信息
  queryInfo(data: any) {
    return request({
      url: BASES + `/api/v1/operation/system/basic/selectInstId`,
      method: "get",
      params: data,
    });
  },
};

export default stationsInfoManage;
