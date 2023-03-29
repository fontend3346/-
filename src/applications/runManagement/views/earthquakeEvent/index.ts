import {
  reactive,
  onMounted,
  ref,
  getCurrentInstance,
  onBeforeUnmount,
  onUpdated,
} from "vue";
import baseMap from "@/plugins/lib/baseMaps";
import mapboxgl from "mapbox-gl";
import http from "@/api/index";
import geobuf from "geobuf";
import { ElMessage } from "element-plus";
import pieImage from "./pieImage"; //飞机打点图标;
import * as turf from "@turf/turf";
export const useHandler = () => {
  let popup: any = null;
  let positionValue = ref(""); //地震发生地点
  let equipmentVal = ref(""); //地震类型
  let startTime = ref("");
  let endTime = ref("");
  let markShow = ref(false); //地图点的弹框-显隐
  let modalRef = ref(); //地图点的弹框ref
  const state = reactive({
    valueTime: "", //时间
    id: "", //地图点对应的id
    options: [
      {
        value: "moderateStrongEarthquake",
        label: "中强震",
      },
      {
        value: "strongEarthquake",
        label: "强震",
      },
      {
        value: "greatEarthquake",
        label: "大地震",
      },
      {
        value: "giantEarthquake",
        label: "巨大地震",
      },
    ],
  });

  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  onMounted(() => {
    initMap();
  });
  onBeforeUnmount(() => {
    baseMapObj.map = null;
    let mapboxEarthquake: any = document.getElementById("mapContainerEvent");
    mapboxEarthquake.innerHTML = "";
  });
  // onUpdated(() => {
  //     initMap();
  // })
  let baseMapObj: any = null;
  let map: any = null;
  // let layerIds: any = "seismicQuery1";
  // 初始化地图
  const initMap = () => {
    baseMapObj = new baseMap({
      container: "mapContainerEvent",
      zoom: 3,
      // center: [123.31054687499999, 36.38591277287651],
    });

    map = baseMapObj.map;
    map.on("load", () => {
      seismicQuery("seismicQuery");
    });
  };
  let location = ref("");
  let time = ref("");
  let depth = ref("");
  let magnitude = ref("");
  let offsetXPoint = ref("");
  let offsetYPoint = ref("");
  // 地图点击事件
  const onClicks = (e: any, layerIds: any) => {
    // markShow.value = false;
    location.value = e.features[0].properties.ref_location;
    time.value = e.features[0].properties.time;
    depth.value = e.features[0].properties.depth;
    magnitude.value = e.features[0].properties.magnitude;
    offsetXPoint.value = e.originalEvent.screenX;
    offsetYPoint.value = e.originalEvent.screenY - 100;
    markShow.value = true;
  };
  const seismicQuery = (layerId: any) => {
    let params = {
      locationName: positionValue.value,
      magnitudeType: equipmentVal.value,
      startTime: startTime.value,
      endTime: endTime.value,
    };
    http.stationsInfoManage.seismicQuery(params).then((res: any) => {
      let featureCollection = {
        type: "FeatureCollection",
        features: res.data,
      };

      let option = {
        layerId: "seismicQuery",
        name: "name",
        // iconImgUrl: pieImage.earthquake,
      };
      // baseMapObj.addPoint(featureCollection, option);
      baseMapObj.addPointCircle(featureCollection, option);
      map.on("click", "seismicQuery", (e: any) => {
        onClicks(e, "seismicQuery");
      });
      //地图缩放触发的事件
      map.on("moveend", "seismicQuery", (e: any) => {
        markShow.value = false;
      });
    });
  };
  let timer = ref(null);
  const inputChange = (v: any) => {
    if (timer.value !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      seismicQuery("seismicQuery");
    }, 1000);
  };
  //选择设备类型
  const earthquakeChange = (item: any) => {
    seismicQuery("seismicQuery");
  };
  //输入框获取焦点
  const focus = () => {
    markShow.value = false;
  };
  const focusSelect = () => {
    markShow.value = false;
  };
  const changeTime = () => {
    if (state.valueTime == null) {
      startTime.value = "";
      endTime.value = "";
    } else {
      startTime.value = dateFormat(state.valueTime[0]);
      endTime.value = dateFormat(state.valueTime[1]);
    }
    seismicQuery("seismicQuery");
    markShow.value = false;
  };
  // 时间转化
  const dateFormat = (dateData: any) => {
    var date = new Date(dateData);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    const time = y + "-" + m + "-" + d;
    return time;
  };

  return {
    state,
    positionValue,
    inputChange,
    focus,
    equipmentVal,
    earthquakeChange,
    focusSelect,
    markShow,
    location,
    time,
    depth,
    magnitude,
    offsetXPoint,
    offsetYPoint,
    changeTime,
  };
};
