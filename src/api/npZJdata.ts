import request from "@/utils/request";
// import gateway from "../../public/static/config";

let ROOT = `${(window as any).gateway.baseUrl}/earthquake`;

const npZJdata = {
  ////页面2 数据归档
  //表格下拉框1 查询数据类型（12种 次声、地震、、）
  QueryDataType(data: any) {
    return request({
      url: ROOT + "/collect/data/type",
      // url:"https://piecloud.piesat.cn:8443/api/v2/dataEngine/data/queryCollectionInfoByIntersects",
      method: "get",
      params: data,
    });
  },
  //归档表格 查询按钮点击事件，填充表格
  ArchiveDataQuery(data: any) {
    return request({
      url: ROOT + "/collect/data/list",
      // url:"https://piecloud.piesat.cn:8443/api/v2/dataEngine/data/queryCollectionInfoByIntersects",
      method: "get",
      params: data,
    });
  },
  //echart图表 初始化时请求数据
  initEchartArchiveData(data: any) {
    return request({
      url: ROOT + "/collect/data/statistics/archive",
      // url:"https://piecloud.piesat.cn:8443/api/v2/dataEngine/data/queryCollectionInfoByIntersects",
      method: "get",
      params: data,
    });
  },

  ////页面1、3、4 数据接收、数据转发、qb数据接收
  //get左侧表格数据
  leftTableData(data: any) {
    return request({
      url: ROOT + "/CollectionTask/selectCollectionTaskTwo",
      // url:"https://piecloud.piesat.cn:8443/api/v2/dataEngine/data/queryCollectionInfoByIntersects",
      method: "get",
      params: data,
    });
  },
  //get右侧三个折线图数据
  rightEchartData(data: any) {
    return request({
      url: ROOT + "/rsnDarfield/quary/time",
      // url:"https://piecloud.piesat.cn:8443/api/v2/dataEngine/data/queryCollectionInfoByIntersects",
      method: "get",
      params: data,
    });
  },
};

export default npZJdata;
