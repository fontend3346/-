import { Emits, Props } from './interfaces'
import { reactive, onMounted, watch, ref } from 'vue'
import baseCharts from "@/plugins/lib/baseCharts";
import * as echarts from "echarts";

// 操作
export const useHandler = (props: Props) => {
  const state = reactive({
    optionOne: {
    },
  });
  let mainOne = ref();
  watch(
    () => props,
    (newValue, oldValue) => {
      initEchartOne();
    },
    {
      deep: true,
    }
  );
  // 数据统计
  const initEchartOne = () => {
    let chartDom = mainOne.value;
    let myChartOne = echarts.init(chartDom);
    myChartOne.setOption(props.optionOne);
  };
  onMounted(() => {
    initEchartOne();
  });
  return {
    state,
    mainOne,
    initEchartOne,
  };
}
