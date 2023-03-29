import request from "@/utils/request";
const baseUrl = window.gateway.baseUrl;
//登录
const login = {
  //登录
  getList(data: any) {
    return request({
      url: baseUrl + "/login-server/userLogin",
      method: "post",
      data: data,
      xApi: "engine.login.userLogin",
    });
  },
};

export default login;
