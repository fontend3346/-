import { Emits, Props } from "./interfaces";
import { reactive, onMounted, watch, ref } from "vue";
import * as echarts from "echarts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  // 点击事件
  const handleChange = (val) => {
    console.log(val, "val");

    emit("handleChange", val);
  };
  watch(
    () => props,
    (newValue, oldValue) => {
      initEchart();
    },
    {
      deep: true,
    }
  );
  const state = reactive({
    activeName: ref(["1"]),
  });
  const initEchart = () => {
    let option = props.options;
    let myChartDom = document.getElementsByClassName("myChart");
    for (let i = 0; i < myChartDom.length; i++) {
      let myEcharts = echarts.init(myChartDom[i]);
      myEcharts.setOption(option[i]); //可以用option[i]表示各个表的数据
    }
  };

  onMounted(() => {
    initEchart();
  });
  return { handleChange, state };
};
