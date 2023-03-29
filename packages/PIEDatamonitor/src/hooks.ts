import { Emits, Props } from './interfaces'
import { reactive, onMounted, watch, ref } from 'vue'
import baseCharts from "@/plugins/lib/baseCharts";
import * as echarts from "echarts";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const clickTotal = (item:any,index:any) => {
    emit("clickTotal", item,index);
  }

  const state = reactive({
    optionOne: {
    },
    optionTwo: {
    },
  });
  let dataType = ref();
  let transmitStatus = ref();
  watch(
    () => props,
    (newValue, oldValue) => {
      initEchartOne();
      initEchartTwo();
    },
    {
      deep: true,
    }
  );
  // 数据类型结构分布
  const initEchartOne = () => {
    let chartDom = dataType.value;
    let myChartOne = echarts.init(chartDom);
    myChartOne.setOption(props.optionOne);
  };
  // 数据类型结构分布
  const initEchartTwo = () => {
    let domTwo = transmitStatus.value;
    let myChartTwo = echarts.init(domTwo);
    myChartTwo.setOption(props.optionTwo);
  };
  onMounted(() => {
    initEchartOne();
    initEchartTwo();
  });
  return {
    state,
    transmitStatus,
    initEchartOne,
    initEchartTwo,
    clickTotal,
    dataType,
  };
}
