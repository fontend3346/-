
<template>
  <!-- 点击测点弹框 -->
  <PIEPanel
    v-model:visible="props.measureShow"
    title="台站模型"
    :width="100"
    :height="95"
    :backGroundColor="'rgba(26, 53, 74, 0.9)'"
    :cancelBtn="false"
    :confirmBtn="false"
    :moveLeft="'0'"
    :moveTop="'50px'"
    :key="new Date().getTime()"
    class="three-panel"
    :zIndex="20"
    @cancel="cancel"
    :isDrage="false"
  >
    <template v-slot:operateItem>
      <div class="measure-box">
        <div id="threeContainer" ref="threeRef"></div>
        <div class="measureInfo">
          <div class="info-item">台站类型:<span>异常</span></div>
          <div class="info-item">隶属台网: <span></span></div>
          <div class="info-item">运维人员: <span>{{}}</span></div>
          <div class="info-item">联系方式: <span>{{}}</span></div>
          <div class="info-item">视频开关: <span>{{}}</span></div>
          <div class="info-item">网络状态: <span>{{}}</span></div>
          <div class="info-item">连续运行时间: <span>{{}}</span></div>
          <div class="info-item">测项: 测震<span>{{}}</span></div>
        </div>
      </div>
      <div
        class="three-info"
        :style="{
          left: threeData.movePosition.left - 50 + 'px',
          top: threeData.movePosition.top - 90 + 'px',
        }"
        v-if="moveShow"
        ref="treePanelRef"
      >
        {{ measureObj.name }}
      </div>
    </template>
  </PIEPanel>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "cancel"): void;
}>();

const props = withDefaults(
  defineProps<{
    measureShow: any;
    measureObj: any;
    netInfo: any;
    stationInfo: any;
  }>(),
  {
    measureShow: false,
    measureObj: {},
    netInfo: {},
    stationInfo: {},
  }
);

const { states, threeRef, moveShow, treePanelRef, cancel, threeData } =
  useHandler(props, emit);
</script>

<style scoped lang="less">
// 模型dom大小
#threeContainer {
  width: 1850px;
  height: 800px;
}
:deep(.pie-panel .operate-item) {
  max-height: 900px;
}
.measure-box {
  position: relative;
  .measureInfo {
    width: 300px;
    min-height: 100px;
    position: absolute;
    left: 10px;
    top: 10px;
    color: #fff;
    background: hsla(209, 100%, 14%, 0.45);
    border: 1px solid #00aadd;
    border-radius: 4px;
    padding: 10px;
    font-size: 16px;
    .info-item {
      margin-bottom: 10px;
    }
  }
}
.three-info {
  width: 200px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  background: hsla(209, 100%, 14%, 0.45);
  border: 1px solid #00aadd;
  border-radius: 4px;
  padding: 10px;
}
</style>

