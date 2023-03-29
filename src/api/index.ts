import dataEngine from "./dataEngine"; //场景编辑
import comAnalysis from "./comAnalysis"; //场景编辑
import timeCollect from "./timeCollect"; // 实时数据收集
import timeReal from "./timeReal"; // 图标数据获取
import pieSystem from "./pieSystem"; // 系统平台资源监控监视
import detectionDataDisplay from "./detectionDataDisplay"; // 探测数据实时展示
import eventAlarm from "./eventAlarm";
import npZJdata from "./npZJdata"; // HFH侦查数据接收
import converge from "./converge"; // 实时数据汇聚
import stationsInfoManage from "./stationsInfoManage"; // 台站管理
import stationArray from "./stationArray"; //台/阵元数据;
import measurementPoint from "./measurementPoint"; //测点管理
import instrumentRegistration from "./instrumentRegistration";
import departManagement from "./departManagement"; // 群组管理
import organizationalManagement from "./organizationalManagement"; // 机构管理页面
import roleManage from "./roleManage"; // 角色管理页面
import userManagement from "./userManagement"; //用户管理
import authorityLimit from "./authorityLimit"; //权限管理
import systemResourceManage from "./systemResourceManage"; //系统资源管理
import staffManage from "./staffManage"; //人员管理
import login from "./login"; //登录
import allStatistics from "./allStatistics"; //图层统计
import dutyManage from "./dutyManage"; //日报管理
import watchList from "./watchList"; //值班排班
import reportAnalyse from "./reportAnalyse"; //报表分析
import shiftManage from "./shiftManage"; //交接班管理
import disposalCheck from "./disposalCheck"; //突发事件处置登记
import warnInfoCheck from "./warnInfoCheck"; //预警信息发布登记
import placeManage from "./placeManage"; // 观测场地管理
import statusMonitor from "./statusMonitor"; //台站、设备状态监控
import dispatchOpen from "./dispatchOpen"; //工单查询
import dispatchPending from "./dispatchPending"; //待处理工单
import dispatchCompleted from "./dispatchCompleted"; //已完成工单
import volcanoStage from "./volcanoStage"; //已完成工单
// 导出接口
export default {
  dataEngine,
  comAnalysis,
  timeCollect,
  timeReal,
  pieSystem,
  detectionDataDisplay,
  eventAlarm,
  npZJdata,
  converge,
  stationsInfoManage,
  stationArray,
  measurementPoint,
  instrumentRegistration,
  departManagement,
  organizationalManagement,
  roleManage,
  userManagement,
  authorityLimit,
  systemResourceManage,
  staffManage,
  login,
  allStatistics,
  dutyManage,
  disposalCheck,
  reportAnalyse,
  shiftManage,
  warnInfoCheck,
  watchList,
  placeManage,
  statusMonitor,
  dispatchOpen,
  dispatchPending,
  dispatchCompleted,
  volcanoStage
};
