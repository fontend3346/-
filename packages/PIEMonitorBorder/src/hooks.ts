import { Emits, Props } from "./interfaces";
import { reactive, onMounted, watch, ref, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  // 点击事件
  const onClick = (e: MouseEvent) => {
    emit("click", e);
  };

  const state = reactive({
    option: {},
  });
  onMounted(() => {
  });
  return { onClick, state  };
};
