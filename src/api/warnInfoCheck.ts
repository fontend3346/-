// 预警信息发布登记
import request from "@/utils/request";
let DATA = (window as any).gateway.baseUrl;

const warnInfoCheck = {
  // 查询列表
  getWarn(data: Object) {
    return request({
      url: DATA + "/api/v1/operation/onduty/warning/page",
      method: "POST",
      data: data,
    });
  },
  //添加
  addWarn(data: Object) {
    return request({
      url: DATA + "/api/v1/operation/onduty/warning",
      method: "POST",
      data: data,
    });
  },
  // 修改
  updateWarn(data: Object) {
    return request({
      url: DATA + "/api/v1/operation/onduty/warning",
      method: "put",
      data: data,
    });
  },
  // 删除
  deleteWarn(data: Object) {
    return request({
      url: DATA + "/api/v1/operation/onduty/warning",
      method: "DELETE",
      params: data,
    });
  },
  // 导出
  exportWarn(data: Object) {
    return request({
      url: DATA + "/api/v1/operation/onduty/warning/export",
      method: "get",
      params: data,
      responseType: "arraybuffer",
    });
  },
};

export default warnInfoCheck;
