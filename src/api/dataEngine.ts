import request from "@/utils/request";
//let url = "https://piecloud.piesat.cn/hq-server";
let baseUrl = (window as any).gateway.baseUrl + "/api/v2";
let nameUrl = (window as any).gateway.baseUrl + "/v1/api";

const dataEngine = {
  //获取数据集列表
  getList(data: any) {
    return request({
      url: baseUrl + "/dataEngine/data/queryCollectionInfoByQueryParam",
      method: "post",
      data: data,
    });
  },
  // 根据关键字搜索地名
  getLoadName(data: any) {
    return request({
      url: nameUrl + "/config/tips2",
      method: "get",
      params: data,
    });
  },
  //查询数据集包含的所有字段
  getInfo(data: any) {
    return request({
      url: baseUrl + "/dataEngine/data/queryFieldInfo",
      method: "get",
      params: data,
    });
  },
  //查询矢量信息
  getGeobufByQueryParameter(data: any) {
    return request({
      url: baseUrl + "/dataEngine/featureCollection/getGeobufByQueryParameter",
      // url:"https://piecloud.piesat.cn:8443/api/v2/dataEngine/data/queryCollectionInfoByIntersects",
      method: "post",
      data: data,
      responseType: "arraybuffer",
    });
  },

};

export default dataEngine;
