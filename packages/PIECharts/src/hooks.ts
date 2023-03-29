import { Emits, Props } from './interfaces'
import { reactive, onMounted, ref, watch, computed } from 'vue'
import baseCharts from "@/plugins/lib/baseCharts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const initEchart = () => {
    let dom = document.getElementById(props.id)
    let myEchart = new baseCharts(dom);
    myEchart.setOption(props.options)
  }
  onMounted(() => {
    initEchart();
  })
  watch(() => props.options, (newValue, oldValue) => {
    initEchart()
  }, {
    deep: true
  })
  return { initEchart }
}
