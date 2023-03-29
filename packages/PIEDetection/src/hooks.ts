import { onMounted, reactive } from "vue";
import { Emits, Props } from "./interfaces";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const state = reactive({
    assessWayList: [
      {
        label: "台网",
        value: "NETWORK",
      },
      {
        label: "台站",
        value: "STATION",
      },
    ], // 查询方式数据
    assessWay: "", //评估方式
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
    disciplineType: "", //学科类型
    stationType: "", //台站类型
  });
  //台网-台站改变事件
  const netWorkStation = (val: any) => {
    state.stationType = "";
    state.disciplineType = "";
    emit("netWorkStation", val);
  };
  // 搜搜
  const search = () => {
    emit("search", state);
  };
  const change = (index: any) => {
    state.searchWay = index;
    state.assessWay = "";
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
    state.assessWay = "";
    state.disciplineType = "";
    state.stationType = "";
    emit("reset");
  };

  return {
    search,
    state,
    change,
    drawEvent,
    reset,
    netWorkStation,
  };
};
