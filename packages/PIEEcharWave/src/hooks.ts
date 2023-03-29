import { Emits, Props } from './interfaces'
import { reactive, onMounted, ref } from 'vue'
import baseCharts from "@/plugins/lib/baseCharts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  // 点击事件
  const onClick = (e: MouseEvent) => {
    emit('click', e)
  }
  let myCharts: any = ref()
  const state = reactive({
    option: {} 
    // option :{
    //   xAxis: {
    //     type: 'category',
    //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       data: [820, 932, 901, 934, 1290, 1330, 1320],
    //       type: 'line',
    //       smooth: true
    //     }
    //   ]
    // }
  })
  // watch(props.options, (newVal) => {
  //   console.log(newVal)
  //   console.log(3333)
  // })

  const initEchart = () => {

    state.option = props.options;
    let myChartDom = myCharts.value;

    let myEchart = new baseCharts(myChartDom);
    myEchart.setOption(state.option)
  }

  onMounted(() => {
    initEchart();
  })
  return { onClick, state, myCharts }
}
