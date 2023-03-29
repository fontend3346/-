// emits
export interface Emits {
  (event: "click", e: MouseEvent): void; //点击事件
  (event: "onload", e: MouseEvent): void; //点击事件
  (event: "doubleClick", e: MouseEvent): void; //双击事件
  (event: "navigatorWarnShow", e: MouseEvent, value: Boolean): void; // 判断浏览器警告是否显示
  (event: "mousewheelEvent"): void; // 判断浏览器警告是否显示
}

// props
export interface Props {
  options: Object;
}
// export interface Props {
//   modelValue: boolean
//   size: string
//   activeColor: string
//   inactiveColor: string
//   async: boolean
//   disabled: boolean
// }
