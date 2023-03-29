import request from "@/utils/request";

const BASEROOT = window.gateway.baseUrl + "/api/v1/user";
//角色管理
const roleManage = {
  // // 删除角色下的用户
  // clearForRole(data: any) {
  //   return request({
  //     url: BASEROOT + "/role/user",
  //     method: "delete",
  //     data: data,
  //   });
  // },
  // // 增加角色下的用户
  // addRoleUser(data: any) {
  //   return request({
  //     url: BASEROOT + "/role/batchAllotForRole",
  //     method: "post",
  //     data: data,
  //   });
  // },
  // // 查询角色下的用户
  // getRoleUsre(data: any) {
  //   return request({
  //     url: BASEROOT + "/role/user",
  //     method: "post",
  //     data: data,
  //   });
  // },
  //查询角色列表
  queryRoleList(data: any) {
    return request({
      url: BASEROOT + "/role",
      method: "get",
      params: data,
    });
  },
  //新建角色
  createRoles(data: any) {
    return request({
      url: BASEROOT + "/role",
      method: "post",
      data: data,
    });
  },
  //修改角色
  updateRoles(data: any) {
    return request({
      url: BASEROOT + "/role",
      method: "put",
      data: data,
    });
  },
  //删除角色
  deleteForRole(data: any) {
    return request({
      url: BASEROOT + "/role",
      method: "delete",
      params: data,
    });
  },
  //获取角色下的权限
  getRolesAuthorityInfo(data: any) {
    return request({
      url: BASEROOT + `/role/authority/${data.roleCode}`,
      method: "get",
      params: data,
    });
  },
  //新增角色下的权限
  insertRolesAuthority(data: any) {
    return request({
      url: BASEROOT + "/role/authority",
      method: "post",
      data: data,
    });
  },
  // //删除角色下的权限
  // deleteRolesAuthority(data: any) {
  //   return request({
  //     url: BASEROOT + "/role/deleteRolesAuthority",
  //     method: "post",
  //     data: data,
  //   });
  // },
  //获取角色下的 群组
  getRoleUser(data: any) {
    return request({
      url: BASEROOT + "/role/getRoleUser",
      method: "get",
      params: data,
    });
  },
  //新增角色下的群组
  deptAllotRole(data: any) {
    return request({
      url: BASEROOT + "/role/deptAllotRole",
      method: "post",
      data: data,
    });
  },
  //删除角色下的群组
  deleteRoleUser(data: any) {
    return request({
      url: BASEROOT + "/role/deleteRoleUser",
      method: "post",
      data: data,
    });
  },
  //获取用户的角色列表
  getRolesByUserId(data: Object) {
    return request({
      url: BASEROOT + `/userModule/roles/${data.teamId}/${data.userId}`,
      method: "get",
      // params: data,
    });
  },
  //获取用户的角色级别
  rolesByUserLevel(data: Object) {
    return request({
      url: BASEROOT + "/role/visiableRoleList",
      method: "get",
      // params: data,
    });
  },
};

export default roleManage;
