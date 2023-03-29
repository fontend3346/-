<template>
  <div class="data-monitor">
    <!-- 实时非实时 -->
    <div class="pit-style" ref="dataType"></div>
    <!-- 进度条 -->
    <div class="title-info">
      <div class="item-title">
        <div class="title">{{ title1 }}</div>
        <el-progress
          :stroke-width="15"
          :percentage="percentage1"
          class="progress"
        />
      </div>
      <div class="item-title">
        <div class="title">{{ title2 }}</div>
        <el-progress
          :stroke-width="15"
          :percentage="percentage2"
          class="progress"
        />
      </div>
      <div class="item-title">
        <div class="title">{{ title3 }}</div>
        <el-progress
          :stroke-width="15"
          :percentage="percentage3"
          class="progress"
        />
      </div>
      <div class="item-title">
        <div class="title">{{ title4 }}</div>
        <el-progress
          :stroke-width="15"
          :percentage="percentage4"
          class="progress"
        />
      </div>
    </div>
    <!-- 数据类型结构分布 -->
    <div class="top-echarts" ref="transmitStatus"></div>
    <!-- 右下角按钮 -->
    <div class="time-total">
      <div
        class="total-item"
        :class="[totalActive2[index] == index ? 'tota-active' : '']"
        @click="clickTotal(item, index)"
        v-for="(item, index) in timeTotal2"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./hooks";
const emit = defineEmits<{
  (event: "clickTotal", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    //数据类型结构分布
    optionOne: any;
    //数据转发状态
    optionTwo: any;
    title1: string;
    title2: string;
    title3: string;
    title4: string;
    percentage1: number;
    percentage2: number;
    percentage3: number;
    percentage4: number;
    timeTotal2: any;
    totalActive2: any;
  }>(),
  {
    optionOne: {},
    optionTwo: {},
    title1: "",
    title2: "",
    title3: "",
    title4: "",
    percentage1: 10,
    percentage2: 10,
    percentage3: 10,
    percentage4: 10,
    timeTotal2: [],
    totalActive2: [],
  }
);
const { state, dataType, initEchartOne, clickTotal, transmitStatus } =
  useHandler(props, emit);
</script>
