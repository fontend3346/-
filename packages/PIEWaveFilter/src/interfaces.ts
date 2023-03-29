// emits
export interface Emits {
  (event: 'click', e: MouseEvent): void; //点击事件
  (event: 'reset', e: MouseEvent): void; //点击事件
  (event: 'confirm', e: MouseEvent): void; //点击事件
  (event: 'cancel', e: MouseEvent): void; //点击事件
  (event: 'mouseModalDown', e: MouseEvent): void; //点击事件
  (event: 'headerClick', e: MouseEvent): void; //点击事件
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
  close: boolean,
  showBtn: boolean,
  confirmText: string,
  cancelText: string,
  showMask: boolean,
  moveLeft: string,
  moveTop: string,
  isDrage: boolean;
}