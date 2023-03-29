import request from "@/utils/request";      //火山台阵分系统
// import gateway from "public/static/config";

// let BASEROOT = `${gateway.baseUrl}/tj/api/v1/user`;
let BASEROOT = (window as any).gateway.baseUrl;

const volcanoStage = {
  //查询台阵信息
  getStationsList(id: any) {
    return request({
      url: BASEROOT + `/api/v1/operation/system/station/array/query/${id}`,
      // url: `http://10.1.7.56:8088/api/v1/operation/system/station/array/query/${id}`,
      method: "get",
      params: {},
    });
  },
  //查询台阵信息
  getArrayType() {
    return request({
      url: BASEROOT + `/api/v1/operation/system/station/array/type/query`,
      // url: `http://10.1.7.56:8088/api/v1/operation/system/station/array/type/query`,
      method: "get",
      params: {},
    });
  },
  //新建台阵
  createArray(data: any) {
    return request({
      url: BASEROOT + `/api/v1/operation/system/station/array/create`,
      // url: `http://10.1.7.56:8088/api/v1/operation/system/station/array/create`,
      method: "post",
      data: data,
    });
  },
  //删除台阵
  delArray(id: any) {
    return request({
      url: BASEROOT + `/api/v1/operation/system/station/array/delete/${id}`,
      // url: `http://10.1.7.56:8088/api/v1/operation/system/station/array/delete/${id}`,
      method: "delete",
      params: {},
    });
  },
};

export default volcanoStage;
