import baseMap from "@/plugins/lib/baseMaps";
// import mapboxgl from "mapbox-gl";
import {
  onMounted,
  ref,
  reactive,
  getCurrentInstance,
  defineEmits,
  onUnmounted,
} from "vue";
import { ElMessage } from "element-plus";
import VectorLayers from "@/core/PIEEarth/VectorLayers";
import http from "@/api/index";
import utils from "@/utils/utils";
// import pieImage from "@/assets/pieImage"; //飞机打点图标
import pieImage from "../../../../mainViewTest/pieImage"; //飞机打点图标
import wordMap from "@/assets/images/map2.png";
import mapboxMap from "@/assets/images/map1.png";
import mapserve from "@/config/mapserve";
const sourceMap = new Map(); //map
const PIE = window.PIE;
import BasePlot from "@/plugins/lib/BasePlot";
export const useHandler = () => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  let BasePlots: any = null; //地图画点
  let isCheckLayerShow: any = ref(false); // 缩略图是否显示
  const state = reactive({
    layers: [
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
    ],//图例
    showLegend: false,//图例
    compatibleLegend: true,//图例
    stationStateList: [
      {
        id: 0,
        name: "正常"
      },
      {
        id: 1,
        name: "故障"
      },
      {
        id: 2,
        name: "告警"
      },
      {
        id: 3,
        name: "离线"
      },
    ],//台站状态
    mousewheelBounds: {},//地图滚轮事件
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
    stationLithologyList: [
      { id: "震旦纪砂岩 ", typeName: "震旦纪砂岩 " },
      { id: "灰岩", typeName: "灰岩" },
      { id: "变质岩", typeName: "变质岩" },
    ], //台站岩性数组
    subjectionSubkectList: [], //隶属学科
    subjectionSubkect: "",//隶属学科--查询
    selectNetList: [], // 台网列表
    fitData: "", //单位名称
    overseas: "", // 境内外
    localList: [], // 国家级
    selectNetwork: {
      networkId: "",//台网id
    }, // 台网
    showTable: false, //表格是否展开
    stationArray: "", //台阵
    stationArrayList: [
      {
        id: "",
        typeName: "",
      }
    ], //台阵列表
    newLableArr: [], //获取新增城市的lable
    modifyLableArr: [], //获取修改城市的lable
    selectionList: [], //批量数据
    teamIdArray: [], //批量删除数据
    total: 10, //总条数
    pageSize: 10, //分页尺寸
    pageNum: 1, //当前页
    title: "新增",
    editTitle: "编辑",
    showAdd: false, //新增弹框
    showModify: false, //修改弹框
    // 虚拟select列表
    label: [],
    linkageColumns: [
      {
        prop: "name",
        label: "台站名称",
      },
      {
        prop: "code",
        label: "编号",
      },
      {
        prop: "networkname",
        label: "台网",
      },
      {
        prop: "latitude",
        label: "纬度(ON)",
      },
      {
        prop: "longitude",
        label: "经度(E)",
      },
      {
        prop: "elevation",
        label: "高程(M)",
      },
      {
        prop: "statusInvalid",
        label: "状态",
      },
      {
        prop: "create_time",
        label: "创建时间",
      },
      {
        prop: "stime",
        label: "停用时间",
      },
      {
        prop: "ctime",
        label: "建台时间",
      },
    ],
    // 联动设备数据
    linkageData: [],
    curTool: 1, //地图工具栏
  });
  // 新增数据
  const ruleForm = reactive({
    stationState: "",//台站状态
    ctime: "",//建台时间
    stationName: "", //台站名称
    stationCode: "", //台站编码
    stationProperty: "", //台站级别（下拉框）
    stationPropertyList: [
      {
        id: 1,
        name: "地方台",
      },
      {
        id: 2,
        name: "区域台",
      },
      {
        id: 3,
        name: "国家台",
      },
    ], //台站级别（下拉框）
    stationLithology: "", //台站岩性
    subjectionSubkect: "", //隶属学科
    longitude: "", //经度
    latitude: "", //纬度
    elevation: "", //高程
    overseas: "0", //：是否境内
    unit: "", //台网（下拉框）
    stationType: "", //：台阵（下拉框）
    stationAddress: "", //详细信息
    supervisorMode: "", //管理方式（下拉框）
    supervisorModeList: [
      {
        id: 0,
        name: "无人值守",
      },
      {
        id: 1,
        name: "有人值守",
      },
    ], //管理方式（下拉框）
  });
  // 修改数据
  const updateForm = reactive({
    stationState: "",//台站状态
    ctime: "",//建台时间
    stationName: "", //台站名称
    stationCode: "", //台站编码
    stationProperty: "", //台站级别（下拉框）
    stationPropertyList: [
      {
        id: 1,
        name: "地方台",
      },
      {
        id: 2,
        name: "区域台",
      },
      {
        id: 3,
        name: "国家台",
      },
    ], //台站级别（下拉框）
    stationLithology: "", //：台站岩性
    subjectionSubkect: "", //隶属学科
    longitude: "", //经度
    latitude: "", //纬度
    elevation: "", //高程
    overseas: "0", //：是否境内
    unit: "", //台网（下拉框）
    stationType: "", //：台阵（下拉框）
    stationAddress: "", //详细信息
    supervisorMode: "", //管理方式（下拉框）
    supervisorModeList: [
      {
        id: 0,
        name: "无人值守",
      },
      {
        id: 1,
        name: "有人值守",
      },
    ], //管理方式（下拉框）
    description: "", //：描述
    station_id: "", //修改编辑id
  });
  let viewer = null; // 地球对象
  let globeControl: any = null;

  // 地球实例获取方法
  let viewerInstance: any = ref(null);
  // const PIE = window.PIE;
  let pieOptions = {
    canvas: "canvas",
    autoProjection: true,
    center: [116.4, 39.9],
    zoom: 4,
    rasterDataSource: {
      server: (window as any).gateway.mapUrlPIE,
      // "https://webst03.is.autonavi.com/appmaptile?style=6&z={z}&y={y}&x={x}", //影像瓦片数据源地址
      alias: "PIEbaseLayer",
      epsg: 4326,
      levelOffset: -1,
    },
  }; // 地球配置
  onMounted(() => {
    init().then((res) => { });
    initMap();
    dragendMap()//鼠标滚动事件
  });
  // 初始化地图
  let map: any = null;
  let baseMapObj: any = null;
  // onBeforeUnmount(() => {
  //   baseMapObj.map = null;
  //   let mapboxEarthquake: any = document.getElementById("mapContainer");
  //   mapboxEarthquake.innerHTML = "";
  // });
  const initMap = () => {
    baseMapObj = new baseMap({
      container: "mapContainer",
      zoom: 3,
      // center: [123.31054687499999, 36.38591277287651],
    });
    map = baseMapObj.map;
    map.on("load", () => {
      BasePlots = new BasePlot(map);
      baseMapObj.loadImages(pieImage.stationIcon);
      getList();//表格
      addPoint()//加载所有点
    });
  };
  // 切换页
  const pageChange = (pageNum: any) => {
    state.pageNum = pageNum;
    getList();
  };
  //分页大小
  const sizeChange = (pageSize: any) => {
    state.pageSize = pageSize;
    getList();
  };
  const clicklegend = () => {
    state.showTable = !state.showTable;
    state.showLegend = false;
    state.compatibleLegend = false;
    getList();
  };
  // 关闭表格
  const closeLegend = () => {
    state.showTable = !state.showTable;
    state.showLegend = false;
    state.compatibleLegend = true;
  }

  // 取消弹出框
  const cancel = () => {
    state.showAdd = false;
    state.showModify = false;
    clearDraw()
    // baseMapObj.endMeasure();
    // layerClicks();
  };
  //选择国家级
  const foreignChang = (val: any) => {
    state.selectNetwork.networkId = ""; //省级
    state.stationArray = ""; //台阵
    state.fitData = ""; //台站名称
    getUnitList(); //点击国家级查询省级
    // 点击省级查询台阵
    let data = {
      unitId: state.selectNetwork.networkId ? state.selectNetwork.networkId : val,
    };
    provinceTaiwanese(data);
  };
  // 查询-台网查台站类型
  const networkChangeMain = (val: any) => {
    ruleForm.unit = "";
    ruleForm.stationType = "";
    updateForm.unit = "";
    updateForm.stationType = "";
    state.stationArray = ''
    state.fitData = ''
    let centerArr: any = [val.longitude, val.latitude];
    // baseMapObj.flyTo(centerArr, 8);//飞行定位到具体台网
    map.flyTo({
      center: centerArr,
      zoom: 8,
    }); // 定位至所在区域
    let params = {
      networkId: val.networkId, //省级
    };
    provinceTaiwanese(params);//查询台站
    state.selectNetwork.networkId = val.networkId
    getList()//查列表
  };
  // 选择台站类型
  const stationArrayChange = (val: any) => {
    ruleForm.stationType = ''
    updateForm.stationType = ''
    state.stationArray = val
    getList()//查列表
    addPoint()
  }
  // 请选择学科类型
  const subjectionSubkectChange = (val: any) => {
    ruleForm.subjectionSubkect = ''
    updateForm.subjectionSubkect = ''
    state.subjectionSubkect = val
    getList()//查列表
    addPoint()
  }
  //添加-台网查台站类型
  const networkChangeAdd = (val: any) => {
    state.selectNetwork.networkId = "";
    state.stationArray = "";
    updateForm.unit = "";
    updateForm.stationType = "";
    ruleForm.stationType = ""; //台站类型
    // 点击省级查询台阵
    let params = {
      networkId: val.networkId, //省级
    };
    provinceTaiwanese(params);
  };
  //编辑-台网查台站类型
  const networkChangeEdit = (val: any) => {
    state.selectNetwork.networkId = "";
    state.stationArray = "";
    ruleForm.unit = "";
    ruleForm.stationType = "";
    // 点击省级查询台阵
    let params = {
      networkId: val.networkId, //省级
    };
    provinceTaiwanese(params);
  };

  // 获取省级列表
  const getUnitList = () => {
    let params = {
      parentId: 32,
    };
    http.stationsInfoManage.getCountry(params).then((res: any) => {
      if (res.code == 0) {
        state.selectNetList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };

  // 获取隶属学科
  const getSubject = () => {
    let params = {
      collectionName: "META_DATA_SUBJECT_INFO",
      queryConditionList: [],
      queryResultList: [],
    };
    http.stationsInfoManage.getSubject(params).then((res: any) => {
      let arr: any = [];
      if (res && res.code == 0) {
        res.data.data.forEach((item) => {
          arr.push(item.properties);
        });
        state.subjectionSubkectList = arr;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 获取台站类型
  const getTaiwanese = () => {
    let data = {
      unitId: "",
    };
    provinceTaiwanese(data);
  };
  // 台站类型api
  const provinceTaiwanese = (data: any) => {
    http.stationsInfoManage.getTaiwan(data).then((res: any) => {
      if (res.code == 0) {
        state.stationArrayList = res.data;
      } else {
        ElMessage({
          message: res.message,
          type: "error",
        });
      }
    });
  };
  // 获取国家级
  const getCountry = () => {
    let params = {
      parentId: 0,
    };
    http.stationsInfoManage.getCountry(params).then((res: any) => {
      if (res.code == 0) {
        state.localList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 请求数据
  const getList = () => {
    let params;
    params = {
      bounds: state.mousewheelBounds ? state.mousewheelBounds : {}, //范围
      stationTypeId: state.stationArray, //台阵
      name: state.fitData,
      networkId: state.selectNetwork.networkId,
      subjectId: state.subjectionSubkect,//学科类型
      pageNum: state.pageNum,
      pageSize: state.pageSize,
    };
    http.stationsInfoManage.getStations(params).then((res: any) => {
      if (res.code == 0) {
        res.data.list.forEach((item: any) => {
          if (item.create_time) {
            item.create_time = utils.formatDate(item.create_time, 0);
          }
          if (item.stime) {
            item.stime = utils.formatDate(item.stime, 0);
          }
          if (item.ctime) {
            item.ctime = utils.formatDate(item.ctime, 0);
          }
          if (item.status == 0) {
            item.statusInvalid = "正常";
          } else if (item.status == 1) {
            item.statusInvalid = "故障";
          } else if (item.status == 2) {
            item.statusInvalid = "预警";
          }
          else if (item.status == 3) {
            item.statusInvalid = "离线";
          }
        });
        state.total = res.data.total;
        state.linkageData = res.data.list;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 加载点
  const addPoint = () => {
    let params;
    params = {
      bounds: state.mousewheelBounds ? state.mousewheelBounds : {}, //范围
      stationTypeId: state.stationArray, //台阵
      name: state.fitData,
      networkId: state.selectNetwork.networkId,
      subjectId: state.subjectionSubkect,//学科类型
      pageNum: state.pageNum,
      pageSize: 10000,
    };
    http.stationsInfoManage.getStations(params).then((res: any) => {
      if (res.code == 0) {
        let newArr: any = [];
        res.data.list.map((item: any) => {
          newArr.push({
            geometry: {
              coordinates: [Number(item.longitude), Number(item.latitude)],
              type: "Point",
            },
            properties: item,
            type: "Feature",
          });
        });
        let featureCollection = {
          type: "FeatureCollection",
          features: newArr,
        };
        let options = {
          layerId: "searchList",
          name: "name",
        };
        baseMapObj.addPointImge(featureCollection, options);
        layerClicks(options.layerId);//点的点击事件
      } else {
        ElMessage.error(res.message);
      }
    });
  }

  //查询
  const search = () => {
    getList();
  };
  //添加
  const addConfig = () => {
    state.title = "新增";
    state.showAdd = true;
    ruleForm.stationName = "";
    ruleForm.stationCode = "";
    ruleForm.stationProperty = "";
    ruleForm.stationLithology = "";
    ruleForm.subjectionSubkect = "";
    ruleForm.unit = "";
    ruleForm.stationType = "";
    ruleForm.ctime = "";
    ruleForm.ctime = "";
    ruleForm.longitude = "";
    ruleForm.latitude = "";
    ruleForm.elevation = "";
    ruleForm.overseas = "0";
    ruleForm.stationAddress = "";
    ruleForm.stationAddress = "";
    ruleForm.supervisorMode = "";
  };
  // 添加-确定
  const confirm = () => {
    if (ruleForm.stationName == "") {
      ElMessage.info("台站名称不能为空");
      return;
    }
    if (ruleForm.stationCode == "") {
      ElMessage.info("编码不能为空");
      return;
    }
    if (ruleForm.longitude == "") {
      ElMessage.info("经度不能为空");
      return;
    }
    if (ruleForm.latitude == "") {
      ElMessage.info("纬度不能为空");
      return;
    }
    if (ruleForm.elevation == "") {
      ElMessage.info("高程不能为空");
      return;
    }
    if (ruleForm.unit == "") {
      ElMessage.info("台网不能为空");
      return;
    }
    let params = {
      name: ruleForm.stationName, //台站名称
      code: ruleForm.stationCode, //台站编码
      stationProperty: ruleForm.stationProperty, //台站级别
      stationLithology: ruleForm.stationLithology, //台站岩性
      networkId: ruleForm.unit, //隶属台网
      type: ruleForm.stationType, //台站类型
      longitude: ruleForm.longitude, //经度
      latitude: ruleForm.latitude, //纬度
      elevation: ruleForm.elevation, //高程
      location: Number(ruleForm.overseas), //是否境内外
      description: ruleForm.stationAddress, //详细信息
      supervisorMode: ruleForm.supervisorMode, //管理方式
      subjectId: ruleForm.subjectionSubkect, //隶属学科
      ctime: ruleForm.ctime, //建台时间
      status: ruleForm.stationState, //台站状态
    };
    http.stationsInfoManage.addStations(params).then((res: any) => {
      if (res.code == 0) {
        state.showAdd = false;
        getList();
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    });
    // baseMapObj.endMeasure();
    // layerClicks();
    clearDraw()
  };
  //修改
  const update = (row: any) => {
    updateForm.station_id = row.station_id; //编辑id
    state.showModify = true;
    state.editTitle = "编辑";
    updateForm.stationName = row.name; //台站名称
    updateForm.stationCode = row.code; //台站编码
    updateForm.stationProperty = row.property; //台站级别
    updateForm.stationLithology = row.lithology; //：台站岩性
    updateForm.subjectionSubkect = row.subjectid; //隶属学科
    updateForm.unit = row.networkid; //台网（下拉框）
    updateForm.stationType = row.stationtypeid; //台站类型
    updateForm.longitude = row.longitude; //经度
    updateForm.latitude = row.latitude; //纬度
    updateForm.elevation = row.elevation; //高程
    updateForm.overseas = row.location + ""; //：是否境内
    updateForm.stationAddress = row.description; //详细地址
    updateForm.supervisorMode = row.supervisormode; //管理方式（下拉框）
    updateForm.ctime = row.ctime; //建台时间
    updateForm.stationState = row.status; //台站状态
  };
  //修改确认
  const updatConfirm = () => {
    if (updateForm.stationName == "") {
      ElMessage.error("台站名称不能为空");
      return;
    }
    if (updateForm.stationCode == "") {
      ElMessage.error("编码不能为空");
      return;
    }
    if (updateForm.longitude == "") {
      ElMessage.error("经度不能为空");
      return;
    }
    if (updateForm.latitude == "") {
      ElMessage.error("纬度不能为空");
      return;
    }
    let params = {
      name: updateForm.stationName ? updateForm.stationName : "", //台站名称
      code: updateForm.stationCode ? updateForm.stationCode : "", //台站编码
      stationProperty: updateForm.stationProperty
        ? updateForm.stationProperty
        : "", //台站级别
      stationLithology: updateForm.stationLithology
        ? updateForm.stationLithology
        : "", //台站岩性
      networkId: updateForm.unit ? updateForm.unit : "", //隶属台网
      type: updateForm.stationType ? updateForm.stationType : "", //台站类型
      longitude: updateForm.longitude ? updateForm.longitude : "", //经度
      latitude: updateForm.latitude ? updateForm.latitude : "", //纬度
      elevation: updateForm.elevation ? updateForm.elevation : "", //高程
      overseas: updateForm.overseas ? Number(updateForm.overseas) : "", //是否境内外
      description: updateForm.stationAddress ? updateForm.stationAddress : "", //详细信息
      supervisorMode: updateForm.supervisorMode, //管理方式
      stationId: updateForm.station_id, //修改id
      subjectId: updateForm.subjectionSubkect, //隶属学科
      ctime: updateForm.ctime ? updateForm.ctime : "", //建台时间
      status: updateForm.stationState, //台站状态
    };
    http.stationsInfoManage.editStations(params).then((res: any) => {
      if (res.code == 0) {
        state.showModify = false;
        getList();
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    });
    // baseMapObj.endMeasure();
    // layerClicks();
  };
  // 删除
  const confirmDelete = (row: any) => {
    let params = row.station_id;
    http.stationsInfoManage.delStations(params).then((res: any) => {
      if (res.code == 0) {
        getList();
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //点击表格某一行
  const onRowClick = (row: any) => {
    let centerArr: any = [row.longitude, row.latitude];
    map.flyTo({
      center: centerArr,
      zoom: 8,
    }); // 定位至所在区域
    // baseMapObj.flyTo(centerArr, 8);
  };
  // 初始化
  const init = async () => {
    // getList();
    await getUnitList(); //获取省级列表
    await getTaiwanese(); //获取台阵列表
    await getCountry(); //获取国家级列表
    await getSubject(); //获取隶属学科
  };
  const onClicks = () => {
    BasePlots.mapDraw("draw_point", (result: any) => {
      let flag = result.currentReslut.features;
      ruleForm.longitude = flag[0].geometry.coordinates[0];
      ruleForm.latitude = flag[0].geometry.coordinates[1];
      updateForm.longitude = flag[0].geometry.coordinates[0];
      updateForm.latitude = flag[0].geometry.coordinates[1];
    });
    // baseMapObj.getPoint((result: any) => {
    //   ruleForm.longitude = result[0];
    //   ruleForm.latitude = result[1];
    //   updateForm.longitude = result[0];
    //   updateForm.latitude = result[1];
    // });
  };
  // 清空绘制
  const clearDraw = () => {
    let data = BasePlots.draw.getAll();
    if (data.features.length > 0) {
      data.features.map((item: any) => {
        BasePlots.draw.delete(item.id);
      });
    }
  };
  // 地球加载
  const onload = (viewer: any) => {
    viewerInstance.value = viewer;
    baseMapObj = new VectorLayers(viewer);
    getList();//表格
    addPoint()//加载所有点
    // layerClicks();//点的点击事件
  };
  // 鼠标滚动事件
  let pieTimer: any;
  const dragendMap = () => {
    map.on("wheel", () => {
      if (pieTimer) {
        clearTimeout(pieTimer)
      }
      pieTimer = setTimeout(() => {
        // e.preventDefault();
        let bounds = map.getBounds()
        console.log(bounds, 'bounds');
        let result = {
          lngMax: bounds._ne.wrap().lng, // 最大经度
          lngMin: bounds._sw.wrap().lng, // 最小经度
          latMax: bounds._ne.wrap().lat, // 最大纬度
          latMin: bounds._sw.wrap().lat, // 最小纬度
        }
        state.mousewheelBounds = {
          coordinates: [[[result.lngMin, result.latMax], [result.lngMax, result.latMax], [result.lngMax, result.latMin], [result.lngMin, result.latMin], [result.lngMin, result.latMax]]],
          type: "Polygon"
        }
        getList()
        addPoint()//加载所有点
      }, 1000)
    });
  }
  //图层点击事件监听(台站点击事件)
  const layerClicks = (layerIds: any) => {
    map.on("click", layerIds, (e: any) => {
      let obj: any = e.features[0].properties;
      let center = [obj.longitude, obj.latitude];
      map.flyTo({ center, zoom: 6 });
    });
  };
  // 销毁
  onUnmounted(() => {
    if (viewerInstance.value) {
      viewerInstance.value.dispose();
      viewerInstance.value = null;
    }
  });
  // 二三维切换
  const checkFn = () => {
    state.curTool = 1;
    const projection = map.getProjection();
    if (projection.name == "mercator") {
      // 切换三维
      map.setProjection("globe");
    } else {
      map.setProjection("");
    }
  };
  // 放大
  const enlargeFn = () => {
    state.curTool = 2;
    let zoom = map.getZoom();
    const center = map.getCenter();
    zoom = zoom + 1;
    map.flyTo({ center, zoom });
  };
  // 缩小
  const reduceFn = () => {
    state.curTool = 3;
    let zoom = map.getZoom();
    const center = map.getCenter();
    zoom = zoom - 1;
    map.flyTo({ center, zoom });
  };
  // 切换底图按钮
  const checkLayer = () => {
    state.curTool = 4;
    isCheckLayerShow.value = true;
  };
  // 切换地图
  const checkMapFn = (index: any) => {
    if (index == 2) {
      baseMapObj.addImageLayer({
        mapUrl: mapserve.SKY_MAP,
        center: [108, 35],
      });
    } else {
      baseMapObj.addImageLayer({
        mapUrl: window.gateway.mapUrl,
        center: [108, 35],
      });
    }
    isCheckLayerShow.value = false;
  };
  // 切换图层
  const coverageList = () => {
    state.curTool = 5;
    baseMapObj.chageLayer("searchList");
  };
  // 台站图例
  const stationLegend = () => {
    state.showLegend = !state.showLegend;
    state.showTable = false
  }
  // 台站图例
  const stationLegendClose = () => {
    state.showLegend = false;
  }
  return {
    stationLegend,
    stationLegendClose,
    cancel,
    subjectionSubkectChange,
    stationArrayChange,
    isCheckLayerShow,
    checkMapFn,
    state,
    ruleForm,
    updateForm,
    pieOptions,
    clicklegend,
    closeLegend,
    foreignChang,
    networkChangeMain,
    networkChangeAdd,
    networkChangeEdit,
    getUnitList,
    getTaiwanese,
    provinceTaiwanese,
    getCountry,
    search,
    addConfig,
    confirm,
    update,
    updatConfirm,
    confirmDelete,
    onRowClick,
    init,
    onClicks,
    onload,
    layerClicks,
    checkFn,
    enlargeFn,
    reduceFn,
    checkLayer,
    coverageList,
    pageChange,
    sizeChange,
    initMap,
  };
};
