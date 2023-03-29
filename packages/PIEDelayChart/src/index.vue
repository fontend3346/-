<template>
  <div
    class="my-chart"
    :class="[className ? className : 'myChart']"
    ref="myChart"
  ></div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";
const emit = defineEmits<{
  (event: "handleSizeChange", e: MouseEvent): void;
  (event: "cancel"): void;
}>();
const props = withDefaults(
  defineProps<{
    title: any;
    options: any;
  }>(),
  {
    title: "变化信息统计",
    options: {},
  }
);

const { initEchart, myChart, state } = useHandler(props, emit);
</script>
<style scoped lang="less">
.my-chart {
  // display: inline;
  width: 1500px;
  height: 100%;
  min-height: 260px; //必须设置高度,这是实际echart图表的高度
  margin: -30px 1px 15px 10px;
}
</style>
