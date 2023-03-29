import {
  onMounted,
  ref,
  reactive,
  getCurrentInstance,
  onBeforeMount,
  watch,
  nextTick
} from "vue";
import { Emits, Props } from "./interfaces";
import { applyFilter } from "@turf/turf";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  const state = reactive({});

  onMounted(() => { });
  const closeInfo = () => {
    emit('update:visible', false)
  }
  const clickSubjectbox = (item: any) => {
    emit('clickSubjectbox', item)
  }

  // onBeforeMount(() => {
  //     isTime();
  //   });

  return {
    state,
    closeInfo,
    clickSubjectbox
  };
};
