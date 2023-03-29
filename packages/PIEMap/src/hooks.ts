import { onMounted } from "vue";
import { Emits, Props } from "./interfaces";
import BaseMap from "@/core/PIEEarth/BaseMap";
import VectorLayers from "@/core/PIEEarth/VectorLayers";

declare global {
  interface Window {
    owecanvas: any;
  }
}

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  let baseMapObj: any = null;
  // 点击事件
  const onClick = (e: MouseEvent) => {
    emit("click", e);
    emit("onload", e);
    // addLayers();
  };

  const initMap = async () => {
    try {

      baseMapObj = new BaseMap(props.options);
      await baseMapObj.initMap();

      emit("onload", baseMapObj.getViewer());
      // nextTick(() => {
      //   console.log(BaseMapObj.initMap())
      // })
    } catch (error: any) {
      if (error.message === "SharedArrayBuffer is not defined") {
        emit("navigatorWarnShow", true);
      }
      throw new Error(error);
    }
  };
  //鼠标滑动事件
  const mousewheelEvent = () => {
    emit("mousewheelEvent");

  }
  const addLayers = () => {
    baseMapObj.addLayer();
    // let VectorLayer = new VectorLayers(baseMapObj.viewer);
    // VectorLayer.addLayer();
  };
  const zoomIn = () => {
    baseMapObj.zoomIn();
  };

  const zoomOut = () => {
    baseMapObj.zoomOut();
  };
  const doubleClick = (e: any) => {
    baseMapObj.doubleClickLocate(e);
  };
  onMounted(() => {
    window.owecanvas = document.getElementById("canvas");
    initMap();
  });

  return { onClick, addLayers, zoomIn, zoomOut, doubleClick, mousewheelEvent };
};
