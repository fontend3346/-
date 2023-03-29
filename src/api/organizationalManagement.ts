import request from "@/utils/request";

// let BASEROOT = 'http://172.16.20.101:30200/tj/api/v1/user'
// import gateway from "../../public/static/config.js";
// const BASEROOT = gateway.baseUrl + '/api/v1/user';

const BASEROOT = window.gateway.baseUrl + "/api/v1/user";

// 机构管理
const organizationalManagement = {
  //查询角色列表
  getTeamInfoList(data: any) {
    return request({
      url: BASEROOT + "/team/getTeamInfoList",
      method: "get",
      params: data,
    });
  },
  // 新增表单
  createTeamReq(data: any) {
    return request({
      url: BASEROOT + "/team/createTeamReq",
      method: "post",
      data: data,
    });
  },
  // 更新表单
  updateTeamInfo(data: any) {
    return request({
      url: BASEROOT + "/team/updateTeamInfo",
      method: "PUT",
      data: data,
    });
  },
  // 删除表单
  removeTeam(data: any) {
    return request({
      url: BASEROOT + "/team/removeTeam",
      method: "delete",
      params: data,
    });
  },
};

export default organizationalManagement;
