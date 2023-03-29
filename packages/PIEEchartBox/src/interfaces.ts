// emits
export interface Emits {
  (event: "echartDrag", seleteList: any, params: any): void;
  (event: "click", e: any): void;
}

// props
export interface Props {
  options: any;
  seleteList: any;
  startIndex: any;
  endIndex: any;
}
