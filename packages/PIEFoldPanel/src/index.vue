<template>
  <!-- 图表 -->

  <div class="fold-panel">
    <el-collapse
      v-model="state.activeName"
      accordion
      @change="handleChange"
      class="myCollapse"
    >
      <el-collapse-item title="国际合作1.0数据" name="1" v-if="isShow">
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
  (event: "handleChange", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    options: any;
    isShow: boolean;
  }>(),
  {
    options: [],
    isShow: true,
  }
);
const { state, handleChange } = useHandler(props, emit);
</script>
<style lang="less" scoped>
.fold-panel {
  border: none;
  max-height: 100%;
  overflow-y: auto;
  .myCollapse {
    width: 100%;
    height: 100%;
    border: none;
    .el-collapse-item {
      :deep(.el-collapse-item__header) {
        box-sizing: border-box;
        background-color: #053276;
        color: #fff;
        height: 40px;
        line-height: 48px;
        border: none;
        padding-left: 10px;
        box-sizing: border-box;
      }
      :deep(.el-collapse-item__wrap) {
        background-color: transparent;
        border-bottom: none;
      }
      :deep(.el-collapse-item__content) {
        width: 100%;
        height: 125px;
        padding: 0;
        .myChart {
          width: 356px;
          height: 125px;
        }
      }
    }
  }
}
.fold-panel::-webkit-scrollbar {
  display: none;
}
</style>
