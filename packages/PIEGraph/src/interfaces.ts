// emits
export interface Emits {
  (event: "clickGraph", e: MouseEvent): void;
}

// props
export interface Props {
  text: string;
  subtext: string;
  left: any;
  top: any;
  textStyle: any;
  subtextStyle: any;
  data: any;
  radius: any;
  color: any;
  option: any
}
