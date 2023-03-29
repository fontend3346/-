// emits
export interface Emits {
  (event: "delInfo", e: MouseEvent): void;
  (event: "updateInfo", e: MouseEvent): void;
  (event: "submitForm", e: any, id: any): void;
  (event: "loadIcon", e: MouseEvent): void;
  (event: "configInfo", e: MouseEvent): void;
  (event: "cancel", e: MouseEvent): void;
}

// props
export interface Props {
  valueData: any;
  showInfo: boolean;
  showModal: boolean;
  showUpdate: boolean;
  addInfoHttpList: any;
  agreementMap: any;
  isConfig: boolean;
  pointData: any;
  id: any;
  close: boolean;
}
