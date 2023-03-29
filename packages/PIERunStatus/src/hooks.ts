import { Emits, Props } from './interfaces'
import { reactive, onMounted} from 'vue'

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  // 点击事件
  const onClick = (e: MouseEvent) => {
    emit('click', e)
  }
  const state = reactive({
  })


  onMounted(() => {
  })
  return { onClick, state}
}
