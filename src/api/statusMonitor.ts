import request from "@/utils/request";
// import gateway from "public/static/config";

let BASEROOT = (window as any).gateway.baseUrl + "/v1";

const statusMonitor = {
  //查询台站和设备状态
  stationInsStatus(data: any) {
    return request({
      url:
        BASEROOT +
        `/status/monitor/StationMonitorStatus/getStationInstStatusInstStatus`,
      method: "get",
      params: data,
    });
  },
  //按台站查询设备状态
  getInstStatus(data: any) {
    return request({
      url:
        BASEROOT + `/status/monitor/instmonitorstatus/InstStatusByStationId`,
      method: "get",
      params: data,
    });
  },
  //获取各个台站分类
  stationClassify(data: any) {
    return request({
      url: BASEROOT + `/status/monitor/instmonitorstatus/getInstEveryOneCount`,
      method: "get",
      params: data,
    });
  },
  //台网下的设备正确率统计（热力图）
  equipmentStatistics(data: any) {
    return request({
      url: BASEROOT + `/status/monitor/equipmentStatistics`,
      method: "get",
      params: data,
    });
  },
  //查询指定数据采集设备基础信息（设备详情）
  getEquipDetails(unitId: any) {
    return request({
      url: BASEROOT + `/refTek/network/monitor/details/base/${unitId}`,
      method: "get",
    });
  },
  //查询指定数据采集设备基础信息图片（设备详情）
  getEquipDetailsImg(unitId: any) {
    return request({
      url: BASEROOT + `/refTek/network/monitor/details/graph/${unitId}`,
      method: "get",
    });
  },
};

export default statusMonitor;
