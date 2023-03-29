// emits
export interface Emits {
  (event: "click", e: MouseEvent): void; //点击事件
  (event: "selectActive", e: MouseEvent): void; // 按钮点击事件
}

// props
export interface Props {
  stationList: any,
  titleName: string,
  iconName: string,
  showStation: boolean,
}

