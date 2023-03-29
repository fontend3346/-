import request from "@/utils/request";
const baseUrl = window.gateway.baseUrl + "/api/v1";
//权限管理接口
const authorityLimit = {
  //获取/搜索权限列表
  getList(data: any) {
    return request({
      url: baseUrl + "/user/authority",
      method: "get",
      params: data,
    });
  },
  //创建权限列表
  createList(name: any, desc: any, type: any) {
    return request({
      url: baseUrl + `/user/authority/${name}/${desc}/${type}`,
      method: "post",
      // data: data,
    });
  },
  //修改/删除权限列表
  updateList(data: any) {
    return request({
      url: baseUrl + `/user/authority`,
      method: "PUT",
      data: data,
    });
  },
  //批量删除
  batchList(data: any) {
    return request({
      url: baseUrl + "/user/authority/status",
      method: "delete",
      params: data,
    });
  },
  //获取资源
  getSource(data: any) {
    return request({
      url: baseUrl + `/user/authority/authorityResources/${data.authorityCode}`,
      method: "get",
      // params: data,
    });
  },
  //添加资源
  createSource(data: any) {
    return request({
      url: baseUrl + "/user/authority/authorityResource",
      method: "post",
      data: data,
    });
  },
  //获取权限menuList
  account(data: any) {
    return request({
      url: baseUrl + "/user/resourceManagement/getMenuAuthorityResources",
      method: "post",
      data: data,
    });
  },
  //获取权限级别
  rolesByUserLevel() {
    return request({
      url: baseUrl + "/user/authority/visiableAuthList",
      method: "get",
    });
  },
};

export default authorityLimit;
