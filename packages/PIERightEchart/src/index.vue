
<template>
  <!-- 图表 -->

  <div class="right-box">
    <div class="title">主题仓库</div>
    <el-collapse class="myCollapse" v-model="state.activeName">
      <el-collapse-item title="国际合作1.0数据" name="1">
        <div class="myChart" id="myChart1"></div>
      </el-collapse-item>
      <el-collapse-item title="CEED数据" name="2">
        <div class="myChart" id="myChart1"></div>
      </el-collapse-item>
      <el-collapse-item title="CSS数据" name="3">
        <div class="myChart" id="myChart1"></div>
      </el-collapse-item>
      <el-collapse-item title="国际合作2.0数据" name="4">
        <div class="myChart" id="myChart1"></div>
      </el-collapse-item>
    </el-collapse>
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
  }>(),
  {
    options: {},
  }
);
// const props = defineProps({q'AAAA
//   options: {
//     type: Object,
//   }
// })
const { state, onClick } = useHandler(props, emit);
</script>

<style lang="less" scoped>
.right-box {
  // margin-top: 40px;
  width: 100%;
  margin: 15px;
  color: white;

  //border: 0.5px solid rgb(138, 209, 247,0.9);
  .title {
    left: 8%;
    top: 10%; //没什么用？
    // margin-top: 23px;
    margin: 23px 0 13px 0;
    padding: 1px;
    font-size: 18px;
    font-weight: 700;
    position: relative;
  }

  .myCollapse {
    width: 90%;
    left: 3%;
    position: relative;
    border: 0;
    overflow: auto;
    height: 750px;

    .el-collapse-item {
      :deep(.el-collapse-item__header) {
        background: #052d68;
        color: white;
        margin-bottom: 10px;
        border: 0;
        // border: 2 solid transparent; //heder底层边框
        height: 40px;
        padding-left: 30px;
      }
      :deep(.el-collapse-item__wrap) {
        background: transparent;
        color: white;
        border: 0;
        padding-left: 20px;

        .myChart {
          // display: inline;
          width: 370px;
          height: 230px; //必须设置高度
          float: left;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>

