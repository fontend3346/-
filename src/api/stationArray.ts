//台/阵元数据;
import request from "@/utils/request";
let DATA = (window as any).gateway.baseUrl + "/api/v1/operation/device";

const stationArray = {
  // 获取-台/阵
  getList(data: any) {
    return request({
      url: DATA + "/stationType",
      method: "get",
      params: data,
    });
  }, // 获取-台/阵
  addList(data: any) {
    return request({
      url: DATA + "/stationType",
      method: "post",
      data: data,
    });
  },
  updateList(data: any) {
    return request({
      url: DATA + "/stationType",
      method: "put",
      data: data,
    });
  },
  deleteList(data: any) {
    return request({
      url: DATA + "/stationType",
      method: "DELETE",
      params: data,
    });
  },
};

export default stationArray;
