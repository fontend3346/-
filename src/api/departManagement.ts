import request from "@/utils/request";
// let BASEROOT = 'http://172.16.20.101:30200/tj/api/v1/user'
// import gateway from "../../public/static/config";
const BASEROOT = (window as any).gateway.baseUrl + "/api/v1/user/";

// 群组管理接口
const departManagement = {
  // // 删除组织
  removeTeam: (data: any) => {
    return request({
      url: BASEROOT + "team/removeDept",
      method: "delete",
      params: data,
    });
  },
  // 删除组织下员工
  deleteTeamUser(data: any) {
    return request({
      url: BASEROOT + "team/removeEmplDept",
      method: "delete",
      data: data,
    });
  },
  // 添加组织下员工
  addTeamUser(data: any) {
    return request({
      url: BASEROOT + "team/setEmplDept",
      method: "post",
      data: data,
    });
  },
  // 获取组织下员工
  getTeamUser(data: any) {
    return request({
      url: BASEROOT + "team/getDeptSimpleEmplInfoPage",
      method: "get",
      params: data,
    });
  },
  // 更新组织
  updateTeam: (data: any) => {
    return request({
      url: BASEROOT + "team/updateDept",
      method: "put",
      data: data,
    });
  },
  // 新增组织
  createTeam: (data: any) => {
    return request({
      url: BASEROOT + "team/createDept",
      method: "post",
      data: data,
    });
  },
  // 添加部门下员工
  addDeptUser(data: any) {
    return request({
      url: BASEROOT + "dept/setEmplDept",
      method: "post",
      data: data,
    });
  },
  // 删除部门下员工
  deleteDeptUser(data: any) {
    return request({
      url: BASEROOT + "dept/removeEmplDept",
      method: "delete",
      data: data,
    });
  },
  // 获取部门下员工
  getDeptUser(data: any) {
    return request({
      url: BASEROOT + "dept/getDeptSimpleEmplInfoPage",
      method: "get",
      params: data,
    });
  },
  // 获取没有部门的员工
  getNoneUser() {
    return request({
      url: BASEROOT + "dept/getNoDeptUser",
      method: "get",
    });
  },
  // 获取部门列表
  getDepartList: (data: any) => {
    return request({
      url: BASEROOT + "dept",
      method: "get",
      params: data,
    });
  },
  // 创建部门
  createDeaprtMan: (data: any) => {
    return request({
      url: BASEROOT + "dept/createDept",
      // url: 'http://10.1.31.41:8080/tj/api/v1/user/dept/createDept',
      method: "post",
      data: data,
    });
  },
  // 更新部门
  updateDeaprt: (data: any) => {
    return request({
      url: BASEROOT + "dept/updateDept",
      // url: 'http://10.1.31.41:8080/tj/api/v1/user/dept/updateDept',
      method: "put",
      data: data,
    });
  },
  // // 删除部门
  removeDept: (data: any) => {
    return request({
      url: BASEROOT + "dept/removeDept",
      method: "delete",
      params: data,
    });
  },
  // 批量删除部门
  queryDeleteForRole: (data: any) => {
    return request({
      url: BASEROOT + "dept/batchRemoveDept",
      method: "delete",
      params: data,
    });
  },
  // 获取当前部门下的员工信息
  getCurrentDept: (data: any) => {
    return request({
      url: BASEROOT + "dept/getDeptSimpleEmplInfoPage",
      method: "get",
      params: data,
    });
  },
  // 批量添加/删除部门员工
  queryAddCurrent: (data: any) => {
    return request({
      url: BASEROOT + "dept/removeOrAddEmplDeptBatch",
      method: "post",
      data: data,
    });
  },
  // 批量移除部门员工
  // queryRemoveCurrent (data) {
  //   return request({
  //     url: BASEROOT + '/dept/setDeptEmplBatch',
  //     method: 'delete',
  //     params: data
  //   })
  // }

  getList(data: any) {
    return request({
      url: BASEROOT + "user/queryUserList",
      method: "get",
      params: data,
    });
  },
};

export default departManagement;
