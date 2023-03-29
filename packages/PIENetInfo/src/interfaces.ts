// emits
export interface Emits {
  (event: "cancel"): void;
  (event: "update:visible", e: boolean): void;
  (event: "clickSubjectbox", item: any): void;
}

// props
export interface Props {
  equipmentList: any;
}
