import { onMounted, ref } from "vue";
import { Emits, Props } from "./interfaces";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  let activeIndex = ref(0);
  const rowClick = (row: any, index: any) => {
    activeIndex.value = index;
    console.log(row, "组件");
    emit("rowClick", row);
  };

  onMounted(() => {});

  return { activeIndex, rowClick };
};
