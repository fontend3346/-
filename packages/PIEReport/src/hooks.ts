import { onMounted, ref } from "vue";
import { Emits, Props } from "./interfaces";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  let activeValue = ref(0);
  const activeSelect = (index, item) => {
    activeValue.value = index;
    emit('activeSelect', item);
  }
  onMounted(() => {
  });

  return { activeSelect, activeValue };
};
