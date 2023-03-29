// import MapboxDraw from "@mapbox/mapbox-gl-draw";
// const MapboxDraw = require("@mapbox/mapbox-gl-draw");
// import MapboxDraw from 'mapbox-gl-draw';
// let StaticMode = require("@mapbox/mapbox-gl-draw-static-mode");
import { ref } from 'vue'
import StaticMode from '@mapbox/mapbox-gl-draw-static-mode';

let flag = ref<boolean>(true)
let MapboxDraw = (window as any).MapboxDraw
// import DrawRectangle from "./DrawRectangle.js";
let modes = MapboxDraw.modes;
modes.static = StaticMode;

//   绘制圆
// modes.draw_circle = mapboxGlDrawCircle.CircleMode;
// let modes = MapboxDraw.modes;
// modes.draw_rectangle = DrawRectangle;
//基础绘制类
class BasePlot {
  map: any;
  draw: any
  constructor(map: any) {
    // this.map = map;
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      userProperties: true,
      modes: modes
    });
    // this.map.addControl(this.draw, "bottom-left");
    this.initMap(map)
    // this.map.addControl(additionalTools(this.draw), "bottom-right");
    // this.draw.modes.DIRECT_SELECT === 'direct_select'

  }
  // 重置地图对象
  initMap(mapobj: any) {
    this.map = mapobj
    this.map.addControl(this.draw, "bottom-left");
  }
  //地图绘制
  mapDraw(drawType: string, callBack: any) {
    flag.value = true
    if (drawType == "draw_polygon") {
      this.draw.changeMode("draw_polygon");
    } else if (drawType === "draw_point") {
      this.draw.changeMode("draw_point");
    } else if (drawType === "draw_line_string") {
      this.draw.changeMode("draw_line_string");
    } else if (drawType === "direct_select") {
      this.draw.changeMode("direct_select");
      // this.draw.changeMode("direct_select", { featureId: "base-map" });
    } else if (drawType === "simple_select") {
      this.draw.changeMode("simple_select");
    } else if (drawType === "draw_rectangle") {
      this.draw.changeMode("draw_rectangle");
    }
    else if (drawType === "drag_circle") {
      this.draw.changeMode("drag_circle");
    }
    // document
    //   .querySelector(".mapbox-gl-draw_union")
    //   ?.addEventListener("click", () => {
    //     // console.log(this.draw.getSelected(), "getSelected");
    //   });
    this.map.off("draw.create");

    this.map.once("draw.create", e => {
      // this.map.once("draw.create", e => {
      //获取所有绘制
      let data = this.draw.getAll();
      if (flag.value) {
        console.log("draw.create");
        callBack({
          allReslut: data,
          currentReslut: e
        });
        flag.value = false
      }

    });
    this.map.on("draw.update", e => {
      console.log("draw.update");
      //获取所有绘制
      var data = this.draw.getAll();
      callBack({
        allReslut: data,
        currentReslut: e
      });
    });
    // this.map.on("draw.create", this.createFeature);
    // this.map.on("draw.delete", this.createFeature);
    // this.map.on("draw.update", this.createFeature);
  }

  //删除
  delete() {
    this.draw.getSelectedIds().forEach(element => {
      debugger
      this.draw.delete(element);
    });
  }
}
export default BasePlot;
