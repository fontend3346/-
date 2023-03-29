<template>
  <div class="real-box">
    <!-- 标题 -->
    <div class="real-title" v-show="showTitle">
      <span>一体化通用配置</span>
    </div>
    <!-- 顶部按钮 -->
    <div class="real-button" v-show="showBtn">
      <div
        class="is-real-data"
        @click="buttonClick(1)"
        :class="{ actived: selectButtonValue == 1 }"
      >
        近实时数据查询
      </div>
      <div
        class="is-real-data"
        @click="buttonClick(2)"
        :class="{ actived: selectButtonValue == 2 }"
      >
        非近实时数据查询
      </div>
    </div>
    <!-- 日期 -->
    <div class="real-date" v-show="showTime">
      <el-date-picker
        v-model="dateNow"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        @change="changeDate"
        format="YYYY-MM-DD hh:mm:ss"
      />
    </div>
    <!-- 内容 -->
    <div class="real-card pie-clear-scroll">
      <!-- icon组件 -->
      <template v-for="item in stationLists" :key="item">
        <PIEStation
          class="pie-station pie-station-first"
          :stationList="item.data"
          :titleName="item.title"
          :iconName="item.icon"
          @selectActive="selectActive"
          v-show="showStation"
        >
        </PIEStation>
      </template>
      <!-- 单项选择 -->
      <el-radio-group
        v-model="energyValue"
        class="group-box"
        @change="changeValueOne"
      >
        <div
          class="title-select"
          v-show="showSource"
          v-for="item in sourceList"
          :key="item"
        >
          <span class="title-texts">{{ item.title }}</span>
          <el-radio :label="item.id" size="small" class="title-texts-box"
            ><span style="color: white"></span
          ></el-radio></div
      ></el-radio-group>
      <!-- 单选组合 -->
      <template v-for="item in selectDataList" :key="item">
        <div class="select-box" v-show="showSelect">
          <div class="title-box">
            <div class="title-trape"></div>
            <span class="title-text">{{ item.title }}</span>
          </div>
          <div class="selected-box">
            <el-radio-group
              class="selected-inner"
              v-model="item.dataValue"
              @change="changeValue(item)"
            >
              <template v-for="initem in item.data" :key="initem">
                <div class="icon-box-response selected-inner">
                  <el-radio :label="initem.value" size="large">{{
                    initem.label
                  }}</el-radio>
                </div>
              </template>
            </el-radio-group>
          </div>
        </div>
      </template>
    </div>
    <!-- 底部查询按钮 -->
    <div class="real-bottom">
      <div class="real-search" @click="searchClick" v-show="showSearch">
        查询
      </div>
      <div
        class="real-search real-search-subscribe"
        @click="subscribeClick"
        v-show="showButton"
      >
        {{ textButton }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./hooks";
import { ref } from "vue";
const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "selectActive", e: MouseEvent): void;
  (event: "searchClick", e: MouseEvent): void;
  (event: "subscribeClick", e: MouseEvent): void;
  (event: "buttonClick", e: MouseEvent): void;
  (event: "changeDate", e: MouseEvent): void;
  (event: "changeRadiusValue", e: MouseEvent): void;
  (event: "changeValueOne", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    selectValue: any;
    titleName: string;
    selectDataList: any;
    stationLists: any;
    selectButtonValue: number;
    showBtn?: boolean; // 按钮是否显示
    showTitle?: boolean; // 标题显示
    showTime?: boolean; // 日期显示
    showSelect?: boolean; // 单选显示
    showStation?: boolean; // 台站显示
    showSource?: boolean; // 单选单个显示
    sourceList: any;
    showButton: boolean; // 底部自定义按钮
    showSearch: boolean; // 底部查询按钮
    textButton: string; // 自定义按钮文字
  }>(),
  {
    selectValue: 1,
    titleName: "",
    selectDataList: [],
    stationList: [],
    selectButtonValue: 1,
    showBtn: true,
    showTitle: false,
    showTime: true,
    showSelect: true,
    showStation: true,
    showSource: true,
    sourceList: [],
    showButton: true,
    showSearch: true,
    textButton: "订阅",
  }
);

const {
  selectActive,
  buttonClick,
  selectButtonValue,
  searchClick,
  subscribeClick,
  changeValue,
  dateNow,
  changeDate,
  selecValue,
  changeValueOne,
  energyValue,
} = useHandler(props, emit);
</script>
