
// props
export interface Props {
  showInstrument: boolean;
  title: string;
  equipmentArr: any;
  showEchartsValue: boolean;
  width: number;
  height: number;
  moveLeft?: string;
  moveTop?: string;
  isShowFlage: any;
  facilityId: any;
}
// emits
export interface Emits {
  (event: "calcelInstrument", isShowFlage: boolean): void;
  (event: "equipmentChange", item: any): void;
  (event: "bandConfirm", row: any, xRange: any, waveData: any): void;
  (event: "echartDragOne", e: MouseEvent): void;
    (event: "historyTimeFun", e: any): void;
  (event: "historyCancel", e: any): void;
  (event: "historyWeave", e: any): void;
}

