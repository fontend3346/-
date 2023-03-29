// emits
export interface Emits {
  (event: "click", e: MouseEvent): void; //点击事件
  (event: "change", e: MouseEvent): void;
  (event: "changeValue", e: MouseEvent): void;
}

// props
export interface Props {
  selectValue: any,
  titleName: string,
  selectDataList: any,
}

