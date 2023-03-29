
<template>
  <!-- 监控表格组件 -->
  <div class="monitor-box">
    <div class="title">{{ title }}</div>
    <div class="num-box">
      <div class="single" v-for="(item, index) in NumList" :key="index">
        <div class="name">{{ item.label }}</div>
        <div :class="['num', index == 3 ? 'three' : '']">
          {{ item.value }}
        </div>
      </div>
    </div>
    <!-- <h1>{{ num1 }}</h1>
    <h1>{{ num2 }}</h1> -->
  </div>
</template>
<script lang="ts" setup>
import { AnyColumns } from "element-plus/lib/components/table-v2/src/types";
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    title: string;
    num1: string;
    num2: string;
    num3: string;
    NumList: any;
  }>(),
  {
    title: "监视种类",
    num1: "地面站数量",
    num2: "正常数量",
    num3: "异常数量",
    NumList: [
      { label: "地面站总数", value: "550" },
      { label: "正常个数", value: "546" },
      { label: "异常个数", value: "4" },
    ],
  }
);
// const state = reactive({
//   num1:'11111'
// })
// const props = defineProps({q'AAAA
//   options: {
//     type: Object,
//   }
// })
const { onClick } = useHandler(props, emit);
</script>

<style scoped lang="less">
.monitor-box {
  width: 100%;
  height: 100%;
  background: transparent;

  // background-image: radial-gradient(#061735ef, #123a56a1);
  /* border: 2px solid #b82121db; */
  border-radius: 10px;
  /* color: #e01212; */
  // margin: 15px 15px 2px 15px;
  color: white;
  //border: 0.5px solid rgb(138, 209, 247,0.9);
  .title {
    // height: 20px;
    font-size: 18px;
    margin-left: 10px;
  }
  .num-box {
    display: flex;
    width: 100%;
    height: 100%;
    margin: 2px 6px 6px 1px;
    .single {
      width: 30%;
      background-image: radial-gradient(#061735ef, #123a56a1);
      margin-left: 10px;
      height: 70px;
      display: flex;
      flex-direction: column;
      .name {
        margin: 5px auto;
        font-size: 18px;
      }
      .num {
        margin: 2px auto;
        font-size: 25px;
        color: blue;
      }
    }
  }
}
</style>

