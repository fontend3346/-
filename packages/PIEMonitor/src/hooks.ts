import { Props } from "./interfaces";
import { reactive, onMounted, watch, ref } from "vue";
import baseCharts from "@/plugins/lib/baseCharts";
import * as echarts from "echarts";
// 操作
export const useHandler = (props: Props) => {
  const state = reactive({
    optionOne: {},
    optionTwo: {},
    optionThr: {},
    optionFour: {},
    totalData: "",
  });
  let mainOne = ref();
  let mainTwo = ref();
  let mainThr = ref();
  let mainFour = ref();
  watch(
    () => props,
    (newValue, oldValue) => {
      initEchartOne();
      initEchartTwo();
      initEchartThr();
      initEchartFour();
    },
    {
      deep: true,
    }
  );
  // 平均CPU
  const initEchartOne = () => {
    let chartDom = mainOne.value;
    let myChartOne = echarts.init(chartDom);
    myChartOne.setOption(props.optionOne);
  };
  // 平均内存
  const initEchartTwo = () => {
    let chartDom = mainTwo.value;
    let myChartTwo = echarts.init(chartDom);
    myChartTwo.setOption(props.optionTwo);
  };
  // 硬盘
  const initEchartThr = () => {
    let chartDom = mainThr.value;
    let myChartThr = echarts.init(chartDom);
    myChartThr.setOption(props.optionThr);
  };
  // 流量
  const initEchartFour = () => {
    let chartDom = mainFour.value;
    let myChartFour = echarts.init(chartDom);
    myChartFour.setOption(props.optionFour);
  };

  onMounted(() => {
    initEchartOne();
    initEchartTwo();
    initEchartThr();
    initEchartFour();
  });
  return {
    state,
    mainOne,
    mainTwo,
    mainThr,
    mainFour,
    initEchartOne,
    initEchartTwo,
    initEchartThr,
    initEchartFour,
  };
};
