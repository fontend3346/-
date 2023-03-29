<template>
  <!-- 关系图 -->
  <div ref="myChart"></div>
</template>
<script lang="ts" setup>
import { AnyCnameRecord } from "dns";
import { useHandler } from "./hooks";
const emit = defineEmits<{
  (event: "clickNode", center: any): void;
}>();
const props = withDefaults(
  defineProps<{
    nodes: any;
    links: any;
    categories: any;
    option: any;
    fresh: any;
  }>(),
  {
    nodes: [
      {
        id: "0",
        name: "台网",
        symbolSize: 30,
        value: 95,
        category: 0,
        level: 1
      },
      {
        id: "1",
        name: "测震台站",
        symbolSize: 20,
        value: 65,
        category: 1,
        level: 2
      },
      {
        id: "2",
        name: "强震台站",
        symbolSize: 20,
        value: 65,
        category: 2,
        level: 2
      },
      {
        id: "3",
        name: "GNSS",
        symbolSize: 20,
        value: 65,
        category: 3,
        level: 2
      },
      {
        id: "4",
        name: "次声台站",
        symbolSize: 20,
        value: 65,
        category: 4,
        level: 2
      },
      {
        id: "5",
        name: "重力台站",
        symbolSize: 15,
        value: 65,
        category: 5,
        level: 2
      },
      {
        id: "6",
        name: "地磁台站",
        symbolSize: 15,
        value: 65,
        category: 6,
        level: 2
      },
      {
        id: "7",
        name: "重力台站1",
        symbolSize: 15,
        value: 65,
        category: 6,
        level: 3
      }
    ],
    links: [
      {
        source: "1",
        target: "0",
      },
      {
        source: "2",
        target: "0",
      },
      {
        source: "3",
        target: "0",
      },
      {
        source: "4",
        target: "0",
      },
      {
        source: "5",
        target: "0",
      },
      {
        source: "6",
        target: "0",
      },
    ],
    categories: [
      {
        name:'台网'
      },
      {
        name: '测震台站'
      },
      {
        name: "强震台站",
      },
      {
        name: "GNSS",
      },
      {
        name: "次声台站",
      },
      {
        name: "重力台站",
      },
      {
        name: "地磁台站",
      }
    ],
    option: null,
    fresh: 0
  }
);

const { initEchart, myChart, state } = useHandler(props, emit);
</script>
<style scoped lang="less">
</style>
