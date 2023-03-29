<template>
  <!-- 波形展示 -->
  <PIEPanel
    class="maveForm-wrap"
    v-model:visible="state.lookEcharts"
    :title="props.echartTtitle"
    :width="props.boxingvw"
    height="92"
    zIndex="11"
    :cancelBtn="false"
    :confirmBtn="false"
    @cancel="cancel"
    :moveLeft="props.boxingleft"
    :moveTop="props.boxingtop"
  >
    <template #operateItem>
      <div class="search-wrap">
        <div class="header-left-content">
          <span class="title">时间</span>
          <el-select
            class="modal-select"
            clearable
            v-model="state.timeVal"
            placeholder="请选择时间"
            @change="timeValChange"
            filterable
          >
            <el-option
              v-for="item in props.timeValArry"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="header-left-content">
          <span class="title">通道</span>
          <!-- <el-select
            class="modal-select-aisle"
            v-model="state.aisle"
            @change="aisleChange"
          >
            <el-option
              v-for="item in props.aisleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select> -->
        </div>
        <!-- 方向 -->
        <div class="direction-style">
          <el-checkbox-group
            v-model="props.directionValue"
            @change="directionChange"
          >
            <el-checkbox
              v-for="item in props.directionList"
              :key="item"
              :label="item"
              >{{ item }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
        <!-- 事件号 -->
        <span class="event-num">{{ props.eventNum }}</span>
        <!-- 箭头 -->
        <div>
          <div class="echarts-setItem">
            <div class="echarts-btn">
              <span
                class="iconfont icon-shangjiantou arrows"
                @click="arrowEvent('+')"
              ></span>
            </div>
            <div class="echarts-btn">
              <span class="amplitude" @click="amplitude">o</span>
            </div>
            <div class="echarts-btn">
              <span
                class="iconfont icon-xiajiantou arrows"
                @click="arrowEvent('-')"
              ></span>
            </div>
          </div>
        </div>
      </div>
      <!-- 波形 -->
      <div class="modal-wrapper">
        <div class="warn-grade" ref="warnGrade" id="wrap"></div>
      </div>
    </template>
  </PIEPanel>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "timeValChange", e: MouseEvent): void;
  (event: "aisleChange", e: MouseEvent): void;
  (event: "amplitude", e: MouseEvent): void;
  (event: "arrowEvent", e: MouseEvent): void;
  (event: "directionChange", e: MouseEvent): void;
  (event: "cancel", e: MouseEvent): void;
}>();

interface Props {
  echartsData: any; //echarts数据
  echartTtitle: any; //echart标题
  timeValArry: any; //时间时间
  aisleList: any; //通道
  eventNum: any; //事件号
  boxingvw: any; //波形宽度
}
const props = withDefaults(
  defineProps<{
    echartsData?: any;
    echartTtitle?: any;
    timeValArry?: any;
    aisleList?: any;
    eventNum?: any;
    directionList?: any;
    directionValue?: any;
    boxingvw?: any;
    boxingleft?: any;
    boxingtop?: any;
  }>(),
  {
    echartsData: [],
    echartTtitle: "",
    eventNum: "",
    timeValArry: [],
    aisleList: [],
    directionList: [],
    directionValue: [],
    boxingvw: 98,
    boxingleft: "1%",
    boxingtop: "7.5%",
  }
);
const {
  state,
  warnGrade,
  timeValChange,
  aisleChange,
  arrowEvent,
  directionChange,
  amplitude,
  cancel,
} = useHandler(props, emit);
</script>

<style scoped lang="less"></style>
