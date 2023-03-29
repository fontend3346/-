import request from "@/utils/request";
// import gateway from "public/static/config";

// let BASEROOT = `${gateway.baseUrl}/tj/api/v1/user`;
let BASEROOT = (window as any).gateway.dataUrl;

const detectionDataDisplay = {
  //查询台站信息
  getStationsList (data:Object) {
    return request({
      url: BASEROOT + "/collect/data/station/list",
      // url: `http://10.1.52.38:11000/earthquake/collect/data/statistics`,
      method: "get",
      params: data,
    });
  },
};

export default detectionDataDisplay;
