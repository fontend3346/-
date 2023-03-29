import { onMounted, reactive, watch } from 'vue'
import { Emits, Props } from './interfaces'
import { ref } from "vue";

// 操作
export const useHandler = (props: Props, emit: Emits) => {

  const state: any = reactive({
    childrenShow: false,
    activeIndex: null,
    childLeft: 140,
    childTop: 0
  });
  let rightMenu: any = ref(null); // 右击菜单dom
  let menuChild: any = ref(null); // 邮寄菜单child的dom
  const menuClick = (item: any) => {
    emit('menuClick', item);
  };

  const menuChildrenClick = (item: any, data) => {
    emit('menuChildrenClick', item, data);
  }
  // 鼠标移入事件
  const moveClick = (item: any, index: number, e) => {
    state.activeIndex = index;
  }

  // 鼠标移出事件
  const overClick = (item: any, index: number) => {

  }

  watch(() => props.isFlag, (newVal) => {
    // debugger
    if (props.isFlag) {
      state.childLeft = -150;
      state.childTop = -90;
    } else {
      state.childLeft = 140;
      state.childTop = 0;
    }
  }, {
    deep: true
  })
  return {
    state,
    menuClick,
    moveClick,
    overClick,
    menuChildrenClick,
    rightMenu,
    menuChild
  };
}
