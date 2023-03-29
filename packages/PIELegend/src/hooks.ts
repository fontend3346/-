import { Emits, Props } from "./interfaces";
import { reactive, onMounted, ref } from "vue";
import baseCharts from "@/plugins/lib/baseCharts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  // 点击事件
  const onClick = (e: MouseEvent) => {
    emit("click", e);
  };
  let myCharts: any = ref();
  const state = reactive({
    option: {},
  });
  const initEchart = () => {
    // state.option = props.options;
    // let myChartDom = myCharts.value;
    // let myEchart = new baseCharts(myChartDom);
    // myEchart.setOption(state.option)
  };
  const getAssetsImage = (name: string) => {
    // return new URL(`${name}`, import.meta.url).href;
  };
  onMounted(() => {
    initEchart();
  });
  const close = (e: any) => {
    emit("close", e)
  }
  return { onClick, state, getAssetsImage, close };
};
