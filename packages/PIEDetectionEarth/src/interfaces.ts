// emits
export interface Emits {
  (event: "search", e: any): void;
  (event: "reset"): void;
  (event: "drawEvent", type: string): void;
  (event: "searchTypeChange", type: string): void;
}

// props
export interface Props {
  curDraw: string;
  locationList: any;
}
