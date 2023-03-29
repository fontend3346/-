
<template>
  <!-- 图表 -->
  <div class="echart-box">
    <div class="echart">
      <!--图表标题-->
      <!-- <span class="title">地震发送情况</span> -->
      <!--图表内容-->
      <div class="my-chart" :class="[className ? className : 'myChart']"></div>
      <div class="my-chart" :class="[className ? className : 'myChart']"></div>
      <div class="my-chart" :class="[className ? className : 'myChart']"></div>
      <!-- <el-dialog title="组件传值的问题" v-model="props.showData">{{showData}}</el-dialog> -->
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
const { state, onClick } = useHandler(props, emit);
</script>

<style scoped lang="less">
.echart-box {
  // margin-top: 40px;
  width: 72%;
  left: 1%;
  background-image: radial-gradient(#061735ef, #123a56a1);
  /* border: 2px solid #b82121db; */
  border-radius: 10px;
  /* color: #e01212; */
  margin: 15px 15px 2px 15px;
  color: white;
  //border: 0.5px solid rgb(138, 209, 247,0.9);

  .my-chart {
    // display: inline;
    width: 32%;
    height: 260px; //必须设置高度
    float: left;
    margin: 2px 6px 6px 1px;
  }
}
</style>

