<template>
  <div class="charts" ref="chart"></div>
</template>
<script lang="ts" setup>
import { propsToAttrMap } from "@vue/shared";
import { ref } from "vue";
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "clickHeatMap", id: any): void;
}>();
const props = withDefaults(
  defineProps<{
    option: any;
    data: any;
    rateName: any;
  }>(),
  {
    option: null,
    rateName: "正常率",
    data: [
      { name: "中国地震台网中心", value: 95 },
      { name: "辽宁省地震局", value: 94 },
      { name: "黑龙江地震局", value: 93 },
      { name: "吉林省地震局", value: 86 },
      { name: "内蒙古地震局", value: 85 },
      { name: "甘肃省地震局", value: 84 },
      { name: "四川省地震局", value: 76 },
      { name: "山东省地震局", value: 75 },
      { name: "贵州省地震局", value: 74 },
      { name: "山西省地震局", value: 66 },
      { name: "湖北省地震局", value: 65 },
      { name: "江苏省地震局", value: 64 },
      { name: "云南省地震局", value: 63 },
    ],
  }
);
const { chart } = useHandler(props, emit);
</script>
<style lang="less" scoped>
</style>
