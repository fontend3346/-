// emits
export interface Emits {
  (event: "cancel", e: MouseEvent): void; //点击事件
  (event: "update:visible", e: boolean): void;
}

// props
export interface Props {
  visible?: boolean; // v-model 绑定值
  close?: boolean;
}
