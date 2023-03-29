// emits
export interface Emits {
  (event: "click", e: MouseEvent): void; //点击事件
  (event: "selectActive", e: MouseEvent): void; //点击事件
  (event: "searchClick", e: MouseEvent): void;
  (event: "subscribeClick", e: MouseEvent): void;
  (event: "buttonClick", e: MouseEvent): void;
  (event: "changeValue", e: MouseEvent): void;
  (event: "changeDate", e: MouseEvent): void;
  (event: "changeRadiusValue", e: MouseEvent): void;
  (event: "changeValueOne", e: MouseEvent): void;
}

// props
export interface Props {
  selectValue: any;
  titleName: string;
  selectDataList: any;
  stationLists: any;
  energyValue?: any;
  selectButtonValue: number;
  showBtn?: boolean; // 按钮是否显示
  showTitle?: boolean; // 标题显示
  showTime?: boolean; // 日期显示
  showSelect?: boolean; // 单选显示
  showStation?: boolean; // 台站显示
  showSource?: boolean; // 单选单个显示
  sourceList: any;
  showButton: boolean; // 底部自定义按钮
  showSearch: boolean; // 底部查询按钮
  textButton: string; // 自定义按钮文字
}

