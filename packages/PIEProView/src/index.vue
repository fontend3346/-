<template>
  <!-- 图表 -->
  <div ref="echartsKeyId"></div>
  <!-- :key="new Date().getTime()" -->
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
}>();

interface Props {
  options: object;
}
const props = withDefaults(
  defineProps<{
    options?: any;
  }>(),
  {
    options: {},
  }
);
const { state, echartsKeyId, onClick } = useHandler(props, emit);
</script>

<style scoped lang="less"></style>
