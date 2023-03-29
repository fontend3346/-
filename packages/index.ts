import type { App } from "vue";

/* 基础组件 start */

import PIEMap from "./PIEMap";
import PIEModal from "./PIEModal";
import PIEPanel from "./PIEPanel";
import PIEButton from "./PIEButton";
import PIEEchartBox from "./PIEEchartBox";
import PIEDataCollect from "./PIEDataCollect";
import PIEThreeBar from "./PIEThreeBar";
import PIERightEchart from "./PIERightEchart";
import PIEStation from "./PIEStation";
import PIEDataSelect from "./PIEDataSelect";
import PIERealTime from "./PIERealTime";
import PIERunStatus from "./PIERunStatus";
import PIETable from "./PIETable";
import PIEBarChart from "./PIEBarChart";
import PIEReport from "./PIEReport";
import PIEReportCard from "./PIEReportCard";
import PIEReportPop from "./PIEReportPop";
import PIECounter from "./PIECounter";
import PIESystemPlat from "./PIESystemPlat";
import PIEStationList from "./PIEStationList";
import PIEEcharWave from "./PIEEcharWave";
import PIENucleusWarn from "./PIENucleusWarn";
import PIEBrokenLine from "./PIEBrokenLine";
import PIEPieChart from "./PIEPieChart";
import PIEMapBtn from "./PIEMapBtn";
import PIEMapLegend from "./PIEMapLegend";
import PIEMapLegendZheng from "./PIEMapLegendZheng";
import PIEMapImg from "./PIEMapImg";
import PIEExploratoryData from "./PIEExploratoryData";
import PIECharts from "./PIECharts";
import PIEEchartSmall from "./PIEEchartSmall";
import PIENupage4 from "./PIENupage4";
import PIECapacitySituation from "./PIECapacitySituation";
import PIEPieStatistical from "./PIEPieStatistical";
import PIEInfoBtn from "./PIEInfoBtn";
import PIEReciveStatus from "./PIEReciveStatus";
import PIETransmit from "./PIETransmit";
import PIEMonitor from "./PIEMonitor";
import PIEThreeNum from "./PIEThreeNum";
import PIEDataRecive from "./PIEDataRecive";
import PIEFoldPanel from "./PIEFoldPanel";
import PIEDatamonitor from "./PIEDatamonitor";
import PIEPage from "./PIEPage";
import PIEMarkModal from "./PIEMarkModal";
import PIELeftMenu from "./PIELeftMenu";
import PIEMarkVis from "./PIEMarkVis";
import PIESearchMark from "./PIESearchMark";
import PIEResultMark from "./PIEResultMark";
import PIEMapPointDetails from "./PIEMapPointDetails";
import PIEMapDevice from "./PIEMapDevice";
import PIERunRouter from "./PIERunRouter";
import PIELegend from "./PIELegend";
import PIECoverage from "./PIECoverage";
import PIEPlaneSelect from "./PIEPlaneSelect";
import PIECalendar from "./PIECalendar";
import PIEMarkPoint from "./PIEMarkPoint";
import PIELineChart from "./PIELineChart";
import PIENoiseChart from "./PIENoiseChart";
import PIEMultiChart from "./PIEMultiChart";
import PIEDelayChart from "./PIEDelayChart";
import PIEMapTool from "./PIEMapTool";
import PIEFacility from "./PIEFacility";
import PIESelect from "./PIESelect";
import PIENetInfo from "./PIENetInfo";
import PIEHistogram from "./PIEHistorgram";
import PIEGraph from "./PIEGraph";
import PIEHeatMap from "./PIEHeatMap";
import PIEThreeMeasure from "./PIEThreeMeasure";
import PIEDetection from "./PIEDetection";
import PIEDiagram from "./PIEDiagram";
import PIEProView from "./PIEProView";
import PIEDispatchManage from "./PIEDispatchManage";
import PIEDetectionEarth from "./PIEDetectionEarth";
import PIEEchartWrap from "./PIEEchartWrap";
import PIETreen from "./PIETreen";
import PIEWaveFilter from "./PIEWaveFilter";
import PIERightMenu from "./PIERightMenu";
import PIEThematicLegend from "./PIEThematicLegend";
import PIEMonitorBorder from "./PIEMonitorBorder";
import PIETimeLine from "./PIETimeLine";
// 所有组件
const components = {
  PIEMapDevice,
  PIEResultMark,
  PIESearchMark,
  PIELeftMenu,
  PIEButton,
  PIEMap,
  PIEModal,
  PIEEchartBox,
  PIEDataCollect,
  PIEThreeBar,
  PIERightEchart,
  PIETable,
  PIERunStatus,
  PIEBarChart,
  PIEStation,
  PIEDataSelect,
  PIERealTime,
  PIEReport,
  PIEReportCard,
  PIEReportPop,
  PIEPanel,
  PIECounter,
  PIEEcharWave,
  PIESystemPlat,
  PIEStationList,
  PIENucleusWarn,
  PIEBrokenLine,
  PIEPieChart,
  PIEMapBtn,
  PIEMapLegend,
  PIEMapLegendZheng,
  PIEMapImg,
  PIEExploratoryData,
  PIECharts,
  PIEEchartSmall,
  PIENupage4,
  PIECapacitySituation,
  PIEPieStatistical,
  PIEInfoBtn,
  PIEReciveStatus,
  PIETransmit,
  PIEMonitor,
  PIEThreeNum,
  PIEDataRecive,
  PIEFoldPanel,
  PIEDatamonitor,
  PIEPage,
  PIEMarkModal,
  PIEMarkVis,
  PIEMapPointDetails,
  PIERunRouter,
  PIELegend,
  PIECoverage,
  PIEPlaneSelect,
  PIECalendar,
  PIEMarkPoint,
  PIELineChart,
  PIENoiseChart,
  PIEMultiChart,
  PIEDelayChart,
  PIEMapTool,
  PIEFacility,
  PIESelect,
  PIENetInfo,
  PIEHistogram,
  PIEGraph,
  PIEHeatMap,
  PIEThreeMeasure,
  PIEDetection,
  PIEDiagram,
  PIEProView,
  PIEDispatchManage,
  PIEDetectionEarth,
  PIEEchartWrap,
  PIETreen,
  PIEWaveFilter,
  PIERightMenu,
  PIEThematicLegend,
  PIEMonitorBorder,
  PIETimeLine
};

// const API = { ...MeAPI, MeToast, MeMessageBox, MePreview } // 需要添加到 VUE 实例的 API

/**
 * 组件注册
 * @param { App } app Vue 对象
 * @returns { void }
 */
const install = (app: App) => {
  // 注册组件
  Object.entries(components).forEach(([key, value]) => {
    app.component(key, value);
  });
  // ctx 里插入 API
  // Object.keys(API).forEach(key => {
  //   app.config.globalProperties[`$${key}`] = (API as any)[key]
  // })
};

export {
  PIEButton,
  PIEModal,
  PIEPanel,
  PIEEchartBox,
  PIEDataCollect,
  PIEStation,
  PIEDataSelect,
  PIERealTime,
  PIERunStatus,
  PIETable,
  PIEReport,
  PIEReportCard,
  PIEReportPop,
  PIECounter,
  PIEEcharWave,
  PIESystemPlat,
  PIENucleusWarn,
  PIECharts,
  PIEEchartSmall,
  PIEBarChart,
  PIEReciveStatus,
  PIETransmit,
  PIEMonitor,
  PIEThreeNum,
  PIEDataRecive,
  PIEFoldPanel,
  PIEDatamonitor,
  PIEPage,
  PIEMarkModal,
  PIELeftMenu,
  PIELegend,
  PIECoverage,
  PIEPlaneSelect,
  PIEMarkPoint,
  PIEMapTool,
  PIEFacility,
  PIESelect,
  PIENetInfo,
  PIEHistogram,
  PIEGraph,
  PIEHeatMap,
  PIEThreeMeasure,
  PIEDiagram,
  PIEDetection,
  PIEProView,
  PIEDispatchManage,
  PIETreen, PIEWaveFilter,
  PIERightMenu,
  PIEThematicLegend,
  PIEMonitorBorder,
  PIETimeLine
};

// 全部导出
export default {
  install,
  ...components,
};
