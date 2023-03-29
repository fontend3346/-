import { onMounted, ref,reactive ,getCurrentInstance,onBeforeMount} from "vue";
import { Emits, Props } from "./interfaces";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const {
      appContext: {
        config: { globalProperties },
      },
    } = getCurrentInstance() as any;
  let activeIndex = ref(0);
  const selectActive = (item, index) => {
    activeIndex.value = index;
    emit("selectActive", item);
  }
  let time = ref(null)
  let date = ref(null)
  let time1 = ref(null)

  onMounted(() => {
  });

  return { selectActive, activeIndex,time1 };
};
