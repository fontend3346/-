import { Emits, Props } from './interfaces'
import { reactive, onMounted, ref } from 'vue'
import baseCharts from "@/plugins/lib/baseCharts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const clickFont = (item) => {
    emit('clickFont', item)
  }
  const state = reactive({
  })
  onMounted(() => {
  })
  return { state, clickFont }
}
