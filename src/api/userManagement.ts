import request from "@/utils/request";
const BASEROOT = window.gateway.baseUrl + "/api/v1/";
// 用户管理
const userManagement = {
  //查询用户列表
  getList(data: any) {
    return request({
      url: BASEROOT + "user/queryUserList",
      method: "get",
      params: data,
    });
  },
  //查询用户角色列表
  queryUserRoleList(data: any) {
    return request({
      url: BASEROOT + "user/userModule",
      method: "get",
      params: data,
    });
  },
  //查询机构
  getOrganizationList(data: any) {
    return request({
      url: BASEROOT + "/team/getTeamInfoList",
      method: "get",
      params: data,
    });
  },
  //查询角色
  getRoleList(data: any) {
    return request({
      url: BASEROOT + "role/queryRoleList",
      method: "get",
      params: data,
    });
  },
  //查询资产绑定人员
  getAssetUser(data: any) {
    return request({
      url: BASEROOT + "user/assetUser",
      method: "get",
      params: data,
    });
  },
  //新增用户
  addUserList(data: any) {
    return request({
      url: BASEROOT + "user/userModule",
      method: "post",
      data: data,
    });
  },
  //删除用户
  deleteUserList(data: any) {
    return request({
      url: BASEROOT + `user/userModule/DUser/${data}`,
      method: "get",
      // data: data,
    });
  },
  //修改用户信息
  updataUserList(data: any) {
    return request({
      url: BASEROOT + "user/userModule/info",
      method: "post",
      data: data,
    });
  },
  //查询系统资源
  // getSystemList(data: any) {
  //   return request({
  //     url: Limt + "/systemResource/getSystemResource",
  //     method: "get",
  //     params: data,
  //   });
  // },
  // 禁用变启用
  accountList(data: any) {
    return request({
      url:
        BASEROOT +
        `user/userModule/accountStatus/${data.userId}/${data.activeState}`,
      method: "post",
    });
  },
  // 查询用户下的角色
  getRoleUsre(data: any) {
    return request({
      url: BASEROOT + `user/userModule/roles/${data.teamId}/${data.userId}`,
      method: "get",
      // data: data,
    });
  },
  // 增加用户下的角色
  addRoleUser(data: any) {
    return request({
      url: BASEROOT + "user/userModule/roles",
      method: "post",
      data: data,
    });
  },

  // 删除角色下的用户
  clearForRole(data: any) {
    return request({
      url: BASEROOT + "user/role/user",
      method: "delete",
      data: data,
    });
  },
};

export default userManagement;
