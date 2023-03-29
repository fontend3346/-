declare global {
  interface Window {
    PIE: any;
  }
}
const PIE = window.PIE;
class LayerManager {
  public viewer: any;
  public globeControl: any;
  public globe: any;
  public eventsManager: any;
  constructor(viewer: any) {
    this.viewer = viewer;
    this.globeControl = viewer.getGlobeControl();
    this.globe = this.globeControl.getGlobe();
    this.eventsManager = viewer.eventsManager;
  }

  getLayersAll() {
    const layerResultArr = [];
    for (let i = 0; i < this.globe.getLayerCount(); i++) {
      const layer = this.globe.getLayerAt(i);
      const parent = layer.getParent();
      //先添加根节点
      if (parent === null) {
        layerResultArr.push({
          id: i,
          icon: "",
          label: layer.getName() ? layer.getName() : "未命名图层",
          rename: false,
          layer: layer,
          children: [],
        });
      }
    }

    for (let i = 0; i < layerResultArr.length; i++) {
      this.getChildNode(layerResultArr[i]);
    }
    return layerResultArr;
  }
  getLayersEditLsit() {
    //获取编辑图层列表
    const layerResultArr = [];
    for (let i = 0; i < this.globe.getLayerCount(); i++) {
      const layer = this.globe.getLayerAt(i);
      let layerType = layer.getType();
      if (
        layerType == PIE.GlobeLayerType.BaseFeature ||
        layerType == PIE.GlobeLayerType.Feature ||
        layerType == PIE.GlobeLayerType.Graphics ||
        layerType == PIE.GlobeLayerType.Renderable
      ) {
        const parent = layer.getParent();
        //先添加根节点
        if (parent === null) {
          layerResultArr.push({
            id: i,
            icon: "",
            label: layer.getName() ? layer.getName() : "未命名图层",
            rename: false,
            layer: layer,
            children: [],
          });
        }
      }

      for (let i = 0; i < layerResultArr.length; i++) {
        this.getChildNode(layerResultArr[i]);
      }
    }
    return layerResultArr;
  }

  // 获取图层
  getChildNode(nodeItem?: any) {
    const layerResult: any = nodeItem;
    const count = this.globe.getLayerCount();
    for (let i = 0; i < count; i++) {
      // debugger
      const layer = this.globe.getLayerAt(i);
      if (layer.getParent() && layer.getParent().handle) {
        if (layer.getParent().handle === layerResult.layer.handle) {
          const obj: any = {
            id: i,
            icon: "",
            label: layer.getName() ? layer.getName() : "未命名图层",
            layer: layer,

            rename: false,
            children: [],
          };
          this.getChildNode(obj);
          layerResult.children.push(obj);
        }
      }
    }
    return layerResult;
  }
}

export default LayerManager;
