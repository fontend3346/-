<template>
  <div class="dataRecive-boxs">
    <!-- 头部 -->
    <div class="title-top">
      <div class="title">{{ title }}</div>
    </div>
    <div class="center-content">
      <!-- 实时图 -->
      <div class="content-flex">
        <div class="pit-style1" ref="mainThr"></div>
      </div>
      <!--  故障警告-->
      <div class="content-flex">
        <div class="content-flex-back">收发故障警告</div>
        <PIETable
          class="pie-table"
          :data="tableData"
          :columns="fields"
          :isAction="false"
          :max-height="155"
          :header-cell-style="{
            background: '#053276',
            fontSize: '16px',
            height: '40px',
            fontWeight: '200',
            letterSpacing: '3px',
          }"
          :cell-style="{
            background: 'transparent',
            fontSize: '15px',
            height: '40px',
            fontWeight: '200',
            color: '#D7D7D9',
            letterSpacing: '2px',
          }"
          :row-style="{
            borderBottom: '1px solid #13598C',
            background: 'transparent',
          }"
        >
        </PIETable>
      </div>
      <!--  数据统计-->
      <div class="content-flex">
        <div class="content-flex-back">数据统计</div>
        <div class="pit-style" ref="mainFive"></div>
        <!-- 右下角按钮 -->
        <div class="time-total">
          <div
            class="total-item"
            :class="[totalActive[index] == index ? 'tota-active' : '']"
            @click="clickTotal(index)"
            v-for="(item, index) in timeTotal"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
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
    optionThr: any;
    optionFive: any;
    tableData: any;
    fields: any;
    totalActive: any;
    timeTotal: any;
    title: string;
  }>(),
  {
    optionThr: {},
    optionFive: {},
    tableData: [],
    fields: [],
    totalActive: "",
    timeTotal: "",
    title: "",
  }
);
const { state, mainThr, mainFive, initEchartThr, initEchartFive, clickTotal } =
  useHandler(props, emit);
</script>
