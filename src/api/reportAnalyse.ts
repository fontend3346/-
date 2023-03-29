// 报表分析
import request from "@/utils/request";
let DATA = (window as any).gateway.baseUrl + "/api/v1";

const reportAnalyse = {
  //历史数据-异常类型饼图
  exceptionTypeList(data: Object) {
    return request({
      url: DATA + "/operation/onduty/data/station",
      method: "post",
      data: data,
    });
  },
};

export default reportAnalyse;
