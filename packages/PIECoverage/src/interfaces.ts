// emits
export interface Emits {
  (event: "selectChange", e: MouseEvent): void;
}

// props
export interface Props {
  options: Array<object>;
  coverageList: Array<object>;
}
