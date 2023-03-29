// emits
export interface Emits {
  (event: "manage", row: any): void;
  (event: "sourceManage", row: any): void;
  (event: "limit", row: any): void;
  (event: "group", row: any): void;
  (event: "dynamicBtn", row: any, index: any, item: any): void;
  (event: "look", row: any): void;
  (event: "edit", row: any): void;
  (event: "operate", row: any): void;
  (event: "deleted", row: any): void;
  (event: "deletedPopout", row: any): void;
  (event: "titleClicks", row: any): void;
  (event: "contentFun", row: any): void;
  (event: "editSpal", row: any): void;
  (event: "recallClicks", row: any): void;
  (event: "auditClicks", row: any): void;
  (event: "submit", row: any): void;
  (event: "detail", row: any): void;
  (event: "on-current-change", currentRow: any, oldCurrentRow: any): void;
  (event: "on-select", selection: any, row: any): void;
  (event: "on-select-cancel", selection: any, row: any): void;
  (event: "on-selection-change", row: any): void;
  (event: "on-sort-change", column: any, key: any, order: any): void;
  (event: "on-filter-change", row: any): void;
  (event: "on-row-click", row: any, index: any): void;
  (event: "on-row-dblclick", row: any, index: any): void;
  (event: "on-expand", row: any, status: any): void;
  (event: "confirmDelete", row: any): void; //确定删除
  (event: "downRow", row: any): void; // 下载按钮
  (event: "replyRow", row: any): void; // 批复按钮
  (event: "activeOpen", row: any): void; // 激活按钮
  (event: "confirmStartUse", row: any): void;
}

// props
export interface Props {
  action: string; // 自定义行的名称
  border: boolean;
  deleteTitle: string; // 删除标题描述
  deleteLabel: string; // 删除
  showIndex: boolean; //是否显示序号列(从1开始)
  isAction: boolean;
  isTableShow: boolean;
  isSpecilShow: boolean;
  showCheckbox: boolean; //是否显示多选框
  data: any; // 表格数据
  objectSpanMethod: any;
  lookBtn: boolean; //查看按钮是否显示
  editBtnIcon: boolean;
  deleteBtnIcon: boolean;
  detailBtnIcon: boolean;
  editBtn: boolean; //编辑按钮是否显示
  deleteBtn: boolean; //编辑按钮是否显示
  deleteSpecialBtn: boolean;
  setBtnText: string;
  operateBtn: boolean; //操作按钮是否显示
  columns: any; // 表头
  operationWidth: any; // 操作列宽度
  loading: boolean;
  maxHeight: string;
  detailBtn: boolean;
  deleteBtnPopout: boolean;
  dynamicBtnName: any;
  dynamicShow: boolean;
  actionSlot: boolean;
}
