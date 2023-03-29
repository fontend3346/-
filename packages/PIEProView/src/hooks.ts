import { Emits, Props } from "./interfaces";
import { reactive, onMounted, watch, ref, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  // 点击事件
  const onClick = (e: MouseEvent) => {
    emit("click", e);
  };
  let echartsKeyId: any = ref();

  const state = reactive({
    option: {},
  });
  let myEcharts: any = null;
  watch(
    () => props.options,
    (newValue, oldValue) => {
      if (myEcharts) {
        myEcharts.setOption(state.option);
        myEcharts.resize();
      } else {
        initEchart();
      }
    },
    {
      deep: true,
    }
  );
  const initEchart = () => {
    state.option = props.options;
    myEcharts = echarts.init(echartsKeyId.value);
    myEcharts.resize();
    myEcharts.setOption(state.option);
  };

  onMounted(() => {
    initEchart();
  });
  return { onClick, state, echartsKeyId };
};
