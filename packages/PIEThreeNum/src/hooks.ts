import { Emits, Props } from './interfaces'
import { reactive, onMounted, ref, watch } from 'vue'

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  // 点击事件
  const onClick = (e: MouseEvent) => {
    emit('click', e)
  }
  const state = reactive({

  })

  // onMounted(() => {
  //   initEchart();
  // })
  return { onClick, state, }
}
