import { onMounted, watch, reactive, ref } from "vue";
import { Emits, Props } from "./interfaces";
import http from "../../../src/api/index";
import { ElMessage } from "element-plus";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const state = reactive({
    equipmentTypeLis: [],
    addStationList: [],
    isShowIndex: 1,
    timeVal: "",
    observationName: "", // 观测点名称
    observationNumber: "",//观测点编号
    selectNetwork: "",//省
    stationArray: "",//市
    stationChild: "",//县
    provinceList: [
      {
        label: "安徽",
        value: "1",
      },
      {
        label: "北京市",
        value: "3",
      },
    ], // 省数据
    cityList: [
      {
        label: "安庆市",
        value: "1",
      },
      {
        label: "毫州市",
        value: "2",
      },
    ], // 市数据
    countyList: [
      { label: "大观区", value: "1" },
      { label: "怀宁县", value: "2" },
    ], // 县数据
    rightBtm: "", // 右下角
    leftTop: "", // 坐上角
    rightTop: "", // 右上角
    rightTopL: "", //右上角纬度
    searchWayList: [
      {
        label: "行政区",
        value: "1",
      },
      {
        label: "矢量范围",
        value: "2",
      },
      {
        label: "经纬度范围",
        value: "3",
      },
    ], // 查询方式数据
    searchWay: "", // 查询方式
  });

  // 搜搜
  const search = () => {
    emit("search", state);
  };
  // 切换
  const checkFn = (index: any) => {
    console.log(index);
    state.isShowIndex = index;
  };
  const change = (index: any) => {
    state.searchWay = index;
    emit("searchTypeChange", index);
  };
  // 绘制事件
  const drawEvent = (type: string) => {
    emit("drawEvent", type);
  }
  // 重置
  const reset = () => {
    emit("reset");
  }
  watch(
    () => props,
    () => { },
    {
      deep: true,
    }
  );

  onMounted(() => { });
  return {
    search,
    state,
    checkFn,
    change,
    drawEvent,
    reset
  };
};
