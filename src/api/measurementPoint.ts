import request from "@/utils/request";
let BASEURL = (window as any).gateway.baseUrl + "/api/v1/operation/device";
let NEWURL = (window as any).gateway.baseUrl + "/api/v1/operation/system";
// 测点管理
const measurementPoint = {
  // 根据id查弹框数据
  searchId(data: Object) {
    return request({
      url: BASEURL + "/detection/point/select",
      method: "get",
      params: data,
    });
  },

  //测点管理组件表格 measurementList.vue
  //查询测点
  getPoint(data: Object) {
    return request({
      url: NEWURL + "/detectionPoint",
      method: "get",
      params: data,
    });
  },
  //增加测点
  addPoint(data: Object) {
    return request({
      url: NEWURL + "/detectionPoint",
      method: "post",
      data: data,
    });
  },
  //更新测点
  editPoint(data: Object) {
    return request({
      url: NEWURL + "/detectionPoint/updateById",
      method: "put",
      data: data,
    });
  },
  //删除测点
  delPoint(data: any) {
    return request({
      url: NEWURL + `/detectionPoint/${data.pointId}`,
      method: "delete",
      params: data,
    });
  },
  // 根据测点id查询相关信息
  queryInfo(id: any) {
    return request({
      url: NEWURL + `/detectionPoint/details/${id}`,
      method: "get",
      params: {},
    });
  }
};

export default measurementPoint;
