import request from "@/utils/request";

let BASEURL = (window as any).gateway.baseUrl;
// 元数据管理模块
const metaDataManage = {
  // 台站类型页面
  // 查询
  stationSearch: (params: any) => {
    return request({
      url:
        BASEURL +
        "/api/v2/dataEngine/featureCollection/queryFeatureByQueryParameter",
      method: "post",
      data: params,
    });
  },
  //新增
  stationAdd: (params: any) => {
    return request({
      url: BASEURL + "/api/v2/dataEngine/featureCollection/addFeature",
      method: "post",
      data: params,
    });
  },
  //修改
  stationUpdate: (params: any) => {
    return request({
      url: BASEURL + "/api/v2/dataEngine/featureCollection/updateFeature",
      method: "post",
      data: params,
    });
  },
  //删除
  stationDelete: (params: any) => {
    return request({
      url: BASEURL + "/api/v2/dataEngine/featureCollection/deleteFeature",
      method: "post",
      data: params,
    });
  },
  // 地震学科分类管理
  // 查询
  subjectSearch: (params: any) => {
    return request({
      url:
        BASEURL +
        "/api/v2/dataEngine/featureCollection/queryFeatureByQueryParameter",
      method: "post",
      data: params,
    });
  },
  //新增
  subjectAdd: (params: any) => {
    return request({
      url: BASEURL + "/api/v2/dataEngine/featureCollection/addFeature",
      method: "post",
      data: params,
    });
  },
  //修改
  subjectUpdate: (params: any) => {
    return request({
      url: BASEURL + "/api/v2/dataEngine/featureCollection/updateFeature",
      method: "post",
      data: params,
    });
  },
  //删除
  subjectDelete: (params: any) => {
    return request({
      url: BASEURL + "/api/v2/dataEngine/featureCollection/deleteFeature",
      method: "post",
      data: params,
    });
  },
  // 仪器类型管理 、引擎页面接口
  // 查询
  instrumentSearch: (params: any) => {
    return request({
      url:
        BASEURL +
        "/api/v2/dataEngine/featureCollection/queryFeatureByQueryParameter",
      method: "post",
      data: params,
    });
  },
  //新增
  instrumentAdd: (params: any) => {
    return request({
      url: BASEURL + "/api/v2/dataEngine/featureCollection/addFeature",
      method: "post",
      data: params,
    });
  },
  //修改
  instrumentUpdate: (params: any) => {
    return request({
      url: BASEURL + "/api/v2/dataEngine/featureCollection/updateFeature",
      method: "post",
      data: params,
    });
  },
  //删除
  instrumentDelete: (params: any) => {
    return request({
      url: BASEURL + "/api/v2/dataEngine/featureCollection/deleteFeature",
      method: "post",
      data: params,
    });
  },
};
export default metaDataManage;
