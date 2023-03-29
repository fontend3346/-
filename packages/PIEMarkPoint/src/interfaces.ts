// emits
export interface Emits {
  (event: "delInfo", e: MouseEvent): void;
  (event: "updateInfo", e: MouseEvent): void;
  (event: "submitForm", e: MouseEvent): void;
  (event: "loadIcon", e: MouseEvent): void;
  (event: "configInfo", e: MouseEvent): void;
}

// props
export interface Props {
  valueData: any;
  showInfo: boolean;
  showUpdate: boolean;
  addInfoHttpList: any;
  agreementMap: any;
}
