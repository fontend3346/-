<template>
  <div class="monitor-wrap">
    <div class="monitor-top">
      <div class="monitor-echarts">
        <!-- 平均CPU -->
        <div class="content-flex">
          <div class="content-flex-back">平均CPU</div>
          <div class="pit-style" ref="mainOne"></div>
        </div>
        <!--  平均内存-->
        <div class="content-flex">
          <div class="content-flex-back">平均内存</div>
          <div class="pit-style" ref="mainTwo"></div>
        </div>
        <!-- 硬盘使用率 -->
        <div class="content-flexs">
          <div class="content-flex-back">硬盘使用率</div>
          <div class="pit-style" ref="mainThr"></div>
          <div class="pie-total">
            <span>总空间:</span>
            <span>{{ totalData }}TB</span>
          </div>
        </div>
        <!--  流量-->
        <div class="content-flex">
          <div class="content-flex-back">流量</div>
          <div class="pit-style" ref="mainFour"></div>
        </div>
      </div>
    </div>
    <div class="monitor-bottom">
      <div class="table-title">系统故障及告警</div>
      <PIETable
        class="pie-table"
        :data="tableData2"
        :columns="fields2"
        :isAction="false"
        :max-height="170"
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
  </div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";

const props = withDefaults(
  defineProps<{
    optionOne: any;
    optionTwo: any;
    optionThr: any;
    optionFour: any;
    totalData: any;
    tableData2: any;
    fields2: any;
  }>(),
  {
    optionOne: {},
    optionTwo: {},
    optionThr: {},
    optionFour: {},
    totalData: "",
    tableData2: [],
    fields2: [],
  }
);
const {
  state,
  mainOne,
  mainTwo,
  mainThr,
  mainFour,
  initEchartOne,
  initEchartTwo,
  initEchartThr,
  initEchartFour,
} = useHandler(props);
</script>
