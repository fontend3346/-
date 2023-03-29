
<template>
  <!-- 树形展示 -->
  <div class="pre-Treen" v-show="props.lookTreen">
    <div class="container">
      <div class="header">
        <div>树形展示 {{ props.optionOne }}</div>
        <div @click="cancel">
          <i class="iconfont icon-guanbi"></i>
        </div>
      </div>
      <div class="body">
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";
const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "cancel", e: MouseEvent): void; //点击事件
  (event: "update:visible", e: boolean): void;
}>();

const props = withDefaults(
  defineProps<{
    optionOne: any;
    lookTreen: boolean;
  }>(),
  {
    optionOne: "1",
    close: true, //关闭按钮
    lookTreen: false, //关闭树形
  }
);
const { data, defaultProps, handleNodeClick, cancel } = useHandler(props, emit);
</script>
<style lang="less" scoped>
.pre-Treen {
  width: 380px;
  height: 870px;
  padding: 20px;
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
  background-size: 100% 100%;
  box-sizing: border-box;
  position: absolute;
  top: -2px;
  left: 2px;
  z-index: 1002;
  .container {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 10px 10px;
      border-bottom: 1px solid #00aadd;
      div {
        font-size: 18px;
        color: @special-font-color;
        i {
          z-index: 1001;
          color: @special-font-color;
        }
      }
    }
    .body {
    }
  }
}

.pre-Treen::before {
  content: "";
  display: block;
  border-top: 10px solid transparent;
  border-left: 7px solid #0173dd;
  border-bottom: 10px solid transparent;
  height: 32px;
  position: absolute;
  left: -1px;
  top: 7%;
}

.pre-Treen::after {
  content: "";
  display: block;
  border-top: 10px solid transparent;
  border-right: 7px solid #0173dd;
  border-bottom: 10px solid transparent;
  height: 20%;
  width: 0px;
  position: absolute;
  right: 0px;
  top: 67%;
}
</style>

