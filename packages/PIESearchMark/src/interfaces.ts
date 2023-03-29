// emits
export interface Emits {
  (event: "search", e: any): void;
  (event: "updateInfo", e: MouseEvent): void;
  (event: "submitForm", e: MouseEvent): void;
  (event: "loadIcon", e: MouseEvent): void;
  (event: "configInfo", e: MouseEvent): void;
  (event: "reset"): void;
  (event: "drawEvent", type: string): void;
  (event: "searchTypeChange", type: string): void;
}

// props
export interface Props {
  valueData: any;
  showInfo: boolean;
  showUpdate: boolean;
  addInfoHttpList: any;
  agreementMap: any;
  curDraw: string;
}
