<template>
  <div class="img-box">
    <div class="img img-item1"></div>
    <div class="img img-item2"></div>
    <div class="img img-item3"></div>
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
