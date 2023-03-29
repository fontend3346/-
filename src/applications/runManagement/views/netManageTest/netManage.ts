import baseMap from "@/plugins/lib/baseMaps";
import BasePlot from "@/plugins/lib/BasePlot";
import VectorLayers from "@/core/PIEEarth/VectorLayers";
import pieImage from "../../../../mainViewTest/pieImage"; //飞机打点图标
// import mapboxgl from "mapbox-gl";
import {
  onMounted,
  ref,
  reactive,
  getCurrentInstance,
  onUnmounted,
  nextTick,
} from "vue";
import http from "@/api/index";
import { ElMessage } from "element-plus";
import store from "@/store";
import wordMap from "@/assets/images/map2.png";
import mapboxMap from "@/assets/images/map1.png";
import mapserve from "@/config/mapserve";
const sourceMap = new Map(); //map
let map: any = null;
let baseMapObj: any = null;
export const useHandler = () => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  let BasePlots: any = null; //地图画点
  let isCheckLayerShow: any = ref(false); // 缩略图是否显示

  const state = reactive({
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
    showMap: false,
    title: "编辑", //新建
    showAdd: false, //新建显隐
    netName: "", //台网名称

    linkageData: [], //表格数据
    linkageColumns: [
      {
        prop: "cname",
        label: "名称",
      },
      {
        prop: "code",
        label: "数字编码",
      },
      {
        prop: "sname",
        label: "英文名称",
      },
      {
        prop: "longitude",
        label: "经度",
      },
      {
        prop: "latitude",
        label: "纬度",
      },
      {
        prop: "createTime",
        label: "创建时间",
      },
      // {
      //   prop: "last_update_time",
      //   label: "最后更新时间",
      //   width: 150,
      // },
      // {
      //   prop: "head",
      //   label: "负责人",
      // },
      // {
      //   prop: "contact_details",
      //   label: "联系方式",
      // },
      // {
      //   prop: "sub_center_type",
      //   label: "分中心类型",
      //   width: 150,
      // },
      // {
      //   prop: "address",
      //   label: "单位地址",
      // },
      {
        prop: "networkLevel",
        label: "台网等级",
      },
      {
        prop: "status",
        label: "状态",
      },
    ], //表头

    total: 10,
    pageSize: 10,
    pageNum: 1,
    dynamicBtnName: [{ value: "编辑", label: "编辑" }], //动态按钮名
    editRow: {
      id: "",
      name: "", //名称
      sname: "", //英文名称
      figureCode: "", //数字代码
      letterCode: "", //字母代码
      longitude: "", //经度
      latitude: "", //纬度
      head: "", //负责人
      contactDetails: "", //联系方式
      subCenterType: "", //分中心类型
      address: "", //单位地址
      status: "", //状态
      networkLevel: "", //台网等级
    }, //编辑/新建的数据
    curTool: 1, //地图工具栏
  });
  let viewer = null; // 地球对象
  // 地球实例获取方法
  let viewerInstance: any = ref(null);
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
  //动态按钮方法
  const dynamicBtn = (row: any, index: any, item: any) => {
    if (item.value == "编辑") {
      edit(row);
    }
  };
  //点击表格某一行
  const onRowClick = (row: any) => {
    map.flyTo({
      center: row.geometry.coordinates,
      zoom: 8,
    }); // 定位至所在区域
    // baseMapObj.flyTo(row.geometry.coordinates, 10);
  };
  // 查询
  const searchList = (val: any) => {
    let params;
    if (val) {
      params = {
        name: "",
        pageNum: 1,
        pageSize: 1000,
      };
    } else {
      params = {
        name: state.netName,
        pageNum: state.pageNum,
        pageSize: state.pageSize,
      };
    }

    http.stationsInfoManage.getNetWorkLists(params).then((res: any) => {
      if (res && res.code == 0) {
        res.data.data.map((item: any) => {
          let level = item.properties.networkLevel;
          let status = item.properties.status;
          if (level == "1") {
            item.properties.networkLevel = "国家级";
          } else if (level == "2") {
            item.properties.networkLevel = "省级";
          }
          if (status == "0") {
            item.properties.status = "有效";
          } else if (status == "1") {
            item.properties.status = "无效";
          }
        });
        if (val) {
          let featureCollection = {
            type: "FeatureCollection",
            features: res.data.data,
          };

          let option = {
            layerId: "searchList",
            name: "cname",
            iconImgUrl: pieImage.netWorkImg,
            optionIcon: {
              url: pieImage.netWorkImg,
              id: 20,
              name: "searchList",
              base64: true,
            },
          };
          baseMapObj.addPoint(featureCollection, option);
          layerClicks(option.layerId);//点的点击事件
        } else {
          state.total = res.data.total;
          state.linkageData = res.data.data;
        }
      } else {
        state.total = 0;
        state.linkageData = [];
      }
    });
  };
  //地图打点
  const locationPoint = () => { };

  // //切换地图
  // const toMap = () => {
  //   state.showMap = true;
  // };
  // 切换到表格
  const toTable = () => {
    state.showMap = !state.showMap;
    searchList(false);
  };
  // 关闭表格
  const closeLegend=()=>{
    state.showMap = !state.showMap;
  }
  // 添加
  const addEvent = () => {
    state.title = "添加台网";
    state.showAdd = true;
    state.editRow.name = "";
    state.editRow.figureCode = "";
    state.editRow.letterCode = "";
    state.editRow.longitude = "";
    state.editRow.latitude = "";
    state.editRow.status = "1";
    state.editRow.networkLevel = "1";
    state.editRow.sname = "";
  };

  // 编辑
  const edit = (row: any) => {
    state.editRow.id = row.properties.networkId;
    state.editRow.name = row.properties.cname;
    state.editRow.figureCode = row.properties.code;
    // state.editRow.letterCode = row.properties.letter_code;
    state.editRow.longitude = row.properties.longitude;
    state.editRow.latitude = row.properties.latitude;
    // state.editRow.head = row.properties.head;
    // state.editRow.contactDetails = row.properties.contact_details;
    // state.editRow.subCenterType = row.properties.sub_center_type;
    // state.editRow.address = row.properties.address;
    state.editRow.status = row.properties.status == "无效" ? "1" : "0";
    state.editRow.networkLevel =
      row.properties.networkLevel == "省级" ? "2" : "1";
    state.editRow.sname = row.properties.sname;
    state.title = "编辑";
    state.showAdd = true;
  };

  //地图弹框的编辑事件
  const confirmEditMap = (item: any) => {
    state.editRow = item;
    state.title = "编辑";
    confirmEdit();
  };
  // 添加（编辑）确定
  const confirmEdit = () => {
    if (state.title == "编辑") {
      if (!state.editRow.name) {
        ElMessage.error("名称不能为空");
      } else if (!state.editRow.longitude) {
        ElMessage.error("经度不能为空");
      } else if (!state.editRow.latitude) {
        ElMessage.error("纬度不能为空");
      } else {
        // let params = {
        //   id: state.editRow.id,
        //   name: state.editRow.name,
        //   figureCode: state.editRow.figureCode,
        //   letterCode: state.editRow.letterCode,
        //   longitude: state.editRow.longitude,
        //   latitude: state.editRow.latitude,
        //   head: state.editRow.head,
        //   contactDetails: state.editRow.contactDetails,
        //   subCenterType: state.editRow.subCenterType,
        //   address: state.editRow.address,
        // };
        let params = {
          cname: state.editRow.name,
          code: state.editRow.figureCode,
          latitude: state.editRow.latitude,
          longitude: state.editRow.longitude,
          networkId: state.editRow.id,
          networkLevel: state.editRow.networkLevel,
          status: state.editRow.status,
          sname: state.editRow.sname,
        };
        http.stationsInfoManage.editNetWork(params).then((res: any) => {
          if (res.code == 0) {
            ElMessage.success(res.message);
            searchList(false); //刷新列表
            state.showAdd = false;
          } else {
            ElMessage.error(res.message);
          }
        });
      }
    } else if (state.title == "添加台网") {
      if (!state.editRow.name) {
        ElMessage.error("名称不能为空");
      } else if (!state.editRow.longitude) {
        ElMessage.error("经度不能为空");
      } else if (!state.editRow.latitude) {
        ElMessage.error("纬度不能为空");
      } else {
        let params = {
          // name: state.editRow.name,
          // figureCode: state.editRow.figureCode,
          // letterCode: state.editRow.letterCode,
          // longitude: state.editRow.longitude,
          // latitude: state.editRow.latitude,
          // head: state.editRow.head,
          // contactDetails: state.editRow.contactDetails,
          // subCenterType: state.editRow.subCenterType,
          // address: state.editRow.address,
          // networkId: state.editRow.id,

          cname: state.editRow.name,
          code: state.editRow.figureCode,
          latitude: state.editRow.latitude.toString(),
          longitude: state.editRow.longitude.toString(),
          networkLevel: state.editRow.networkLevel,
          // status: state.editRow.status,
          userId: store.state.user.userId,
          sname: state.editRow.sname,
        };
        http.stationsInfoManage.addNetWork(params).then((res: any) => {
          if (res.code == 0) {
            ElMessage.success(res.message);
            searchList(false); //刷新列表
            state.showAdd = false;
          } else {
            ElMessage.error(res.message);
          }
        });
      }
    }
    // baseMapObj.endMeasure();
    // layerClicks();
    clearDraw()
  };
  //地图弹框的删除事件
  const confirmDeleteMap = (i: any) => {
    // let params = { id: i };
    deleteApi(i);
  };
  // 表格确认删除
  const confirmDelete = (i: any) => {
    // let params = { id: i.properties.networkId };
    deleteApi(i.properties.networkId);
  };
  //删除接口
  const deleteApi = (id: any) => {
    http.stationsInfoManage.delNetWork(id).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success(res.message);
        searchList(false); //刷新列表
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 分页
  const pageChange = (i: number) => {
    state.pageNum = i;
    searchList(false);
  };
  // 分页大小
  const sizeChange = (i: number) => {
    state.pageSize = i;
    searchList(false);
  };

  onMounted(() => {
    // searchList();
    initMap();
  });
  // 初始化地图
  // onBeforeUnmount(() => {
  //   baseMapObj.map = null;
  //   let mapboxEarthquake: any = document.getElementById("mapContainer");
  //   mapboxEarthquake.innerHTML = "";
  // });
  const initMap = () => {
    baseMapObj = new baseMap({
      container: "mapContainer",
      zoom: 3,
      center: [123.31054687499999, 36.38591277287651],
    });
    map = baseMapObj.map;
    map.on("load", () => {
      BasePlots = new BasePlot(map);
      searchList(true);
    });
  };
  let listData = ref({}); //地图点的弹框-数据
  const onClicks = () => {
    BasePlots.mapDraw("draw_point", (result: any) => {
      let flag = result.currentReslut.features;
      console.log("精度维度", flag[0].geometry.coordinates);
      state.editRow.longitude = flag[0].geometry.coordinates[0];
      state.editRow.latitude = flag[0].geometry.coordinates[1];
    });
    // baseMapObj.getPoint((result: any) => {
    //   state.editRow.longitude = result[0];
    //   state.editRow.latitude = result[1];
    // });
  };

  // 地球加载
  const onload = (viewer: any) => {
    viewerInstance.value = viewer;
    baseMapObj = new VectorLayers(viewer);
    nextTick(() => {
      searchList(true);
      // layerClicks();
    })

  };
  //图层点击事件监听(台网点击)
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
  const cancel = () => {
    state.showAdd = false;
    clearDraw()
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
  return {
    isCheckLayerShow,
    checkMapFn,
    state,
    pieOptions,
    dynamicBtn,
    onRowClick,
    searchList,
    locationPoint,
    toTable,
    closeLegend,
    addEvent,
    edit,
    confirmEditMap,
    confirmEdit,
    confirmDeleteMap,
    confirmDelete,
    deleteApi,
    pageChange,
    sizeChange,
    initMap,
    onClicks,
    onload,
    layerClicks,
    cancel,
    checkFn,
    enlargeFn,
    reduceFn,
    checkLayer,
    coverageList,
  };
};
