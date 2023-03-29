import request from "@/utils/request";
// import gateway from "../../public/static/config";

// let ROOT = `http://10.1.52.33:8099/earthquake`;
let ROOT = `${(window as any).gateway.baseUrl}/earthquake`;


const comAnalysis = {
  //查询地震数据
  getQuakeData(data: Object) {
    return request({
      url: ROOT + '/rsnDarfield/quary/time',
      method: "get",
      params: data,
    });
  },
  //根据类型查询数据
  getData(data: Object) {
    return request({
      url: ROOT + '/rsnDarfield/quary/type',
      method: "get",
      params: data,
    });
  },
};

export default comAnalysis;
