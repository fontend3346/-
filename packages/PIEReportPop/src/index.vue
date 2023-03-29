<template>
  <div class="pop-box">
    <div class="pop-close">
      <span class="iconfont icon-guanbi"></span>
    </div>
    <div class="title-box">
      <span>{{ titleName }}</span>
    </div>
    <div class="pop-content"></div>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    titleName: string;
  }>(),
  {
    titleName: "QBJC报告",
  }
);
const {} = useHandler(props, emit);
</script>
