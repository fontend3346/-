import request from "@/utils/request";


let BASEROOT = `${(window as any).gateway.baseUrl}/tj/api/v1/user`;

const systemManage = {
  //查询资源
  getJurisdiction (data:Object) {
    return request({
      // url: BASEROOT + "/resourceManagement/getMenuAuthorityResourcesParentId",
      url: `http://172.16.20.81:8080/tj/api/v1/user/resourceManagement/getMenuAuthorityResourcesParentId`,
      method: "get",
      params: data,
    });
  },
};

export default systemManage;
