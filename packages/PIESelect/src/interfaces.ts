// emits
export interface Emits {
  (event: "cancelSelect", e: MouseEvent): void;
  (event: "handleClick", e: MouseEvent): void;
  (event: "networkChange1", e: MouseEvent): void;
  (event: "stationNetworkChange", e: MouseEvent): void;
  (event: "netCodeChange", e: MouseEvent): void;
  (event: "foreignChang", e: MouseEvent): void;
  (event: "networkChange", e: MouseEvent): void;
  (event: "stationChildChange", e: MouseEvent): void;
  (event: "stationEquipChange", e: MouseEvent): void;
  (event: "equipNetworkChange", e: MouseEvent): void;
  (event: "stationCodeChange", e: MouseEvent): void;
  (event: "subjectListChange", e: MouseEvent): void;
  (event: "inputChange", e: MouseEvent): void;
  (event: "queryDeviceName", e: MouseEvent): void;
  (event: "deviceCodeChange", e: MouseEvent): void;
  (event: "TestSelect", e: MouseEvent): void;
  (event: "stationSelect", e: MouseEvent): void;
  (event: "subjectTypeChange", e: MouseEvent): void;
  (event: "equipmentTypeChange", e: MouseEvent): void;
  (event: "statinoTypeClick", e: MouseEvent): void;
  (event: "isShowSearch", e: MouseEvent): void;
  (event: "subjectTypeClick", e: MouseEvent): void;
  (event: "cutFun", e: MouseEvent): void;
}

// props
export interface Props {
  facility: boolean;
  activeName: any;
  roleLevel: number;
  selectNetwork: any;
  selectNetList: any;
  foreignValue: any;
  foreignList: any;
  selectStationPro: any;
  stationChild: any;
  stationChildList: any;
  subjectListList: any;
  stationTypeAll: any;
  stationChildList2: any;
  deviceList: any;
  watchPoint: any;
  equipmentCode: any;
  stationTableList: any;
  stationColumns: any;
  stationTableShow: boolean;
  seePointShow: boolean;
  subjectTypeList: any;
  equipmentTypeList: any;
  stationTotalInfo: Object;
}
