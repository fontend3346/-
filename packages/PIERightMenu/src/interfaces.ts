// emits
export interface Emits {
  (event: "menuClick", e: MouseEvent): void;
  (event: "menuChildrenClick", e: MouseEvent, item: any): void;
}

// props
export interface Props {
  left: number;
  top: number;
  menuShow: boolean;
  menuList: any;
  isFlag: any;
}