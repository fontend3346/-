<template>
  <!-- 图表 -->
  <div class="echart-wave">
    <div class="wrap">
      <div class="title">
        {{ waveTitle }}
      </div>
      <div class="my-chart" ref="myCharts"></div>
      <div class="desInfo">
        <div class="title">{{ infoTitle }}</div>
        <div class="info">{{ infos }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    options: any;
    waveTitle: string;
    infos: string;
    infoTitle: string;
  }>(),
  {
    options: [],
    waveTitle: "",
    infos: "",
    infoTitle: "",
  }
);
// const props = defineProps({q'AAAA
//   options: {
//     type: Object,
//   }
// })
const { state, onClick, myCharts } = useHandler(props, emit);
</script>
