import { Emits, Props } from './interfaces'
import { reactive, onMounted, watch } from 'vue'
import * as echarts from "echarts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  // 点击事件
  const onClick = (e: MouseEvent) => {
    emit('click', e)
  }

  const state = reactive({
    option: {}
  })
  // watch(props.options, (newVal) => {
  //   console.log(newVal)
  //   console.log(3333)
  // })
  const initEchart = () => {

    state.option = props.options;
    let myChartDom = document.getElementsByClassName(props.className)
    // debugger
    for (let i = 0; i < myChartDom.length; i++) {
      let myEcharts = echarts.init(myChartDom[i]);
      myEcharts.setOption(state.option[i])//可以用option[i]表示各个表的数据
    }

    // let myEcharts1 = echarts.init(document.getElementById("myChart1"));
    // myEcharts1.setOption(state.option)
    // let myEcharts2 = echarts.init(document.getElementById("myChart2"));
    // myEcharts2.setOption(state.option)
    // let myEcharts3 = echarts.init(document.getElementById("myChart3"));
    // myEcharts3.setOption(state.option)
  }

  onMounted(() => {
    initEchart();
  })
  return { onClick, state }
}
