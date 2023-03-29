<template>
  <div class="container">
    <div class="my-chart" ref="chart"></div>
    <div class="title" v-if="props.titleShow">{{ props.title }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useHandler } from "./hooks";
const emit = defineEmits<{
  (event: "clickGraph", e: MouseEvent): void;
}>();
const props = withDefaults(
  defineProps<{
    text: string;
    subtext: string;
    left: any;
    top: any;
    textStyle: any;
    subtextStyle: any;
    data: any;
    radius: any;
    color: any;
    option: any;
    title: string;
    titleShow: boolean;
  }>(),
  {
    text: "总数",
    subtext: "140",
    left: "center",
    top: "center",
    textStyle: {
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: "normal",
      color: "#98dcff",
    },
    subtextStyle: {
      fontSize: 14,
      fontStyle: "normal",
      fontWeight: "normal",
      color: "#ffffff",
    },
    data: [
      {
        value: 80,
        name: "正常",
      },
      {
        value: 13,
        name: "故障",
      },
      {
        value: 7,
        name: "告警",
      },
    ],
    // radius: ["40%", "68%"],
    radius: ["35%", "58%"],
    color: ["#56D1A4", "#CF0420", "yellow", "#868181"],
    option: null,
    title: "",
    titleShow: true,
  }
);
const { chart } = useHandler(props,emit);
</script>
<style lang="less" scoped>
.container {
  width: 200px;
  height: 190px;
  position: relative;
  .my-chart {
    width: 200px;
    height: 190px;
  }
  .title {
    position: absolute;
    top: 10px;
    left: 10px;
  }
}
// .graph{
//   width: 100%;
//   height: 100%;
// }
</style>
