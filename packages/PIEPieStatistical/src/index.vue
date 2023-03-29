<template>
  <div class="pie-box1">
    <div class="pie-left1">
      <!-- 图标 -->
      <div class="pie-left-title1">{{ pieTitle }}</div>
      <!-- <PIEBrokenLine :options="options" :echartTitle="pieTitle"></PIEBrokenLine> -->
      <!-- <PIEBarChart :options="options" class="echart-box"></PIEBarChart> -->
      <div class="my-chart" ref="myChart"></div>
      <div class="pie-num1">
        <div class="left">
          总容量
          <span>5880</span>
        </div>
        <div class="right">
          总容量
          <span>5880</span>
        </div>
      </div>
      <div class="use-box">使用率： 21.1%</div>
    </div>
    <div class="pie-center">
      <!-- 图例 -->
      <!-- <PIEMapLegendZheng
        legendTitle="图例"
        :legendList="legendList"
        class="legend-box"
      ></PIEMapLegendZheng> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "selectActive", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    legendList: any;
    pieTitle: string;
    columns: any;
    tableHeight: any;
    options: any;
  }>(),
  {
    legendList: {},
    labelList: [],
    pieTitle: "",
    iconName: "",
    tableHeight: "",
    options: {},
  }
);

const { activeIndex, selectActive, time1, myChart } = useHandler(props, emit);
</script>
