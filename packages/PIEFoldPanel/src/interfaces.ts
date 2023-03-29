// emits
export interface Emits {
  (event: "handleChange", e: MouseEvent): void;
}

// props
export interface Props {
  options: any;
  isShow: boolean;
}
