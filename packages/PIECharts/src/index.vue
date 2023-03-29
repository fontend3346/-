
<template>
  <!-- 图表 -->
  <div class="charts-container">
    <div class="charts-top">
      <div>{{ title }}</div>
      <!-- <div class="iconfont icon-guanbi"></div> -->
    </div>
    <div :id="id" class="pie-echart"></div>
  </div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";
import { reactive, onMounted, ref } from "vue";
const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    options: any;
    id: string;
    title: string;
  }>(),
  {
    options: [],
    id: "pie-echart",
    title: "H电磁脉冲波",
  }
);
// const props = defineProps({q'AAAA
//   options: {
//     type: Object,
//   }
// })\
const { initEchart } = useHandler(props, emit);
</script>

<style scoped lang="less">
.charts-container {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(6, 91, 248, 0.6);
  background-color: rgba(15, 49, 112, 0.6);
  .charts-top {
    width: 100%;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #fff;
    background: #274875;
    position: relative;
    .iconfont {
      position: absolute;
      right: 5px;
    }
  }
  .pie-echart {
    width: 100%;
    height: 85%;
  }
}
</style>

