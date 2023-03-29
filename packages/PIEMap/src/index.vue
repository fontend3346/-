<template>
  <!--<div class="earth-container">-->
  <!--<canvas id="canvas" @dblclick="doubleClick" @contextmenu.prevent></canvas>-->
  <!--<div class="zoom-in">-->
  <!--&lt;!&ndash; <PIEButton @click="zoomIn"> 缩小</PIEButton> &ndash;&gt;-->
  <!--&lt;!&ndash; <PIEButton @click="addLayers">加载图层</PIEButton> &ndash;&gt;-->
  <!--</div>-->
  <!--</div>-->
  <div id="earth">
    <div id="earthContainer">
      <canvas
        id="canvas"
        @contextmenu.prevent
        @mousewheel="mousewheelEvent"
      ></canvas>
      <div class="zoom-in"></div>
    </div>
    <div id="mapboxContainer"></div>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "onload", e: MouseEvent, baseMapObj: any): void;
  (event: "doubleClick", e: MouseEvent): void;
  (event: "navigatorWarnShow", e: MouseEvent, value: Boolean): void; // 判断浏览器警告是否显示
  (event: "mousewheelEvent"): void; // 判断浏览器警告是否显示
}>();

const props = withDefaults(
  defineProps<{
    options: any;
  }>(),
  {
    options: {
      zoom: 4,
    },
  }
);

// const props = defineProps({q'AAAA
//   options: {
//     type: Object,
//   }
// })
const { onClick, addLayers, zoomIn, zoomOut, doubleClick, mousewheelEvent } =
  useHandler(props, emit);
defineExpose({ zoomOut, zoomIn, addLayers });
</script>
