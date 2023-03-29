<template>
  <!-- 框架-边框 -->
  <div class="pie-monitor-border">
    <span class="left"></span>
    <span class="right"></span>
    <span class="top"></span>
    <span class="bot"></span>
    <slot age="10000" name="content"></slot>
  </div>
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
const { state, onClick } = useHandler(props, emit);
</script>

<style scoped lang="less">
.pie-monitor-border {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid @global-header-bbg;
  border-radius: 5px;
  // 边框效果
  .left {
    position: absolute;
    left: -3px;
    top: -3px;
    padding: 15px;
    border-style: solid;
    border-color: rgba(71, 136, 251, 0.3);
    border-width: 3px 0 0 3px;
  }

  .right {
    position: absolute;
    right: -3px;
    top: -3px;
    padding: 15px;
    border-style: solid;
    border-color: rgba(71, 136, 251, 0.3);
    border-width: 3px 3px 0 0;
  }

  .top {
    position: absolute;
    right: -3px;
    bottom: -3px;
    padding: 15px;
    border-style: solid;
    border-color: rgba(71, 136, 251, 0.3);
    border-width: 0 3px 3px 0;
  }

  .bot {
    position: absolute;
    left: -3px;
    bottom: -3px;
    padding: 15px;
    border-style: solid;
    border-color: rgba(71, 136, 251, 0.3);
    border-width: 0 0 3px 3px;
  }
}
</style>
