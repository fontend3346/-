// 突发事件处置登记
import request from "@/utils/request";
let DATA = (window as any).gateway.baseUrl;

const disposalCheck = {
  // 查询列表
  getAbnormal(data: Object) {
    return request({
      url: DATA + "/api/v1/operation/onduty/exception/page",
      method: "POST",
      data: data,
    });
  },
  //添加
  addAbnormal(data: Object) {
    return request({
      url: DATA + "/api/v1/operation/onduty/exception",
      method: "POST",
      data: data,
    });
  },
  // 修改
  updateAbnormal(data: Object) {
    return request({
      url: DATA + "/api/v1/operation/onduty/exception",
      method: "put",
      data: data,
    });
  },
  // 删除
  deletaAbnormal(data: Object) {
    return request({
      url: DATA + "/api/v1/operation/onduty/exception",
      method: "DELETE",
      params: data,
    });
  },
  // 导出
  exportAbnormal(data: Object) {
    return request({
      url: DATA + "/api/v1/operation/onduty/exception/export",
      method: "get",
      params: data,
      responseType: "arraybuffer",
    });
  },
};

export default disposalCheck;
