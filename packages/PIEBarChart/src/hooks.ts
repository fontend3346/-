import { Emits, Props } from './interfaces'
import { reactive, onMounted, ref, watch } from 'vue'
import baseCharts from "@/plugins/lib/baseCharts";
import * as echarts from "echarts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  // 点击事件
  const onClick = (e: MouseEvent) => {
    emit('click', e)
  }
  let myChart: any = ref()
  const state = reactive({
    option: {}
  })
  // watch(props.options, (newVal) => {
  //   console.log(newVal)
  //   console.log(3333)
  // })
  watch(
    () => props.options,
    (newValue, oldValue) => {
      initEchart();
    },
    {
      deep: true,
    }
  );
  const initEchart = () => {
    state.option = props.options;
    let myChartDom = myChart.value;
    if (props.chartType) {
      let myEchart = echarts.init(myChartDom);
      myEchart.setOption(state.option)
    } else {
      let myEchart = new baseCharts(myChartDom);
      // let myEchart = echarts.init(document.getElementsByClassName("my-chart"));
      myEchart.setOption(state.option)
    }

  }


  onMounted(() => {
    initEchart();
  })
  return { onClick, state, myChart }
}
