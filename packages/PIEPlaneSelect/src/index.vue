<template>
  <div
    class="pie-panel"
    id="piepanel"
    v-show="isShowMask"
    :class="{ show: showMask }"
  >
    <div
      id="pie-panel-content"
      ref="dialogRef"
      class="border-contant"
      :style="{
        width: width + 'vw',
        minHeight: height + 'vh',
        // left: moveLeft,
        // top: moveTop,
        backgroundColor: backGroundColor,
      }"
    >
      <!-- <div class="header" @mousedown="mouseModalDown"> -->
        <!-- <div class="title" v-if="title">
          <span class="text"
            >{{ title }}
          </span>
        </div> -->

        <!-- <span class="iconfont icon-guanbi weizhi" v-if="close" @click="cancel"></span> -->
      <!-- </div> -->
      <div class="operate-item" :style="{ marginBottom: 0 }">
        <slot age="10000" name="operateItem"></slot>

      </div>
      <div class="operate-btn" v-if="showBtn">
        <div class="reset-btn-warp"></div>
        <slot age="10000" name="more"> </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref,reactive } from "vue";
import { useHandler } from "./hooks";

const props = withDefaults(
  defineProps<{
    // title?: string
    width?: number;
    height?: number;
    cancelBtn?: boolean;
    resetBtn?: boolean;
    layerBtn?: boolean;
    confirmBtn?: boolean;
    close?: boolean;
    showBtn?: boolean;
    confirmText?: string;
    cancelText?: string;
    showMask?: boolean;
    moveLeft?: string;
    moveTop?: string;
    backGroundColor?: string;
    marginBottom?: number;
    visible?: boolean; // v-model 绑定值
    // activeName: string;
  }>(),
  {
    // title: "提示",
    //控制查看按钮是否显示

    width: 20,
    height: 50,
    //取消按钮是否显示
    cancelBtn: true,
    //重置按钮是否显示

    resetBtn: false,
    layerBtn: false,

    confirmBtn: true,
    //确认按钮是否显示
    default: true,
    //关闭按钮
    close: true,
    //是否显示菜单
    showBtn: true,

    //是否显示菜单
    confirmText: "确定",
    //是否显示菜单
    cancelText: "取消",

    showMask: true,
    moveLeft: "",
    moveTop: "",
    backGroundColor: "rgba(5, 32, 53, 0.1)",
    marginBottom: 100,
    isShowMask: false,
    // activeName: "second",
  }
);

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "reset", e: MouseEvent): void; //点击事件
  (event: "confirm", e: MouseEvent): void; //点击事件
  (event: "cancel", e: MouseEvent): void; //点击事件

  (event: "mouseModalDown", e: MouseEvent): void; //点击事件
}>();
// const state = reactive({
//     foreignValue: "", //境内外

// })

// let data1=toRefs(props)
const dialogRef = ref();
const dataRef = {
  dialogRef: dialogRef,
};
const handleClick=(tab:any, event:any)=> {
  console.log(tab, event);
}
const {
  confirm,
  cancel,

  isShowMask,
  mouseModalDown,
  dialogIsDown,
  moveLeft,
  moveTop,
  // activeName
} = useHandler(props, emit, dataRef);
</script>
<style lang="less" scoped>
.weizhi{
  // position: relative;
  // right: 5px;
  color:white;

}
.border-contant {
  border-radius: 5px;
  background-color:rgba(5, 32, 53, 0.712);;
  box-sizing: border-box;
  min-height: 200px;

  background: linear-gradient(rgba(0, 38, 73) 0%, rgba(0, 47, 91) 100%) transparent;
  box-shadow: rgb(61 141 255 / 30%) 0px 4px 20px 0px, rgb(0 100 186 / 50%) 0px 0px 32px 0px inset;
  border: 1px solid;
  border-image: linear-gradient(rgb(0, 133, 192), rgb(0, 91, 176)) 1 / 1 / 0 stretch;
  background-size: 100% 100%;

}

.border-contant::before {
  content: "";
  display: block;
  border-top: 10px solid transparent;
  border-left: 7px solid #0173DD;
  border-bottom: 10px solid transparent;
  height: 32px;
  position: absolute;
  left: -1px;
  top: 7%;
}
.border-contant::after {
  content: "";
  display: block;
  border-top: 10px solid transparent;
  border-right: 7px solid #0173DD;
  border-bottom: 10px solid transparent;
  height: 20%;
  width: 0px;
  position: absolute;
  right: 0px;
  top: 67%;
}
// .select-station{
//   width:100px;
//   height: 100px;
//   background: red;
// }
.position{
  
}
</style>
