// 突发事件处置登记
import request from "@/utils/request";
let DATA = (window as any).gateway.baseUrl + "/api/v1/operation/workorder";

const dispatchCompleted = {
  //下载导出
  exportData(data: any) {
    return request({
      url: DATA + `/workorder/export`,
      method: "get",
      params: data,
      responseType: "blob",
    });
  },
  //添加案例
  addCase(data: any) {
    return request({
      url: DATA + `/workorder/setCaseData`,
      method: "PUT",
      data: data,
    });
  },
};

export default dispatchCompleted;
