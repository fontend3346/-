<template>
  <div class="charts" ref="chart"></div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useHandler } from "./hooks";

let chart = ref(null)
const props = withDefaults(
  defineProps<{
    xAxisData: any;
    yAxisData: any;
    xAxisColor: string;
    yAxisColor: string;
    xAxisMax: number;
    yAxisMin: number;
    color: any;
    xInterval: number;
    rotate: number;
    gridColor: any;
    option: any
  }>(),
  {
    xAxisData: ['北京局','上海局','重庆局','河北局','青海局','山西局','内蒙局','四川局','贵州局','云南局'],
    yAxisData: [91, 90, 85, 81, 70, 66, 62, 50, 48, 40],
    xAxisColor: '#fff',
    yAxisColor: '#fff',
    xAxisMax: 100,
    xAxisMin: 0,
    color: ['#5470C6'],
    xInterval: 0,
    rotate: 25,
    gridColor: ['#fff'],
    option:null
  }
);
const {  } = useHandler(props, chart);
</script>
<style lang="less" scoped>
</style>
