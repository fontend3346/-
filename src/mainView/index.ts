import {
  reactive,
  nextTick,
  onMounted,
  ref,
  getCurrentInstance,
  watch,
  onUnmounted
} from "vue";
import workers from "./worker";
import WebWorker from "./WebWorker";
import baseMap from "@/plugins/lib/baseMaps";
import VectorLayers from "@/core/PIEEarth/VectorLayers";
import http from "@/api/index";
import geobuf from "geobuf";
import Pbf from "pbf";
import { ElMessage } from "element-plus";
import pieImage from "./pieImage"; //飞机打点图标
import * as echarts from "echarts";
import store from "@/store";
import wordMap from "@/assets/images/map2.png";
import mapboxMap from "@/assets/images/map1.png";
import mapserve from "@/config/mapserve";

import {
  DivGraphic,
  DivBoderLabel,
  DivUpLabel,
  DivLightPoint,
  Popup,
  DelDiv,
  HiddenDIV,
  remoAllDiv,
  GraphicBreastplateLayer,
} from "./BillBoard";

// const store = useStore();
const sourceMap = new Map(); //map
const PIE = window.PIE;

let globeControl = null;
let globe = null;
let globecanvas = null;
let center1 = null;
let heit1 = null;
let picth1 = null;
let renderbillboardid = 0;
let features = null;
let waveTimer = ref(null); //波形定时器
let facilityId = ref(null); //设备id

let activeName = ref("first");
let isTableShow = ref(false);
let isSpecilShow = ref(true);
const echartsData = reactive({
  options2: [],
});
//台网
let markShow = ref(false); //地图点的弹框-显隐
let showTable = ref(false); //展示表格
let tableNumber: any = ref(null); //展示表格内容
let showInfoMark = ref(false); //地图点的弹框详情页-显隐
let netWorkTitle = ref(""); //地图点的弹框编辑页-显隐
let showUpdate = ref(false); //地图点的弹框编辑页-显隐
let modalRef: any = ref(null); //地图点的弹框ref
//台网里面的设备弹框
let isShowFacility = ref(true); //地图点的弹框编辑页-显隐
let stationTableShow = ref(false); //设备-搜索设备名展示的表格
let seePointShow = ref(false); //观测点搜索表格
//设备表格
const equipInfo = reactive({
  ShowPonit: false,
  pointTitle: "",
  isShowFlage: 1,
});
//搜索 - 台站弹出框
const stationAllInfo = reactive({
  stationInfoIshow: true,
  stationTitleSub: "",
  stationTitleType: "",
  stationStatusInfo: {
    subtext: null,
    data: [
      {
        value: null,
        name: "正常",
      },
    ],
  },
  equipmentStatusInfo: {
    subtext: null,
    data: [
      {
        value: null,
        name: "正常",
      },
    ],
  },
  linkageData: [],
  linkageColumns: [
    {
      prop: "",
      label: "",
    },
  ],
  total: 10,
  pageSize: 10,
  pageNum: 1,
  flag: 1, //等于1 搜索台站类型中的学科   2点击台网弹出框中的学科
});
const facilityNetwork = reactive({
  title: "",
  linkageData: [], //表格数据
  stationTableList: [], //设备-搜索设备名表格数据
  seeList: [], //观测点表格数据
  seeColumns: [
    {
      prop: "station_id",
      label: "设备编号",
    },
    {
      prop: "name",
      label: "设备名称",
    },
    {
      prop: "id",
      label: "设备id",
      width: 100,
    },
  ],
  stationColumns: [
    {
      prop: "code",
      label: "设备编号",
    },
    {
      prop: "name",
      label: "设备名称",
    },
    // {
    //   prop: "typename",
    //   label: "设备类型",
    //   width: 100,
    // },
  ],
  stationTotal: 10,
  linkageColumns: [
    {
      prop: "deviceName",
      label: "名称",
    },
    {
      prop: "number",
      label: "编号",
      width: 100,
    },
    {
      prop: "stationName",
      label: "隶属站台",
    },
  ], //表头
  total: 10,
  pageSize: 10,
  pageNum: 1,
  id: "", //地图点对应的id
  clickType: "台站总数", // 台网弹框四类按钮点击所选的类型
});
// 测点
let measureShow = ref(false); // 测点弹框显隐
let measureObj: any = ref(); // 测点数据
let threeRef = ref(null); // 测点dom
let treePanelRef = ref(null); // 鼠标移入dom
let moveShow = ref(false); // 鼠标移入弹框
//设备
let equipTitle = ref(""); //设备弹框 标题
let markShowEquip = ref(false); //地图点的弹框-显隐
let showInfoMarkEquip = ref(false); //地图点的弹框详情页-显隐
let showUpdateEquip = ref(false); //地图点的弹框编辑页-显隐
let modalRefEquip: any = ref(null); //地图点的弹框ref
let deviceName: any = ref(""); //设备按名称查询
let equipmentType = ref(""); //设备类型
let equipmentCode = ref(""); //设备编号
let deviceStatus = ref(1); // 设备状态
let showlegend = ref(false); //是否展示图例
let isNet = ref(false); //当前弹框是否是台网

export const useHandler = (modalEcharts: any) => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  const state: any = reactive({
    //台站echarts状态
    statusStation: null,
    networkIdVal: "",
    showCoverage: {
      showStation: [
        { id: "abnormal", isShow: true },
        { id: "offLayer", isShow: true },
        { id: "warnLayer", isShow: true },
        { id: "strong", isShow: true },
        { id: "seismometry", isShow: true },
        { id: "GNSS", isShow: true },
        { id: "infrasound", isShow: true },
        { id: "terrestrial", isShow: true },
        { id: "gravity", isShow: true },
      ],
      notShowStation: [
        { id: "abnormal", isShow: false },
        { id: "offLayer", isShow: false },
        { id: "warnLayer", isShow: false },
        { id: "strong", isShow: false },
        { id: "seismometry", isShow: false },
        { id: "GNSS", isShow: false },
        { id: "infrasound", isShow: false },
        { id: "terrestrial", isShow: false },
        { id: "gravity", isShow: false },
      ],
    }, //显示台网或台站
    //检索 台站弹出框
    netWorkSearch: "", //台网
    netWorkListSearch: [], //台网数据
    //检索 台站
    stationTotalInfo: {
      normalCount: 0,
      notNormalCount: 0,
      total: 0,
    },
    isShowInput: false, //默认搜索输入框不展示
    baseLayerList: [
      {
        label: "Mapbox 影像",
        img: mapboxMap,
        url: window.gateway.mapUrl,
        sourceType: "tileRaster",
        buttonType: "source",
        source: undefined,
        bounds: [],
        epsg: 3857,
      },
      {
        label: "天地图影像",
        img: wordMap,
        url: mapserve.SKY_MAP,
        sourceType: "tileRaster",
        buttonType: "source",
        source: undefined,
        bounds: [],
        epsg: 3857,
      },
    ],
    netWorkTitle: "", //台网弹框标题
    equipmentTypeVal: "", //设备tab中选中设备下拉框
    selectNetworkInfo: "", //台网tab中选中台网的值
    selectNetworkCodeInfo: "", //台网tab中选中台网编号
    nameDevice: "", //设备名称
    codeDevice: "", //设备编码
    subjectInfo: "", //学科类型
    stationNameId: "", //台站名称的id
    stationTypeInfo: "", //台站类型
    stationcode: "", //台站编码
    waveIndex: "", //第几个波形图
    installPerList: [
      {
        value: 1,
        label: "电磁波",
      },
      {
        value: 2,
        label: "地震波",
      },
    ], //事件类型
    curTool: 0, //地图工具栏
    allStatisticsShow: false, //统计显隐
    thisEquipId: 0,
    thematicDisplay: false, //专题图图例
    thematicTitle: "人口数量", //专题图图例
    compatibleLegend: true, //兼容图例显隐
    thematicList: [], //兼容图例显隐
    coverageList: [
      {
        label: "台网",
        value: false,
        layerId: "mapStations",
        isShow: true,
      },
      {
        label: "台站",
        value: true,
        layerId: "mapInternetSure",
        isShow: true,
      },
      {
        label: "设备",
        value: false,
        layerId: "mapEquipment",
        isShow: true,
      },
      {
        label: "测点",
        value: false,
        layerId: "mapMeasurementSure",
        isShow: true,
      },
      {
        label: "人口专题图",
        value: false,
        layerId: "mapTheme",
        isShow: true,
      },
      {
        label: "GDP专题图",
        value: false,
        layerId: "GDPTheme",
        isShow: true,
      },
      {
        label: "边界线",
        value: false,
        layerId: "provincialline",
        isShow: true,
      },
      // {
      //   label: "等值线",
      //   value: false,
      //   isShow: true,
      // },
    ],
    waveData: [], //接收地震波数据
    isMonitor: true, //台站监控按钮显示
    equipmentModelList: [], // 设备类型数据
    pointData: {},
    markData1: <any>[], //地图弹框-台网数据
    valueDataElse: <any>[], //地图弹框-台网数据
    markDataEquip: <any>[], //地图弹框-设备数据
    showTree: false, //显示树
    treeStations: [], //树结构-一级台网
    watchPoint: "", //观测点
    watchPointCode: "", //观测点编号
    facility: true, //展示搜索内容
    random: Math.random(), //随机数
    foreignValue: "", //境内外
    foreignList: [], //境内外数据
    selectNetwork: "",
    selectStationPro: "", //台站选择省级下拉框
    selectNetList: [], //台网下拉框
    subjectTypeList: [], //隶属学科
    stationArray: "",
    stationArrayList: [
      {
        label: 1,
        value: 2,
      },
    ], //台阵/台站
    stationChild: "",
    stationChildList: [
      {
        label: 1,
        value: 2,
      },
    ], //选择子台站
    stationChildList2: [], //设备中的台站
    subjectListList: [], //台站类型
    stationTypeAll: [], //台站类型
    deviceList: [], //设备下拉框
    equipmentTypeList: [], //设备类型下拉框
    zoom1: 8, // 台网放大层级
    zoom2: 10, // 台站放大层级
    zoom3: 12, // 测点 设备放大层级
    mapInternetDataError: {}, //台站异常数据
    mapInternetData: {}, // 台站正常数据
    measurementData: [], // 正常测点数据
    measurementDataError: [], // 异常测点数据
    equipmentData: {}, // 设备数据
    options: {
      // 测点正常
      layerId: "",
      name: "name",
      iconImgUrl: "",
      overlap: true,
    },
    options2: {
      // 测点异常
      layerId: "",
      name: "name",
      iconImgUrl: "",
      overlap: true,
    },
    options3: {
      // 设备
      layerId: "",
      name: "device_name",
      iconImgUrl: "",
    },
    options4: {
      // 台站选项
      layerId: "",
      name: "station_name",
      iconImgUrl: "",
      overlap: true,
    },
    userInfo: {}, //用户信息
    roleInfo: {},
    unitCollectionName: "", //台网表名
    searchAll: {},
    roleLevel: "",
    total: 10,
    pageSize: 10,
    pageNum: 1,
    netDataShow: false,
    selectNetLists: [], // 根据国家级查询省级
    netInfoIsshow: false,
    modalEchartsOption: {
      tooltip: {
        trigger: "item",
      },
      color: ["#56D1A4", "#CF0420", "yellow", "#868181"],
      legend: {
        bottom: "25%",
        right: "10%",
        orient: "vertical",
        textStyle: {
          color: "#fff",
          fontSize: 16,
        },
      },
      title: {
        zlevel: 0,
        text: ["{name|总设备}", "{value|3}"].join("\n"),
        top: "center",
        left: "29%",
        textAlign: "center",
        textStyle: {
          rich: {
            value: {
              color: "#fff",
              fontSize: 18,
              fontStyle: "normal",
              fontWeight: "normal",
            },
            name: {
              fontSize: 16,
              fontStyle: "normal",
              fontWeight: "normal",
              color: "#C0C0C0",
              lineHeight: 35,
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          label: {
            show: false,
            // position: "inside",
            // formatter: `{d}%`,
            color: "#ffffff", //颜色
            fontSize: 14, //字体大小
          },
          center: ["30%", "50%"],
          data: [
            {
              value: 90,
              name: "正常设备",
            },
            {
              value: 10,
              name: "异常设备",
            },
            {
              value: 0,
              name: "离线设备",
            },
          ],
          radius: ["50%", "80%"],
        },
      ],
    },
    stationStatusInfo: {
      subtext: "120",
      data: [
        {
          value: 87,
          name: "正常",
        },
        {
          value: 13,
          name: "故障",
        },
        {
          value: 13,
          name: "告警",
        },
      ],
    }, //按台网查询台站状态
    equipmentStatusInfo: {
      subtext: "120",
      data: [
        {
          value: 87,
          name: "正常",
        },
        {
          value: 13,
          name: "故障",
        },

        {
          value: 13,
          name: "告警",
        },
      ],
    }, //按台网查询台站状态
    stationClassify: [
      {
        num: 20,
        total: 100,
        station: "测震台站",
      },
      {
        num: 20,
        total: 90,
        station: "强震台站",
      },
      {
        num: 10,
        total: 100,
        station: "GNSS",
      },
      {
        num: 20,
        total: 100,
        station: "次声台站",
      },
      {
        num: 20,
        total: 100,
        station: "重力台站",
      },
      {
        num: 15,
        total: 100,
        station: "地磁台站",
      },
    ], //台站分类
    heatMapData: [], //热力图
    equipmentDetails: false, //设备详情查看
    showEquipmentDetail: false, //设备详情查看
    powerEquipmentDetails: {}, //设备类型为供电设备的详情查看
    equipmentDetailsInfo: {}, //设备信息
    channelColumns: [
      {
        prop: "Channel",
        label: "通道",
      },
      {
        prop: "Name",
        label: "通道名称",
      },
      {
        prop: "Azimuth",
        label: "方位",
      },
      {
        prop: "Incline",
        label: "斜坡",
      },
      {
        prop: "Longitude",
        label: "经度",
      },
      {
        prop: "Latitude",
        label: "纬度",
      },
      {
        prop: "Altitude",
        label: "高度",
      },
    ], //设备通道参数
    streamColumns: [
      {
        prop: "Stream",
        label: "数据流",
      },
      {
        prop: "Stream Name",
        label: "数据流名称",
      },
      {
        prop: "Recording Destination",
        label: "流向",
      },
      {
        prop: "Channels",
        label: "通道",
      },
      {
        prop: "Sample Rate",
        label: "采样率(Hz)",
      },
      {
        prop: "Data Format",
        label: "数据格式",
      },
      {
        prop: "Trigger Type",
        label: "触发类型",
      },
    ], //设备数据流参数
    networkColumns: [
      {
        prop: "Port Number",
        label: "端口号",
      },
      {
        prop: "IP Address",
        label: "IP地址",
      },
      // {
      //   prop: "Device Power",
      //   label: "设备能力",
      // },
      {
        prop: "IP Mask",
        label: "IP掩码",
      },
      {
        prop: "RTPD",
        label: "RTPD",
      },
      {
        prop: "Gateway",
        label: "网关",
      },
      {
        prop: "Line Down",
        label: "Line Down",
      },
      {
        prop: "Line Mode",
        label: "Line Mode",
      },
      {
        prop: "Port Speed",
        label: "速度",
      },
      {
        prop: "Toss Delay",
        label: "延迟",
      },
    ], //设备网络参数
    statusColumns: [
      {
        prop: "CPU Version",
        label: "CPU版本",
      },
      {
        prop: "Board Number",
        label: "IP地址",
      },
      {
        prop: "Board Revision",
        label: "修订",
      },
      {
        prop: "Board Acronym",
        label: "缩写",
      },
      {
        prop: "Board Serial Number",
        label: "单板序列号",
      },
      {
        prop: "FPGA Board Number",
        label: "FPGA单板编号",
      },
      {
        prop: "FPGA Minimum brd.rev.",
        label: "brd.rev.",
      },
      {
        prop: "FPGA Version",
        label: "FPGA版本",
      },
    ], //设备状态参数
    equipDetailsImgShow: false, //设备详情信息图片弹框
    equipDetailsImg: [], //设备详情信息图片
  });
  let histogramProps = reactive({
    title: "台网正常率",
  });
  let popup: any = null;
  let isCheckLayerShow: any = ref(false); // 缩略图是否显示
  let searchVal: any = ref("");
  let markData: any = reactive({
    pointTitle: "详情", //名称
    detailPoint: {
      // stationName: "",
      // stationCode: "",
      // stationAddress: "",
      // stationLithology: "",
      // stationTypeName: "",
      // unitName: "",
      // staionSupervisorMode: "",
      // stationPropertyStr: "",
      // pointStr: "",
      // testStatus: "null",
      // thisEquipId: "", //存储设备id
      name: "",
      networkname: "",
      stationtypename: "",
      latitude: "",
      longitude: "",
      code: "",
      create_time: "",
      elevation: "",
      status: "",
    }, //弹框数据
    stationInfo: "", // 台站信息
    netInfo: "", // 台网信息
  });
  let showPonit = ref(false); //台站详情弹框
  let showInstrument = ref(false); // 台站->设备弹框
  let facility = ref(false); // 设备表格弹框
  let sampleValue = ref("");
  let eventType = ref(""); //波形图事件类型
  let equipmentVal: any = ref({}); //设备类型

  let isAdmins = ref(true); // 是否为管理员
  //设备表格弹框

  let showBigImgEcharts = ref(false); //确定展示波段大图
  let showBigImgEchartsEquip = ref(false); //
  const facilityInfo: any = reactive({
    linkageData: [
      {
        name: "油管顶",
        station: "正常",
        deviceClass: "数采",
      },
    ], //表格数据
    equipmentArr: [],
    linkageColumns: [
      {
        prop: "name",
        label: "设备名称",
      },
      {
        prop: "typename",
        label: "设备类型",
      },
      {
        prop: "status",
        label: "设备状态",
        isTemplate: true,
      },
      // {
      //   prop: "networkname",
      //   label: "类型名称",
      // },
    ], //表头
    total: 10,
    pageSize: 10,
    pageNum: 1,
    id: "", //地图点对应的id
    nomalFactilityNum: 0, //正常设备
    abFactilityNum: 0, //异常设备onMounted
    facilityStatus: "", //异常设备
  });
  let detailId = ref();

  onMounted(() => {
    //关闭各种子弹窗
    // isShowFacility.value = false;
    facility.value = false;
    showBigImgEcharts.value = false;
    showBigImgEchartsEquip.value = false;
    showInstrument.value = false;
    markShowEquip.value = false;
    showPonit.value = false;
    markShow.value = false;
    showInfoMark.value = false;
    measureShow.value = false;
    nextTick(() => {
     
    });
    // 测试
    // showWave(1);
  });

  let baseMapObj: any = null;
  let map: any = null;
  let samllBaseMapObj: any = null;
  let smallMap: any = null;
  let waveOptionList = ref([]);
  let waveOptions: any = reactive({
    tooltip: {
      trigger: "axis",
      // formatter: '{b0}<br />{a0}：{c0}个<br />{a1}：{c1}个<br />{a2}：{c2}个'
    },

    color: "#1891FF",
    grid: {
      left: "3%",
      right: "8%",
      bottom: "10%",
      top: "16%",
      containLabel: true,
    },
    lineStyle: {
      width: 4,
    },
    areaStyle: {},
    dataZoom: [
      {
        show: false,
        realtime: true,
        start: 0,
        endValue: null,
        bottom: 35,
        height: 12,
        backgroundColor: "#F0F0F0",
        dataBackground: {
          lineStyle: {
            color: "#fff",
          },
          areaStyle: {
            color: "#F0F0F0",
          },
        },
        fillerColor: "#D3D3D3",
        borderColor: "#F0F0F0",
        handleStyle: {
          opacity: 0,
        },
      },
      {
        type: "inside",
        realtime: true,
      },
    ],
    xAxis: {
      boundaryGap: false,
      type: "category",
      //刻度线
      axisTick: false,
      data: [],
      name: "时间",
      nameTextStyle: {
        padding: [0, 0, 200, 500], // 上右下左与原位置距离
        color: "#98dcff",
      },
      nameGap: 30, // x轴name与横坐标轴线的间距
      nameLocation: "middle", // x轴name处于x轴的什么位置
      axisLine: {
        show: true,
        onZero: false, //不在y轴的零刻度线
        lineStyle: {
          color: "#98dcff",
        },
      },
      axisLabel: {
        show: false,
        textStyle: {
          color: "#98dcff",
        },
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      name: "数量",
      // nameLocation: "left",
      nameTextStyle: {
        padding: [0, 0, 80, -10], // 上右下左与原位置距离
        color: "#fff",
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#98dcff",
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#98dcff",
        },
      },
      splitNumber: 10,
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        type: "line",
        data: [],
        name: "",
        symbol: "none",
        itemStyle: {
          normal: {
            label: {
              show: false, // 在折线拐点上显示数据
            },
            lineStyle: {
              width: 5, // 设置虚线宽度
              type: "solid", // 虚线'dotted' 实线'solid'
              color: "",
            },
          },
        },
      },
    ],
  });
  let colorList = [
    "#1891FF",
    "#12C3C3",
    "#FBCD14",
    "#F14864",
    "#8542E1",
    "#7DA6FF",
    "#4AC312",
    "#FB8F14",
    "#F148E7",
  ];
  let options1 = reactive({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        animation: false,
        label: {
          backgroundColor: "#ccc",
          borderColor: "#aaa",
          borderWidth: 1,
          color: "#98dcff",
        },
      },
    },
    lineStyle: {
      color: "rgba(0,255,223, 1)", //折线的颜色
    },
    grid: {
      left: "3%",
      right: "8%",
      bottom: "10%",
      top: "16%",
      containLabel: true,
    },
    dataZoom: [
      {
        type: "slider",
        show: false,
        // xAxisIndex: [0],
        start: 1,
        end: 100,
      },
      {
        type: "slider",
        show: false,
        start: 50,
        end: 100,
      },
      {
        type: "inside",
        // xAxisIndex: [0],
        start: 1,
        end: 100,
      },
      {
        type: "inside",
        // yAxisIndex: [0],
        start: 1,
        end: 100,
      },
    ],
    xAxis: {
      type: "value",
      name: "时间",
      nameTextStyle: {
        padding: [0, 0, 200, 500], // 上右下左与原位置距离
        color: "#98dcff",
      },
      nameGap: 30, // x轴name与横坐标轴线的间距
      nameLocation: "middle", // x轴name处于x轴的什么位置
      axisLine: {
        show: true,
        onZero: false, //不在y轴的零刻度线
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#98dcff",
        },
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      name: "数量",
      // nameLocation: "left",
      nameTextStyle: {
        padding: [0, 0, 80, -10], // 上右下左与原位置距离
        color: "#fff",
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#98dcff",
        },
      },
      splitNumber: 10,
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        type: "line",
        data: [],
        itemStyle: {
          color: "#098ef7",
        },
        showSymbol: false,
      },
    ],
  });
  let options2 = reactive({
    animationDuration: 0,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        animation: false,
        label: {
          backgroundColor: "#ccc",
          borderColor: "#aaa",
          borderWidth: 1,
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          color: "#98dcff",
        },
      },
    },
    grid: {
      left: "3%",
      right: "8%",
      bottom: "10%",
      top: "16%",
      containLabel: true,
    },
    dataZoom: [
      {
        type: "slider",
        show: false,
        start: 1,
        end: 100,
      },
      {
        type: "slider",
        show: false,
        start: 1,
        end: 100,
      },
      {
        type: "inside",
        // xAxisIndex: [0],
        start: 1,
        end: 100,
      },
      {
        type: "inside",
        // yAxisIndex: [0],
        start: 1,
        end: 100,
      },
    ],
    xAxis: {
      type: "value",
      name: "时间",
      min: 0,
      nameTextStyle: {
        padding: [0, 0, 200, 500], // 上右下左与原位置距离
        color: "#98dcff",
      },
      nameGap: 30, // x轴name与横坐标轴线的间距
      nameLocation: "middle", // x轴name处于x轴的什么位置
      axisLine: {
        show: true,
        onZero: false, //不在y轴的零刻度线
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#98dcff",
        },
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      name: "数量",
      nameLocation: "left",
      nameTextStyle: {
        padding: [0, 0, 80, -10], // 上右下左与原位置距离
        color: "#98dcff",
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#98dcff",
        },
      },
      splitNumber: 5,
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        type: "line",
        data: [],
        itemStyle: {
          color: "#098ef7",
        },
        showSymbol: false,
      },
    ],
  });

  let options3 = reactive({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        animation: false,
        label: {
          backgroundColor: "#ccc",
          borderColor: "#aaa",
          borderWidth: 1,
          color: "#98dcff",
        },
      },
    },
    lineStyle: {
      color: "rgba(0,255,223, 1)", //折线的颜色
    },
    grid: {
      left: "3%",
      right: "8%",
      bottom: "10%",
      top: "16%",
      containLabel: true,
    },
    dataZoom: [
      {
        type: "slider",
        show: false,
        // xAxisIndex: [0],
        start: 1,
        end: 100,
      },
      {
        type: "slider",
        show: false,
        start: 50,
        end: 100,
      },
      {
        type: "inside",
        // xAxisIndex: [0],
        start: 1,
        end: 100,
      },
      {
        type: "inside",
        // yAxisIndex: [0],
        start: 1,
        end: 100,
      },
    ],
    xAxis: {
      type: "value",
      name: "时间",
      nameTextStyle: {
        padding: [0, 0, 200, 500], // 上右下左与原位置距离
        color: "#98dcff",
      },
      nameGap: 30, // x轴name与横坐标轴线的间距
      nameLocation: "middle", // x轴name处于x轴的什么位置
      axisLine: {
        show: true,
        onZero: false, //不在y轴的零刻度线
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#98dcff",
        },
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      name: "数量",
      // nameLocation: "left",
      nameTextStyle: {
        padding: [0, 0, 80, -10], // 上右下左与原位置距离
        color: "#fff",
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#98dcff",
        },
      },
      splitNumber: 10,
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        type: "line",
        data: [],
        itemStyle: {
          color: "#098ef7",
        },
        showSymbol: false,
      },
    ],
  });

  let options4 = reactive({
    // animationDuration: 0,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        animation: false,
        label: {
          backgroundColor: "#ccc",
          borderColor: "#aaa",
          borderWidth: 1,
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          color: "#98dcff",
        },
      },
    },
    grid: {
      left: "3%",
      right: "8%",
      bottom: "10%",
      top: "16%",
      containLabel: true,
    },
    dataZoom: [
      {
        type: "slider",
        show: false,
        start: 1,
        end: 100,
      },
      {
        type: "slider",
        show: false,
        start: 1,
        end: 100,
      },
      {
        type: "inside",
        // xAxisIndex: [0],
        start: 1,
        end: 100,
      },
      {
        type: "inside",
        // yAxisIndex: [0],
        start: 1,
        end: 100,
      },
    ],
    xAxis: {
      type: "value",
      name: "时间",
      nameTextStyle: {
        padding: [0, 0, 200, 500], // 上右下左与原位置距离
        color: "#98dcff",
      },
      nameGap: 30, // x轴name与横坐标轴线的间距
      nameLocation: "middle", // x轴name处于x轴的什么位置
      axisLine: {
        show: true,
        onZero: false, //不在y轴的零刻度线
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#98dcff",
        },
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      name: "数量",
      nameLocation: "left",
      nameTextStyle: {
        padding: [0, 0, 80, -10], // 上右下左与原位置距离
        color: "#98dcff",
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#98dcff",
        },
      },
      splitNumber: 5,
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        type: "line",
        data: [],
        itemStyle: {
          color: "#098ef7",
        },
        showSymbol: false,
      },
    ],
  });
  let diagramProps = reactive({
    nodes: [
      {
        id: "0",
        name: "辽宁省地震局",
        symbolSize: 30,
        value: [123.31054687499999, 36.38591277287651],
        category: 0,
        level: 1,
      },
    ],
    links: [
      {
        source: "1",
        target: "0",
      },
    ],
    fresh: false,
    head: {
      id: "",
      name: "",
      longitude: "",
      latitude: "",
    },
    count: [0, 0, 0, 0, 0, 0],
  });
  // 统计dou
  const allStatisticsClick = () => {
    state.curTool = 6;
    state.allStatisticsShow = !state.allStatisticsShow;
    state.facility = false; //关闭搜索框
  };
  // 统计dou
  const closeFun = () => {
    state.allStatisticsShow = !state.allStatisticsShow;
    state.facility = true; //关闭搜索框
  };
  // webworker线程1
  const getWorker = () => {
    const url = URL.createObjectURL(
      new Blob(["(" + workers.toString() + ")()"])
    );
    let worker: any = null;
    worker = new Worker(url);
    worker.postMessage("webworker1:我在主线程执行了！");
    worker.onmessage = (event: any) => { };
    worker.onerror = function (event: any) {
      //如果发生错误,立即终止代码
      worker.terminate();
    };
  };
  let work: any = null;
  // webworker线程2
  const getWorker2 = () => {
    let workFunction = function () {
      this.onmessage = (e: any) => { };

      // 设备-添加点
      const addEquipmentPoint = (layerId: any) => {
        let params = {};
        http.instrumentRegistration.getInstrument(params).then((res: any) => {
          if (baseMapObj.destory) { return };
          let featureCollection = {
            type: "FeatureCollection",
            features: res.data.data,
          };
          state.options3 = {
            layerId: layerId,
            name: "device_name",
            iconImgUrl: pieImage.equipmentImg,
          };
          state.equipmentData = featureCollection;
        });
        return { options: state.options3, data: state.equipmentData };
      };
      addEquipmentPoint("mapEquipment"); //设备添加点
      postMessage("webworker2:我在子线程发送消息了");
    };
    if (work) {
      work.terminate();
    }
    work = new WebWorker(workFunction);
    work.postMessage("webworker2:我在主线程发送消息了");
    work.onmessage = (e: any) => {
      work = null;
    };
  };
  //台网关闭事件
  const cancel = () => {
    markShow.value = false;
    // isShowFacility.value = false;
    measureShow.value = false;
  };
  //台网弹框点击设备
  const facilityNetMark = (item: any) => {
    facilityNetwork.clickType = item.label;
    state.pageNum = 1;
    if (item.label == "设备正常") {
      facilityNetwork.title = "正常设备";
      isShowFacility.value = true;
      deviceStatus.value = 1;
      facilityNetwork.linkageColumns = [
        {
          prop: "name",
          label: "名称",
          width: 80,
        },
        {
          prop: "code",
          label: "编号",
        },
        {
          prop: "stationname",
          label: "隶属站台",
        },
      ];
      deviceSearch();
    } else if (item.label == "设备异常") {
      facilityNetwork.title = "异常设备";
      isShowFacility.value = true;
      deviceStatus.value = 0;
      facilityNetwork.linkageColumns = [
        {
          prop: "name",
          label: "名称",
          width: 80,
        },
        {
          prop: "code",
          label: "编号",
        },
        {
          prop: "stationname",
          label: "隶属站台",
        },
      ];
      deviceSearch();
    } else if (item.label == "台站总数") {
      facilityNetwork.title = "台站";
      isShowFacility.value = true;
      facilityNetwork.linkageColumns = [
        {
          prop: "name",
          label: "台站",
          width: 90,
        },
        {
          prop: "code",
          label: "台网编码",
        },
        // {
        //   prop: "networkname",
        //   label: "台网",
        // },
        {
          prop: "stationtypename",
          label: "台阵",
        },
      ];
      stationSearch();
    } else if (item.label == "测点总数") {
      facilityNetwork.title = "测点";
      isShowFacility.value = true;
      facilityNetwork.linkageColumns = [
        {
          prop: "name",
          label: "测点名称",
        },
      ];
      measureSearch();
    }
  };

  // 查询设备列表
  const deviceSearch = () => {
    //查询设备弹框列表   正常/异常设备点击
    let params = {
      network: facilityNetwork.id,
      status: deviceStatus.value,
      pageSize: state.pageSize,
      pageNum: state.pageNum,
    };
    http.stationsInfoManage.getNetList(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        facilityNetwork.linkageData = res.data.list;
        state.total = res.data.total;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 查询台站列表
  const stationSearch = (isDiv: boolean = false, num?: string) => {
    // 查询台站弹框列表
    let params: any = {
      networkId: facilityNetwork.id, // 台网ID
      pageSize: state.pageSize,
      pageNum: state.pageNum,
    };
    if (isDiv) {
      params.status = num;
    }
    http.stationsInfoManage.getStationList(params).then((res: any) => {
      if (baseMapObj.destory) { return };
      if (res && res.code == 0) {
        // facilityNetwork.linkageData = res.data.list;
        // state.total = res.data.total;
        if (isDiv && num == "0") {
          features = res.data.list;
          addbillBoard();
        } else {
          facilityNetwork.linkageData = res.data.list;
          state.total = res.data.total;
        }
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 查询测点列表
  const measureSearch = () => {
    // 查询测点弹框列表
    let params = {
      unitId: facilityNetwork.id, // 台网ID
      pageSize: state.pageSize,
      pageNum: state.pageNum,
    };
    http.stationsInfoManage.getMeasureList(params).then((res: any) => {
      if (baseMapObj.destory) { return };
      if (res && res.code == 0) {
        facilityNetwork.linkageData = res.data.list;
        state.total = res.data.total;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 设备信息分页大小
  const sizeChangeDevice = (val: any) => {
    state.pageSize = val;
    switch (facilityNetwork.clickType) {
      case "设备正常":
        deviceStatus.value = 1;
        deviceSearch();
        break;
      case "设备异常":
        deviceStatus.value = 0;
        deviceSearch();
        break;
      case "台站总数":
        stationSearch();
        break;
      case "测点总数":
        measureSearch();
        break;
      default:
        break;
    }
  };
  // 设备信息换页
  const pageChangeDevice = (val: any) => {
    state.pageNum = val;
    switch (facilityNetwork.clickType) {
      case "设备正常":
        deviceStatus.value = 1;
        deviceSearch();
        break;
      case "设备异常":
        deviceStatus.value = 0;
        deviceSearch();
        break;
      case "台站总数":
        stationSearch();
        break;
      case "测点总数":
        measureSearch();
        break;
      default:
        break;
    }
  };
  //展示表格
  const toTable = (item: any) => {
    tableNumber.value = item.id;
    state.showTree = false;
    state.allStatisticsShow = false;
    nextTick(() => {
      showTable.value = true;
    });
    // router.push({
    //   path: item.path,
    // });
  };
  //关闭表格
  const closeTable = () => {
    state.showTree = true;
    state.facility = false;
    showTable.value = !showTable.value;
  };

  //图层控制列表
  let isShowCoverage = ref(false);
  // 初始化地图
  const initMap = () => {
    baseMapObj = new baseMap({
      container: "mapContainer",
      zoom: 3,
      // projection: "globe",
      // center: [123.31054687499999, 36.38591277287651],
    });

    map = baseMapObj.map;
    map.on("load", () => {
      //获取用户信息、角色
      let roleInfo = JSON.parse(store.state.user.roleInfo);
      let userId = store.state.user.userId;
      // state.roleLevel = parseInt(roleInfo.level);

      http.stationsInfoManage.searchAll(userId).then((res: any) => {
        if (baseMapObj.destory) {
          return;
        }
        if (res && res.code == 0) {
          state.searchAll = res.data.data;
          if (Object.keys(state.searchAll).length != 0) {
            // if (state.roleLevel == 5) {
            //   state.coverageList[0].isShow = false;
            //   activeName.value = "second";
            // } else {
            //   // 台网参数
            //   activeName.value = "first";
            //   if (state.searchAll.unitList.length != 0) {
            //     addStationsPoint("mapStations"); //台网添加点
            //     onClickNet("mapStations"); //台网点击事件
            //   } else {
            //     state.coverageList[0].isShow = false;
            //   }
            // }
            // 台网参数
            activeName.value = "first";
            if (state.searchAll.unitList.length != 0) {
              addStationsPoint("mapStations"); //台网添加点
              onClickNet("mapStations"); //台网点击事件
            } else {
              state.coverageList[0].isShow = false;
            }

            // 台站参数
            if (state.searchAll.stationList.length != 0) {
              // addInternetPoint("mapInternetSure"); // 台站添加异常点
              // addInternetPoint("mapInternetError"); // 台站添加正常点
              // onClicks("mapInternetSure"); // 台站添加正常点-点击
              // onClicks("mapInternetError"); // 台站添加异常点-点击
            } else {
              state.coverageList[1].isShow = false;
            }

            // 设备参数
            if (state.searchAll.deviceList.length != 0) {
              // addEquipmentPoint("mapEquipment"); //设备添加点
            } else {
              state.coverageList[3].isShow = false;
            }

            // 测点参数
            if (state.searchAll.pointList.length != 0) {
              // addMeasurementPoint("mapMeasurementSure"); //测点添加正常点
              // addMeasurementPoint("mapMeasurementError"); //测点添加异常点
              // measureClick("mapMeasurementSure"); // 测点点击事件
              // measureClick("mapMeasurementError"); // 测点点击事件
            } else {
              state.coverageList[2].isShow = false;
            }
            if (state.roleLevel != 1) {
              map.flyTo({
                center: [
                  state.searchAll.coordinate.lon,
                  state.searchAll.coordinate.lat,
                ],
                zoom: 7,
              });
            }
          }
        } else {
          ElMessage.error(res.message);
        }
      });

      // addStationsPoint("mapStations"); //台网添加点
      // onClickNet("mapStations"); //台网点击事件
      // addInternetPoint("mapInternetSure"); // 台站添加异常点
      // addInternetPoint("mapInternetError"); // 台站添加正常点
      // onClicks("mapInternetSure"); // 台站添加正常点-点击
      // onClicks("mapInternetError"); // 台站添加异常点-点击
      // addEquipmentPoint("mapEquipment"); //设备添加点
      // addMeasurementPoint("mapMeasurementSure"); //测点添加正常点
      // addMeasurementPoint("mapMeasurementError"); //测点添加异常点

      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
    });
  };

  let viewer = null; // 地球对象
  // 地球实例获取方法
  let viewerInstance: any = ref(null);
  let pieOptions = {
    canvas: "canvas",
    autoProjection: true,
    center: [116.4, 39.9],
    zoom: 5,
    rasterDataSource: {
      server: (window as any).gateway.mapUrlPIE,
      // "https://webst03.is.autonavi.com/appmaptile?style=6&z={z}&y={y}&x={x}", //影像瓦片数据源地址
      alias: "PIEbaseLayer",
      epsg: 4326,
      levelOffset: -1,
    },
  }; // 地球配置
  // 销毁
  onUnmounted(() => {
    if (viewerInstance.value) {
      viewerInstance.value.dispose();
      viewerInstance.value = null;
    }
    baseMapObj.destory = true;
    baseMapObj.globe = null;
    remoAllDiv(renderbillboardid);
    // baseMapObj.destroyed();
  });
  // 地球加载
  const onload = (viewer: any) => {
    globeControl = viewer.getGlobeControl();
    globe = globeControl.getGlobe();
    globecanvas = globeControl.canvas;
    center1 = globe.getCenter();
    heit1 = globe.getScale();
    picth1 = globe.getPitchAngle();
    viewerInstance.value = viewer;
    //tween动画的监听，否则飞行将不可用，勿删！！！wanggt注
    // const PIETWEEN = window.PIETWEEN;
    baseMapObj = new VectorLayers(viewer);
    // getProvincialline(); //加载省级轮廓线
    // addStationsPoint("mapStations"); //台网添加点
    // queryData();
    nextTick(() => {
      // subjectListChange(state.subjectListList[0].id); //综合台台站
      subjectListChange(3); //综合台台站
      //查询台站总数
      searchStationNum(3);
      //查询台网
      netWorkSearchChange();
      stationInsStatus(null);
      getStationClassify(null);
      heatMap();
      getStationTypeAll(); //获取所有台站类型
      let params = {
        collectionName: "META_DATA_SUBJECT_INFO",
        queryConditionList: [],
        queryResultList: [],
      };
      getSubject(params); //学科类型

      // 加载扩散点  [116.4, 39.9]
      // addbillBoard()
      baseMapObj.layerClick((layer, obj) => {
        switch (
        layer.getName() // 获取图层id
        ) {
          case "mapStations": // 台网点击事件
            state.facility = false;
            equipInfo.ShowPonit = false;
            onClickNetPIE(obj);
            break;
          case "strong":
          case "seismometry":
          case "GNSS":
          case "infrasound":
          case "terrestrial":
          case "gravity":
          case "abnormal":
          case "offLayer":
          case "warnLayer":
            onClicksPIE(obj);
            break;
          case "mapMeasurementSure": // 测点正常点击事件
            measureClickPIE(obj);
            break;
          case "mapMeasurementError": // 测点异常点击事件
            // measurementPIE(obj);
            break;
          case "mapEquipment":
            // onClicksEquipPIE(obj); // 设备点击事件
            break;
          default:
            break;
        }
        // 中心点;
        baseMapObj.flyTo([obj.longitude, obj.latitude], 10);
      });
    });
  };
  let timer: any = ref(null);
  //观测点回车事件
  const inputChange = (v: any) => {
    if (timer.value !== null) {
      clearTimeout(timer.value);
    }
    timer.value = setTimeout(() => {
      addMeasurementPoint("mapMeasurementSure"); //测点添加正常点
      addMeasurementPoint("mapMeasurementError"); //测点添加异常点
    }, 1000);
    seePointShow.value = true;
  };
  // const debounce = (fn, delay: any) => {
  //   let timer:any=null;
  //     return function (){
  //         if(timer!==null){
  //             clearTimeout(timer)
  //         }
  //         timer=setTimeout(()=>{
  //             fn.call(this)
  //         },delay)
  //     }
  // }
  // 台网-添加点
  const addStationsPoint = (layerId: any) => {
    let params = {
      collectionName: "NETWORK_BASE_INFO",
      outputEpsg: 4326,
      outputGeobuf: true,
      queryConditionList: [],
      queryResultList: [],
    };
    http.stationsInfoManage.getAddPoint(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      let data = res;
      let featureCollection = geobuf.decode(new Pbf(data)); // 对GeoBuf解码
      if (Object.keys(featureCollection).length != 0) {
        let options = {
          layerId: layerId,
          name: "cname",
          optionIcon: {
            url: pieImage.netWorkImg,
            id: 10,
            name: layerId,
            base64: true,
          },
        };
        baseMapObj.addPoint(featureCollection, options);
        state.coverageList[0].value = true;
      }
    });
    // let params = {};
    // http.stationsInfoManage.getNetWorkList(params).then((res: any) => {
    //   let featureCollection = {
    //     type: "FeatureCollection",
    //     features: res.data.data,
    //   };
    //   let option = {
    //     layerId: layerId,
    //     name: "name",
    //     iconImgUrl: pieImage.netWorkImg,
    //   };
    //   baseMapObj.addPoint(featureCollection, option);
    // });
  };
  // 台站-添加点
  const addInternetPoint = (layerId: any) => {
    // res为所有台站ID
    let fieldValue: any;
    let pointId: any;
    let iconImgUrl: any;
    let overlap: any;
    let id: any;
    // 正常点
    if (layerId == "mapInternetSure") {
      fieldValue = 0;
      overlap = false;
      pointId = "mapInternetSure";
      iconImgUrl = pieImage.normalImg;
      id = 15;
    } else if (layerId == "mapInternetError") {
      // 异常点
      fieldValue = 1;
      overlap = false;
      pointId = "mapInternetError";
      iconImgUrl = pieImage.anomalousImg;
      id = 16;
    }
    let params = {
      networkId: facilityNetwork.id ? facilityNetwork.id : null,
      userId: store.state.user.userId,
      stationCode: state.stationcode ? state.stationcode : null,
      stationId: state.stationNameId ? state.stationNameId : null,
      stationTypeId: state.stationTypeInfo ? state.stationTypeInfo : null,
      subjectId: state.subjectInfo ? state.subjectInfo : null,
    };
    //如果是不是从检索框里点击台网，需台站相关数据
    if (state.facility == false) {
      params.stationTypeId = null;
      params.stationId = null;
      params.stationCode = null;
    }
    internetApi(pointId, iconImgUrl, overlap, params, id);
  };
  // 修改关系图数据中的links和nodes
  const changeDiagram = (obj: any) => {
    diagramProps.nodes.push({
      id: obj.id,
      name: obj.name,
      symbolSize: obj.symbolSize,
      value: obj.value,
      category: obj.category,
      level: obj.level,
    });
    if (obj.linkstatus) {
      diagramProps.links.push({
        source: String(obj.id),
        target: String(obj.target),
      });
    }
  };
  const initDiagram = () => {
    diagramProps.nodes = [];
    diagramProps.links = [];
    // 加台网数据
    changeDiagram({
      id: String(diagramProps.head.id) + "10",
      name: diagramProps.head.name,
      symbolSize: 30,
      value: [diagramProps.head.longitude, diagramProps.head.latitude],
      category: 0,
      level: 1,
      linkstatus: false,
    });
    // 加学科
    let subject = [
      "测震台站",
      "强震台站",
      "GNSS",
      "次声台站",
      "地磁台站",
      "重力台站",
    ];
    for (let i = 0; i < subject.length; i++) {
      changeDiagram({
        id: String(i + 1),
        name: subject[i],
        symbolSize: 20,
        value: [diagramProps.head.longitude, diagramProps.head.latitude],
        category: i + 1,
        level: 2,
        linkstatus: true,
        target: String(diagramProps.head.id) + "10",
      });
    }
  };
  // 点击关系图节点地图飞向对应位置
  const clickDiagram = (center: any) => {
    baseMapObj.flyTo(center, 9);
  };
  // 台站-点-接口
  const internetApi = (
    pointId: any,
    iconImgUrl: any,
    overlap: any,
    params: any,
    id: any
  ) => {
    // 初始化关系图
    if (!state.subjectInfo) {
      initDiagram();
    }
    http.stationsInfoManage.getNetPoint(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        let data: any;
        if (res.data) {
          data = res.data;
          let layers = [
            {
              layerId: "seismometry",
              name: "测震",
              image: pieImage.stationIcon.seismometry,
            },
            {
              layerId: "strong",
              name: "强震",
              image: pieImage.stationIcon.strongShock,
            },
            {
              layerId: "GNSS",
              name: "GNSS",
              image: pieImage.stationIcon.GNSS,
            },
            {
              layerId: "infrasound",
              name: "次声",
              image: pieImage.stationIcon.infrasound,
            },
            {
              layerId: "terrestrial",
              name: "地磁",
              image: pieImage.stationIcon.geomagnetism,
            },
            {
              layerId: "gravity",
              name: "重力",
              image: pieImage.stationIcon.gravity,
            },
            {
              layerId: "abnormal",
              name: "故障",
              image: pieImage.stationIcon.anomalousImg,
            },
            {
              layerId: "offLayer",
              name: "离线",
              image: pieImage.stationIcon.offImg,
            },
            {
              layerId: "warnLayer",
              name: "告警",
              image: pieImage.stationIcon.warnImg,
            },
          ];
          let countList = [0, 0, 0, 0, 0, 0];
          // 加台站数据
          data.map((item: any) => {
            // 制作关系图
            if (!state.subjectInfo) {
              countList[item.properties.subject_id - 1]++;
              changeDiagram({
                id: String(item.properties.station_id),
                name: item.properties.name,
                symbolSize: 15,
                value: [item.properties.longitude, item.properties.latitude],
                category: item.properties.subject_id,
                level: 3,
                linkstatus: true,
                target: String(item.properties.subject_id),
              });
            }
          });
          if (!state.subjectInfo) {
            for (let i = 0; i < countList.length; i++) {
              diagramProps.nodes[i + 1].name += `(${countList[i]})`;
            }
            diagramProps.fresh = !diagramProps.fresh;
          }
          baseMapObj.addStationPoints(data, layers);
        }
      }
    });
    // 加学科分类
  };
  // 测点-添加点
  const addMeasurementPoint = (layerId: any) => {
    let fieldValue: any;
    let pointId: any;
    let iconImgUrl: any;
    let overlap: any;
    let id: any;
    if (layerId == "mapMeasurementSure") {
      fieldValue = 0;
      overlap = false;
      pointId = "mapMeasurementSure";
      iconImgUrl = pieImage.pointNormalImg;
      id = 17;
    } else if (layerId == "mapMeasurementError") {
      fieldValue = 1;
      overlap = true;
      pointId = "mapMeasurementError";
      iconImgUrl = pieImage.pointAnormalImg;
      id = 18;
    }
    let params = {
      stationId: facilityInfo.id,
    };
    measurementApi(layerId, pointId, iconImgUrl, overlap, params, id);
  };
  // 测点-点-接口
  const measurementApi = (
    layerId: any,
    pointId: any,
    iconImgUrl: any,
    overlap: any,
    params: any,
    id: any
  ) => {
    http.stationsInfoManage.getMeasurePoint(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res.code == 0 && res.data) {
        let data = res.data.data;
        let featureCollection = {
          features: data,
          type: "FeatureCollection",
        };
        if (Object.keys(featureCollection).length != 0) {
          if (state.watchPoint !== "") {
          }
          facilityNetwork.seeList = featureCollection.features;
          if (layerId == "mapMeasurementSure") {
            state.measurementData = featureCollection;
            facilityNetwork.seeList = featureCollection.features;
            state.options = {
              layerId: pointId,
              name: "name",
              iconImgUrl: iconImgUrl,
              overlap: overlap,
              optionIcon: {
                url: iconImgUrl,
                id,
                name: pointId,
                base64: true,
              },
            };
          } else if (layerId == "mapMeasurementError") {
            state.measurementDataError = featureCollection;
            state.options = {
              layerId: pointId,
              name: "name",
              iconImgUrl: iconImgUrl,
              overlap: overlap,
              optionIcon: {
                url: iconImgUrl,
                id,
                name: pointId,
                base64: true,
              },
            };
            // if (state.roleLevel != 2) {
            //   baseMapObj.addPoint(state.measurementDataError, state.options2);
            // }
          }
          baseMapObj.addPoint(featureCollection, state.options);
          state.coverageList[2].value = true;
        }
      }
    });
  };
  // 设备-添加点
  const addEquipmentPoint = (layerId: any) => {
    let params;
    if (isAdmins.value) {
      params = {
        collectionName: "DETECTION_DEVICE_INFO",
        outputEpsg: 4326,
        outputGeobuf: true,
        queryConditionList: [],
        queryResultList: [],
      };
    } else {
      params = {
        collectionName: "DETECTION_DEVICE_INFO",
        outputEpsg: 4326,
        outputGeobuf: true,
        queryConditionList: [
          {
            compareOp: "in",
            fieldName: "id",
            fieldValue: state.searchAll.deviceList.toString(),
            relationNextOne: "AND",
          },
        ],
        queryResultList: [],
      };
    }
    http.stationsInfoManage.getMeasurePoint(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      let data = res;
      let featureCollection = geobuf.decode(new Pbf(data)); // 对GeoBuf解码
      if (Object.keys(featureCollection).length != 0) {
        state.options3 = {
          layerId: layerId,
          name: "device_name",
          iconImgUrl: pieImage.equipmentImg,
        };
        state.equipmentData = featureCollection;
      }
    });
    // let params = {};
    // http.instrumentRegistration.getInstrument(params).then((res: any) => {
    //   let featureCollection = {
    //     type: "FeatureCollection",
    //     features: res.data.data,
    //   };
    //   state.options3 = {
    //     layerId: layerId,
    //     name: "device_name",
    //     iconImgUrl: pieImage.equipmentImg,
    //   };
    //   state.equipmentData = featureCollection;
    // });
  };
  // 根据台网id查询所有台站
  // 树结构属性
  const treeProps = {
    label: "name",
    children: "list",
  };
  // 树结构
  //点击获取tree
  const loadNode = (node: Node, resolve: (data: any) => void) => {
    // if (node.level === 1) {
    //   return resolve(node.data.list);
    // }
    let params = {
      unitId: "",
      stationId: "",
      pointId: "",
    };
    if (node.level == 1) {
      params = {
        unitId: node.data.id,
        stationId: "",
        pointId: "",
      };
    } else if (node.level == 2) {
      params = {
        unitId: "",
        stationId: node.data.id,
        pointId: "",
      };
    } else if (node.level == 3) {
      params = {
        unitId: "",
        stationId: "",
        pointId: node.data.id,
      };
    }
    if (node.level > 0 && node.level < 4) {
      loadLazy(params.unitId, params.stationId, params.pointId).then(
        (response) => {
          if (response) {
            resolve(response);
          } else {
            resolve([]);
          }
        }
      );
    } else {
      resolve([]);
    }
  };
  // 树形结构懒加载调用接口
  const loadLazy = async (unitId, stationId, pointId) => {
    let result: any = [];
    let params = {
      userId: store.state.user.userId,
      unitId, // 查询台站
      stationId, // 查询测点
      pointId, // 查询设备
    };
    await http.stationsInfoManage.getTreeTotal(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        result = res.data;
      } else {
        result = [];
      }
    });
    return result;
  };
  // 树结构-获取一级台网
  const getTreeStations = () => {
    let params = {
      userId: store.state.user.userId,
      unitId: "", // 查询台站
      stationId: "", // 查询测点
      pointId: "", // 查询设备
    };
    http.stationsInfoManage.getTreeTotal(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        state.treeStations = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };

  // 台站点击事件
  const onClicks = (layerIds: any) => {
    map.on("click", layerIds, (e: any) => {
      let features = map.queryRenderedFeatures(e.point, {
        layers: [layerIds],
      });
      facilityInfo.id = features[0].properties.station_id;
      searchId(features[0].properties.station_id);
      searchFacilityNum(features[0].properties.station_id);
      markData.pointTitle = features[0].properties.name;
      if (popup) {
        popup.remove();
      }

      //关闭各种子弹窗
      // isShowFacility.value = false;
      facility.value = false;
      showBigImgEcharts.value = false;
      showBigImgEchartsEquip.value = false;
      showInstrument.value = false;
    });
  };
  // 台站点击事件
  const onClicksPIE = (obj: any) => {
    equipInfo.isShowFlage = 2;
    stationAllInfo.stationInfoIshow = false; //台站详情弹框
    state.stationInfo = obj;
    measureShow.value = false;
    facilityInfo.id = obj.station_id;
    searchId(obj.station_id);
    searchFacilityNum(obj.station_id);
    markData.pointTitle = obj.name;
    if (popup) {
      popup.remove();
    }

    //关闭各种子弹窗
    // isShowFacility.value = false;
    facility.value = false;
    showBigImgEcharts.value = false;
    showBigImgEchartsEquip.value = false;
    showInstrument.value = false;
    // 获取该台站下的测点
    addMeasurementPoint("mapMeasurementSure"); //测点添加正常点
  };
  //台站弹框关闭事件
  const cancelStation = () => {
    facility.value = false;
    showInstrument.value = false;
    showBigImgEcharts.value = false;
  };
  // 历史弹框-打开事件
  const historyWeave = () => {
    showInstrument.value = false;
  };
  // 历史弹框-关闭事件
  const historyCancel = () => {
    showInstrument.value = true;
  };

  // 台网点击事件
  const onClickNet = (layerIds: any) => {
    map.on("click", layerIds, (e: any) => {
      let features = map.queryRenderedFeatures(e.point, {
        layers: [layerIds],
      });
      facilityNetwork.linkageColumns = [
        {
          prop: "stationName",
          label: "台站名称",
        },
        {
          prop: "stationTypeName",
          label: "台站类型",
        },
      ];
      facilityNetwork.id = features[0].properties.network_id; //存储当前点击的台网id
      stationSearch(); // 查询台站
      let center = [e.lngLat.lng, e.lngLat.lat];
      map.flyTo({ center, zoom: state.zoom1 }); //飞行到点击位置
      if (popup) {
        popup.remove();
      }

      if (features[0].properties.network_id) {
        let params = {
          id: features[0].properties.network_id,
        };
        http.stationsInfoManage.getNetWorkList(params).then((res: any) => {
          if (baseMapObj.destory) {
            return;
          }
          if (res && res.code == 0) {
            let properties;
            properties = res.data;
            if (features.length > 0) {
              // addStationPoints("mapInternetSure"); //添加台站点
              let coordinates =
                properties.longitude + "   ,  " + properties.latitude;
              state.markData1 = [];
              state.markData1[0] = {
                label: "经纬度",
                value: coordinates,
                name: "coordinates",
              };
              // state.markData1[1] = {
              //   label: "数字代码",
              //   value: properties.figure_code,
              //   name: "figure_code",
              // };
              state.markData1[1] = {
                label: "字母代码",
                value: properties.code,
                name: "letter_code",
              };
              state.valueDataElse[0] = {
                label: "台站总数",
                value: properties.stationNum,
                name: "stationNum",
              };
              state.valueDataElse[1] = {
                label: "测点总数",
                value: properties.pointNum,
                name: "pointNum",
              };
              state.valueDataElse[2] = {
                label: "设备正常",
                value: properties.normalDeviceNum,
                name: "normalDeviceNum",
              };
              state.valueDataElse[3] = {
                label: "设备异常",
                value: properties.notNormalDeviceNum,
                name: "notNormalDeviceNum",
              };
              markShow.value = true;
              showInfoMark.value = true;
              netWorkTitle.value = properties.name;
              markShowEquip.value = false;
              showPonit.value = false;

              //关闭各种子弹窗
              // isShowFacility.value = false;
              facility.value = false;
              showBigImgEcharts.value = false;
              showBigImgEchartsEquip.value = false;
              showInstrument.value = false;
            }
          }
        });
      }
      // 根据台网ID查台站
      addInternetPoint("mapInternetSure");

      // onClicks("mapInternetSure"); // 台站添加正常点-点击
    });
  };
  // 学科卡片点击事件
  const clickSubjectbox = (num: any) => {
    // 点击卡片当中的事件
    stationAllInfo.flag = 2;
    subjectTypeChange(num);
  };
  // 处理没网络情况下关系图的内容和学科重置
  const clickPiereset = (obj: any) => {
    state.subjectInfo = ""; // 将学科信息重置
    diagramProps.head = {
      id: obj.network_id,
      latitude: obj.latitude,
      longitude: obj.longitude,
      name: obj.cname,
    };
    // 没网的时候下面的才有用
    diagramProps.nodes[0].name = obj.cname;
    diagramProps.nodes[0].value = [obj.longitude, obj.latitude];
  };
  const onClickNetPIE = (obj: any) => {
    stationAllInfo.stationInfoIshow = false; //台站详情弹框
    state.facility = true;
    state.coverageList[1].value = true;
    state.netWorkTitle = obj.cname;
    clickPiereset(obj);
    state.netInfo = obj;
    facilityNetwork.linkageColumns = [
      {
        prop: "name",
        label: "台站",
        width: 90,
      },
      {
        prop: "code",
        label: "台网编码",
      },
      // {
      //   prop: "networkname",
      //   label: "台网",
      // },
      {
        prop: "stationtypename",
        label: "台阵",
      },
    ];
    facilityNetwork.id = obj.network_id; //存储当前点击的台网id
    // stationSearch(); // 查询台站
    // stationSearch(true, "1"); //查询正常台站
    // stationSearch(true, "0"); //查询异常台站
    // let center = [e.lngLat.lng, e.lngLat.lat];
    // map.flyTo({ center, zoom: state.zoom1 }); //飞行到点击位置
    if (popup) {
      popup.remove();
    }
    let properties;
    if (obj.network_id) {
      let params = {
        id: obj.network_id,
      };
      http.stationsInfoManage.getNetWorkList(params).then((res: any) => {
        if (baseMapObj.destory) {
          return;
        }
        if (res && res.code == 0) {
          properties = res.data;
          // addStationPoints("mapInternetSure"); //添加台站点
          let coordinates =
            properties.longitude + "   ,  " + properties.latitude;
          state.markData1 = [];
          state.markData1[0] = {
            label: "经纬度",
            value: coordinates,
            name: "coordinates",
          };
          state.markData1[1] = {
            label: "字母代码",
            value: properties.code,
            name: "letter_code",
          };
          state.valueDataElse[0] = {
            label: "台站总数",
            value: properties.stationNum,
            name: "stationNum",
          };
          state.valueDataElse[1] = {
            label: "测点总数",
            value: properties.pointNum,
            name: "pointNum",
          };
          state.valueDataElse[2] = {
            label: "设备正常",
            value: properties.normalDeviceNum,
            name: "normalDeviceNum",
          };
          state.valueDataElse[3] = {
            label: "设备异常",
            value: properties.notNormalDeviceNum,
            name: "notNormalDeviceNum",
          };
          // markShow.value = true;
          // showInfoMark.value = true;
          netWorkTitle.value = properties.name;
          markShowEquip.value = false;
          showPonit.value = false;
          // pienetinfo显示
          state.netInfoIsshow = true;
          stationInsStatus(obj.network_id);
          getStationClassify(obj.network_id);
          histogramProps.title = "站网关系图";
          //关闭各种子弹窗
          // isShowFacility.value = false;
          facility.value = false;
          showBigImgEcharts.value = false;
          showBigImgEchartsEquip.value = false;
          showInstrument.value = false;
        }
      });
    }
    // 根据台网ID查台站
    addInternetPoint("mapInternetSure");
    // addInternetPoint("mapInternetSure"); // 台站添加异常点
    // addInternetPoint("mapInternetError"); // 台站添加正常点

    // onClicks("mapInternetSure"); // 台站添加正常点-点击
  };
  //设备点击事件 yyq
  const onClicksEquip = (layerIds: any) => {
    let id: any = ref(null);
    let dataObj = reactive(<any>{});
    map.on("click", layerIds, (e: any) => {
      let features = map.queryRenderedFeatures(e.point, {
        layers: [layerIds],
      });
      // 根据id查询整条数据 然后通过name传到弹框组件中
      id.value = features[0].properties.id;
      let params = {
        id: id.value,
      };
      http.instrumentRegistration.selectDeviceById(params).then((res: any) => {
        if (baseMapObj.destory) {
          return;
        }
        if (res && res.code == 0) {
          dataObj = res.data;
          let obj = {
            value: dataObj.stationId,
          };
          if (features.length > 0) {
            state.markDataEquip[0] = {
              label: "设备名称",
              value: features[0].properties.device_name,
              name: features[0].properties.device_name,
            };
            state.markDataEquip[1] = {
              label: "设备类型",
              value: features[0].properties.classify_name,
              name: dataObj.classifyId,
            };
            state.markDataEquip[2] = {
              label: "隶属台站",
              value: features[0].properties.station_name,
              name: obj,
            };
            state.markDataEquip[3] = {
              label: "设备编号",
              value: features[0].properties.number,
              name: dataObj.number,
            };
            state.markDataEquip[4] = {
              label: "设备型号",
              value: features[0].properties.type_name,
              name: dataObj.typeId,
            };
            state.markDataEquip[5] = {
              label: "归属测点",
              value: features[0].properties.point_name,
              name: dataObj.detectionPointId,
            };
            state.thisEquipId = features[0].properties.id;

            markShowEquip.value = true;
            showUpdateEquip.value = false;
            showInfoMarkEquip.value = true;
            showInfoMark.value = false;
            showPonit.value = false;
            equipTitle.value = features[0].properties.device_name;

            equipmentVal.value = features[0].properties.manufacture; //设备名字

            zoomStartTimeThree.value = "";
            zoomEndTimeThree.value = "";
            zoomStartTimeFour.value = "";
            zoomEndTimeFour.value = "";

            //关闭各种子弹窗
            // isShowFacility.value = false;
            facility.value = false;
            showBigImgEcharts.value = false;
            showBigImgEchartsEquip.value = false;
            showInstrument.value = false;
            //加载echart图前初始化数据
            showWave(2); //展示第一个图
            showWaveBottom(2); //第二个图 （目前是死数据，设备id传空）
          }
        } else {
          ElMessage.error(res.message);
        }
      });
      if (popup) {
        popup.remove();
      }
    });
  };
  // 测点点击事件
  const measureClick = (layerIds: any) => {
    map.on("click", layerIds, (e: any) => {
      let features = map.queryRenderedFeatures(e.point, {
        layers: [layerIds],
      });
      let obj = features[0].properties;
      measureShow.value = true;
      measureObj.value = obj;
      // nextTick(() => {
      //   threeModel.initModel(threeRef);
      // })
    });
  };
  const measureClickPIE = (obj: any) => {
    stationAllInfo.stationInfoIshow = false; //台站详情弹框
    measureShow.value = true;
    measureObj.value = obj;
  };
  //设备 编辑按钮
  const updateInfo = (item: any) => {
    showUpdateEquip.value = true;
    showInfoMarkEquip.value = false;
  };
  //设备 确认编辑
  const submitForm = (item: any, id: any) => {
    markShowEquip.value = false;
    let params = {
      classifyId: item[1].name,
      detectionPointId: item[6].name,
      deviceName: item[0].name,
      id: id,
      ip: "",
      latitude: item[8].name,
      longitude: item[7].name,
      elevation: item[9].name,
      number: item[3].name,
      observationSite: item[5].name,
      stationId: item[2].name.value,
      typeId: item[4].name,
      remark: item[10].name,
    };
    http.instrumentRegistration.editDevice(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        ElMessage.success("编辑成功！");
        addEquipmentPoint("mapEquipment"); //设备添加点
        markShowEquip.value = false;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //设备 删除按钮
  const delInfo = (id: any) => {
    let params = {
      id: id,
    };
    http.instrumentRegistration.delDevice(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        ElMessage.success("删除成功！");
        addEquipmentPoint("mapEquipment"); //设备添加点
      } else {
        ElMessage.error(res.message);
      }
    });
  };

  // 弹框里面的信息
  const searchId = (id: any) => {
    markShow.value = false;
    markShowEquip.value = false;
    markData.detailPoint.name = "";
    markData.detailPoint.networkname = "";
    markData.detailPoint.stationtypename = "";
    markData.detailPoint.latitude = "";
    markData.detailPoint.longitude = "";
    markData.detailPoint.code = "";
    markData.detailPoint.create_time = "";
    markData.detailPoint.elevation = "";
    markData.detailPoint.status = "";
    let params = {
      stationId: id,
      overseas: "",
      unit: "",
      stationType: "",
      stationName: "",
      stationStatus: "",
      pageNum: 1,
      pageSize: 10,
    };
    http.stationsInfoManage.searchId(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        if (res.data.list.length > 0) {
          let data = res.data.list;
          markData.detailPoint = data[0];
        } else {
          ElMessage.info("站点暂无信息");
        }
        state.netInfoIsshow = false;
        showPonit.value = true;
        histogramProps.title = "站网关系图";
        getInstStatus(id);
        instrumentClick(1);
      } else {
        ElMessage.error(res.message);
      }
    });
  };

  //搜索台站tab栏 -获取国家级(未用)
  const getCountry = () => {
    // let params = {
    //   parentId: 0,
    // };
    // http.stationsInfoManage.getCountry(params).then((res: any) => {
    //   if (res && res.code == 0) {
    //     state.foreignList = res.data;
    //   } else {
    //     ElMessage.error(res.message);
    //   }
    // });
  };
  //搜索台网tab栏 获取台网
  const getProvince = () => {
    // let selectNetwork: any;
    // if (state.foreignValue) {
    //   selectNetwork = state.foreignValue;
    // } else {
    //   selectNetwork = 32;
    // }
    // let params = {
    //   parentId: selectNetwork,
    // };
    http.stationsInfoManage.getCountry({}).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        state.selectNetList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //搜索台站tab栏 获取隶属学科
  const getSubject = (params) => {
    http.stationsInfoManage.getSubject(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      let arr: any = [];
      if (res && res.code == 0) {
        res.data.data.forEach((item: any) => {
          arr.push(item.properties);
        });
        state.subjectTypeList = arr;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //搜索台站tab栏 -根据国家级id查询省级  (未用)
  const getCountryNet = () => {
    let data = {
      countryId: state.foreignValue,
    };
    http.stationsInfoManage.getStationCountry(data).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        state.selectNetLists = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 获取台阵列表
  const getTaiwanese = () => {
    let params = {
      unitId: "",
    };
    provinceTaiwanese(params);
  };
  // 台阵api
  const provinceTaiwanese = (data: any) => {
    http.stationsInfoManage.getTaiwanese(data).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        state.stationArrayList = res.data;
      } else {
        ElMessage({
          message: res.message,
          type: "error",
        });
      }
    });
  };
  //搜索台站tab栏 -获取台站
  const getStations = () => {
    let params = {
      unitId: "",
      stationTypeId: "",
      subjectId: "",
    };
    stationsTotal(params);
  };
  //搜索台站tab栏 -台站api
  const stationsTotal = (data: any) => {
    http.stationsInfoManage.getStationsEarth(data).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        state.stationChildList = res.data;
      } else {
        ElMessage({
          message: res.message,
          type: "error",
        });
      }
    });
  };
  //搜索设备tab栏 -获取台站
  const getequipmentStations = (params = {}) => {
    http.stationsInfoManage.getStationsEarth(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        state.stationChildList2 = res.data;
      } else {
        ElMessage({
          message: res.message,
          type: "error",
        });
      }
    });
  };
  //搜索台站tab栏 -国家级change事件 (未用)
  const foreignChang = (v: any) => {
    state.foreignValue = v;
    getCountryNet(); //省级
    let params = {
      unitId: state.selectNetwork ? state.selectNetwork.id : v, //省级// 加一个省级
    };
    // provinceTaiwanese(params); // // 点击国家级查询台阵
    let data = {
      unitId: state.selectNetwork ? state.selectNetwork.id : v, //省级
      stationTypeId: state.stationArray, //台阵
    };
    // stationsTotal(data); // 点击台网查询子台站
    // addInternetPoint("mapInternetSure"); // 台站添加异常点
    // addInternetPoint("mapInternetError"); // 台站添加正常点
  };
  //省级改变事件  (未用)
  const networkChange = (val: any) => {
    state.selectStationPro = val;
    facilityNetwork.id = val.networkId;
    addInternetPoint("mapInternetSure"); // 台站添加异常点台站添加正常点
    // addInternetPoint("mapInternetError"); // 台站添加异常点
    let params = {
      unitId: state.selectStationPro
        ? state.selectStationPro.networkId
        : val.networkId, //省级
    };
    // provinceTaiwanese(params); // // 点击省级查询台阵
    let data = {
      networkId: state.selectStationPro
        ? state.selectStationPro.networkId
        : val.networkId, //省级
      // stationTypeId: state.stationArray, //台站
    };
    stationsTotal(data); // 点击省级查询台站
    // flyProvince(val); // 选择省级以后飞行定位
  };
  //搜索台网tab栏 -台网改变事件
  const networkChange1 = (val: any) => {
    if (val) {
      let obj = {
        cname: val.cname,
        latitude: val.latitude,
        longitude: val.longitude,
        network_id: val.networkId,
      };
      onClickNetPIE(obj);
    }
    // state.selectNetwork = val;
    state.selectNetworkInfo = val.networkId;
    markShow.value = false;
    // 定位
    let center = {
      lat: val.latitude,
      lng: val.longitude,
    };
    // map.flyTo({ center, zoom: state.zoom1 }); //飞行到点击位置
    baseMapObj.flyTo([val.longitude, val.latitude], state.zoom2);
    // 点击台网查询台阵
    let params = {
      unitId: val.networkId,
    };
    // provinceTaiwanese(params);
    let data = {
      unitId: val.networkId,
      stationTypeId: state.stationArray,
    };
  };
  //搜索台站tab栏 -台网改变事件
  const stationNetworkChange = (val: any) => {
    //台网改变之后台站/站编号的值需清空
    if (val) {
      state.stationNameId = "";
      state.stationcode = "";
    }
    //关闭台站的弹框
    showPonit.value = false;
    diagramProps.head = {
      id: val.code,
      name: val.cname,
      latitude: val.latitude,
      longitude: val.longitude,
    };
    state.selectNetwork = val.networkId;
    let params = {
      networkId: val.networkId,
    };
    let param = {
      networkId: val.networkId,
      stationTypeId: state.stationTypeInfo,
      subjectId: state.subjectInfo,
    };
    facilityNetwork.id = val.networkId;
    addInternetPoint("mapInternetSure"); // 台站添加异常点台站添加正常点
    // addInternetPoint("mapInternetError"); // 台站添加异常点
    // 定位
    baseMapObj.flyTo([val.longitude, val.latitude], state.zoom1);
    getSubjectLists(params); // 点击台网查台站类型
    stationsTotal(param); // 点击台网查询子台站
    // subjectTypeChange(params);点击台网查隶属学科
  };
  //点击台站tab栏
  watch(
    () => state.selectNetwork,
    (newVal, oldVal) => {
      if (newVal == "") {
        let params = {
          networkId: "",
        };
        let param = {
          networkId: "",
          stationTypeId: "",
          subjectId: "",
        };
        getSubjectLists(params); // 查台站类型
        stationsTotal(param); // 查询台站
      }
    },
    {
      deep: true,
    }
  );
  //点击设备tab栏
  watch(
    () => state.networkInfo,
    (newVal, oldVal) => {
      if (newVal == "") {
        let params = {
          networkId: "",
        };
        getEpuipment(); //设备下拉框
        getequipmentStations(params); //设备中台站的值
      }
    },
    {
      deep: true,
    }
  );
  //搜索台站tab栏 -隶属学科改变事件
  const subjectTypeChange = (val: any) => {
    //清空台站弹出框标题
    stationAllInfo.stationTitleSub = "";
    if (val) {
      state.stationNameId = "";
      state.stationcode = "";
    }
    //关闭台站的弹框
    showPonit.value = false;
    state.subjectInfo = val;
    addInternetPoint("mapInternetSure"); // 台站添加异常点台站添加正常点
    // addInternetPoint("mapInternetError"); //台站添加异常点
    let params = {
      networkId: state.selectNetwork,
      stationTypeId: state.stationTypeInfo,
      subjectId: val,
    };
    stationsTotal(params);
    //查询台站弹出框表格数据
    subjectTable();
    //点学科类型卡片时台站弹出框不弹出
    if (stationAllInfo.flag == 1) {
      stationAllInfo.stationInfoIshow = true; //台站详情弹框
    } else {
      stationAllInfo.stationInfoIshow = false; //台站详情弹框
    }
    //拿到台站弹出框学科标题
    if (state.subjectInfo) {
      state.subjectTypeList.forEach((item: any) => {
        if (item.id == state.subjectInfo) {
          stationAllInfo.stationTitleSub = item.name;
        }
      });
    } else {
      stationAllInfo.stationTitleSub = "";
    }
    // 获取台站echarts数据
    stationTotalFun();
    //查询台网
    netWorkSearchChange();
  };
  //搜索 - 点击学科类型
  const subjectTypeClick = (id: any) => {
    state.netWorkSearch = "";
    state.networkIdVal = "";
    state.stationTypeInfo = "";
    // stationAllInfo.flag = 2;
    subjectTypeChange(id);
  };
  //搜索 - 点击台站类型与学科类型切换图标
  const cutFun = (id: any) => {
    // id   0台站类型   1学科类型
    if (id == 0) {
      state.subjectInfo = ""; //清空学科id
      stationAllInfo.stationTitleSub = ""; //清空学科标题
      if (state.subjectListList[0].id) {
        subjectListChange(state.subjectListList[0].id);
        //查询台站总数
        searchStationNum(state.subjectListList[0].id);
      }
    } else if (id == 1) {
      state.stationTypeInfo = ""; //清空台站类型id
      stationAllInfo.stationTitleType = ""; //清空台站类型标题
      if (state.subjectTypeList[0].id) {
        subjectTypeChange(state.subjectTypeList[0].id);
      }
    }
  };
  //获取台站echarts数据
  const stationTotalFun = () => {
    let param = {
      stationTypeId: state.stationTypeInfo,
      subjectId: state.subjectInfo,
    };
    http.statusMonitor.stationInsStatus(param).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res) {
        if (res.code == 0) {
          //台站状态
          stationAllInfo.stationStatusInfo = {
            subtext: res.data.stationTotal,
            data: [
              {
                value: res.data.stationNomarl,
                name: "正常",
              },
              {
                value: res.data.stationErr || null,
                name: "故障",
              },
              {
                value: res.data.stationWarning || null,
                name: "告警",
              },
              {
                value: res.data.stationOffLine || null,
                name: "离线",
              },
            ],
          };
          //设备状态（正常、异常、告警、离线）
          stationAllInfo.equipmentStatusInfo = {
            subtext: res.data.instTotal,
            data: [
              {
                value: res.data.instNomarl,
                name: "正常",
              },
              {
                value: res.data.instErr || null,
                name: "故障",
              },
              {
                value: res.data.instWarning || null,
                name: "告警",
              },
              {
                value: res.data.instOffLine || null,
                name: "离线",
              },
            ],
          };
        } else {
          ElMessage.error(res.message);
        }
      } else {
        stationAllInfo.stationStatusInfo = {
          subtext: null,
          data: [
            {
              value: null,
              name: "正常",
            },
            {
              value: null,
              name: "故障",
            },
            {
              value: null,
              name: "告警",
            },
            {
              value: null,
              name: "离线",
            },
          ],
        };
        stationAllInfo.equipmentStatusInfo = {
          subtext: null,
          data: [
            {
              value: null,
              name: "正常",
            },
            {
              value: null,
              name: "故障",
            },
            {
              value: null,
              name: "告警",
            },
            {
              value: null,
              name: "离线",
            },
          ],
        };
      }
    });
  };
  //搜索台站tab栏 -获取台站表格数据
  const subjectTable = () => {
    let tabParams = {
      pageSize: stationAllInfo.pageSize,
      pageNum: stationAllInfo.pageNum,
      stationTypeId: state.stationTypeInfo,
      sujectId: state.subjectInfo,
      status: state.statusStation,
      networkId: state.networkIdVal,
    };
    http.stationsInfoManage.getSubjectTable(tabParams).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      //搜索台站tab栏 - 隶属学科和台站类型表格
      stationAllInfo.linkageData = res.data.list;
      stationAllInfo.total = res.data.total;
      stationAllInfo.linkageColumns = [
        {
          prop: "name",
          label: "台站名称",
        },
        {
          prop: "code",
          label: "台站编码",
        },
        {
          prop: "networkname",
          label: "隶属台网",
        },
      ];
    });
  };
  //分页
  const sizeChangeSearch = (size: any) => {
    stationAllInfo.pageSize = size;
    subjectTable();
  };
  //分页
  const pageChangeSearch = (num: any) => {
    stationAllInfo.pageNum = num;
    subjectTable();
  };
  //台站弹出框 - 点击echarts
  const clickGraph = (item: any) => {
    if (item.name == "正常") {
      state.statusStation = 0;
    } else if (item.name == "故障") {
      state.statusStation = 1;
    } else if (item.name == "预警") {
      state.statusStation = 2;
    } else if (item.name == "离线") {
      state.statusStation = 3;
    }
    netWorkSearchChange();
  };
  //台站弹出框 - 查台网数据
  const netWorkSearchChange = () => {
    let params = {
      stationTypeId: state.stationTypeInfo,
      status: state.statusStation,
      subjectId: state.subjectInfo,
    };
    http.stationsInfoManage.netStationType(params).then((res: any) => {
      if (baseMapObj.destory) { return };
      if (res && res.code == 0) {
        state.netWorkListSearch = res.data;
        subjectTable();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //搜索- 台站弹出框 - 台网改变事件
  const networkIdVal = (val: any) => {
    state.networkIdVal = val;
    netWorkSearchChange();
  };
  //台站点击事件
  const stationRowclick = (row: any) => {
    if (!row.longitude || !row.latitude) {
      ElMessage.warning('暂不支持定位功能')
    }
    baseMapObj.flyTo([row.longitude, row.latitude], state.zoom2);
  };
  //搜索台站tab栏 -获取台站类型(不是全部数据)
  const getSubjectLists = (params: any) => {
    http.stationsInfoManage.getSubjectList(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      state.subjectListList = res.data;
    });
  };
  //搜索台站tab栏 -获取台站类型(全部数据)
  const getStationTypeAll = () => {
    http.stationsInfoManage.stationTypeAll().then((res: any) => {
      state.stationTypeAll = res.data;
    });
  };
  //搜索台站tab栏 -台站类型改变事件
  const subjectListChange = (val: any) => {
    //清空台站弹出框标题
    stationAllInfo.stationTitleType = "";
    if (val) {
      state.stationNameId = "";
      state.stationcode = "";
    }
    //关闭台站的弹框
    showPonit.value = false;
    let params = {
      networkId: state.selectNetwork,
      stationTypeId: val,
      subjectId: state.subjectInfo,
    };
    stationsTotal(params);
    state.stationTypeInfo = val;
    addInternetPoint("mapInternetSure"); // 台站添加异常点台站添加正常点
    stationAllInfo.stationInfoIshow = true; //台站详情弹框
    //台站类型改变事件 查询台站弹出框数据
    subjectTable();
    //获取台站标题
    if (state.stationTypeInfo) {
      state.subjectListList.forEach((item: any) => {
        if (item.id == state.stationTypeInfo) {
          stationAllInfo.stationTitleType = item.typeName;
        }
      });
    } else {
      stationAllInfo.stationTitleType = "";
    }
    stationTotalFun();
    //获取台网
    netWorkSearchChange();
  };
  //台站类型改变事件(点击按钮)
  const statinoTypeClick = (item: any) => {
    state.facility = true;
    state.subjectInfo = ""; //清空学科
    state.netWorkSearch = "";
    state.networkIdVal = ""
    subjectListChange(item.id);
    //查询台站总数
    searchStationNum(item.id);
  };
  //搜索台网tab栏 - 台网编号改变事件
  const netCodeChange = (val: any) => {
    state.selectNetworkCodeInfo = val.networkId;
    if (val) {
      let obj = {
        network_id: val.networkId,
        cname: val.cname,
        latitude: val.latitude,
        longitude: val.longitude,
      };
      onClickNetPIE(obj);
    }
    let center = {
      lat: val.latitude,
      lng: val.longitude,
    };
    baseMapObj.flyTo([val.longitude, val.latitude], state.zoom2);
  };
  //添加台网下的台站点
  const addStationPoints = (layerId: any) => {
    let params = {
      unitId: state.selectNetwork.id,
      stationTypeId: state.stationArray,
    };
    http.stationsInfoManage.getStationsEarth(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res.code !== 0) {
        ElMessage({
          message: res.message,
          type: "error",
        });
      } else {
        let features = <any>[];
        res.data.map((e: any) => {
          let coordinates = [];
          coordinates.push(parseFloat(e.longitude));
          coordinates.push(parseFloat(e.latitude));
          let geometry = {
            coordinates: coordinates,
            type: "Point",
          };
          let single = {
            geometry: geometry,
            properties: e,
          };
          features.push(single);
        });

        let featureCollection = {
          type: "FeatureCollection",
          features: features,
        };
        let option = {
          layerId: layerId,
          name: "stationName",
          iconImgUrl: pieImage.normalImg,
          base64: true,
        };
        baseMapObj.addPoint(featureCollection, option);
      }
    });
  };
  // 选择省级以后飞行定位
  const flyProvince = (v: any) => {
    let params = {
      collectionName: "META_DATA_NETWORK_UNIT_CODE",
      outputEpsg: 4326,
      outputGeobuf: true,
      queryConditionList: [
        {
          compareOp: "=",
          fieldName: "id",
          fieldValue: v,
          relationNextOne: "AND",
        },
      ],
      queryResultList: [],
    };
    http.stationsInfoManage.getAddPoint(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      let data = res;
      let featureCollection = geobuf.decode(new Pbf(data)); // 对GeoBuf解码
      if (Object.keys(featureCollection).length != 0) {
        // map.flyTo({
        //   center: featureCollection.features[0].geometry.coordinates,
        //   zoom: 6.5,
        // });
      }
    });
  };
  //台阵改变事件
  const stationArrayChange = (v: any) => {
    // 清空其他值
    state.stationChild = ""; //台站
    state.stationArray = v;
    addInternetPoint("mapInternetSure"); // 台站添加异常点
    addInternetPoint("mapInternetError"); // 台站添加正常点
    let params = {
      unitId: state.selectStationPro
        ? state.selectStationPro
        : state.foreignValue, //省级
      stationTypeId: v, //台阵
    };
    stationsTotal(params); // 点击台阵查询子台站
  };
  //台网-台阵改变事件
  const stationArrayChange1 = (v: any) => {
    let params = {
      unitId: state.selectNetwork.id,
      stationTypeId: v,
    };
    stationsTotal(params); // 点击台网查询子台站
    // addStationPoints("stationChild"); //地图添加该台网下的台站点
  };
  //搜索台站tab栏-台站改变事件
  const stationChildChange = (val: any) => {
    // if (val) {
    //   state.stationcode = ""
    // }
    state.stationNameId = val.stationId;
    addInternetPoint("mapInternetSure"); // 台站添加异常点台站添加正常点
    if (val) {
      let stationObj = {
        name: val.name,
        station_id: val.stationId,
      };
      onClicksPIE(stationObj);
    }
    // 将测点隐藏
    // state.coverageList[2].value = false;
    let center = {
      lat: val.latitude,
      lng: val.longitude,
    };
    baseMapObj.flyTo([val.longitude, val.latitude], state.zoom2);
  };
  //搜索设备tab栏-台站改变事件
  const equipmentListApi = () => {
    let id = 30;
    let params = {
      name: state.nameDevice ? state.nameDevice : null,
      code: state.codeDevice ? state.codeDevice : null,
      network: state.networkInfo ? state.networkInfo : null,
      station: facilityInfo.id ? facilityInfo.id : null,
      cate: state.equipmentTypeVal ? state.equipmentTypeVal : null,
    };
    http.stationsInfoManage.searchfacility(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res.code == 0) {
        //设备下拉框的值
        let tableData: any = [];
        let tableList = JSON.parse(JSON.stringify(res.data));
        tableList.map((item: any) => {
          item.properties.name =
            item.properties.name + `(${item.properties.pointname})`;
          tableData.push(item.properties);
          return tableData;
        });
        state.deviceList = tableData;
        let featureCollection = {
          type: "FeatureCollection",
          features: res.data,
        };
        let options = {
          optionIcon: {
            url: pieImage.equipmentImg,
            id,
            name: "mapEquipment",
            base64: true,
          },
          layerId: "mapEquipment",
          name: "name",
        };
        baseMapObj.addPoint(featureCollection, options);
        // 定位
        // baseMapObj.flyTo([val.longitude, val.latitude], state.zoom2);
        state.coverageList[3].value = true;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //搜索设备tab栏-台站改变事件
  const getEpuipment = () => {
    let params = {
      name: null,
      code: null,
      network: null,
      station: null,
      cate: null,
    };
    http.stationsInfoManage.searchfacility(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res.code == 0) {
        let tableData: any = [];
        let tableList = JSON.parse(JSON.stringify(res.data));
        tableList.map((item: any) => {
          item.properties.name =
            item.properties.name + `(${item.properties.pointname})`;
          tableData.push(item.properties);
          return tableData;
        });
        state.deviceList = tableData;
      }
    });
  };
  //搜索设备tab栏-台站改变事件
  const stationEquipChange = (val: any) => {
    if (val) {
      state.nameDevice = "";
    }
    // state.stationIdInfo = val.stationId;
    facilityInfo.id = val.stationId;
    equipmentListApi();
    searchList("");
  };
  //搜索设备tab栏-台网改变事件
  const equipNetworkChange = (val: any) => {
    if (val) {
      facilityInfo.id = "";
    }
    state.networkInfo = val.networkId;
    //打设备的点
    equipmentListApi();
    searchList("");
    //查询设备
    equipInfo.ShowPonit = true;
    //查询设备
    state.stationChildList2 = [];
    let params = {
      networkId: val.networkId,
    };
    getequipmentStations(params);
    // 定位
    baseMapObj.flyTo([val.longitude, val.latitude], state.zoom2);
  };
  //搜索设备tab栏-查询设备类型事件
  const getEquipmentType = (data: any) => {
    http.stationsInfoManage.equipmentTypeFun(data).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res.code == 0) {
        state.equipmentTypeList = res.data.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //搜索设备tab栏-设备类型改变事件
  const equipmentTypeChange = (val: any) => {
    state.equipmentTypeVal = val;
    equipmentListApi();
  };

  //搜索台站tab栏-台站编号改变事件
  const stationCodeChange = (val: any) => {
    // if (val) {
    //   state.stationNameId = ""
    // }
    state.stationcode = val.code;
    addInternetPoint("mapInternetSure"); // 台站添加异常点台站添加正常点
    if (val) {
      let stationObj = {
        name: val.name,
        station_id: val.stationId,
      };
      onClicksPIE(stationObj);
    }
    let center = {
      lat: val.latitude,
      lng: val.longitude,
    };
    // map.flyTo({ center, zoom: state.zoom1 }); //飞行到点击位置
    baseMapObj.flyTo([val.longitude, val.latitude], state.zoom2);
  };
  //下拉框选择台站 添加一个台站点
  const addStationChildPoints = (layerId: any) => {
    let params = {
      stationId: state.stationChild,
      pageNum: 1,
      pageSize: 10,
    };
    let iconImgUrl =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA3dJREFUWEe1l09oFGcYxp93NvuNKeTSpAeb7EwKSXemQcXioRpSvFRooYcSQaxRjB4KWqgFPYhQVIqKCWoqSim2Sf+kekguPXkoFExo8SL9Q9xZWmtmNlrxH9QW4n6bnVcmmw3ZZHa/2U2cy+7sPs/vffh2vvd7l1DF5STiGxi0hcBvAfQyCKtn7Yx/AL5LmjbCeR6zpuTvUbEURZhO1HUxaR8B6I6iBzBK7A8kMzNjKr0ygGOKT8E4ogKFf8/nLC/3cSVvxQCOIX4A8G5txeddv1qeXF+OUTaAY4hHAF5cZvGiPWN50ghjhQZwDPEdgB0rVLzwnDL67Yw8tJi5JEDKFN3EGFnJ4kUWE7barhxdyF4SwDH0awB3PY8AAI1ZXvbNsgFuJsQ2jXDl+RSfoxJ6LFcOF2uUrICTiF8A0b5IAQhX2acfNc3/l5neA/BOJB8wbHmyp1yA+yB6SQki3mu5ua8W6hwzvgdMXyq9wGPLk41LAqSa0Ugx8VAFIOBw0pOnwnQpUz9IzH0qBudlk30HwTbH/E+QahFrSIOyh+eY2tZksrdCAzTrr1KM08oAPtbaU/KPkgB/mnUb86z9rDLnp2VDxwP8H6ZzmtCAF8QTFSNG/qZ2d+aX0hVoXdVKvn9bZWbyO213JjSoY9R1Atq4kqFpr9iTTydLAkx0QMT+E1mVGaBxy8uG9gnHEN8A2Kli5Buk3jEBWRIguHES8Z9AtFkFYOKzddncyfZ7eBBo/2rR22aIPwPhbZWXCNeTrnwjfBua+iEwn1ZB5pJPA/ibCXkw2gHUR/ExcMz25NHQADfN+OsaU/BwiCiwGjTSJ974mpu7ERog+DCVEH1EOFgDXGkJOxGXHEa/Nde36LF8MEq1KonVCSaz+VjXujvTUwttofNAKhHfTUSD1fErq5m5187khharyk5EaUMMMrB7JUIQMJT0ZG8Yq+JMmDbF98zYvpwQRLicdOX75RjKqThtiK8Z2FVjiG8tT1b0KgMUGpR+CcR7qwpBGLRcuUfliRRgdnsa+ucE/kAFLDQp+iLpZSNqoxDnNKlE/DwRfVjRwnzRyuT2R8VGXoEiMG3GzzBTmX87PGB5uQNRi8+19GrkBa1jiOC8KJ3xGf1WyNyvole9AkVgyhAngvEsuGfglO3J2ffVXjUHKOwOcTx4tTLyk2oLF/XPACufHjDXEg3UAAAAAElFTkSuQmCC";
    http.stationsInfoManage.getStations(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res.code !== 0) {
        ElMessage({
          message: res.message,
          type: "error",
        });
      } else {
        let features = <any>[];
        let center = {};
        res.data.list.map((e: any) => {
          let coordinates = [];
          coordinates.push(parseFloat(e.longitude));
          coordinates.push(parseFloat(e.latitude));
          let geometry = {
            coordinates: coordinates,
            type: "Point",
          };
          let single = {
            geometry: geometry,
            properties: e,
          };
          features.push(single);
          center = {
            lat: e.latitude,
            lng: e.longitude,
          };
        });
        let zoom = 8;
        map.flyTo({ center, zoom }); //飞行到点击位置
        let featureCollection = {
          type: "FeatureCollection",
          features: features,
        };
        let option = {
          layerId: layerId,
          name: "stationName",
          iconImgUrl: pieImage.anomalousImg,
        };
        baseMapObj.addPoint(featureCollection, option);
      }
    });
  };
  //观测点-选择台站
  // const stationChildChange2 = (v: any) => {
  // addMeasurementPoint("mapMeasurementSure"); //测点添加正常点
  // addMeasurementPoint("mapMeasurementError"); //测点添加异常点
  // };
  // 添加正常点
  const addPointNormal = (layerId: any) => {
    let fieldValue: any;
    let pointId: any;
    let iconImgUrl: any;
    let overlap: any;
    if (layerId == "mapContainerNormal") {
      fieldValue = 0;
      overlap = false;
      pointId = "mapContainerNormal";
      iconImgUrl = pieImage.normalImg;
    } else if (layerId == "mapContainerAbnormal") {
      fieldValue = 1;
      overlap = true;
      pointId = "mapContainerAbnormal";
      iconImgUrl = pieImage.anomalousImg;
    }

    let params = {
      collectionName: "DETECTION_STATION_INFO",
      outputEpsg: 4326,
      outputGeobuf: true,
      queryConditionList: [
        {
          compareOp: "=",
          fieldName: "test_status",
          fieldValue: fieldValue,
          relationNextOne: "AND",
        },
      ],
      queryResultList: [],
    };
    //国家级
    // if (state.foreignValue) {
    //   let obj = {
    //     compareOp: "=",
    //     fieldName: "unit",
    //     fieldValue: state.foreignValue,
    //     relationNextOne: "AND",
    //   };
    //   params.queryConditionList.push(obj);
    // }
    //省级
    if (state.selectNetwork || state.foreignValue) {
      let obj = {
        compareOp: "=",
        fieldName: "unit",
        fieldValue: state.selectNetwork
          ? state.selectNetwork.id
          : state.foreignValue,
        relationNextOne: "AND",
      };
      params.queryConditionList.push(obj);
    }
    //台阵
    if (state.stationArray) {
      let obj = {
        compareOp: "=",
        fieldName: "station_type",
        fieldValue: state.stationArray,
        relationNextOne: "AND",
      };
      params.queryConditionList.push(obj);
    }
    //台站
    if (state.stationChild) {
      let obj = {
        compareOp: "LIKE",
        fieldName: "station_name",
        fieldValue: state.stationChild,
        relationNextOne: "AND",
      };
      params.queryConditionList.push(obj);
    }
    //台站表格详情
    if (detailId.value) {
      let obj = {
        compareOp: "=",
        fieldName: "id",
        fieldValue: detailId.value,
        relationNextOne: "AND",
      };
      params.queryConditionList.push(obj);
    }
    http.stationsInfoManage.getAddPoint(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      let data = res;
      let featureCollection = geobuf.decode(new Pbf(data)); // 对GeoBuf解码
      if (Object.keys(featureCollection).length != 0) {
        let option = {
          layerId: pointId,
          name: "station_name",
          iconImgUrl: iconImgUrl,
          overlap: overlap,
        };
        baseMapObj.addPoint(featureCollection, option);
      }
    });
  };
  // 二三维切换
  const checkFn = () => {
    baseMapObj.changeMode();
  };
  // 放大
  const enlargeFn = () => {
    baseMapObj.zoomOut();
  };
  // 缩小
  const reduceFn = () => {
    // state.curTool = 3;
    // let zoom = map.getZoom();
    // const center = map.getCenter();
    // zoom = zoom - 1;
    // map.flyTo({ center, zoom });
    baseMapObj.zoomIn();
  };
  // 切换底图按钮
  const checkLayer = () => {
    state.curTool = 4;
    isCheckLayerShow.value = true;
    setSourceMap(); //处理地图数据
    state.netInfoIsshow = false;
  };
  // 切换图层
  const coverageList = (event) => {
    event.stopPropagation(); //阻止冒泡
    isShowCoverage.value = !isShowCoverage.value;
    state.curTool = 5;
  };
  // /关闭专题图图层
  const thematicClose = () => {
    state.thematicDisplay = !state.thematicDisplay;
    state.compatibleLegend = true;
  };
  // 切换图层
  const selectChange = (item: any, $event) => {
    $event.stopPropagation(); //阻止冒泡
    item.value = !item.value;
    selectChangeLayer(item);
    if (item.label == "人口专题图") {
      showlegend.value = false;
      state.thematicTitle = '人口数量'
      state.thematicList = [
        {
          color: "rgba(255, 255, 0 ,0.6)",
          num: "0~20万"
        },
        {
          color: "rgba(255, 225, 0 ,0.8)",
          num: "20~40万"
        },
        {
          color: "rgba(255, 200, 0 ,0.8)",
          num: "40~60万"
        },
        {
          color: "rgba(255, 180, 0 ,0.8)",
          num: "60~80万"
        },
        {
          color: "rgba(255, 160, 0 ,0.8)",
          num: "80~100万"
        },
        {
          color: "rgba(255 ,130, 0 ,0.8)",
          num: "100~200万"
        },
        {
          color: "rgba(255, 100 ,0 ,0.8)",
          num: "200~300万"
        },
        {
          color: "rgba(255, 80, 0 ,0.8)",
          num: "300~400万"
        },
        {
          color: "rgba(255, 40, 0 ,0.8)",
          num: "400~2000万"
        },
        {
          color: "rgba(255, 0, 0 ,0.8)",
          num: "2000万以上"
        },
      ]
      if (item.value == false) {
        state.thematicDisplay = false; //强制关闭
        state.compatibleLegend = true;
      } else {
        state.thematicDisplay = true;
        state.compatibleLegend = false; //台网图例
      }
    } else if (item.label == "GDP专题图") {
      showlegend.value = false;
      state.thematicTitle = 'GDP(百万美元)'
      state.thematicList = [
        {
          color: "rgba(69,117,181,0.8)",
          num: "0~5"
        },
        {
          color: "rgba(123,152,186,0.8)",
          num: "5~10"
        },
        {
          color: "rgba(174 ,189, 188,0.8)",
          num: "10~30"
        },
        {
          color: "rgba(227, 232, 190,0.8)",
          num: "30~50"
        },
        {
          color: "rgba(255 ,227 ,166,0.8)",
          num: "50~80"
        },
        {
          color: "rgba(247 ,164 ,116,0.8)",
          num: "80~100"
        },
        {
          color: "rgba(235 ,110, 75 ,0.8)",
          num: "100~1000"
        },
        {
          color: "rgba(214, 47,39 ,0.8)",
          num: "1000~4400"
        },
        {
          color: "rgba(214, 47,39 ,0.8)",
          num: "4400以上"
        },
      ]
      if (item.value == false) {
        state.thematicDisplay = false; //强制关闭
        state.compatibleLegend = true;
      } else {
        state.thematicDisplay = true;
        state.compatibleLegend = false; //台网图例
      }
    }
  };
  const selectChangeLayer = (item: any) => {
    if (item.label == "台网") {
      baseMapObj.chageLayer("mapStations");
    } else if (item.label == "台站") {
      baseMapObj.chageLayer("strong");
      baseMapObj.chageLayer("seismometry");
      baseMapObj.chageLayer("GNSS");
      baseMapObj.chageLayer("infrasound");
      baseMapObj.chageLayer("terrestrial");
      baseMapObj.chageLayer("gravity");
      baseMapObj.chageLayer("abnormal");
      baseMapObj.chageLayer("offLayer");
      baseMapObj.chageLayer("warnLayer");
    } else if (item.label == "测点") {
      baseMapObj.chageLayer("mapMeasurementSure");
    } else if (item.label == "设备") {
      baseMapObj.chageLayer("mapEquipment");
    } else if (item.label == "人口专题图") {
      if (baseMapObj.getLayer("mapTheme")) {
        baseMapObj.chageLayer("mapTheme");
      } else {
        thematicMapFn();
      }
    } else if (item.label == "GDP专题图") {
      if (baseMapObj.getLayer("GDPTheme")) {
        baseMapObj.chageLayer("GDPTheme");
      } else {
        GDPThemeFn();
      }
    } else if (item.label == "边界线") {
      if (baseMapObj.getLayer("provincialline")) {
        baseMapObj.chageLayer("provincialline");
      } else {
        getProvincialline();
      }
    }
    // else if (item.label == "等值线") {
    //   if (item.value && !map.getLayer("mapVector")) {
    //     contourLines();
    //   } else {
    //     baseMapObj.chageLayer("mapVector");
    //   }
    // }
  };
  // 处理地图数据
  const setSourceMap = () => {
    state.baseLayerList.forEach((layerInfo: any) => {
      let dataSource: any = null;
      dataSource = new PIE.TileRasterDataSource();
      dataSource.create({
        server: layerInfo.url,
        alias: layerInfo.label,
      });
      sourceMap.set(layerInfo.label, dataSource);
    });
  };
  // 切换地图
  const checkMapFn = (source: any) => {
    let bottomLayerGroup = globe.getLayer("底图图层");
    if (!bottomLayerGroup) {
      bottomLayerGroup = new PIE.GlobeGroupLayer();
      bottomLayerGroup.setName("底图图层");
      globe.addLayer(bottomLayerGroup, true);
    }
    const layer = new PIE.GlobeTileRasterLayer();
    layer.setDataSource(sourceMap.get(source.label));
    bottomLayerGroup.addLayer(layer, true);
    layer.setName(source.label);
    let IND = bottomLayerGroup.getLayerCount();
    for (let index = 0; index < IND - 1; index++) {
      bottomLayerGroup.removeLayer(bottomLayerGroup.getLayerAt(index));
    }
    globe.refresh(true, false);
    isCheckLayerShow.value = false;
  };

  // 正常/异常设备点击
  const instrumentClick = (vals: any) => {
    facilityInfo.facilityStatus = vals;
    // facility.value = true;
    searchList(vals);
  }; // 分页
  const pageChange = (val: any) => {
    facilityInfo.pageNum = val;
    instrumentClick(facilityInfo.facilityStatus);
  };
  // 台站设备信息分页
  const pageChanges = (val: any) => {
    facilityInfo.pageNum = val;
    searchList(1);
  };
  // 分页
  const sizeChange = (val: any) => {
    facilityInfo.pageSize = val;
    instrumentClick(facilityInfo.facilityStatus);
  };
  //查询设备弹框列表
  const searchList = (status: any) => {
    let brancketIndex: any;
    let nameDeviceUpdate: any;
    if (state.nameDevice) {
      brancketIndex = state.nameDevice.indexOf("(");
      nameDeviceUpdate = state.nameDevice.slice(0, brancketIndex);
    }
    let params = {
      // name: state.nameDevice?state.nameDevice:null,
      name: state.nameDevice ? nameDeviceUpdate : null,
      code: state.codeDevice ? state.codeDevice : null,
      network: state.networkInfo ? state.networkInfo : null,
      station: facilityInfo.id ? facilityInfo.id : null,
      pageSize: 10,
      pageNum: facilityInfo.pageNum,
    };
    http.stationsInfoManage.searchfacility(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        facilityInfo.linkageData = res.data.list;
        facilityInfo.total = res.data.total;
        //检索弹框中的设备
        if (equipInfo.isShowFlage == 1) {
          equipInfo.ShowPonit = true;
        }
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //查询设备total
  const searchFacilityNum = (data: any) => {
    let params = {
      stationId: data,
    };
    http.stationsInfoManage.facilityNum(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        state.isMonitor = true;
        facilityInfo.nomalFactilityNum = res.data.normalNum; //正常设备
        facilityInfo.abFactilityNum = res.data.exNum;
        if (
          facilityInfo.nomalFactilityNum == 0 &&
          facilityInfo.abFactilityNum == 0
        ) {
          state.isMonitor = false;
        }
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //
  let showEchartsValue = ref(false);

  //设备echart弹窗关闭事件
  const calcelInstrument = (isShowFlage: any) => {
    showBigImgEcharts.value = false;
    showEchartsValue.value = false;
    showInstrument.value = false;
    waveOptionList.value = [];
    if (waveTimer.value) {
      //清除定时器
      clearInterval(waveTimer.value);
    }
    // 关闭台站弹出框
    nextTick(() => {
      if (isNet.value) {
        // 打开台网弹出框
        markShow.value = true;
      } else {
        if (equipInfo.isShowFlage == 2) {
          // 打开台站弹出框
          showPonit.value = true;
        } else {
          // 打开设备弹出框
          equipInfo.ShowPonit = true;
        }
        state.netInfoIsshow = false;
        let mychart1: any = echarts.init(modalEcharts.value);
        mychart1.setOption(state.modalEchartsOption);
      }
    });
  };

  //地震波
  const showWave = () => {
    let params = {
      instId: facilityId.value, //设备编号  30
      // startTime: "2023-01-05 23:30:00",
      // startTime: utils.formatDate(new Date().getTime() - 30000, 0),
      // endTime: "2023-01-05 24:00:00",
      // endTime: utils.formatDate(new Date().getTime(), 0),
    };
    http.stationsInfoManage.getData(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        // options1.series[0].data = res.data;

        if (waveOptionList.value.length == 0) {
          res.data.map((item: any, index: any) => {
            let _item = JSON.parse(JSON.stringify(waveOptions));
            _item.series[0].data = item.waveFormData;
            _item.series[0].name = item.channel;
            _item.series[0].itemStyle.normal.lineStyle.color = colorList[index];
            _item.xAxis.data = item.waveFormSaveTime;
            waveOptionList.value.push(_item);
          });
        } else {
          res.data.map((item: any, index: any) => {
            let size = 30;
            // 删除头部数据
            waveOptionList.value[index].series[0].data.splice(
              0,
              Math.round(item.waveFormData.length / size)
            );
            waveOptionList.value[index].xAxis.data.splice(
              0,
              Math.round(item.waveFormSaveTime.length / size)
            );
            let data1 = item.waveFormData.slice(
              item.waveFormData.length -
              Math.round(item.waveFormData.length / size),
              item.waveFormData.length
            );
            data1.map((_item) => {
              waveOptionList.value[index].series[0].data.push(_item);
            });
            let data2 = item.waveFormSaveTime.slice(
              item.waveFormSaveTime.length -
              Math.round(item.waveFormSaveTime.length / size),
              item.waveFormSaveTime.length
            );
            data2.map((_item) => {
              waveOptionList.value[index].xAxis.data.push(_item);
            });

            // waveOptionList.value[index].series[0].data.concat(item.waveFormData.slice(0, Math.round(item.waveFormData.length / size)))
            // waveOptionList.value[index].xAxis.data.concat(item.waveFormSaveTime.slice(0, Math.round(item.waveFormSaveTime.length / size)))
            // item.waveFormData.map((_item_: any, _index: any) => {
            //   if (_index < Math.round(item.waveFormData.length / 10)) {

            //     let _item = item.waveFormData.slice((_index + 1) * Math.round(item.waveFormData.length / size), (_index + 2) * Math.round(item.waveFormData.length / size))

            //     waveOptionList.value[index].series[0].data.concat(_item)
            //     let timeItem = item.waveFormSaveTime.slice((_index + 1) * Math.round(item.waveFormSaveTime.length / size), (_index + 2) * Math.round(item.waveFormSaveTime.length / size))

            //     waveOptionList.value[index].xAxis.data.concat(timeItem)

            //   }
            // })
            // waveOptionList.value[index].series[0].itemStyle.normal.lineStyle.color = colorList[index];
          });
        }
        state.waveData = res.data;
      } else {
        if (waveTimer.value) {
          //清除定时器
          clearInterval(waveTimer.value);
        }
        // ElMessage.error('暂无数据');
      }
    });

    // let params: any;
    // if (row == 1) {
    //   params = {
    //     sampleName: 1,
    //     startTime: zoomStartTimeOne.value,
    //     endTime: zoomEndTimeOne.value,
    //     deviceId: "",
    //     // deviceId: state.thisEquipId,//后期有数据在写活
    //   };
    //   http.stationsInfoManage.waveform(params).then((res: any) => {
    //     if (res && res.code == 0) {
    //       options1.series[0].data = res.data;
    //       options1.xAxis.min = res.data[0][0];
    //     } else {
    //       ElMessage.error(res.message);
    //     }
    //   });
    // } else if (row == 2) {
    //   params = {
    //     sampleName: 1,
    //     startTime: zoomStartTimeThree.value,
    //     endTime: zoomEndTimeThree.value,
    //     deviceId: "",
    //     // deviceId: state.thisEquipId,//后期有数据在写活
    //   };
    //   http.stationsInfoManage.waveform(params).then((res: any) => {
    //     if (res && res.code == 0) {
    //       options3.series[0].data = res.data;
    //       options3.xAxis.min = res.data[0][0];
    //     } else {
    //       ElMessage.error(res.message);
    //     }
    //   });
    // }
  };
  // 电磁波
  const showWaveBottom = (row: any) => {
    let params: any;
    if (row == 1) {
      params = {
        sampleName: 2,
        startTime: zoomStartTimeTwo.value,
        endTime: zoomEndTimeTwo.value,
        deviceId: "",
        // deviceId: state.thisEquipId,//后期有数据在写活
      };
      http.stationsInfoManage.waveform(params).then((res: any) => {
        if (baseMapObj.destory) {
          return;
        }
        if (res && res.code == 0) {
          options2.series[0].data = res.data;
          options2.xAxis.min = res.data[0][0];
        } else {
          ElMessage.error(res.message);
        }
      });
    } else if (row == 2) {
      params = {
        sampleName: 2,
        startTime: zoomStartTimeFour.value,
        endTime: zoomEndTimeFour.value,
        deviceId: "",
        // deviceId: state.thisEquipId,//后期有数据在写活
      };
      http.stationsInfoManage.waveform(params).then((res: any) => {
        if (baseMapObj.destory) {
          return;
        }
        if (res && res.code == 0) {
          options4.series[0].data = res.data;
          options4.xAxis.min = res.data[0][0];
        } else {
          ElMessage.error(res.message);
        }
      });
    }
  };
  // 查看波段点击事件 查询设备
  const bandClick = (id: any = null, num: number = null) => {
    zoomStartTimeOne.value = "";
    zoomEndTimeOne.value = "";
    zoomStartTimeTwo.value = "";
    zoomEndTimeTwo.value = "";
    facilityInfo.equipmentArr = [];
    if (num) {
      //当前点击的是台网
      isNet.value = true;
    } else {
      isNet.value = false;
    }
    let params: any = {
      // stationId: num ? id : facilityInfo.id,
      status: "",
      pageSize: 10000,
      pageNum: num ? num : facilityInfo.pageNum,
    };
    if (num) {
      params.unitId = id;
    } else {
      params.station = facilityInfo.id;
    }

    http.stationsInfoManage.searchfacility(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        if (res.data.list && res.data.list.length > 0) {
          facilityInfo.linkageData = res.data.list;
          facilityInfo.linkageData.map((item: any) => {
            facilityInfo.equipmentArr.push({
              label: item.name,
              value: item.inst_id,
            });
          });
          //设备下拉框默认选中第一个，echart加载第一个数据
          equipmentVal.value = facilityInfo.equipmentArr[0];
          state.thisEquipId = facilityInfo.equipmentArr[0].value;
          nextTick(() => {
            showInstrument.value = true;
          });
        }
        facilityId.value = state.thisEquipId;
        // setWaveInterval();
        // showWaveBottom(1);
      } else {
        ElMessage.error(res.message);
      }
    });

    nextTick(() => {
      showEchartsValue.value = true;
      // showInstrument.value = true;
      // 关闭台站弹出框
      showPonit.value = false;
    });
  };
  let listenCount = ref(1);
  let zoomStartTimeOne = ref("");
  let zoomEndTimeOne = ref("");
  let zoomStartTimeTwo = ref("");
  let zoomEndTimeTwo = ref("");

  let zoomStartTimeThree = ref("");
  let zoomEndTimeThree = ref("");
  let zoomStartTimeFour = ref("");
  let zoomEndTimeFour = ref("");

  let xRange = ref([]);
  let flag = ref(1); //用来判断点击的是地震波还是电磁波
  // 电磁波-鼠标移动后的数据
  const echartDragOne = (e: any, params: any) => {
    xRange.value = params;
    // zoomStartTimeOne.value = e.selectStartTime[0];
    // zoomEndTimeOne.value = e.selectEndTime[0];
    // showWave(1);
  };
  // 地震波-鼠标移动后的数据
  const echartDragTwo = (e: any) => {
    zoomStartTimeTwo.value = e.selectStartTime[0];
    zoomEndTimeTwo.value = e.selectEndTime[0];
    showWaveBottom(1);
  };

  // 电磁波-鼠标移动后的数据 - 设备
  const echartDragThree = (e: any) => {
    zoomStartTimeThree.value = e.selectStartTime[0];
    zoomEndTimeThree.value = e.selectEndTime[0];
    showWave(2);
  };
  // 地震波-鼠标移动后的数据 - 设备
  const echartDragFour = (e: any) => {
    zoomStartTimeFour.value = e.selectStartTime[0];
    zoomEndTimeFour.value = e.selectEndTime[0];
    showWaveBottom(2);
  };

  //波段大图确定事件
  const bandConfirm = (row: any, xRange, waveData) => {
    // xRange.value = xRange;
    showBigImgEcharts.value = true;
    sampleValue.value = "";
    // if (row == 1) {
    //   flag.value = row;
    // } else if (row == 2) {
    //   flag.value = row;
    // }
    state.waveData = waveData;
    state.waveIndex = row;
  };
  //波段大图确定事件 （从设备弹框点击进入，改变“样本”弹框位置）
  const bandConfirmEquip = (row: any) => {
    showBigImgEchartsEquip.value = true;
    sampleValue.value = "";
    if (row == 1) {
      flag.value = row;
    } else if (row == 2) {
      flag.value = row;
    }
  };

  //选择设备类型下拉框 yyq
  const equipmentChange = (item: any) => {
    state.thisEquipId = item.value;
    equipmentVal.value = item;
    // showWave(); //（目前数据写死，id传空）
    // showWaveBottom();
    waveOptionList.value = [];
    facilityId.value = item ? item.value : "";
    // setWaveInterval();
  };

  //波形图上传样本库点击确定事件
  const sampleClick = (val: any) => {
    if (sampleValue.value == "" || eventType.value == "") {
      ElMessage.error("请输入样本名称或选择事件类型");
      return;
    }
    let startTimeAfter = xRange.value; //波形图鼠标滚轮滚动前后X坐标轴的开始和结束时间
    let startTimeBefore = state.waveData[state.waveIndex]; //波形图鼠标滚轮没有滚动前后X坐标轴的开始和结束时间
    let params = {
      description: "",
      startTime:
        startTimeAfter.length > 0
          ? startTimeAfter[0]
          : startTimeBefore.waveFormSaveTime[0],
      endTime:
        startTimeAfter.length > 0
          ? startTimeAfter[1]
          : startTimeBefore.waveFormSaveTime[
          startTimeBefore.waveFormSaveTime.length - 1
          ],
      name: sampleValue.value,
      streamCode: state.waveData[state.waveIndex].streamCode,
      waveType: eventType.value,
    };

    http.stationsInfoManage.addWaveList(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        ElMessage.success("保存成功");
      } else {
        ElMessage.error(res.message);
      }
    });
    showBigImgEcharts.value = false;
    showBigImgEchartsEquip.value = false;
  };

  const searchClick = () => {
    //清空标题
    stationAllInfo.stationTitleSub = "";
    stationAllInfo.stationTitleType = "";
    activeName.value = "first";
    showPonit.value = false;
    equipInfo.ShowPonit = false;
    // state.netInfoIsshow = false;
    state.facility = true;
    state.showTree = false;
    isShowCoverage.value = false;
    state.isShowInput = false;
    // stationAllInfo.stationInfoIshow = true;
    // let params = {
    //   collectionName: "META_DATA_SUBJECT_INFO",
    //   queryConditionList: [],
    //   queryResultList: [],
    // };
    let data = {
      collectionName: "INSTR_CATE_DIC",
      queryConditionList: [],
    };
    if (state.selectNetList.length == 0) {
      getProvince(); //台网搜索框
      getStations(); //台站
      getequipmentStations({}); //设备中台站
      getSubjectLists({}); //台站类型
      // getSubject(params); //学科类型
      getEquipmentType(data); //设备类型
    }
  };
  //显示台站类型下面的搜索内容
  const isShowSearch = (isShowNet: Boolean) => {
    //重置数据
    state.subjectInfo = ""; //清空学科id
    state.stationTypeInfo = ""; //清空台站类型id
    state.stationcode = ""; //台站code
    facilityNetwork.id = ""; //台站tab中选台网的值
    state.stationNameId = ""; //台站tab中选台站名称的值
    //isShowNet false显示下面下拉框部分  true显示上面按钮部分
    if (isShowNet) {
      stationAllInfo.stationInfoIshow = true; //搜索台站弹出框
      state.netInfoIsshow = false; //台网弹出框
      //打开台站图层
      isShowLayer(state.showCoverage.showStation);
      //关闭台网图层  //关闭设备图层
      baseMapObj.chageLayer("mapStations", false);
      baseMapObj.chageLayer("mapEquipment", false);
      // 重置加载台站类型第一个
      subjectListChange(state.subjectListList[0].id); //综合台台站
      //查询正常异常数
      searchStationNum(state.subjectListList[0].id);
    } else {
      state.netInfoIsshow = true; //台网弹出框
      stationAllInfo.stationInfoIshow = false; //搜索台站弹出框
      //隐藏台站图层
      isShowLayer(state.showCoverage.notShowStation);
      // addInternetPoint("mapInternetSure"); // 台站添加异常点台站添加正常点
      state.coverageList[1].value = false;
      addStationsPoint("mapStations"); //台网添加点
      searchClick();
    }
  };
  //显示图层
  const isShowLayer = (arr: any) => {
    arr.forEach((item: any) => {
      baseMapObj.chageLayer(item.id, item.isShow);
    });
  };
  const cancelSelect = () => {
    state.facility = false;
    state.isShowInput = true;
    state.netInfoIsshow = false;
    showPonit.value = false;
    equipInfo.ShowPonit = false;
    // stationAllInfo.stationInfoIshow = true; //台站详情弹框
  };
  // 树形结构点击事件飞入效果
  const nodeClick = (data: any, node: any) => {
    showPonit.value = false;
    let center = [data.longitude, data.latitude];
    switch (node.level) {
      case 1: // 台网
        map.flyTo({ center, zoom: state.zoom1 }); //飞行到点击位置
        break;
      case 2: // 台站
        map.flyTo({ center, zoom: state.zoom2 }); //飞行到点击位置
        displayStation(data);
        break;
      case 3:
      case 4: // 测点 设备
        map.flyTo({ center, zoom: state.zoom3 }); //飞行到点击位置
        break;
      default:
        break;
    }
  };
  //点击tree台网出现弹框 yyq
  const displayNet = (item: any) => {
    let params = {
      id: item.id,
    };
    http.stationsInfoManage.getNetWorkList(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res.code !== 0) {
        ElMessage.error(res.message);
      } else {
      }
    });

    state.markData1 = [];
    state.markData1[0] = {
      label: "经纬度",
      value: coordinates,
      name: "coordinates",
    };
    state.markData1[1] = {
      label: "字母代码",
      value: features[0].properties.code,
      name: "letter_code",
    };
    state.valueDataElse[0] = {
      label: "台站总数",
      value: features[0].properties.stationNum,
      name: "stationNum",
    };
    state.valueDataElse[1] = {
      label: "测点总数",
      value: features[0].properties.pointNum,
      name: "pointNum",
    };
    state.valueDataElse[2] = {
      label: "设备正常",
      value: features[0].properties.normalDeviceNum,
      name: "normalDeviceNum",
    };
    state.valueDataElse[3] = {
      label: "设备异常",
      value: features[0].properties.notNormalDeviceNum,
      name: "notNormalDeviceNum",
    };
    markShow.value = true;
    showInfoMark.value = true;
    netWorkTitle.value = features[0].properties.name;
    markShowEquip.value = false;
    showPonit.value = false;
  };
  //关闭设备弹框 关闭样本
  const cancelModalEquip = () => {
    showBigImgEchartsEquip.value = false;
  };
  //点击tree台站出现弹框
  const displayStation = (item: any) => {
    markData.pointTitle = item.name;
    facilityInfo.id = item.id;
    searchId(item.id);
    searchFacilityNum(item.id);
  };

  // 树形结构显示隐藏
  const treeShowClick = () => {
    state.showTree = !state.showTree;
    if (state.showTree == true) {
      state.facility = false;
    }
  };
  // 等值线
  const contourLines = () => {
    let params = {
      geoJson:
        '{"features":[{"geometry":{"coordinates":[[106,40.652836148775016],[107,40.386608855794044],[107.55980612033441,41],[107.18976974137541,42],[107,42.33464709564369],[106,42.722713399625874],[105.52122722781264,42],[105.50453469146237,41],[106,40.652836148775016]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":50,"text":"50-60","stroke-width":1,"stroke":"#fec20e"}},{"geometry":{"coordinates":[[109,48.64265981736181],[109.39558275710779,48],[109.42178609029068,47],[110,46.23164982089418],[110.17370224432224,46],[110.52897700447616,45],[110.72280039798065,44],[111,43.365520201038564],[111.19599915699882,43],[111.2981191021334,42],[111.56381873055165,41],[112,40.822941143094965],[113,40.78069330544555],[113.41662853325363,41],[114,41.47514353594802],[114.33833010787654,42],[114.55524344729662,43],[114.7399298107852,44],[114.7260786809306,45],[114.39185183704615,46],[114.17501252560929,47],[114,47.3339517581328],[113.50208659502013,48],[113,48.38772284531632],[112.63550135611553,49],[112,49.560464080456676],[111.50716669039078,50],[111,50.480856975545485],[110.09119255499064,51],[110,51.05089048478515],[109.0920083462556,52],[109,52.08805532443086],[108.67591637361286,52],[108.30761192741502,51],[108.58667939074371,50],[108.65323939799458,49],[109,48.64265981736181]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":50,"text":"50-60","stroke-width":1,"stroke":"#fec20e"}},{"geometry":{"coordinates":[[101.91873025488019,53],[101.91575379205531,52],[102,51.754060496394054],[103,51.833027701544275],[103.09833729092887,51],[103,50.76160603724212],[102.40486689932659,50],[102.48820710992598,49],[102.50481560750741,48],[102.66698847177027,47],[102.82623537329972,46],[102.86671657433747,45],[102.9371259675912,44],[103,43.39866098343515],[103.12556469454043,43],[103.61785383768503,42],[103.72085632455794,41],[104,40.39545045057766],[104.21599948664617,40],[104.26892601578575,39],[105,38.28733096021484],[105.65333907996339,38],[105,37.530574425638555],[104,37.85960519805648],[103,37.42605383051952],[102.53543394432413,37],[103,36.40953119773827],[103.7280110280535,36],[104,35.31722207847036],[104.23977127681476,35],[105,34.71976915152561],[105.447078857028,35],[106,35.582789874144616],[107,35.66727569381042],[107.73280641537843,36],[108,36.2341664751923],[108.2594573131923,36],[108.45730567782232,35],[109,34.9583941309987],[109.08074419404437,35],[110,35.855823102518194],[110.20594551364896,36],[110.48007819722231,37],[110,37.43089504304875],[109,37.35533492063889],[108.62643408164845,38],[109,38.15287963512654],[109.71064003006012,39],[109,39.91646774830396],[108.05873581719612,39],[108,38.82905311481817],[107,38.11010636225711],[106.08055286377314,39],[107,39.863124904567556],[107.78178759685798,40],[108,40.93190412160925],[108.00705868187771,41],[108.89861882050434,42],[109,42.28010006592181],[109.1250431194322,42],[109.58829627699747,41],[110,40.508054750250395],[111,40.277297386558466],[111.96656746189635,40],[112,39.98891755342066],[113,39.95013310345516],[114,39.77347876944109],[114.85255613570402,40],[115,40.15175560182739],[115.7239362413188,41],[115.72297777808345,42],[116,42.1711721053495],[116.57342571809788,43],[117,43.98107152275786],[117.00355916773049,44],[117,44.02396883161365],[116.77018204252968,45],[116.2357002875094,46],[116.53425206972798,47],[117,47.07896813253017],[118,47.405664912231686],[119,47.50786143075801],[120,47.56976160302241],[120.5283610353316,48],[121,48.65997851238344],[121.18391878837423,49],[121.33244194834597,50],[121.35036072359493,51],[121.5097241137546,52],[121.21656534453697,53]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":60,"text":"60-70","stroke-width":1,"stroke":"#e69953"}},{"geometry":{"coordinates":[[87,47.860095853722385],[87.84809403962332,47],[88,46.96098891152421],[88.13564754069293,47],[89,47.76590955958168],[89.27055068924112,48],[89,48.37554823179492],[88.30283907233286,49],[88,49.166586364964466],[87.78918499327827,49],[87,48.14708956902597],[86.95162017572721,48],[87,47.860095853722385]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":60,"text":"60-70","stroke-width":1,"stroke":"#e69953"}},{"geometry":{"coordinates":[[89,40.97485585028436],[90,40.916052072195804],[90.23731257208766,41],[90.7478336521633,42],[90.3476481745459,43],[90,43.0972652264958],[89,43.44264375459702],[88.04659963356589,43],[88.05689324194121,42],[88.96115200433186,41],[89,40.97485585028436]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":60,"text":"60-70","stroke-width":1,"stroke":"#e69953"}},{"geometry":{"coordinates":[[79.66344627310067,53],[80,52.51606705471857],[80.49209847469575,52],[81,51.39192472849021],[81.25905276257149,51],[81,50.00190132029571],[80.99922799177163,50],[81,49.99836303925655],[81.0055740202188,50],[82,50.106200547215856],[82.09453517381202,50],[82.00913104932017,49],[82,48.977916597340915],[81.62932364019974,48],[81.70906354743826,47],[81.32698325692645,46],[81.25787905856613,45],[82,44.42407353682185],[82.79683670882511,45],[83,45.60596258784882],[83.31094661418477,45],[83.48239403158995,44],[83.89156893706864,43],[84,42.71931798610712],[85,42.19481344263418],[86,42.480514578456834],[86.71771860151762,42],[86.84832415371935,41],[86.41660067510475,40],[86,39.21078788793067],[85.61550162430729,39],[85,38.462125766502346],[84.02519248462545,39],[84,39.00946059600391],[83,39.02809307487484],[82.96354412965908,39],[82,38.691373983389994],[81,38.240219485213956],[80.8073127603448,38],[80.631555429538,37],[80.47334189531465,36],[80.39728553103399,35],[80.48402139535486,34],[80.79635117204776,33],[81,32.74958872075159],[82,32.81623268728644],[82.42052474009323,33],[83,33.176047986921034],[84,33.647989450241234],[84.41437643042059,34],[85,34.52134539670081],[85.53927785199541,35],[86,35.58027821883072],[87,35.915550384261884],[87.19748334679817,36],[88,36.20698392604052],[89,36.56315502567349],[90,36.50526111015877],[90.50375271868631,37],[91,37.511071344174084],[91.36882047594162,38],[91.77200179319881,39],[92,39.348239108375886],[92.74028316560785,40],[93,40.270865195276045],[93.62297107741634,41],[94,41.81330655691939],[94.273857331572,42],[95,42.60813815840423],[95.41605487883665,43],[96,43.94058104004465],[96.03233711740933,44],[96.38299820968426,45],[96.49041384720996,46],[96.74353071972747,47],[96.97558337392229,48],[97,48.03320787181417],[97.70042445245011,49],[98,49.291828829211724],[98.57962505124797,50],[99,50.64855975281571],[99.37554123637436,51],[100,51.39141229998151],[100.14866643358451,51],[100.203318611243,50],[100.76452312503153,49],[101,48.67971022446628],[101.1524507050922,48],[101.41137132902526,47],[101.76095513696806,46],[101.92084345284135,45],[102,44.89555293598069],[102.35933956941089,44],[102.47462305121267,43],[102.72943629367512,42],[103,41.150545033901025],[103.03719871042244,41],[103.27125507454937,40],[103.67748670068684,39],[103,38.00581087359333],[102.97804310491364,38],[102,37.36968055468988],[101,37.372524550131665],[100,37.982460972389106],[99.80867794137019,38],[99,38.09561417906782],[98.91867857524977,38],[98.52214298402144,37],[99,36.192623784044336],[100,36.249950978115145],[100.5092066996167,36],[101,35.19577702862662],[101.84510745853535,36],[102,36.241335870909225],[102.08869091794858,36],[103,35.624852594253184],[103.47152984636244,35],[103.40035645370017,34],[103.99076048958784,33],[104,32.988703377084306],[104.0103121635459,33],[105,33.45348828437932],[105.32611858333783,34],[106,34.46708699466728],[107,34.27942895333857],[108,34.14865901491238],[109,34.34065214686454],[110,34.81694175925915],[111,34.87429308468305],[112,34.877437187705596],[112.28829198965995,35],[112.93341545435509,36],[112.67563353096705,37],[112,37.98486398294704],[111.9924523121642,38],[112,38.03120980299235],[112.5289601637806,39],[113,39.10661147531014],[113.61074162009113,39],[114,38.77181387910354],[114.73963019111763,38],[114.281730955125,37],[114,36.34065184133428],[113.2840059476585,36],[114,35.74954696327554],[114.14648143788784,36],[115,36.54145118704722],[115.78704142600492,37],[116,37.201408659614884],[117,37.99302347890488],[117.0254242066565,38],[117,38.0172269533623],[116,38.343765560309315],[115,38.727505251523375],[114.69156956370806,39],[115,39.03631250236163],[115.70359906493226,40],[116,40.30839274578831],[117,40.700139108744665],[117.36159464441343,41],[117.38663801616332,42],[117.67522716548402,43],[117.67018853722173,44],[117.74470226044873,45],[117.70405293211596,46],[118,46.20711047188126],[119,46.43756389974789],[120,46.12878288602337],[121,46.614323222017156],[121.25471559989063,47],[121.90873334425893,48],[122,48.150124734615304],[122.560388399434,49],[122.6587927585116,50],[122.84299671142583,51],[122.81879939040502,52],[122.72856182141084,53]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":70,"text":"70-80","stroke-width":1,"stroke":"#ff6044"}},{"geometry":{"coordinates":[[135,9.859115902871892],[134.8588570020193,10],[134,10.864166753680692],[133.8638991089644,11],[134,11.669705484888135],[135,11.10481465404983]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":70,"text":"70-80","stroke-width":1,"stroke":"#ff6044"}},{"geometry":{"coordinates":[[135,25.24728082197207],[134,25.954121465539927],[133.95485325148667,26],[133,26.156951372553966],[132,26.173208947005968],[131,26.59323758070892],[130.21455615038573,27],[130,27.03613225010284],[129,27.209712030840247],[128,27.269672087402697],[127.13912822713456,28],[127,28.10912471143849],[126,28.202395567639282],[125,28.453507080114722],[124,28.846865924983934],[123.81109178485417,29],[123,29.294398174003838],[122,29.3246629593602],[121.58865324015036,29],[121,28.246094540035433],[120.75934217746456,28],[120.420249995022,27],[121,26.30841335162323],[121.37934913209091,26],[121.75226708733476,25],[122,24.06541145352985],[122.04902190923318,24],[122,23.908517887563885],[121,23.19562957606436],[120.4113488372093,24],[120,24.379673655048197],[119.07571183055413,24],[120,23.298496097468114],[120.55007535990853,23],[121,22.676104423305365],[121.43777632423658,22],[122,21.384422060569086],[122.23760769237074,21],[122.51629779623224,20],[122.74449623835093,19],[123,18.65032222610781],[123.50146577859616,18],[123.85265415374334,17],[124,16.22093670788847],[124.15255743030464,16],[124.77082204256945,15],[124.96134119688533,14],[125,13.953570090696607],[125.83366813888857,13],[126,12.759607339877668],[126.63878704295469,12],[126.86161262176881,11],[126.9142886746907,10],[127,9.891694975230006],[127.69023860458364,9],[127.9352080753095,8],[128,7.922791533348306],[128.75054800110075,7],[128.93866050302665,6],[129,5.938333395865381],[129.83824396914633,5],[130,4.773204758279525],[130.6767502824363,4],[130.73149317787733,3]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":70,"text":"70-80","stroke-width":1,"stroke":"#ff6044"}},{"geometry":{"coordinates":[[96,32.53982309022031],[96.59355980184006,32],[97,31.864467864174557],[97.31867617915181,32],[97.6638184702479,33],[97.00659279115669,34],[97,34.007303754882976],[96.81182587103282,34],[96,33.82710010081145],[95.68656566858517,33],[96,32.53982309022031]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":70,"text":"70-80","stroke-width":1,"stroke":"#ff6044"}},{"geometry":{"coordinates":[[101,25.9705251865792],[102,25.21075181482855],[102.60476879815707,26],[102,26.885084046161833],[101,26.010260118481238],[100.99195370373165,26],[101,25.9705251865792]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":70,"text":"70-80","stroke-width":1,"stroke":"#ff6044"}},{"geometry":{"coordinates":[[110,16.34647361105798],[111,16.592113979919297],[111.30659639138588,17],[111.63748847555354,18],[111.1787954519124,19],[111,19.743880185918403],[110.94709197916112,20],[110,20.302860106007348],[109.68621747177951,20],[110,19.132951345368124],[110.48587745389649,19],[110,18.91012764084507],[109.1631823038073,18],[109.61286168047104,17],[110,16.34647361105798]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":70,"text":"70-80","stroke-width":1,"stroke":"#ff6044"}},{"geometry":{"coordinates":[[116,23.69164907287983],[117,23.755866123504642],[117.69480740285132,24],[117.71594520481607,25],[117,25.282332720632116],[116.01802512391754,25],[116,24.99759290889365],[115.6574122991135,24],[116,23.69164907287983]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":70,"text":"70-80","stroke-width":1,"stroke":"#ff6044"}},{"geometry":{"coordinates":[[123,43.9202921940375],[124,43.83335689248627],[124.17626498687937,44],[124.2167438750928,45],[124,45.52739937509793],[123,45.006281692594314],[122.99434792830642,45],[122.85032238023442,44],[123,43.9202921940375]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":70,"text":"70-80","stroke-width":1,"stroke":"#ff6044"}},{"geometry":{"coordinates":[[131,43.415492322541304],[132,43.166098754060435],[132.5107906656782,44],[132,44.44146099843425],[131,44.724277323567364],[130.58494563445643,44],[131,43.415492322541304]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":70,"text":"70-80","stroke-width":1,"stroke":"#ff6044"}},{"geometry":{"coordinates":[[73,7.577655832410505],[73.44046358127953,8],[74,8.735449598884976],[74.26953767666458,9],[74.94577686769911,10],[75,10.066086740074542],[75.45347026858542,11],[76,11.967057055705007],[76.0260494198013,12],[76.82121039301288,13],[77,13.191728469905806],[77.5443355113948,14],[78,14.448045287503493],[78.46561709313983,15],[79,15.698311726289113],[79.27573150784515,16],[80,16.745304796322678],[80.25288779253407,17],[80.53513457353353,18],[81,18.492419984356516],[81.44098107344392,19],[82,19.747280512354667],[82.23450091385996,20],[83,20.809234888750577],[83.19377066627854,21],[83.47577937536718,22],[84,22.590867145178404],[84.36552653212509,23],[85,23.90191263936126],[85.09613659460229,24],[85.38636155283665,25],[86,25.799230317057937],[86.20628412077515,26],[86.77908563349717,27],[86.88664208189874,28],[87,28.867460211314697],[87.0429618069103,29],[87.434151496851,30],[87.68164824364989,31],[88,31.703497223714848],[88.2789761954919,32],[89,32.38188269159963],[90,32.73981233573235],[91,32.45533962519451],[91.7575625404508,32],[92,31.891737193623985],[92.63102669441037,31],[93,30.336133176542113],[93.0895497895466,30],[93.24405281837801,29],[93.78817694954205,28],[94,27.91275386837331],[94.44861054780918,28],[95,28.078738301892066],[96,28.56900548817008],[96.65525792524164,29],[97,29.20352807514988],[98,29.517804184606334],[99,29.203572248205568],[99.42440075569725,30],[100,30.541995917945947],[100.98819892414733,30],[100.31215616791397,29],[101,28.291653907007603],[101.22985529398751,28],[101.18168396669242,27],[101,26.85124207681583],[100.33243013141966,26],[100.65129391843217,25],[101,24.63635807169336],[102,24.630945906189393],[102.40147440840744,25],[102.99101109689283,26],[102.65722195963615,27],[102.17426885947198,28],[102,28.989687724127236],[101.98582907880133,29],[101.01355238871244,30],[102,30.486784556681574],[103,30.458120024189625],[104,30.355800339739098],[105,30.853759666538693],[105.18928806372074,31],[106,31.414856272394054],[107,31.10000093528746],[107.02440221199251,31],[107.22146255411096,30],[108,29.468507426787568],[108.31640934392465,30],[108.64400342291364,31],[108,31.57825632312498],[107.23585453671998,32],[107.45794082979603,33],[108,33.320131125796564],[109,33.49307854205772],[109.9166493864079,34],[110,34.03201462156753],[111,34.192052463071235],[111.94934621183663,34],[112,33.92827606809894],[113,33.03816505441354],[114,33.107018929544466],[115,33.371775585867894],[116,33.22120291468965],[116.55868477744599,34],[116,34.635598226598646],[115,34.52765169996093],[114.78793651735597,35],[115,35.31987073589711],[115.557619397597,36],[116,36.266402152508334],[116.64743181622646,37],[117,37.317022463913126],[118,37.462012636874576],[119,37.31203206815413],[119.8671152425944,38],[120,38.096203269293056],[121,38.45502728960482],[122,38.07379902577449],[123,38.16072933729862],[124,38.66773412378092],[124.11592942690137,39],[124,39.24022847010499],[123.34227192914648,40],[123.65538702728709,41],[123.16056775741274,42],[123.55729718991245,43],[124,43.162064437356214],[124.88631749106692,44],[125,44.30262415980595],[125.69190498537753,45],[126,45.4181895510388],[127,45.28964240748114],[127.36690849507482,45],[128,44.68169038797115],[128.4032624155351,45],[129,45.61390971264409],[129.81824416356312,45],[130,44.73749337955607],[130.08224365735325,44],[130.44540248427992,43],[130.89150709098382,42],[130.9665430589795,41],[131,40.724233317396354],[131.08979396546613,40],[131.46614453007706,39],[131.91795220943513,38],[132,37.663816997228324],[132.50634944605372,37],[133,36.34784264649872],[133.58686671902572,36],[134,35.43499609418592],[134.34221875925945,35],[135,34.21650414368251]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":80,"text":"80-90","stroke-width":1,"stroke":"#ca1f00"}},{"geometry":{"coordinates":[[73,47.44452331998701],[73.43860750573373,47],[73,46.737850546017064]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":80,"text":"80-90","stroke-width":1,"stroke":"#ca1f00"}},{"geometry":{"coordinates":[[135,30.658151950873307],[134.51040321384758,31],[134,31.472584478351173],[133,31.365982560723133],[132,31.895075391411975],[131.81770427303024,32],[131,32.24374750461646],[130,32.56063602592142],[129.5030634836898,33],[129,33.19616456462002],[128.16018057501074,33],[128,32.83538927489756],[127,32.388130170290694],[126,32.044807137997886],[125.80637322582427,32],[125,31.564338323896173],[124,31.107493566912478],[123.64012292700767,31],[123,30.77071074366196],[122,30.44216614051034],[121.13216893056529,30],[121,29.90067814892752],[120.92099217816585,30],[120,30.80448553776921],[119.78922043451408,31],[119,31.534131136628766],[118.20894581097656,31],[118.21758967965829,30],[118.28445523100203,29],[118,28.130265872845293],[117.94215019996756,28],[117.25878789712354,27],[117,26.86772927669898],[116,26.638789027776685],[115.65911917002282,27],[115,27.250770019446435],[114,27.78421157019774],[113,27.386161582990233],[112.0885115693323,27],[112.58780996132299,26],[113,25.461243332090365],[113.52186209184336,26],[114,26.40730694280778],[115,26.449710165812117],[115.47188407964973,26],[115.49505044482905,25],[115.1583427809365,24],[116,23.242454463064355],[116.61104124705045,23],[116.97732858458406,22],[117,21.335686204431738],[117.02955719281407,21],[117,20.630924898079474],[116.9594840964433,20],[116,19.585707437057536],[115,19.702672634490817],[114,19.99285943878854],[113.99427132287374,20],[113,20.91605567126597],[112.82110239350375,21],[112,21.548587091919646],[111,21.182810223857402],[110,21.882946115120113],[109,21.381740946994164],[108.50628714033704,21],[108,20.597522890113098],[107.16501716385841,20],[107,19.859524012867595],[106.1074661854064,19],[106,18.892603184075487],[105.38654740477475,18],[105,17.346817646140572],[104.70010442655877,17],[104.1157381159407,16],[104,15.290783343274919],[103.8907325288359,15],[103.27792244576652,14],[103.21253625523687,13],[103.04732627271198,12],[103,11.928981912769947],[102.31747294277754,11],[102.25007827712386,10],[102.08981845115062,9],[102.06429104301296,8],[102,7.90654472111616],[101.31535635631387,7],[101.25981032264214,6],[101.1042574238729,5],[101.00666679160068,4],[101,3.993205918442374],[100.24857408096403,3]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":80,"text":"80-90","stroke-width":1,"stroke":"#ca1f00"}},{"geometry":{"coordinates":[[135,44.56632773944793],[134,44.94247345742245],[133.27182996950438,45],[133,45.02615698221406],[132,45.57338468042528],[131,45.74020594952482],[130,45.19624923508873],[129.4087382497021,46],[129,46.38775429643904],[128,46.428468548358225],[127.05674814558941,47],[128,47.841818222381775],[128.17258570976514,48],[129,48.997460405534824],[129.0213424203022,49],[129.21003172322978,50],[129,50.10176422253372],[128.82969877374057,50],[128,49.85585603309687],[127,49.94452088777828],[126,49.699787942069776],[125.3126143349471,49],[125,48.86015428102179],[124.80931513419225,49],[124.77920926332932,50],[124,50.93635308263195],[123.98612958371584,51],[123.89434649827487,52],[123.89392588051022,53]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":80,"text":"80-90","stroke-width":1,"stroke":"#ca1f00"}},{"geometry":{"coordinates":[[75,38.39155762328559],[74.13345965564484,39],[74.31845637248865,40],[75,40.69724567615416],[76,40.73030681784365],[76.48328048996632,40],[76.37863287837611,39],[76,38.46442847607864],[75,38.39155762328559]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":80,"text":"80-90","stroke-width":1,"stroke":"#ca1f00"}},{"geometry":{"coordinates":[[102,32.412690995747866],[101.51946199930418,33],[101.3101250061438,34],[102,34.9680132783746],[102.30423310432226,34],[102.11420518407397,33],[102,32.412690995747866]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":80,"text":"80-90","stroke-width":1,"stroke":"#ca1f00"}},{"geometry":{"coordinates":[[109,26.11891674593919],[109.1375875550889,26],[110,25.793210823989806],[110.28601144522284,26],[111,26.625086409188455],[111.8632483105768,27],[111,27.807471231267208],[110,27.465868606077766],[109,27.265211572859922],[108.48674823383206,27],[109,26.11891674593919]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":80,"text":"80-90","stroke-width":1,"stroke":"#ca1f00"}},{"geometry":{"coordinates":[[111,29.881026759276494],[111.49686870649754,30],[112,30.439895278658394],[112.72776695307758,30],[113,29.91614339098385],[114,29.91516202409542],[114.06645124098526,30],[115,30.94376614709633],[115.4370783594307,30],[116,29.317945166167735],[116.65901054880587,30],[116,30.764031382516997],[115.13028090317643,31],[115,31.308610011168646],[114,31.466774537564813],[113.52215393234358,32],[113,32.71510132238119],[112.8240985390115,32],[112,31.494189394068446],[111,31.813553055689063],[110.27283432958342,31],[110.88885771499531,30],[111,29.881026759276494]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":80,"text":"80-90","stroke-width":1,"stroke":"#ca1f00"}},{"geometry":{"coordinates":[[119,43.45556333915472],[118.36181356970252,44],[119,44.92221000267637],[120,44.32065109568825],[121,44.4504801757506],[121.19989490307779,44],[121,43.76932472087913],[120,43.19399095351208],[119,43.45556333915472]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":80,"text":"80-90","stroke-width":1,"stroke":"#ca1f00"}},{"geometry":{"coordinates":[[121,35.726870841065185],[122,35.72403780277758],[123,35.829406448909026],[124,35.97307044852892],[124.09110297185777,36],[124,36.16262293273011],[123.69104205683576,37],[123,37.77058446312134],[122,37.80973319580174],[121,37.47259995825803],[120.09018818795124,37],[120.5436328165721,36],[121,35.726870841065185]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":80,"text":"80-90","stroke-width":1,"stroke":"#ca1f00"}},{"geometry":{"coordinates":[[83.37835073487327,3],[84,3.801595442809983],[84.20327966411696,4],[84.41218468181796,5],[85,5.767197753009472],[85.20766568881156,6],[85.41723241915291,7],[86,7.763918821839081],[86.21083822581849,8],[86.42286733754665,9],[87,9.760336787241737],[87.21551610561222,10],[87.53943396226416,11],[87.83177123425565,12],[88,12.317968518918228],[88.52375324982273,13],[88.84919801200613,14],[89,14.260367085859345],[89.58379602533074,15],[89.86692814611628,16],[90,16.270460177652982],[90.55710213850715,17],[91,17.84381336736006],[91.14842457512408,18],[91.42760530340148,19],[91.99118231760758,20],[91.9139856698391,21],[92,21.095814392135637],[92.83840611706424,22],[93,22.220851093893508],[93.65486646840222,23],[94,23.94556817873702],[94.05179041329137,24],[94.82001593029928,25],[95,25.19137155265492],[95.70204309918248,26],[96,26.33584981254063],[96.70253762815386,27],[97,27.215898553237686],[98,27.235139547022282],[98.26522081051637,27],[99,26.401553195415158],[99.34452550328464,26],[100,25.191456308264456],[100.06844809829832,25],[101,24.028547685978236],[101.9007008149351,24],[102,23.988278045385226],[102.66534190205657,23],[103,22.479812612169727],[103.41273148612876,23],[103.06727297520024,24],[104,24.56483884981456],[104.37462911898197,24],[105,23.34169555593991],[105.18207353999901,23],[105,22.449612590896795],[104.70253585538705,22],[104.81349469448847,21],[105,20.673699512612824],[105.19681515600615,20],[105,19.628169478485464],[104,19.735682580337084],[103.82659679750522,20],[103.04760572201457,21],[103,21.05107840123532],[102,21.471031347017817],[101.80533345128134,22],[101,22.805196010466513],[100,22.798601593628785],[99,22.20552682611506],[98.62314245499667,22],[98.13081557213627,21],[98.0711866921744,20],[98.27585625816236,19],[98.44805046946784,18],[98.74586450161163,17],[98.94250645448004,16],[99,15.748937271282298],[99.36733324872637,15],[99.4643643773336,14],[99.16018160300241,13],[99.15062694999386,12],[99,11.375961918380403],[98.67098070210103,11],[98.14320584360996,10],[98,9.242915758991453],[97.80234064666772,9],[97.15125510846272,8],[97,7.25732636552814],[96.87401565755607,7],[96.0846728584856,6],[96,5.865885107821812],[95.43240695101014,5],[95.22312040674903,4],[95,3.779180017001242],[94.34722570798495,3]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":90,"text":"90-100","stroke-width":1,"stroke":"#861400"}},{"geometry":{"coordinates":[[121,31.70892420920764],[120.59428890717456,32],[120.58554975957409,33],[121,33.52402763075754],[122,33.644303729496855],[123,33.27473012728325],[123.42529468277722,33],[123,32.51984689833549],[122.81541076613142,32],[122,31.7200298550732],[121,31.70892420920764]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":90,"text":"90-100","stroke-width":1,"stroke":"#861400"}},{"geometry":{"coordinates":[[125,41.93305774363648],[124.96081706373752,42],[125,42.03166364218617],[126,42.508200014032404],[127,42.53824816497728],[127.29488876428937,42],[127.81930392048474,41],[128,40.30299070048974],[128.08944816270832,40],[128,39.03099496249368],[127.98789300475173,39],[127.37739721180384,38],[127,37.9841145492023],[126.98645910563573,38],[126.41703808495211,39],[126,39.42599354641557],[125.85584676239247,40],[125.44756073823723,41],[125,41.93305774363648]],"type":"LineString"},"type":"Feature","properties":{"stroke-opacity":0.5,"Value":90,"text":"90-100","stroke-width":1,"stroke":"#861400"}}],"name":"tbLine","type":"FeatureCollection"}',
      publishID: "20220121150525",
      publishType: "MVT",
    };
    http.stationsInfoManage.publish(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res.code == 200) {
        let tiles = res.data.result.tiles;

        map.addSource("mapVector", {
          type: "vector",
          tiles: tiles,
        });
        map.addLayer({
          id: "mapVector",
          type: "line",
          source: "mapVector",
          "source-layer": "20220121150525",
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-opacity": 0.8,
            "line-width": 2,
            "line-color": [
              "case",
              ["==", ["get", "Value"], 50], //判断鼠标移上去显示颜色
              "#861400",
              ["==", ["get", "Value"], 60],
              "#ca1f00",
              ["==", ["get", "Value"], 70],
              "#e69953",
              ["==", ["get", "Value"], 80],
              "#fec20e",
              ["==", ["get", "Value"], 90],
              "#ff6044",
              "#861400",
            ],
          },
        });
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //设备名称查询
  const equipmentNameQuery = () => {
    let params = {
      deviceName: deviceName.value,
    };
    http.instrumentRegistration.getInstrument(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      facilityNetwork.stationTotal = res.data.total;
      let tableData: any = [];
      res.data.list.map((item: any) => {
        tableData.push(item.properties);
        return tableData;
      });
      facilityNetwork.stationTableList = tableData;
      let featureCollection = {
        type: "FeatureCollection",
        features: res.data.data,
      };
      let option = {
        layerId: "mapEquipment",
        name: "device_name",
        iconImgUrl: pieImage.equipmentImg,
      };
      baseMapObj.addPoint(featureCollection, option);
    });
  };
  // let queryTimer = ref(null);
  // 设备名称改变事件
  const queryDeviceName = (val: any) => {
    //如果设备名称不为空  设备编号为空
    // if (val) {
    //   state.codeDevice = "";
    // }
    state.nameDevice = val.name;
    equipmentListApi();
    searchList("");
    //  state.deviceNameInfo = val.stationId;
    // equipmentNameQuery();
    // if (queryTimer.value !== null) {
    //   clearTimeout(queryTimer);
    // }
    // queryTimer = setTimeout(() => {
    //   equipmentNameQuery();
    // }, 1000);
    // stationTableShow.value = true;
    let center = {
      lat: val.latitude,
      lng: val.longitude,
    };
    // baseMapObj.flyTo([val.longitude, val.latitude], 10);
    // 定位
    baseMapObj.flyTo([val.longitude, val.latitude], state.zoom3);
  };
  //设备编号改变
  const deviceCodeChange = (val: any) => {
    //如果设备编号不为空  设备名称为空
    // if (val) {
    //   state.nameDevice = "";
    // }
    state.codeDevice = val.code;
    equipmentListApi();
    searchList("");
    // equipmentNameQuery();
    // if (queryTimer.value !== null) {
    //   clearTimeout(queryTimer);
    // }
    // queryTimer = setTimeout(() => {
    //   equipmentNameQuery();
    // }, 1000);
    // stationTableShow.value = true;
    let center = {
      lat: val.latitude,
      lng: val.longitude,
    };
    baseMapObj.flyTo([val.longitude, val.latitude], 10);
  };

  //切换tab时触发
  const handleClick = (msg: any) => {
    activeName.value = msg.props.name;
    //台网
    if (activeName.value == "first") {
      state.netInfoIsshow = true;
      showPonit.value = false;
      equipInfo.ShowPonit = false;
      stationAllInfo.stationInfoIshow = false;
      //打开台网图层
      baseMapObj.chageLayer("mapStations", true);
      //关闭台站图层
      isShowLayer(state.showCoverage.notShowStation);
      //关闭设备图层
      baseMapObj.chageLayer("mapEquipment", false);
      //台站
    } else if (activeName.value == "second") {
      state.netInfoIsshow = false;
      equipInfo.ShowPonit = false;
      //搜索当中的学科
      stationAllInfo.flag = 1;
      addInternetPoint("mapInternetSure"); // 台站添加异常点台站添加正常点
      //关闭设备图层
      baseMapObj.chageLayer("mapEquipment", false);
      //设备
    } else if (activeName.value == "fourth") {
      // getEpuipment(); //设备下拉框
      state.netInfoIsshow = false;
      showPonit.value = false;
      equipInfo.ShowPonit = false;
      equipInfo.isShowFlage = 1;
      facilityInfo.linkageData = [];
      stationAllInfo.stationInfoIshow = false;
      //关闭台站图层
      isShowLayer(state.showCoverage.notShowStation);
    }
    stationTableShow.value = false;
    isShowCoverage.value = false;
    markShow.value = false;
    // showPonit.value = false;
    state.coverageList.map((item, index) => {
      if (item.layerId != "mapStations") {
        if (msg.index == index) {
          item.value = true;
          // if (baseMapObj.getLayer(item.layerId)) {
          //   // var visibility = map.getLayoutProperty(item.layerId, "visibility");
          //   let visibility = baseMapObj.getLayerVisible(item.layerId);

          //   if (visibility === true) {
          //   } else {
          //     selectChangeLayer(item);
          //   }
          // } else {
          //   selectChangeLayer(item);
          // }
        } else {
          item.value = false;
          // if (baseMapObj.getLayer(item.layerId)) {
          //   // var visibility = map.getLayoutProperty(item.layerId, "visibility");
          //   let visibility = baseMapObj.getLayerVisible(item.layerId);
          //   // if (visibility === "visible" || visibility == undefined) {
          //   //   selectChangeLayer(item);
          //   // }
          //   if (visibility === true) {
          //     selectChangeLayer(item);
          //   }
          // }
        }
      }
    });
    state.selectNetwork = "";
    state.foreignValue = "";
    state.selectStationPro = "";
    state.stationArray = "";
    state.stationChild = "";
    state.watchPoint = "";
    state.watchPointCode = "";
    deviceName.value = "";
    equipmentType.value = "";
    stationTableShow.value = false;
    seePointShow.value = false;
    resetSearchInfo();
  };
  const resetSearchInfo = () => {
    state.equipmentCode = "";
    state.selectNetworkInfo = ""; //台网tab中选中台网的值
    state.selectNetworkCodeInfo = ""; //台网tab中选中台网编号
    state.selectNetwork = ""; //台站tab中选台网的值
    facilityNetwork.id = ""; //台站tab中选台网的值
    state.subjectInfo = ""; //台站tab中选学科类型的值
    state.stationTypeInfo = ""; //台站tab中选台站类型的值
    state.stationNameId = ""; //台站tab中选台站名称的值
    state.stationcode = ""; //台站tab中选台站编号的值
    state.networkInfo = ""; //台站tab中选台网的值
    facilityInfo.id = ""; //设备tab中选台站的值
    state.nameDevice = ""; //设备tab中选设备名称的值
    state.codeDevice = ""; //设备tab中选设备编号的值
  };
  //观测点表格单击某行
  const TestSelect = (row: any) => {
    // let center = [row.longitude, row.latitude];
    // map.flyTo({
    //   center: center,
    //   zoom: 14,
    // });
    let center = {
      lat: row.latitude,
      lng: row.longitude,
    };
    baseMapObj.flyTo([row.longitude, row.latitude], 10);
  };
  //设备表格单击某行
  const stationSelect = (row: any) => {
    let center = [row.properties.longitude, row.properties.latitude];
    map.flyTo({
      center: center,
      zoom: 14,
    });
  };
  const init = async () => {
    // initMap();
    // await getProvince(); //台网搜索框
    // // await getTaiwanese(); //台阵
    // await getStations(); //台站
    // await getCountry(); //获取国家级
    // await getTreeStations(); // 树结构-获取一级台网
  };
  const closeLegend = () => {
    showlegend.value = false;
  };
  const clicklegend = () => {
    showlegend.value = !showlegend.value;
  };
  // 台网表格行点击事件
  const rowclick = (row: any, index: any) => {
    // 关闭台网弹框
    markShow.value = false;
    bandClick(facilityNetwork.id, 1);
  };
  // 判断点是否在球背面
  const aotuRemoveBox = (x: number, y: number, z: number, id: any) => {
    let isDispay = true;
    var worldPoint = globe.geoToWorld([x, y], z); // 设置面板的地理位置
    var cameraPosition = globe.getWorldCamera().getCameraPosition(); // 获取相机位置
    //globe.getSceneMode()==1 三维球时才移除
    if (
      worldPoint.dot(cameraPosition.sub(worldPoint)) <= 0.0 &&
      globe.getSceneMode() == 1
    ) {
      DelDiv("index" + id); //地球背面移除
      // HiddenDIV("index" + id);
      isDispay = false;
    }
    return isDispay;
  };
  // 加载扩散点
  const addbillBoard = () => {
    // requestAnimationFrame(addbillBoard);

    let center2 = globe.getCenter();
    // let heit2 = 0;
    let heit2 = globe.getScale();
    let picth2 = globe.getPitchAngle();
    // let picth2 = 0
    if (
      center2.x != center1.x ||
      center2.y != center1.y ||
      center2.z != center1.z ||
      heit2 != heit1 ||
      picth2 != picth1 ||
      renderbillboardid == 0
    ) {
      // renderbillboardid == 0
      features.map((item: any, index: any) => {
        // addBillBoard10(
        //   item.longitude,
        //   item.latitude,
        //   100,
        //   `index${index}`,
        //   item
        // ); //扩散
        nextTick(() => {
          addBillBoard10(
            item.geometry.coordinates[0],
            item.geometry.coordinates[1],
            100,
            `index${index}`,
            item
          ); //扩散
        });
      });
      center1 = center2;
      heit1 = heit2;
      picth1 = picth2;
    }
    renderbillboardid = requestAnimationFrame(addbillBoard);
  };
  const addBillBoard10 = (
    x: number,
    y: number,
    z: number,
    id = "index",
    data: any
  ) => {
    //tif
    let isDisplay = aotuRemoveBox(x, y, z, id); //返回false不显示 不再渲染添加
    if (!isDisplay) return;
    let arrsrcenxyz = towDevice(x, y, z);
    let screenX = arrsrcenxyz.x;
    let screenY = arrsrcenxyz.y;
    let divGraphic = DivLightPoint(
      {
        globecanvas: globecanvas,
        scale: [2, 2],
        position: [screenX, screenY],
        style: {
          id: id,
          color: "#eb2d2d",
          data: data,
        },
      },
      (data: any) => {
        onClicksPIE(data.properties);
        // onClicksPIE(data.properties)
      }
    );

    // GraphicBreastplateLayer({globeControl,divGraphic,screenX,screenY,id});
  };

  const towDevice = (x: number, y: number, z: number) => {
    let worldPoint = globe.geoToWorld([x, y], z);
    let arrsrcenxyz = globe.worldToDevice(worldPoint);
    return arrsrcenxyz; //获取屏幕坐标
  };
  // 查看按钮与波形按钮事件
  const look = (row: any) => {
    //如果是供电设备
    if (row.cate_id == 3) {
      state.showEquipmentDetail = true;
      getPowerEquipDetails(row.inst_id);
    } else if (row.cate_id != 3) {
      //如果非供电设备
      state.equipmentDetails = true;
      getEquipDetails(row.inst_code);
    }
  };
  //设备类型为供电设备的详情查看
  const getPowerEquipDetails = (data: any) => {
    http.instrumentRegistration.getSelectEquip(data).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res.code == 0) {
        state.powerEquipmentDetails = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  const waveaction = (row: any) => {
    // bandClick();
    facilityInfo.equipmentArr = [
      {
        label: row.name,
        value: row.inst_id,
      },
    ];
    equipmentVal.value = facilityInfo.equipmentArr[0];
    state.thisEquipId = facilityInfo.equipmentArr[0].value;
    facilityId.value = row.inst_id;
    // setWaveInterval();
    nextTick(() => {
      showEchartsValue.value = true;
      showInstrument.value = true;
      // 关闭台站弹出框
      showPonit.value = false;
      //关闭搜索设备弹出框
      equipInfo.ShowPonit = false;
    });
  };
  // 查询异常台站
  const queryData = () => {
    let params = {
      collectionName: "STATION_BASE_INFO",
      queryConditionList: [
        {
          compareOp: "=",
          fieldName: "status",
          fieldValue: 1,
          relationNextOne: "AND",
        },
      ],
      queryResultList: [],
    };
    http.timeReal.getLocal(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        features = res.data.data;
        addbillBoard();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 查询正常台站
  const getNormal = () => {
    let params = {
      collectionName: "STATION_BASE_INFO",
      queryConditionList: [
        {
          compareOp: "=",
          fieldName: "status",
          fieldValue: 1,
          relationNextOne: "AND",
        },
      ],
      queryResultList: [],
    };
    http.timeReal.getLocal(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res && res.code == 0) {
        facilityNetwork.linkageData = res.data.data;
        state.total = res.data.total;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //查询台站和设备状态
  const stationInsStatus = (networkId: any) => {
    let param = {
      networkId: networkId,
    };
    http.statusMonitor.stationInsStatus(param).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res) {
        if (res.code == 0) {
          //台站状态
          state.stationStatusInfo = {
            subtext: res.data.stationTotal,
            data: [
              {
                value: res.data.stationNomarl,
                name: "正常",
              },
              {
                value: res.data.stationErr || null,
                name: "故障",
              },
              {
                value: res.data.stationWarning || null,
                name: "告警",
              },
              {
                value: res.data.stationOffLine || null,
                name: "离线",
              },
            ],
          };
          //设备状态（正常、异常、告警、离线）
          state.equipmentStatusInfo = {
            subtext: res.data.instTotal,
            data: [
              {
                value: res.data.instNomarl,
                name: "正常",
              },
              {
                value: res.data.instErr || null,
                name: "故障",
              },
              {
                value: res.data.instWarning || null,
                name: "告警",
              },
              {
                value: res.data.instOffLine || null,
                name: "离线",
              },
            ],
          };
        } else {
          ElMessage.error(res.message);
        }
      } else {
        state.stationStatusInfo = {
          subtext: null,
          data: [
            {
              value: null,
              name: "正常",
            },
            {
              value: null,
              name: "故障",
            },
            {
              value: null,
              name: "告警",
            },
            {
              value: null,
              name: "离线",
            },
          ],
        };
        state.equipmentStatusInfo = {
          subtext: null,
          data: [
            {
              value: null,
              name: "正常",
            },
            {
              value: null,
              name: "故障",
            },
            {
              value: null,
              name: "告警",
            },
            {
              value: null,
              name: "离线",
            },
          ],
        };
      }
    });
  };
  //按台站查询设备状态
  const getInstStatus = (stationCode: any) => {
    let param = {
      stationCode: stationCode,
    };
    http.statusMonitor.getInstStatus(param).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res) {
        if (res.code == 0) {
          state.modalEchartsOption.series[0].data = [
            {
              value: res.data.instNomarl || null,
              name: "正常",
            },
            {
              value: res.data.instFault || null,
              name: "故障",
            },
            {
              value: res.data.instWarning || null,
              name: "告警",
            },
            {
              value: res.data.instOffLine || null,
              name: "离线",
            },
          ];
          state.modalEchartsOption.title.text = [
            "{name|总设备}",
            `{value|${res.data.instTotal}}`,
          ].join("\n");

          let mychart: any = echarts.init(modalEcharts.value);
          mychart.setOption(state.modalEchartsOption);
        } else {
          ElMessage.error(res.message);
        }
      } else {
        let mychart: any = echarts.init(modalEcharts.value);
        mychart.setOption(state.modalEchartsOption);
      }
    });
  };
  //按台网获取各个台站分类
  const getStationClassify = (networkId: any) => {
    let param = {
      networkId: networkId,
    };
    http.statusMonitor.stationClassify(param).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res) {
        if (res.code == 0) {
          state.stationClassify = [];
          for (let item in res.data) {
            state.stationClassify.push({
              num: res.data[item].err,
              total: res.data[item].total,
              station: item,
              id: res.data[item].id,
            });
          }
        } else {
          ElMessage.error(res.message);
        }
      } else {
        state.stationClassify = [
          {
            num: null,
            total: null,
            station: "测震台站",
          },
          {
            num: null,
            total: null,
            station: "强震台站",
          },
          {
            num: null,
            total: null,
            station: "GNSS",
          },
          {
            num: null,
            total: null,
            station: "次声台站",
          },
          {
            num: null,
            total: null,
            station: "重力台站",
          },
          {
            num: null,
            total: null,
            station: "地磁台站",
          },
        ];
      }
    });
  };
  //热力图统计
  const heatMap = () => {
    let param = {};
    http.statusMonitor.equipmentStatistics(param).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res) {
        if (res.code == 0) {
          state.heatMapData = [];
          res.data.map((item: any) => {
            state.heatMapData.push({
              name: item.properties.name,
              value: item.properties.percentage,
              longitude: item.properties.longitude,
              latitude: item.properties.latitude,
              station_id: item.properties.networkId,
            });
          });
        } else {
          ElMessage.error(res.message);
        }
      }
    });
  };
  // 台站模型按钮
  const modelClick = () => {
    measureShow.value = true;
  };
  //设备查看详情
  const getEquipDetails = (data: any) => {
    http.statusMonitor.getEquipDetails(data).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res.code == 0) {
        let keys = [
          "GPS(h)",
          "Acquisition",
          "Temp.",
          "Input",
          "Backup",
          "Delay(s)",
          "RAM(Kb)",
          "Disk1(Mb)",
          "Disk2(Mb)",
        ];
        state.equipmentDetailsInfo = {};
        state.equipmentDetailsInfo = {
          Longitude: res.data.statusInformationDetails[0].data[0].Longitude,
          Latitude: res.data.statusInformationDetails[0].data[0].Latitude,
          Altitude: res.data.statusInformationDetails[0].data[0].Altitude,
          IP: res.data.networkParametersDetails.data[0]["IP Address"],
        };
        keys.map((item: any) => {
          state.equipmentDetailsInfo[item] =
            res.data.refTekNetworkDetails.data[0][item];
        });
        state.equipmentDetailsInfo.channelData =
          res.data.channelParametersDetails.data;
        state.equipmentDetailsInfo.streamData =
          res.data.dataStreamParametersDetails.data;
        state.equipmentDetailsInfo.networkData =
          res.data.networkParametersDetails.data;
        state.equipmentDetailsInfo.statusData =
          res.data.statusInformationDetails[1].data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //查询指定数据采集设备基础信息图片
  const detailImg = (data: any) => {
    state.equipDetailsImgShow = true;
    let unitId = data + "33054";
    http.statusMonitor.getEquipDetailsImg(unitId).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res.code == 0) {
        state.equipDetailsImg = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  document.addEventListener("click", function () {
    isShowCoverage.value = false; //隐藏
  });
  //设置定时器请求波形
  const setWaveInterval = () => {
    if (waveTimer.value) {
      clearInterval(waveTimer.value);
    }
    showWave();
    waveTimer.value = setInterval(() => {
      showWave();
    }, 5000);
  };
  //查询省级边界线
  const getProvincialline = () => {
    let params = {
      collectionName: "provincialline",
      outputEpsg: 4326,
      outputGeobuf: true,
      queryConditionList: [],
      queryResultList: [],
    };
    http.stationsInfoManage.getAddPoint(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res) {
        let data = res;
        let featureCollection = geobuf.decode(new Pbf(data)); // 对GeoBuf解码
        let color = [128, 128, 128, 250]; //灰色
        let layer = "provincialline";
        baseMapObj.getBoundary(featureCollection, color, layer);
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 加载人口专题图
  const thematicMapFn = () => {
    let params = {
      collectionName: "countypopulation",
      outputEpsg: 4326,
      outputGeobuf: true,
      queryConditionList: [],
      queryResultList: [],
    };
    http.stationsInfoManage.getAddPoint(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res) {
        let data = res;
        let featureCollection = geobuf.decode(new Pbf(data));
        featureCollection.features.map((v: any) => {
          if (v.properties.six_spectrum) {
            v.properties.sixSpectrum = v.properties.six_spectrum.replace(
              /,/g,
              ""
            );
          } else {
            v.properties.sixSpectrum = 0;
          }
        });
        baseMapObj.addThematic(featureCollection);
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 加载GDP专题图
  const GDPThemeFn = () => {
    let params = {
      collectionName: "gdptheme",
      outputEpsg: 4326,
      outputGeobuf: true,
      queryConditionList: [],
      queryResultList: [],
    };
    http.stationsInfoManage.getAddPoint(params).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res) {
        let data = res;
        let featureCollection = geobuf.decode(new Pbf(data));
        baseMapObj.addGDPhematic(featureCollection);
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  const resetFn = () => {
    facility.value = false;
    showBigImgEcharts.value = false;
    showBigImgEchartsEquip.value = false;
    showInstrument.value = false;
    markShowEquip.value = false;
    showPonit.value = false;
    markShow.value = false;
    showInfoMark.value = false;
    state.netInfoIsshow = false; //台网弹出框
    state.isShowInput = true; //搜索输入框
    measureShow.value = false;
    equipInfo.ShowPonit = false;
    state.facility = false;
    histogramProps.title = "台网正常率";
    facilityNetwork.id = "";
    stationInsStatus(null);
    getStationClassify(null);
    baseMapObj.flyTo([116.4, 39.9], 5);
    subjectListChange(state.subjectListList[0].id); //综合台台站
    //查询台站总数
    searchStationNum(state.subjectListList[0].id);
    closeCoverageList(); //关闭图层
    // 台网
    baseMapObj.chageLayer("mapStations", false);
    // 关闭测点台站设备等值线
    baseMapObj.chageLayer("mapMeasurementSure", false);
    baseMapObj.chageLayer("mapInternetSure", false);
    baseMapObj.chageLayer("mapEquipment", false);
    baseMapObj.chageLayer("mapVector", false);
    // 关闭专题图
    baseMapObj.chageLayer("mapTheme", false);
    baseMapObj.chageLayer("GDPTheme", false);
    // 关闭边界线
    baseMapObj.chageLayer("provincialline", false);

    //异常台站点
    // baseMapObj.chageLayer("abnormal", false);
    // baseMapObj.chageLayer("offLayer", false);
    // baseMapObj.chageLayer("warnLayer", false);
    //正常台站点
    // baseMapObj.chageLayer("strong", false);
    // baseMapObj.chageLayer("seismometry", false);
    // baseMapObj.chageLayer("GNSS", false);
    // baseMapObj.chageLayer("infrasound", false);
    // baseMapObj.chageLayer("terrestrial", false);
    // baseMapObj.chageLayer("gravity", false);
  };
  // 关闭图层
  const closeCoverageList = () => {
    state.coverageList[0].value = false;
    state.coverageList[1].value = true;
    state.coverageList[2].value = false;
    state.coverageList[3].value = false;
    state.coverageList[4].value = false;
  };
  const clickHeatMap = (obj: any) => {
    baseMapObj.flyTo([obj.longitude, obj.latitude], 8);
    onClickNetPIE(obj);
  };
  //关闭台网弹框
  const overviewNet = (obj: any) => {
    state.netInfoIsshow = false;
  };
  //关闭搜索台站时弹出的台站弹框
  const stationBoxClose = (obj: any) => {
    stationAllInfo.stationInfoIshow = false;
  };
  // 搜索-根据台站类型查询 台站正常异常数
  const searchStationNum = (stationTypeId: any) => {
    http.stationsInfoManage.abnormalStation(stationTypeId).then((res: any) => {
      if (baseMapObj.destory) {
        return;
      }
      if (res) {
        state.stationTotalInfo = res.data;
      }
    });
  };
  return {
    state,
    clickGraph,
    netWorkSearchChange,
    overviewNet,
    stationBoxClose,
    cutFun,
    subjectTypeClick,
    isShowSearch,
    statinoTypeClick,
    stationRowclick,
    stationAllInfo,
    sizeChangeSearch,
    pageChangeSearch,
    equipmentTypeChange,
    showTable,
    tableNumber,
    activeName,
    isTableShow,
    isSpecilShow,
    echartsData,
    markShow,
    showInfoMark,
    netWorkTitle,
    showUpdate,
    modalRef,
    isShowFacility,
    stationTableShow,
    seePointShow,
    facilityNetwork,
    equipTitle,
    markShowEquip,
    cancelModalEquip,
    showInfoMarkEquip,
    showUpdateEquip,
    modalRefEquip,
    deviceName,
    equipmentType,
    equipmentCode,
    popup,
    isCheckLayerShow,
    searchVal,
    markData,
    showPonit,
    cancelStation,
    showInstrument,
    calcelInstrument,
    facility,
    sampleValue,
    eventType,
    equipmentVal,
    showBigImgEcharts,
    showBigImgEchartsEquip,
    facilityInfo,
    detailId,
    initMap,
    getProvince,
    getTaiwanese,
    getStations,
    getCountry,
    getTreeStations,
    baseMapObj,
    map,
    samllBaseMapObj,
    smallMap,
    waveOptionList,
    options1,
    options2,
    options3,
    options4,
    getWorker,
    work,
    getWorker2,
    cancel,
    facilityNetMark,
    toTable,
    closeTable,
    isShowCoverage,
    timer,
    inputChange,
    addStationsPoint,
    addInternetPoint,
    internetApi,
    addMeasurementPoint,
    measurementApi,
    addEquipmentPoint,
    treeProps,
    loadNode,
    onClicks,
    onClickNet,
    onClicksEquip,
    updateInfo,
    submitForm,
    delInfo,
    searchId,
    provinceTaiwanese,
    stationsTotal,
    foreignChang,
    networkChange,
    networkChange1,
    stationNetworkChange,
    subjectTypeChange,
    netCodeChange,
    addStationPoints,
    flyProvince,
    stationArrayChange,
    stationArrayChange1,
    stationChildChange,
    subjectListChange,
    stationEquipChange,
    equipNetworkChange,
    stationCodeChange,
    addStationChildPoints,
    addPointNormal,
    checkFn,
    enlargeFn,
    reduceFn,
    checkLayer,
    coverageList,
    allStatisticsClick,
    closeFun,
    selectChange,
    thematicClose,
    selectChangeLayer,
    checkMapFn,
    instrumentClick,
    pageChange,
    pageChanges,
    sizeChange,
    searchList,
    searchFacilityNum,
    showEchartsValue,
    showWave,
    showWaveBottom,
    bandClick,
    listenCount,
    echartDragOne,
    echartDragTwo,
    echartDragThree,
    echartDragFour,
    bandConfirm,
    bandConfirmEquip,
    equipmentChange,
    sampleClick,
    searchClick,
    cancelSelect,
    nodeClick,
    displayNet,
    displayStation,
    treeShowClick,
    contourLines,
    equipmentNameQuery,
    queryDeviceName,
    deviceCodeChange,
    handleClick,
    TestSelect,
    stationSelect,
    measureShow,
    threeRef,
    treePanelRef,
    moveShow,
    measureObj,
    sizeChangeDevice,
    pageChangeDevice,
    closeLegend,
    pieOptions,
    onload,
    showlegend,
    clicklegend,
    rowclick,
    waveaction,
    look,
    histogramProps,
    modelClick,
    diagramProps,
    clickDiagram,
    detailImg,
    equipInfo,
    clickSubjectbox,
    resetFn,
    clickHeatMap,
    facilityId,
    historyWeave,
    historyCancel,
    networkIdVal,
  };
};
