// emits
export interface Emits {
  (event: "handleSizeChange", e: MouseEvent): void;
  (event: "handleNumChange", e: MouseEvent): void;
}

// props
export interface Props {
  smallSize: boolean;
  isSmall: boolean; //是否为小型
  currentPage: number; //目前选中的页数
  pageSize: number; //每页显示的条数
  total: any; //总数
  background: boolean; //是否有背景颜色
  prevText: string; //替代图标显示的上一页文字
  nextText: string; //替代图标显示的下一页文字
  pagerCount: number;
}
