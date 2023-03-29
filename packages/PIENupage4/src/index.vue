
<template>
  <!-- BarEchart -->
  <!-- 承重利用率统计 -->

  <div class="bearing-statistics">
    <div class="title">承重利用率统计</div>
    <div class="content">
      <div class="bear-1"><PIEBarChart :options="option2"></PIEBarChart></div>
      <div class="bear-2">
        <PIEBarChart :options="option1" :chartType="1"></PIEBarChart>
        <div class="total-num">总承重：150.45</div>
        <!-- <el-progress type="circle" :percentage="25" /> -->
      </div>
    </div>
  </div>
  <!-- 冷量 -->
  <div class="cooling-capacity"></div>
</template>

<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    options: any;
    className: string;
  }>(),
  {
    options: [],
    className: "",
  }
);
// const props = defineProps({q'AAAA
//   options: {
//     type: Object,
//   }
// })

const { option2, option1 } = useHandler(props, emit);
</script>

<style scoped lang="less">
.bearing-statistics {
  padding: 10px;
  .title {
    color: #fff;
    font-size: 16px;
    margin-bottom: -35px;
    margin-left: -246px;
  }
  .content {
    // width: 500px; //短一点坐标轴显示不全？
    display: flex;
    .bear-1 {
      width: 300px;
      height: 200px;
    }
    .bear-2 {
      width: 400px;
      height: 100px;
      margin-left: 30px;
      margin-top: -60px;
      .total-num {
        color: #fff;
        margin-top: 140px;
      }
    }
  }
}
</style>

