<template>
  <div
    ref="modalRef"
    :style="{ position: 'fixed', top: height + 'px', left: width + 'px' }"
    class="pie-mark-modal"
  >
    <div class="model-content">
      <div class="earthquake-item">
        <span class="left">地震位置</span>
        <span class="right">{{ location }}</span>
      </div>
      <div class="earthquake-item">
        <span class="left">地震时间</span><span class="right">{{ time }}</span>
      </div>
      <div class="earthquake-item">
        <span class="left">地震深度</span>
        <span class="right">{{ depth }}</span>
      </div>
      <div class="earthquake-item">
        <span class="left">震级</span>
        <span class="right">{{ magnitude }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useHandler } from "./hooks";
const emit = defineEmits<{
  (event: "delInfo", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    valueData: any;
    location: any;
    time: any;
    depth: any;
    magnitude: any;
    width: any;
    height: any;
  }>(),
  {
    valueData: {},
    location: "",
    time: "",
    depth: "",
    magnitude: "",
    width: "",
    height: "",
  }
);
const modalRef = ref(null);
defineExpose({ modalRef });
const {} = useHandler(props, emit);
</script>
<style lang="less" scoped>
.pie-mark-modal {
  // position:fixed;
  // top: 100px;
  // left: 200px;
  display: flex;
  // position: relative;
  justify-content: center;
  background: linear-gradient(
      rgba(0, 38, 73, 0.88) 0%,
      rgba(0, 47, 91, 0.96) 100%
    )
    transparent;
  box-shadow: rgb(61 141 255 / 30%) 0px 4px 20px 0px,
    rgb(0 100 186 / 50%) 0px 0px 32px 0px inset;
  border: 1px solid;
  border-image: linear-gradient(rgb(0, 133, 192), rgb(0, 91, 176)) 1 / 1 / 0
    stretch;

  // background: url(../../../src/assets/qietu/modals-bg.png);
  background-size: 100% 100%;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  height: 4%;
  width: 18%;
  .model-content {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    .earthquake-item {
      height: 25%;
      width: 100%;
      display: flex;
      justify-content: space-around;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        width: 30%;
        height: 100%;
      }
      .right {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: white;
        width: 70%;
        height: 100%;
      }
    }
  }
}

.pie-mark-modal::before {
  content: "";
  display: block;
  /* width: 8px; */
  // border-left: 28px solid rgba(0, 0, 0, 0);
  border-top: 10px solid transparent;
  border-left: 7px solid #0173dd;
  border-bottom: 10px solid transparent;
  /* border-right: 10px solid red; */
  height: 32px;
  position: absolute;
  left: -1px;
  top: 7%;
}

.pie-mark-modal::after {
  content: "";
  display: block;
  /* width: 8px; */
  border-top: 10px solid transparent;
  border-right: 7px solid #0173dd;
  border-bottom: 10px solid transparent;
  /* border-right: 10px solid red; */
  height: 20%;
  width: 0px;
  position: absolute;
  right: 0px;
  top: 67%;
}
</style>
