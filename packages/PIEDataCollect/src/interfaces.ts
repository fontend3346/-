// emits
export interface Emits {
  (event: "click", e: MouseEvent): void;
  (event: "handleSizeChange", e: MouseEvent): void;
  (event: "deviceNameChange", e: MouseEvent): void;
  (event: "handleSizeChangeCopy", e: MouseEvent): void;
  (event: "handleNumChange", e: MouseEvent): void;
  (event: "handleNumChangeCopy", e: MouseEvent): void;
  (event: "activeOpen", e: MouseEvent): void;
  (event: "confirmStartUse", e: MouseEvent): void;
  (event: "logFun", e: MouseEvent): void;
  (event: "waveformFun", e: MouseEvent): void;
  (event: "activeDown", e: MouseEvent): void;
  (event: "rowClick", e: MouseEvent): void;
  (event: "rowClickOne", e: MouseEvent): void;
  (event: "moreClick", e: MouseEvent): void;
  (event: "searchOne", e: MouseEvent): void;
  (event: "searchTwo", e: MouseEvent): void;
  (event: "provinceChange", e: MouseEvent): void;
  (event: "taiwaneseChange", e: MouseEvent): void;
  (event: "stationsChange", e: MouseEvent): void;
  (event: "equipmentChange", e: MouseEvent): void;
  (event: "deleteReceive1", e: MouseEvent): void;
}

// props
export interface Props {
  deviceName: string;
  mainTitle: string;
  selectList: any;
  tableData: any;
  tableDataCopy: any;
  fields: any;
  fieldsCopy: any;
  pageTotal: number;
  pageNum: number;
  pageSize: number;
  isTableShow: any;
  isSpecilShow: any;
  provinceValue: any;
  provinceList: any;
  taiwaneseValue: any;
  taiwaneseList: any;
  stationsValue: any;
  equipmentValue: any;
  stationsList: any;
  equipmentList: any;
  pageTotalCopy: number;
  pageSizeCopy: number;
  pageNumCopy: number;
}
