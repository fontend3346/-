interface Etypes {
  [key: string]: number;
}

// 定义事件类型（类型名称采用大驼峰写法，命名以“事件名+Event”结束，事件类型的value值从1001开始，且不得以_开头命名，避免和框架里已定义的事件类型冲突）
const EventTypes: Etypes = {
  OpenExamplePanelEvent: 1001,
  CreateOSGBLayerEvent: 1002,
  PointPanelEvent: 1003,
  // RoamEvent:1004,
  // AreaZoomInEvent: 1005,
  // AreaReductionEvent: 1006,
  layerChanged: 1007,

  piePanelClose: 1008,
  EditLayerChangedEvent: 1009, //编辑图层下拉变化事件
  layerManagerChanged: 1010, //当图层管理中图层发生变化
};

Object.freeze(EventTypes);

export default EventTypes;
