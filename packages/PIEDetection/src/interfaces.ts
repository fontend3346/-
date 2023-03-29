// emits
export interface Emits {
  (event: "search", e: any): void;
  (event: "reset"): void;
  (event: "drawEvent", type: string): void;
  (event: "searchTypeChange", type: string): void;
  (event: "netWorkStation", type: string): void;
}

// props
export interface Props {
  disciplineTypeList: any;
  stationTypeList: any;
  pieDetection: Boolean;
  curDraw: string;
}
