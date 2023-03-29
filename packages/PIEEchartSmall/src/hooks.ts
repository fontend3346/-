import { Emits, Props } from './interfaces'
import { reactive, onMounted, watch, ref, onBeforeUnmount } from 'vue'
import * as echarts from "echarts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  // 点击事件
  const onClick = (e: MouseEvent) => {
    emit('click', e)
  }
  let echartsKeyId: any = ref();

  const state = reactive({
    option: {}
  })

  const initEchart = () => {
    //debugger
    state.option = props.options;
    //state.option.series = props.options;
    let myEcharts = echarts.init(echartsKeyId.value);
    myEcharts.setOption(state.option)
  }

  onMounted(() => {
    initEchart();
  })
  return { onClick, state, echartsKeyId }
}
