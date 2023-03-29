// emits
export interface Emits {
  (event: 'click', e: MouseEvent): void; //点击事件
  (event: 'reset', e: MouseEvent): void; //点击事件
  (event: 'confirm', e: MouseEvent): void; //点击事件
  (event: 'cancel', e: MouseEvent): void; //点击事件
  (event: "elseConfirm", e: MouseEvent): void; //其他按钮点击事件
  (event: 'mouseModalDown', e: MouseEvent): void; //点击事件
}

// props
export interface Props {
  title: string,
  width: string,
  height: string,
  cancelBtn: boolean,
  resetBtn: boolean,
  layerBtn: boolean,
  confirmBtn: boolean,
  elseBtn: boolean;
  close: boolean,
  showBtn: boolean,
  confirmText: string,
  elseText: string,
  cancelText: string,
  showMask: boolean,
  moveLeft: string,
  moveTop: string,
  backgroundColor: string,
  isDrage: boolean, // 是否可拖动
}