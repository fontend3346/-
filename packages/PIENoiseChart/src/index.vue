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
    options: {
      B1l: [
        {
          className: "00:00:00",
          count: 5,
        },
        {
          className: "00:01:00",
          count: 8,
        },
      ],
      EL: [
        {
          className: "00:04:00",
          count: 7,
        },
        {
          className: "00:06:00",
          count: 23,
        },
      ],
    },
  }
);

const { initEchart, myChart, state, cancel } = useHandler(props, emit);
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
