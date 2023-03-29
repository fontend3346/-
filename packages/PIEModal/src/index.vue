<template>
  <div class="pie-modal" v-show="isShowMask" :class="{ show: showMask }">
    <div
      id="pie-modal-content"
      ref="dialogRef"
      class="pie-modal-content"
      :style="{
        width: width + 'vw',
        minHeight: height + 'vh',
        left: moveLeft,
        top: moveTop,
      }"
      @mousedown="mouseModalDown"
    >
      <div class="header">
        <div class="title" v-if="title">
          <span class="text"
            >{{ title }}
            <!-- <span class="tragger"></span> -->
          </span>
        </div>

        <span class="iconfont icon-guanbi" v-if="close" @click="cancel"></span>
      </div>
      <div class="operate-item">
        <slot age="10000" name="operateItem"></slot>
      </div>
      <div class="operate-btn" v-if="showBtn">
        <div class="reset-btn-warp">
          <!--<span class="reset-btn" v-if="resetBtn" @click="reset">重置</span>-->
        </div>
        <!-- <span class="layer-btn" v-if="layerBtn" @click="layer">图层展示</span> -->

        <span class="cancel-btn" v-if="cancelBtn" @click="cancel"
          >{{ cancelText }}
        </span>
        <span class="confirm-btn" v-if="confirmBtn" @click="confirm">{{
          confirmText
        }}</span>
        <span
          class="confirm-btn else-btn"
          v-if="elseBtn"
          @click="elseConfirm"
          >{{ elseText }}</span
        >
        <slot age="10000" name="more"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useHandler } from "./hooks";

const props = withDefaults(
  defineProps<{
    title: string;
    width: string;
    height: string;
    cancelBtn: boolean;
    resetBtn: boolean;
    layerBtn: boolean;
    confirmBtn: boolean;
    elseBtn: boolean;
    close: boolean;
    showBtn: boolean;
    confirmText: string;
    elseText: string;
    cancelText: string;
    showMask: boolean;
    moveLeft: string;
    moveTop: string;
    visible?: boolean; // v-model 绑定值
    isDrage: boolean; // 是否可拖动
  }>(),
  {
    title: "弹出框标题",

    //控制查看按钮是否显示
    width: "80",
    height: "30",
    //取消按钮是否显示
    cancelBtn: true,
    //重置按钮是否显示

    resetBtn: false,
    layerBtn: false,

    confirmBtn: true,
    //确认按钮是否显示
    elseBtn: false,
    //其他按钮
    default: true,
    //关闭按钮
    close: true,
    //是否显示菜单
    showBtn: true,

    //是否显示菜单
    confirmText: "确定",
    elseText: "预览",
    //是否显示菜单
    cancelText: "取消",

    showMask: false,
    moveLeft: "50%",
    moveTop: "50%",
    visible: false,
    isDrage: true, // 是否可拖动
  }
);

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "reset", e: MouseEvent): void; //点击事件
  (event: "confirm", e: MouseEvent): void; //点击事件
  (event: "cancel", e: MouseEvent): void; //点击事件
  (event: "elseConfirm", e: MouseEvent): void; //其他按钮点击事件
  (event: "mouseModalDown", e: MouseEvent): void; //点击事件
}>();
// let data1=toRefs(props)
const dialogRef = ref();
const dataRef = {
  dialogRef: dialogRef,
};
const {
  confirm,
  elseConfirm,
  cancel,
  isShowMask,
  mouseModalDown,
  dialogIsDown,
  moveLeft,
  moveTop,
} = useHandler(props, emit, dataRef);
</script>
<style lang="less" scoped>
</style>
