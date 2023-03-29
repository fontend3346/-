<template>
  <div class="report-box">
    <div class="report-left-box" v-for="(item, index) in reportList" :key="item"
      :class="{ activereport: activeValue == index }" @click="activeSelect(index, item)">
      <div class="icon-box">
        <span class="iconfont icon-router-fill icon-radius"></span>
      </div>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "activeSelect", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    reportList: any,
  }>(),
  {
    reportList: [],
  }
);
const { activeValue, activeSelect } = useHandler(props, emit);
</script>
