import { onMounted, ref } from "vue";
import { Emits, Props } from "./interfaces";

// 操作
export const useHandler = (props: Props, emit: Emits) => {

  const processClick = (item) => {
    emit('processClick', item);
  }
  onMounted(() => {
  });

  return { processClick };
};
