import request from "@/utils/request";
const baseUrl = window.gateway.baseUrl + "/api/v1/operation/device";
//权限管理接口
const authorityLimit = {
  //获取/搜索权限列表
  getList() {
    return request({
      url: baseUrl + "/statistics/device",
      method: "get",
      // params: data,
    });
  },
  //查询台网对应的台站-柱状图
  networkStationInfo() {
    return request({
      url: baseUrl + "/statistics/station/unit",
      method: "get",
      // data: data,
    });
  },
  //查询台阵对应的台站-柱状图
  stationInfo() {
    return request({
      url: baseUrl + "/statistics/station/type",
      method: "get",
      // data: data,
    });
  },
  // 查询设备学科 - 柱状图;
  facilitySub() {
    return request({
      url: baseUrl + "/statistics/device/subject",
      method: "get",
      // data: data,
    });
  },
  // //批量删除
  // batchList(data: any) {
  //   return request({
  //     url: baseUrl + "/user/authority/updateStatusResourceInfo",
  //     method: "put",
  //     data: data,
  //   });
  // },
  // //获取资源
  // getSource(data: any) {
  //   return request({
  //     url: baseUrl + "/user/authority/getAuthorityResources",
  //     method: "get",
  //     params: data,
  //   });
  // },
  // //添加资源
  // createSource(data: any) {
  //   return request({
  //     url: baseUrl + "/user/authority/createResourceAuthority",
  //     method: "post",
  //     data: data,
  //   });
  // },
};

export default authorityLimit;
