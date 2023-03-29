<template>
  <div class="left-dialog">
    <div class="mainTitle" value="mainTitle">{{ mainTitle }}</div>
    <div class="bigButton">
      <button
        class="myButton"
        @click="actionSelect(item.label)"
        v-for="item in selectList"
        :key="item"
      >
        {{ item.label }}
      </button>
    </div>

    <my-table
      class="left-table"
      :data="tableData"
      :columns="fields"
      :showIndex="true"
      border
      :isAction="true"
      :lookBtn="true"
      :detailBtn="true"
      :output="true"
    ></my-table>
  </div>
</template>

<script lang="ts" setup>
import {
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
  ref,
  defineProps,
} from "vue";

import myTable from "@/components/table/my-table.vue";
onMounted(() => {});
// let mainTitle = ref();

const props = defineProps({
  //子组件接收父组件传递过来的值
  mainTitle: String,
  selectList: Array,
});
//使用父组件传递过来的值
// const { mainTitle } = toRefs(props);
// const { selectList } = toRefs(props);

// let selectList = ref([
//   { value: "接收配置", label: "接收配置" },
//   { value: "任务管理", label: "任务管理" },
//   { value: "数据查询", label: "数据查询" },
// ]);

let tableData = [
  {
    name: "1321",
    size: "3564356",
  },
  {
    name: "1321",
    size: "3564356",
  },
];
let fields = [
  { label: "配置", prop: "name" },
  { label: "状态", prop: "size" },
  { label: "负载", prop: "size" },
  { label: "操作", prop: "size" },
];
</script>

<style lang="less" scoped>
.left-dialog {
  position: fixed;
  top: 25%;
  left: 1%;
  width: 500px;
  height: 800px;
  background-color: #002c3d;
  .mainTitle {
    position: absolute;
    top: 1%;
    width: 100%;
    height: 50px;
    background-color: #2c0ae6;
  }

  .bigButton {
    position: absolute;
    left: 1%;
    top: 6%;
    height: 50px;
    width: 100%;
    color: white;
    font-size: 20px;
    .myButton {
      padding: 2%;
    }
  }
  .left-table {
    position: absolute;
    left: 1%;
    top: 20%;
    height: 300px;
    width: 100%;
  }
}
</style>