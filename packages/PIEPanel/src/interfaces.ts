// emits
export interface Emits {
  (event: "click", e: MouseEvent): void; //点击事件
  (event: "reset", e: MouseEvent): void; //点击事件
  (event: "confirm", e: MouseEvent): void; //点击事件
  (event: "mouseModalDown", e: MouseEvent): void; //点击事件
  (event: "cancel", e: MouseEvent): void; //点击事件
  (event: "selectedClick", e: MouseEvent): void;
  (event: "update:visible", e: boolean): void;
}

// props
export interface Props {
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
}
