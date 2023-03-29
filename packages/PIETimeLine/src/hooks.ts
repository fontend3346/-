
import {
  onBeforeUnmount,
  ref,
  reactive,
  watch
} from 'vue'
import { Emits, Props } from './interfaces'
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const loadImageMap = (index:any) => {
    emit("loadImageMap",index)
  }

  const state = reactive({
    isPlay: false,
    selectIndex: 0
  });
  let timer = ref(null);
  // 播放或暂停
  const handlerClickPlay = () => {
    state.isPlay = !state.isPlay
    if (state.isPlay) {
      startTimeEvent()
    } else {
      endTimeEvent()
    }
  }
  const startTimeEvent = () => { 
    if (state.isPlay) {
      timer = setTimeout(() => {
        if (state.selectIndex >= props.timeList.length - 1) {
          state.selectIndex = 0
          loadImageMap(0)
          return
        }
        state.selectIndex += 1
        // 下面可以添加触发的事件
        loadImageMap(state.selectIndex)
      }, 1000)
    }
  }
  const endTimeEvent = () => { 
    if (state.isPlay) {
      clearTimeout(timer)
      timer = null
    }
  }
  // 点击影像点
  const onChoose = (index: number) => {
    timer && clearInterval(timer)
    state.isPlay = false
    if (state.selectIndex != index) {
      state.selectIndex = index
      loadImageMap(state.selectIndex)
    } else {
      state.selectIndex = 0
    }
  }
  const getWidth = () => {
    if (state.selectIndex < props.timeList.length) {
      return (
      'calc(' +(94 / (props.timeList.length - 1)) * state.selectIndex + '% + 20px)'
      )
    }
    return '100%'
  }
  onBeforeUnmount(() => {
    // 清除定时器
    if (timer) {
      clearInterval(timer)
      state.isPlay = false
      timer = null
    }
  })
  watch(
    () => props.timeReady,
    value => {
      value ? startTimeEvent() : endTimeEvent()
    },
    {
      immediate: true
    }
  )
  return {
    state,
    handlerClickPlay,
    onChoose,
    getWidth
  };
}





