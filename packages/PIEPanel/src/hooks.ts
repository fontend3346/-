import { Emits, Props } from "./interfaces";
import { ref, onMounted, computed, watch } from "vue";

// 操作
export const useHandler = (props: Props, emit: Emits, dataRef: any) => {
  let isShowMask = ref(false); // 是否显示模态框
  let selectedValue = ref(0);
  // 显示模态框
  const showMask = () => {
    isShowMask.value = true;
  };
  // 隐藏模态框
  const hideMask = () => {
    setTimeout(() => {
      isShowMask.value = false;
      // emit('update:visible', false)
    }, 0);
  };
  watch(
    () => props.visible,
    (value) => {
      value ? showMask() : hideMask();
    },
    {
      immediate: true,
    }
  );
  watch(
    () => props.moveLeft,
    (value) => {
      moveLeft.value = value;
    },
    {
      deep: true,
    }
  );
  watch(
    () => props.moveTop,
    (value) => {
      moveTop.value = value;
    },
    {
      deep: true,
    }
  );
  let dialogIsDown = ref(false); // 是否按下弹出框头部
  let moveLeft = ref(props.moveLeft); //传入向右移的值
  let moveTop = ref(props.moveTop); //传入向下移动的值
  onMounted(() => {});
  const reset = (e: MouseEvent) => {
    emit("reset", e);
  };
  const confirm = (e: MouseEvent) => {
    // isShowMask.value = false;
    emit("confirm", e);
  };
  const cancel = (e: MouseEvent) => {
    emit("cancel", e);
    emit("update:visible", false);
  };
  const selectedClick = (e: MouseEvent) => {
    // debugger;
    console.log(selectedValue.value, "657890-");
    emit("selectedClick", e);
  };
  const mouseModalDown = (e: MouseEvent) => {
    if (!props.isDrage) {
      return;
    }
    const dialogRef = dataRef.dialogRef.value;
    let windowH = window.innerHeight; //获取浏览器的可用高度
    let el = dialogRef; //获取需要拖拽移动的容器
    let disX = e.clientX - el.offsetLeft;
    let disY = e.clientY - el.offsetTop;
    dialogIsDown.value = true;
    document.onselectstart = function () {
      return false;
    };
    document.onmousemove = (event) => {
      if (!dialogIsDown.value) {
        return false;
      }
      let left = event.clientX - disX;
      let top = event.clientY - disY;
      if (top < 0 || top > windowH - 40) {
        return false;
      } //当到达顶部或者底部时就不让继续拖动了
      moveLeft.value = left + "px";
      moveTop.value = top + "px";
    };
    document.onmouseup = () => {
      if (!dialogIsDown.value) {
        return false;
      }
      dialogIsDown.value = false;
    };
    emit("mouseModalDown", e);
  };
  return {
    confirm,
    cancel,
    selectedClick,
    isShowMask,
    mouseModalDown,
    dialogIsDown,
    moveLeft,
    moveTop,
    reset,
  };
};
