
<template>
  <!-- BarEchart图表组件 -->
  <div class="echart-box">
    <div
      class="my-chart"
      :class="[className ? className : 'myChart']"
      ref="myChart"
    ></div>
    <!-- 如果不想和坐标轴样式合并，传入非空chartType值 -->
  </div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    options: any;
    className: string;
    chartType: string;
  }>(),
  {
    options: [],
    className: "",
    chartType: "",
  }
);
// const props = defineProps({q'AAAA
//   options: {
//     type: Object,
//   }
// })
const { state, onClick, myChart } = useHandler(props, emit);
</script>

<style scoped lang="less">
.echart-box {
  // margin-top: 40px;
  width: 100%;
  height: 100%;
  background: transparent;
  // background-image: radial-gradient(#061735ef, #123a56a1);
  /* border: 2px solid #b82121db; */
  border-radius: 10px;
  /* color: #e01212; */
  // margin: 15px 15px 2px 15px;
  color: white;
  //border: 0.5px solid rgb(138, 209, 247,0.9);

  .my-chart {
    // display: inline;
    width: 100%;
    height: 100%;
    min-height: 260px; //必须设置高度,这是实际echart图表的高度
    margin: 2px 6px 6px 1px;
  }
}
</style>

