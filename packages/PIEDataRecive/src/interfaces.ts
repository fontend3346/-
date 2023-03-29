// emits
export interface Emits {
  (event: "clickTotal", e: MouseEvent): void; //点击事件
}
// props
export interface Props {
  optionThr: any;
  optionFive: any;
  tableData: any;
  fields: any;
  totalActive: any;
  timeTotal: any;
  title: string;
}
