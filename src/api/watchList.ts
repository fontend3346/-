// 值班排班
import request from "@/utils/request";
let DATA = (window as any).gateway.baseUrl;

const watchList = {
  //生成排班表
  generateRoster(data: any) {
    return request({
      url: DATA + "/api/v1/operation/onduty/duty/rostering",
      method: "post",
      data,
    });
  },
  //获取排班表(日历)
  getRoster(data: any) {
    return request({
      url: DATA + "/api/v1/operation/onduty/duty/rosteringByDate",
      method: "post",
      data,
    });
  },
  //获取排班表(表格)
  getRosterTable(data: any) {
    return request({
      url: DATA + "/api/v1/operation/onduty/duty/rosteringPage",
      method: "post",
      data,
    });
  },
  // 列表删除
  deleteRoster(id) {
    return request({
      url: DATA + `/api/v1/operation/onduty/duty/rostering/${id}`,
      method: "DELETE",
    });
  },
  //替班换班
  replaceRoster(data: any) {
    return request({
      url: DATA + "/api/v1/operation/onduty/duty/rostering/replace",
      method: "put",
      data: data,
    });
  },
  //排班信息预览
  previewRoster(data: any) {
    return request({
      url: DATA + "/api/v1/operation/onduty/duty/rostering/preview",
      method: "post",
      data,
    });
  },
  // 导入排班表
  importRoster(data: any) {
    return request({
      url: DATA + "/api/v1/operation/onduty/duty/rostering/import",
      method: "post",
      data,
    });
  },
  // 导出排班表
  exportRoster(data: any) {
    return request({
      url: DATA + "/api/v1/operation/onduty/duty/rostering/export",
      method: "get",
      params: data,
      responseType: "arraybuffer",
    });
  },
  //排班--查人员
  queryPeople(data: any) {
    return request({
      url: DATA + "/api/v1/user/assetUser/assetUserByParam",
      method: "get",
      params: data,
    });
    // return request({
    //   url: DATA + "/api/v1/user/assetUser",
    //   method: "get",
    //   params: data,
    // });
  },
};

export default watchList;
