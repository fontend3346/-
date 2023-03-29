// emits
export interface Emits {
  (event: "timeValChange", e: MouseEvent): void;
  (event: "aisleChange", e: MouseEvent): void;
  (event: "upArrows", e: MouseEvent): void;
  (event: "downArrows", e: MouseEvent): void;
  (event: "amplitude", e: MouseEvent): void;
  (event: "directionChange", e: MouseEvent): void;
  (event: "cancel", e: MouseEvent): void;
}

// props
export interface Props {
  echartsData: any;
  echartTtitle: any;
  timeValArry: any;
  aisleList: any;
  eventNum: any;
  directionList: any;
  directionValue: any;
  boxingvw: any; //波形宽度
}
