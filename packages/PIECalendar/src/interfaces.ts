// emits
export interface Emits {
  (event: "dblclick", data: any, currentContent: any): void;
  (event: "monthChange", data: any): void;
  (event: "dateChange", data: any): void;
}

// props
export interface Props {
  allDateContent: any;
}
