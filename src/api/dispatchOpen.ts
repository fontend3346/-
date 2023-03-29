// 突发事件处置登记
import request from "@/utils/request";
let DATA = (window as any).gateway.baseUrl + "/api/v1/operation";
let PERAPI = (window as any).gateway.baseUrl + "/api/v1/user/assetUser";

const dispatchOpen = {
  // 目标台站
  targetStationApi(subjectId: any) {
    return request({
      url: DATA + `/system/stationBaseInfo/subStation/${subjectId}`,
      method: "get",
      // params: data,
    });
  },
  // 处理人
  conductor(data: any) {
    return request({
      url: PERAPI + `/assetUserByParam`,
      method: "get",
      params: data,
    });
  },
  // 添加工单
  addOrder(data: Object) {
    return request({
      url: DATA + "/workorder/workorder/insert",
      method: "POST",
      data: data,
    });
  },
  // 查询台站所属台网
  searchNetId(data: Object) {
    return request({
      url: DATA + "/system/netWorkBaseInfo/locateNetwork",
      method: "get",
      params: data,
    });
  },
};

export default dispatchOpen;
