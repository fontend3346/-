import { onMounted, ref } from "vue";
import { Emits, Props } from "./interfaces";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  let activeIndex = ref(0);
  const selectActive = (item, index) => {
    activeIndex.value = index;
    emit("selectActive", item);
  }

  onMounted(() => {
  });

  return { selectActive, activeIndex };
};
