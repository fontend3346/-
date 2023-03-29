// emits
export interface Emits {
  (event: "checkFn", e: MouseEvent): void;
  (event: "enlargeFn", e: MouseEvent): void;
  (event: "reduceFn", e: MouseEvent): void;
  (event: "checkLayer", e: MouseEvent): void;
  (event: "coverageList", e: MouseEvent): void;
  (event: "allStatisticsClick", e: MouseEvent): void;
  (event: "resetFn", e: MouseEvent): void;
  (event: "thematicMapFn", e: MouseEvent): void;
}

// props
export interface Props {
  curTool: any;
  coverageList: any;
  coverageShow: Boolean;
  allStatiShow: Boolean;
  resetMap: Boolean;
  thematicMap: boolean;
}
