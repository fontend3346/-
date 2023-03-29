// 突发事件处置登记
import request from "@/utils/request";
let DATA = (window as any).gateway.baseUrl + "/api/v1/operation/workorder";
let NETURL = (window as any).gateway.baseUrl + "/api/v1/user/assetUser";

const dispatchPending = {
  //查询表格
  getDataList(data: Object) {
    return request({
      url: DATA + "/workorder/page",
      method: "post",
      data: data,
    });
  },
  //查询台网
  getNetList(data: any) {
    return request({
      url: NETURL,
      method: "get",
      params: data,
    });
  },
  //查询台站
  getStationList(userId: any) {
    return request({
      url: NETURL + `/stationInfo/${userId}`,
      method: "get",
    });
  },
  //查询流程
  processList(data: any) {
    return request({
      url: DATA + `/workorder/process/list`,
      method: "post",
      data: data,
    });
  },
  //添加流程
  addProcessList(data: any) {
    return request({
      url: DATA + `/workorder/process/insert`,
      method: "post",
      data: data,
    });
  },
  //下载附件
  exportData(data: any) {
    return request({
      url: DATA + `/workorder/file/fileId`,
      method: "get",
      params: data,
      responseType: "blob",
    });
  },
};

export default dispatchPending;
