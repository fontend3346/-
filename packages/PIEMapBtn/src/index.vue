<template>
  <div class="btn-box">
    <div class="loaction">
      <span class="iconfont icon-weizhi3"></span>
      定位
    </div>
    <div class="enlargement">
      <span class="iconfont icon-fangda"></span>
      放大
    </div>
    <div class="lessen">
      <span class="iconfont icon-suoxiao"></span>
      缩小
    </div>
    <div class="time">时间：{{ time1 }}</div>
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
    stationList: any;
    titleName: string;
    columns: any;
    tableHeight: any;
    time1: any;
  }>(),
  {
    stationList: [],
    labelList: [],
    titleName: "台站列表",
    iconName: "",
    tableHeight: "",
    time1: "",
  }
);

const { activeIndex, selectActive } = useHandler(props, emit);
</script>
