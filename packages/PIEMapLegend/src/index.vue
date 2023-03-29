<template>
  <div class="legend-box">
    <div class="legend-title">{{ legendTitle }}</div>
    <div class="legend-content">
      <div class="item" v-for="(item, index) in legendList" :key="index">
        <span
          v-if="item.value == 1"
          class="iconfont icon-yuandian"
          style="color: rgb(239, 53, 10)"
        ></span>
        <span
          v-if="item.value == 2"
          class="iconfont icon-yuandian"
          style="color: rgb(239, 102, 10)"
        ></span>
        <span
          v-if="item.value == 3"
          class="iconfont icon-yuandian"
          style="color: rgb(228, 225, 0)"
        ></span>
        <span
          v-if="item.value == 4"
          class="iconfont icon-yuandian"
          style="color: rgb(107, 239, 10)"
        ></span>
        <span
          v-if="item.value == 5"
          class="iconfont icon-yuandian"
          style="color: rgb(133, 133, 133)"
        ></span>
        {{ item.label }}
      </div>
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
    legendTitle: string;
    columns: any;
    tableHeight: any;
  }>(),
  {
    legendList: {},
    labelList: [],
    legendTitle: "台站列表",
    iconName: "",
    tableHeight: "",
  }
);

const { activeIndex, selectActive, time1 } = useHandler(props, emit);
</script>
