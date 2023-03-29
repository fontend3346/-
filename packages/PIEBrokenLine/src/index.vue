
<template>
  <!-- 图表 -->
  <div class="echart-box">
    <div class="echart-title">{{ echartTitle }}</div>
    <div class="my-chart" ref="myChart"></div>
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
    // className: string;
    echartTitle: string;
  }>(),
  {
    options: [],
    // className: "",
    echartTitle: "",
  }
);
// console.log(props.echartTitle);
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
  background: transparent;
  background-image: radial-gradient(#061735ef, #123a56a1);
  border: 1px solid rgba(93, 228, 248, 0.6);
  border-radius: 10px;
  /* color: #e01212; */
  // margin: 15px 15px 2px 15px;
  color: white;
  //border: 0.5px solid rgb(138, 209, 247,0.9);
  .echart-title {
    color: #fff;
    // font-size: 20px;
    padding-left: 15px;
    padding-top: 15px;
  }
  .my-chart {
    // display: inline;
    width: 100%;
    height: 200px; //必须设置高度
    margin: 2px 6px 6px 1px;
  }
}
</style>

