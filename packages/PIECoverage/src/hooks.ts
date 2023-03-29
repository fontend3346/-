import { Emits, Props } from "./interfaces";
import { reactive, onMounted, ref } from "vue";
import baseCharts from "@/plugins/lib/baseCharts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  // 点击事件
  const selectChange = (v,$event) => {
    // v.value = !v.value;
    emit("selectChange", v, $event);
  };
  let myCharts: any = ref();
  const state = reactive({
    coverageList: [
      {
        label: "台网",
        value: true,
      },
      {
        label: "台站",
        value: true,
      },
      {
        label: "测点",
        value: false,
      },
      {
        label: "设备",
        value: false,
      },
      {
        label: "等值线",
        value: false,
      },
    ],
  });
  const initEchart = () => {};

  onMounted(() => {
    initEchart();
  });
  return { selectChange, state };
};
