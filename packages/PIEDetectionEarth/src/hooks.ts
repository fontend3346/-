import { onMounted, reactive } from "vue";
import { Emits, Props } from "./interfaces";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const state = reactive({
    value1: "", //时间
    earthMagnitudeStart: "", //震级
    earthMagnitudeEnd: "", //震级
    location: "", //地点
    provinceValue: "", //省
    provinceList: [], // 省数据
    cityValue: "", //市
    cityList: [], // 市数据
    countyValue: "", //县
    countyList: [], // 县数据
    leftBotLon: "", // 左下角经度
    leftBotLat: "", // 左下角纬度
    rightBotLon: "", // 右上角经度
    rightBotLat: "", //右上角纬度
    searchWay: "1", // 查询方式
    showRputers: true, //地点显示
    showearch: true,
  });
  // 搜搜
  const search = () => {
    emit("search", state);
  };
  const change = (index: any) => {
    state.searchWay = index;
    reset();
    emit("searchTypeChange", index);
  };
  // 绘制事件
  const drawEvent = (type: string) => {
    emit("drawEvent", type);
  };
  // 重置
  const reset = () => {
    // state.searchWay = "1";
    state.provinceValue = "";
    state.cityValue = "";
    state.countyValue = "";
    state.leftBotLon = "";
    state.leftBotLat = "";
    state.rightBotLon = "";
    state.rightBotLat = "";
    state.value1 = "";
    state.earthMagnitudeStart = ""; //震级
    state.earthMagnitudeEnd = ""; //震级
    state.location = "";
    emit("reset");
  };

  return {
    search,
    state,
    change,
    drawEvent,
    reset,
  };
};
