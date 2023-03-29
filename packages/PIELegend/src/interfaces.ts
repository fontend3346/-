// emits
export interface Emits {
  (event: "click", e: MouseEvent): void;
  (event: "close", e: MouseEvent): void;
}

// props
export interface Props {
  options: Array<object>;
}
