import request from "@/utils/request";
// import gateway from "../../public/static/config";
let DATA = (window as any).gateway.baseUrl;
// let FILE = "http://10.1.52.121:8080";

const pieSystem = {
  // /  QB分系统-docx文件预览
  getFile(data: any) {
    return request({
      url: DATA + "/earthquake/collect/word/view",
      method: "get",
      params: data,
    });
  },
  // HFJZC分系统
  // 知识库数据管理管理页面-汇集数据统计
  getSql() {
    return request({
      url: DATA + "/earthquake/knowledge/data/statistics",
      method: "get",
    });
  },
  // 数据预处理管理页面-汇集数据统计
  getPretreatment() {
    return request({
      url: DATA + "/earthquake/pretreatment/data/statistics",
      method: "get",
    });
  },
  // 基础管理页面-汇集数据统计
  getBase() {
    return request({
      url: DATA + "/earthquake/basics/data/statistics",
      method: "get",
    });
  },
  // 模型数据管理页面-汇集数据统计
  getModal() {
    return request({
      url: DATA + "/earthquake/model/data/statistics",
      method: "get",
    });
  },
  // QB数据管理页面-汇集数据统计
  getInformation() {
    return request({
      url: DATA + "/earthquake/information/data/statistics",
      method: "get",
    });
  },
  // 探测数据管理页面-汇集数据统计
  getCollection() {
    return request({
      url: DATA + "/earthquake/collect/data/statistics",
      method: "get",
    });
  },
  // 知识库数据管理管理页面-系统平台资源监控监视;
  // cpu
  getSqlCpu() {
    return request({
      url: DATA + "/earthquake/knowledge/system/monitor/avgCpu",
      method: "post",
    });
  },
  // 内存
  getSqlMemory() {
    return request({
      url: DATA + "/earthquake/knowledge/system/monitor/avgMemory",
      method: "post",
    });
  },
  // 硬盘
  getSqlDisk() {
    return request({
      url: DATA + "/earthquake/knowledge/system/monitor/diskUsage",
      method: "post",
    });
  },
  // 流量
  getSqlRate() {
    return request({
      url: DATA + "/earthquake/knowledge/system/monitor/flux",
      method: "post",
    });
  },
  // 数据预处理管理页面-系统平台资源监控监视;
  // cpu
  getDataCpu() {
    return request({
      url: DATA + "/earthquake/pretreatment/system/monitor/avgCpu",
      method: "post",
    });
  },
  // 内存
  getDataMemory() {
    return request({
      url: DATA + "/earthquake/pretreatment/system/monitor/avgMemory",
      method: "post",
    });
  },
  // 硬盘
  getDataDisk() {
    return request({
      url: DATA + "/earthquake/pretreatment/system/monitor/diskUsage",
      method: "post",
    });
  },
  // 流量
  getDataRate() {
    return request({
      url: DATA + "/earthquake/pretreatment/system/monitor/flux",
      method: "post",
    });
  },
  // 基础管理页面-系统平台资源监控监视;
  // cpu
  getBaseCpu() {
    return request({
      url: DATA + "/earthquake/basics/system/monitor/avgCpu",
      method: "post",
    });
  },
  // 内存
  getBaseMemory() {
    return request({
      url: DATA + "/earthquake/basics/system/monitor/avgMemory",
      method: "post",
    });
  },
  // 硬盘
  getBaseDisk() {
    return request({
      url: DATA + "/earthquake/basics/system/monitor/diskUsage",
      method: "post",
    });
  },
  // 流量
  getBaseRate() {
    return request({
      url: DATA + "/earthquake/basics/system/monitor/flux",
      method: "post",
    });
  },
  // 模型数据管理页面-系统平台资源监控监视;
  // cpu
  getModalCpu() {
    return request({
      url: DATA + "/earthquake/model/system/monitor/avgCpu",
      method: "post",
    });
  },
  // 内存
  getModalMemory() {
    return request({
      url: DATA + "/earthquake/model/system/monitor/avgMemory",
      method: "post",
    });
  },
  // 硬盘
  getModalDisk() {
    return request({
      url: DATA + "/earthquake/model/system/monitor/diskUsage",
      method: "post",
    });
  },
  // 流量
  getModalRate() {
    return request({
      url: DATA + "/earthquake/model/system/monitor/flux",
      method: "post",
    });
  },
  // QB数据管理页面-系统平台资源监控监视;
  // cpu
  getQbCpu() {
    return request({
      url: DATA + "/earthquake/information/system/monitor/avgCpu",
      method: "post",
    });
  },
  // 内存
  getQbMemory() {
    return request({
      url: DATA + "/earthquake/information/system/monitor/avgMemory",
      method: "post",
    });
  },
  // 硬盘
  getQbDisk() {
    return request({
      url: DATA + "/earthquake/information/system/monitor/diskUsage",
      method: "post",
    });
  },
  // 流量
  getQbRate() {
    return request({
      url: DATA + "/earthquake/information/system/monitor/flux",
      method: "post",
    });
  },
  // 探测数据管理页面-系统平台资源监控监视;
  // cpu
  getCpu() {
    return request({
      url: DATA + "/earthquake/collect/system/monitor/avgCpu",
      method: "post",
    });
  },
  // 内存
  getMemory() {
    return request({
      url: DATA + "/earthquake/collect/system/monitor/avgMemory",
      method: "post",
    });
  },
  // 硬盘
  getDisk() {
    return request({
      url: DATA + "/earthquake/collect/system/monitor/diskUsage",
      method: "post",
    });
  },
  // 流量
  getRate() {
    return request({
      url: DATA + "/earthquake/collect/system/monitor/flux",
      method: "post",
    });
  },
};

export default pieSystem;
