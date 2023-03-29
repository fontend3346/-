<template>
  <div class="pie-panel" id="piepanel" v-show="isShowMask">
    <div
      id="pie-panel-content"
      ref="dialogRef"
      class="pie-panel-content"
      :style="{
        width: props.width + '%',
        minHeight: height + '%',
        left: moveLeft ? moveLeft : 'auto',
        right: moveRight ? moveRight : 'auto',
        top: moveTop,
        zIndex: zIndex,
      }"
      @mousedown="mouseModalDown"
    >
      <div class="header" v-if="headerShow">
        <div class="title" v-if="title">
          <span class="text"
            >{{ props.title }}
            <!-- <span class="tragger"></span> -->
          </span>
        </div>

        <span class="iconfont icon-guanbi" v-if="close" @click="cancel"></span>
      </div>
      <div class="operate-item" :style="{ marginBottom: 0 }">
        <slot age="10000" name="operateItem"></slot>
      </div>
      <div class="operate-btn" v-if="showBtn">
        <div class="reset-btn-warp"></div>
        <span class="confirm-btn" v-if="confirmBtn" @click="confirm">{{
          confirmText
        }}</span>
        <span class="cancel-btn" v-if="cancelBtn" @click="cancel"
          >{{ cancelText }}
        </span>
        <slot age="10000" name="more"> </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useHandler } from "./hooks";

const props = withDefaults(
  defineProps<{
    title?: string;
    width?: number;
    height?: number;
    headerShow: boolean;
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
    moveRight?: string;
    moveTop?: string;
    backGroundColor?: string;
    marginBottom?: number;
    visible?: boolean; // v-model 绑定值
    isDrage: boolean; // 是否可拖动
    isShrink: boolean; // 是否可收缩展开
    addBtn: boolean;
    selectedValue: number;
    zIndex: number;
  }>(),
  {
    title: "",
    width: 20,
    height: 50,
    close: true, //关闭按钮
    //取消按钮是否显示
    cancelBtn: true,
    //重置按钮是否显示

    resetBtn: false,
    layerBtn: false,

    confirmBtn: true,
    //确认按钮是否显示
    default: true,
    //是否显示菜单
    showBtn: true,

    //是否显示菜单
    confirmText: "确定",
    //是否显示菜单
    cancelText: "取消",

    showMask: true,
    moveLeft: "",
    moveRight: "",
    moveTop: "",
    backGroundColor: "transparent",
    marginBottom: 100,
    headerShow: true,
    isDrage: true,
    addBtn: false,
    selectedValue: 0,
    zIndex: 1,
  }
);

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "reset", e: MouseEvent): void; //点击事件
  (event: "confirm", e: MouseEvent): void; //点击事件
  (event: "cancel", e: MouseEvent): void; //点击事件
  (event: "selectedClick", e: MouseEvent): void; //点击事件
  (event: "update:visible", e: boolean): void;
  (event: "mouseModalDown", e: MouseEvent): void; //点击事件
}>();
const dialogRef = ref();
const dataRef = {
  dialogRef: dialogRef,
};
const {
  title,
  selectedValue,
  width,
  height,
  close,
  showMask,
  marginBottom,
  headerShow,
  addBtn,
  isDrage,
} = props;
const {
  confirm,
  cancel,
  selectedClick,
  isShowMask,
  mouseModalDown,
  dialogIsDown,
  moveLeft,
  moveTop,
} = useHandler(props, emit, dataRef);
</script>
<style lang="less" scoped>
#pie-panel-content {
  .operate-btn {
    .cancel-btn {
      cursor: pointer;
      display: flex;
      border: none;
      align-items: center;
      justify-content: center;
      color: #fff;

      margin-right: 20px;
      height: 40px;

      background-color: transparent;
      border: 1px solid #00aadd;

      // font-size: @template-font-size;
      font-weight: 400;
      border-radius: 4px;
    }
    .confirm-btn {
      cursor: pointer;
      display: flex;
      border: none;
      align-items: center;
      justify-content: center;
      color: #fff;
      margin-right: 20px;
      height: 40px;
      border: 1px solid #00aadd;
      // font-size: @template-font-size;
      font-weight: 400;
      border-radius: 4px;

      border: none;
      color: #fff;
      background-color: #024765;
    }
  }
}
</style>
