import request from "@/utils/request";
// import gateway from "../../public/static/config";
let baseUrl = (window as any).gateway.baseUrl
let url = baseUrl + "/earthquake";

const timeReal = {
  // 获取探测数据
  getData(data: any) {
    return request({
      url: url + '/collect/data/list',
      method: 'get',
      params: data,
    })
  },
  // 获取QB数据
  getQBData(data: any) {
    return request({
      url: url + '/information/data/list',
      method: 'get',
      params: data,
    })
  },
  // 获取model数据
  getModelData(data: any) {
    return request({
      url: url + '/model/data/list',
      method: 'get',
      params: data,
    })
  },
  // 获取基础数据
  getBasicsData(data: any) {
    return request({
      url: url + '/basics/data/list',
      method: 'get',
      params: data,
    })
  },
  // 获取预处理数据
  getPretreatmentData(data: any) {
    return request({
      url: url + '/pretreatment/data/list',
      method: 'get',
      params: data,
    })
  },
  // 获取预处理数据
  getKnowledgeData(data: any) {
    return request({
      url: url + '/knowledge/data/list',
      method: 'get',
      params: data,
    })
  },
  getLocal(data: any) {
    return request({
      url:
        baseUrl +
        "/api/v2/dataEngine/featureCollection/queryFeatureByQueryParameter",
      method: "post",
      data,
    });
  }
};

export default timeReal;
