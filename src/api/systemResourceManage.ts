import request from "@/utils/request";
const BASEROOT = window.gateway.baseUrl + "/api/v1";

const systemResourceManage = {
  //查询资源
  selectResourceInfo: (data: any) => {
    return request({
      url: BASEROOT + "/user/resourceManagement",
      method: "get",
      params: data,
    });
  },
  //新增资源
  insertResourceInfo: (data: any) => {
    return request({
      url: BASEROOT + "/user/resourceManagement",
      method: "post",
      data: data,
    });
  },
  //修改资源
  updateResourceInfo: (data: any) => {
    return request({
      url: BASEROOT + "/user/resourceManagement",
      method: "put",
      data: data,
    });
  },
  //删除资源
  deleteResourceInfo: (data: any) => {
    return request({
      url: BASEROOT + "/user/resourceManagement",
      method: "delete",
      data: data,
    });
  },
  //拖拽资源
  updateResourceManage: (data: any) => {
    return request({
      url: BASEROOT + "/user/resourceManagement/resourcePosition",
      method: "put",
      data: data,
    });
  },
};

export default systemResourceManage;
