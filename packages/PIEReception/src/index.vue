<template>
  <div class="system-box">
    <!-- 头部 -->
    <div class="title-top">
      <div class="title-trape"></div>
      <span class="title-text">系统平台资源监控监视</span>
    </div>
    <!-- echats图 -->
    <div class="center-content">
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
    </div>
    <!-- 饼图 -->
    <div class="center-content specil-style">
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
  }>(),
  {
    optionOne: {},
    optionTwo: {},
    optionThr: {},
    optionFour: {},
    totalData: "",
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
