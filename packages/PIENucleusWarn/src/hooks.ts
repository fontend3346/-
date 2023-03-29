import { Props } from './interfaces'
import { reactive, onMounted, watch, ref } from 'vue'
// 操作
export const useHandler = (props: Props) => {

  const state = reactive({
   timeData:"",
   heightData:"",
   duDataOne:"",
   duDataTwo:"",
   weightData:"",
  })
  
  onMounted(() => {
   
  })
  return { state}
}
