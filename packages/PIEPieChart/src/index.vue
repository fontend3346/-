<template>
  <!-- 图表 -->
  <div class="echart-pie">
    <div class="echart-title">{{ echartTitle }}</div>
    <div class="my-chart" ref="myCharts"></div>
    <div class="total-num">
      <span class="total-box"></span>总台数：{{ totalNum }}
    </div>
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
    echartTitle: string;
    totalNum: any;
  }>(),
  {
    options: [],
    className: "",
    echartTitle: "",
    totalNum: null,
  }
);
// const props = defineProps({q'AAAA
//   options: {
//     type: Object,
//   }
// })
const { state, onClick, myCharts } = useHandler(props, emit);
</script>
