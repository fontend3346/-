import request from "@/utils/request";
let BASEURL =
  (window as any).gateway.baseUrl + "/api/v1/operation/system/place";

const placeManage = {
  // 获取观测场地
  getPlaces(data: Object) {
    return request({
      url: BASEURL,
      method: "get",
      params: data,
    });
  },
  // 新增观测场地
  addPlaces(data: Object) {
    return request({
      url: BASEURL,
      method: "post",
      data,
    });
  },
  // 编辑观测场地
  editPlaces(data: Object) {
    return request({
      url: BASEURL,
      method: "put",
      data,
    });
  },
  // 删除观测场地
  deletePlaces(data: Object) {
    return request({
      url: BASEURL,
      method: "delete",
      params: data,
    });
  },
  // 禁用观测场地
  disablePlaces(data: Object) {
    return request({
      url: BASEURL + "/disable",
      method: "get",
      params: data,
    });
  },
  // 启用观测场地
  enablePlaces(data: Object) {
    return request({
      url: BASEURL + "/enable",
      method: "get",
      params: data,
    });
  },
};

export default placeManage;
