import { Props, Emits } from "./interfaces";
import { reactive, onMounted, watch, ref } from "vue";
import * as echarts from "echarts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const state = reactive({
    optionThr: {},
    optionFive: {},
  });
  let mainThr = ref();
  let mainFive = ref();
  watch(
    () => props,
    (newValue, oldValue) => {
      initEchartThr();
      initEchartFive();
    },
    {
      deep: true,
    }
  );
  const clickTotal = (index) => {
    emit("clickTotal", index);
  };

  // 平均CPU
  const initEchartThr = () => {
    let chartDom = mainThr.value;
    let myChartThr = echarts.init(chartDom);
    myChartThr.setOption(props.optionThr);
  };
  //
  const initEchartFive = () => {
    let chartDom = mainFive.value;
    let myChartFive = echarts.init(chartDom);
    myChartFive.setOption(props.optionFive);
  };

  onMounted(() => {
    initEchartThr();
    initEchartFive();
  });
  return {
    state,
    mainThr,
    mainFive,
    initEchartThr,
    initEchartFive,
    clickTotal,
  };
};
