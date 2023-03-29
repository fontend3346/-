<template>
  <div class="recive-status">
    <div class="pit-style" ref="mainOne"></div>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./hooks";

const props = withDefaults(
  defineProps<{
    optionOne: any;
  }>(),
  {
    optionOne: {},
  }
);
const { state, mainOne, initEchartOne } = useHandler(props);
</script>
