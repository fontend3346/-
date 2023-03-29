<template>
  <div class="monitor-box">
    <PIEModal title="数据列表" height="50" width="40" :showMask="true">
      <template v-slot:operateItem>
        <div>11111</div>
      </template>
    </PIEModal>
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
    imgList: any;
  }>(),
  {
    imgList: [],
  }
);

const { activeIndex, selectActive } = useHandler(props, emit);
</script>
