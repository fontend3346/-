// 日报管理
import request from "@/utils/request";
let DATA = (window as any).gateway.baseUrl + "/api/v1";

const dutyManage = {
  //获取日报人员的userId
  getPersonnalId(userId: any) {
    return request({
      url: DATA + `/user/assetUser/assetUserIdAndName/${userId}`,
      method: "get",
    });
  },
  //日报分页查询
  getList(data: any) {
    return request({
      url: DATA + "/operation/onduty/report/listPage",
      method: "post",
      data: data,
    });
  },
  //查询用户所在的台网|台站
  stationList(data: any) {
    return request({
      url: DATA + `/user/assetUser/unitsByUserId/${data.userId}`,
      method: "get",
      // params: data,
    });
  },
  //获取特定台站下测点
  listPoint(stationId) {
    return request({
      url: DATA + `/operation/onduty/report/listPointName/${stationId}`,
      method: "get",
      // params: data,
    });
  },
  //获取设备
  unusualPonint(pointId) {
    return request({
      url: DATA + `/operation/onduty/report/listDeviceName/${pointId}`,
      method: "get",
      // params: data,
    });
  },
  //新增
  addList(data: any) {
    return request({
      // url: DATA + "/operation/onduty/report/save",
      url: DATA + "/operation/onduty/report",
      method: "post",
      data: data,
    });
  },
  //获取日报内容
  updateList(data: any) {
    return request({
      url: DATA + `/operation/onduty/report/getReportContent`,
      method: "post",
      data: data,
    });
  },
  //获取编辑内容
  updatePort(data: any) {
    return request({
      // url: DATA + "/operation/onduty/report/update",
      url: DATA + "/operation/onduty/report",
      method: "put",
      data: data,
    });
  },
  //删除
  batchList(id: any) {
    return request({
      url: DATA + `/operation/onduty/report/remove/${id}`,
      method: "DELETE",
    });
  },
  //日报交接数据
  dataContent(id: any) {
    return request({
      url: DATA + `/operation/onduty/report/getExceptionInfo/${id}`,
      method: "get",
      // params: data,
    });
  },
  //台网查询台站
  seatchStation(data: any) {
    return request({
      url: DATA + "/operation/system/stationBaseInfo/networkList",
      method: "post",
      data: data,
    });
  },
  //填写人和交接人
  getStaffId(data: any) {
    return request({
      url: DATA + "/operation/onduty/report/getStaffId",
      method: "get",
      params: data,
    });
  },
  //填写人和交接人
  dailyReportDate(data: any) {
    return request({
      url: DATA + "/operation/onduty/report/dailyReportDate",
      method: "post",
      data: data,
    });
  },
  //查询当前账号是否是管理员
  adjustAdmin(data: any) {
    return request({
      url: DATA + "/user/role/adjustAdmin",
      method: "get",
      params: data,
    });
  },
};

export default dutyManage;
