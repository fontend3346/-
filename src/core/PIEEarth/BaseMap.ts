declare global {
  interface Window {
    PIE: any;
    Module: any;
    createEarthModule: any;
    PIETWEEN: any;
    THREE: any;
    PIETHREE: any;
  }
}

const PIE = window.PIE;
const createEarthModule = window.createEarthModule;
const PIETWEEN = window.PIETWEEN;

class BaseMap {
  public option: Object = {
    canvas: "canvas",
    zoom: 3,
    dimensionMode: PIE.DimensionMode.D3D,
    sceneMode: PIE.SceneMode.Sphere, // Plane
    autoProjection: true,
    center: [116.4, 39.9],
    preserveDrawingBuffer: true, //用于导出图片\
    rasterDataSource: {
      epsg: 4326
    }
  };
  public viewer: any;
  public globe: any;

  public featureLayer: any = null;

  constructor(options: Object) {
    //传递参数累加
    this.option = { ...this.option, ...options };
    // this.viewer =
  }

  //地图初始化
  initMap() {
    return new Promise((resolve) => {
      if (window.Module == null || window.Module == undefined) {
        createEarthModule(/* optional default settings */).then((res: Object) => {
          this.viewer = new PIE.GlobeViewer(this.option);
          this.globe = this.viewer.getGlobe();
          this.globe.setMinZoom(3);
          // this.globe.refresh(false, false);
          resolve(this.viewer);
        });
      } else {
        this.viewer = new PIE.GlobeViewer(this.option);
        this.globe = this.viewer.getGlobe();
        this.globe.setMinZoom(3);
        // this.globe.refresh(false, false);
        resolve(this.viewer);
      }

    });
  }
  getViewer() {
    return this.viewer;
  }

  /** 场景放大 **/
  zoomOut() {
    let scale = this.globe.getScale();
    this.globe.setScale(2 * scale);
    this.globe.refresh(false, false);
    // let zoom = this.globe.getZoom()
    // this.globe.refresh(false, false);
    //
    // if (zoom < 60) {
    //   zoom++;
    //   this.globe.setZoom(zoom);
    //   this.globe.refresh(true, false);
    // }
  }

  /** 场景 *缩小*/
  zoomIn() {
    let scale = this.globe.getScale();
    this.globe.setScale(0.5 * scale);
    this.globe.refresh(false, false);
    /**获取当前缩放级别**/
    // let zoom = this.globe.getZoom();
    // if (zoom >= 1) {
    //   zoom--;
    //   this.globe.setZoom(zoom);
    //   this.globe.refresh(true, false);
    // }
  }
  addLayer() {
    let globe = this.viewer.getGlobe();
    let workspace = globe.getDocument(); //获取工作空间
    let featureDataSource = new PIE.GSFDataSource();
    featureDataSource.load({ gsfUrl: "data/Provinces_R.gsf" }).then(() => {
      workspace.getDataSourceManager().addDataSource(featureDataSource); //添加数据源
      if (this.featureLayer == null) {
        /**创建风格**/
        let vectorStyle = new PIE.VectorStyle({
          lineColor: [255, 0, 0, 255],
          lineWidth: 1,
          fillColor: [0, 255, 0, 255],
        });
        /**创建渲染器**/
        let featureRenderer = new PIE.SimpleFeatureRenderer();
        featureRenderer.setStyle(vectorStyle);
        this.featureLayer = new PIE.GlobeFeatureLayer();
        this.featureLayer.setDataSource(featureDataSource);
        this.featureLayer.setRenderer(featureRenderer);
        globe.addLayer(this.featureLayer, true);
        globe.refresh(true, false);
      }
    });
  }

  /**
   * 双击定位
   * @param e - 鼠标事件对象
   * */
  doubleClickLocate(e: any) {
    let devicePoint = this.viewer.getGlobeControl().getMousePosition(e);
    devicePoint = [devicePoint.x, devicePoint.y];
    let mapPoint = this.globe.deviceToMap(devicePoint);
    let geoPoint = this.globe.mapToGeo(mapPoint);
    let moveToTween = PIETWEEN.TweenCamera.moveToTween(
      this.globe,
      geoPoint.x,
      geoPoint.y,
      PIETWEEN.Easing.Quadratic.Out,
      1000
    );
    moveToTween.start();
    this.viewer
      .getGlobeControl()
      .getPreRender()
      .addEventListener(() => {
        PIETWEEN.update();
      });
  }
}

export default BaseMap;
