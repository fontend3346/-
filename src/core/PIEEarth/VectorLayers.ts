// import BaseMap from "./BaseMap";
declare global {
  interface Window {
    PIE: any;
  }
}
const PIE = window.PIE;
class VectorLayers {
  public featureLayer: any = null;
  options: Object;
  viewer: any;
  globe: any;
  globeEditor: any;
  globeControl: any;
  destory: boolean;
  constructor(viewer: any) {
    this.viewer = viewer;
    // this.viewer = VectorLayers.viewer;
    this.options = {};
    this.globe = viewer.getGlobe();
    this.globeControl = viewer.getGlobeControl();
    this.globeEditor = this.globeControl.getGlobeEditor();
    this.featureLayer = new PIE.GlobeFeatureLayer();
    this.destory = false;
  }
  // 添加点
  addPoint(featureCollection, options: any) {
    let optionGeo = {
      jsonData: featureCollection,
      alias: options.layerId,
    };
    if (!this.globe) { return }
    let workspace = this.globe.getDocument();
    let dataSource = new PIE.GeoJsonDataSource();
    let symbolLib = workspace.getSymbolLib();
    let symbolGroup = symbolLib.getGroup(PIE.SymbolGroupType.Icon);
    let featureLayer = new PIE.GlobeFeatureLayer();
    let iconSymbol = new PIE.IconSymbol();

    let globalLayer = this.globe.getLayer(options.layerId);
    // 如果图层存在，移除原来的图层，添加新图层
    if (globalLayer) {
      this.globe.removeLayer(globalLayer);
    }
    featureLayer.setName(options.layerId);
    // 符号加载
    iconSymbol.load(options.optionIcon).then((val) => {
      if (!this.globe) { return }
      symbolGroup.add(val);
      // 数据源加载 geojson数据
      dataSource.loadJsonData(optionGeo).then((value: any) => {
        if (!this.globe) { return }
        workspace.getDataSourceManager().addDataSource(value);
        let textStyle = new PIE.TextStyle();
        textStyle.setForeColor([255, 255, 255, 255]);
        textStyle.setBackColor([255, 255, 255, 255]);
        textStyle.setWidth(14.5);
        textStyle.setHeight(14.5);
        textStyle.setAlign(PIE.TextAlignType.TopCenter);
        let vectorStyle = new PIE.VectorStyle({
          pointType: PIE.PointType.Icon,
          pointStyle: options.optionIcon.id,
          pointSize: [26, 26],
          pointColor: [255, 255, 255, 255],
          altitudeMode: PIE.AltitudeMode.ClampToGround,
        });
        let symbolStyle = new PIE.SymbolStyle();
        symbolStyle.setVectorStyle(vectorStyle);
        symbolStyle.setTextStyle(textStyle);
        let themeLabelFeatureRenderer = new PIE.ThemeLabelFeatureRenderer();
        // themeLabelFeatureRenderer.makeDefault(value);
        themeLabelFeatureRenderer.setTextExpression(options.name);
        themeLabelFeatureRenderer.setStyle(symbolStyle);
        featureLayer.setDataSource(value);
        featureLayer.setRenderer(themeLabelFeatureRenderer);
        featureLayer.setSelectable(true); // 设置图层可选中
        this.globe.addLayer(featureLayer, true);
        this.globe.refresh(true, false);
      });
    });
  }
  // 监听点击事件
  layerClick(callback) {
    this.globeEditor.setHandleVisible(false); // 设置是否显示锚点
    this.globeControl.setGlobeTool(PIE.GlobeToolType.Select); // 设置用户操作类型
    this.globeEditor
      .getSelectedGeometryEvent()
      .addEventListener((layers: any) => {
        for (let layer of layers) {
          if ("getSelection" in layer) {
            let selection = layer.getSelection();
            let idList: any = [];
            for (let i = 0; i < selection.getSize(); i++) {
              let id = selection.getAt(i);
              idList.push(id);
            }
            let dataSource = layer.getDataSource();
            const featureDataSet = dataSource.getDatasetAt(0);
            const featureSet = featureDataSet.queryByIDs(idList);
            const globeControl = this.viewer.getGlobeControl();
            globeControl.onTouchDown(0, 0, 0, 0); // 暂时控制图标不变色使用
            globeControl.onTouchUp(0, 0, 0, 0);
            featureSet.moveFirst();
            while (featureSet.getFeature() && !featureSet.isEOF()) {
              callback(layer, featureSet.toGeojson().properties);
              featureSet.moveNext();
            }
          }
        }
      });
  }
  // 设置图层是否可见
  chageLayer(layerId, visible?) {
    // globeLayer.setVisible
    // console.log(this.globe.getLayer(layerId));
    // 判断是否存在图层
    let layer = this.globe.getLayer(layerId);
    if (!layer) {
      return;
    }
    if (visible !== undefined) {
      layer.setVisible(visible);
      return;
    }
    if (layer.isVisible()) {
      layer.setVisible(false);
    } else {
      layer.setVisible(true);
    }
  }
  // 获取字段
  getFields(dataSet: any) {
    let fieldArr: any = [];
    for (let j = 0; j < dataSet.getFieldCount(); j++) {
      const field = dataSet.getFieldInfoAt(j);
      const tableField: any = field.getFieldName();
      fieldArr.push(tableField);
    }
    return fieldArr;
  }
  // 获取当前图层
  getLayer(layerId) {
    return this.globe.getLayer(layerId);
  }
  // 获取当前图层显隐
  getLayerVisible(layerId) {
    let layer = this.globe.getLayer(layerId);
    return layer.isVisible();
  }
  // 定位
  flyTo(location: any, zoom) {
    //飞行定位
    // const targetLon = Number(location[0]);
    // const targetLat = Number(location[1]);
    // const targetHeight = height ? height : 50000;
    // const time = 3000;
    // GlobeFlyTo(this.globe, targetLon, targetLat, targetHeight, time); //飞行定位
    this.globe.setGeoCenter(location); // 将该坐标设置为场景中心点坐标
    if (zoom) {
      this.globe.setZoom(zoom);
    }
    // this.globe.setZoom(zoom);
    this.globe.refresh(false, false); // 刷新地图窗口
  }
  // 场景放大
  zoomOut() {
    let scale = this.globe.getScale();
    this.globe.setScale(2 * scale);
    this.globe.refresh(false, false);
  }
  // 场景缩小
  zoomIn() {
    let scale = this.globe.getScale();
    this.globe.setScale(0.5 * scale);
    this.globe.refresh(false, false);
  }
  // 二三维切换
  changeMode() {
    if (this.globe.getSceneMode() == 1) {
      this.globe.setSceneMode(2);
    } else {
      this.globe.setSceneMode(1);
    }
    this.globe.setZoom(3);
    // this.globe.setGeoCenter([123.39, 41.44]);
    this.globe.refresh(false, false);
  }
  // 地图打点
  getPoint(resolve) {
    this.globeControl.setGlobeTool(PIE.GlobeToolType.CreatePoint); // 设置新建点工具
    let globeTool = this.globeControl.getGlobeTool(); // 获取当前工具
    let point: any = [];
    globeTool.getResultEvent().addEventListener(function (geometry) {
      let x = geometry.getPoint().x;
      let y = geometry.getPoint().y;
      point = [x, y];
      resolve(point);
    });
  }
  // 结束绘制
  endMeasure() {
    this.globeControl.setGlobeTool(PIE.GlobeToolType.Pan); // 去除绘制点工具
  }
  // 加载边界线
  getBoundary(data: any, color: any, layer: any) {
    let option = {
      jsonData: data,
      alias: layer,
    };
    let colorLine;
    if (color) {
      colorLine = color;
    } else {
      colorLine = [255, 255, 0, 150];
    }
    let dataSource = new PIE.GeoJsonDataSource();
    if (!this.globe) { return }
    let workspace = this.globe.getDocument();
    let featureLayer = new PIE.GlobeFeatureLayer();
    let globalLayer = this.globe.getLayer(option.alias);
    if (globalLayer) {
      this.globe.removeLayer(globalLayer);
    }
    featureLayer.setName(option.alias);
    dataSource.loadJsonData(option).then((value: any) => {
      workspace.getDataSourceManager().addDataSource(value);
      let vectorStyle = new PIE.VectorStyle({
        lineColor: colorLine,
        lineWidth: 2,
      });
      let featureRenderer = new PIE.SimpleFeatureRenderer();
      featureRenderer.setStyle(vectorStyle);
      featureLayer.setDataSource(value);
      featureLayer.setRenderer(featureRenderer);
      this.globe.addLayer(featureLayer, true);
      this.globe.refresh(false, false);
    });
    // let globeLayer = {};
    // const spatialReference = this.globe.getSpatialReference();
    // globeLayer = new PIE.GlobeRenderableLayer();
    // this.globe.addLayer(globeLayer, true);
    // /**创建线集合对象，添加在图层中**/
    // const points: any[] = [];
    // // const arrGeo = geoJson.features[0].geometry.coordinates[0][0];
    // for (let i = 0; i < data.length; i++) {
    //   const pointSR = spatialReference.forward(data[i]);
    //   points.push(pointSR[0]);
    //   points.push(pointSR[1]);
    // }
    // const polyLine = new PIE.Polyline({ points: points, ID: option.id });
    // const renderPolyLine = new PIE.RenderPolyline({
    //   polyline: polyLine,
    //   // color: [255, 0, 0, 255],
    //   // width: 5,
    //   color: option.color,
    //   width: option.width,
    // });
    // globeLayer.add(renderPolyLine);
  }

  // DZ台站学科分类 
  addStationPoints(data: any, layers: any) {
    let seismometryArr: any = []; // 测震 1
    let strongArr: any = []; // 强震 2
    let GNSSArr: any = []; // GNSS 3
    let infrasoundArr: any = []; // 次声 4
    let terrestrialArr: any = []; // 地磁 5
    let gravityArr: any = []; // 重力 6

    let abnormalArr: any = []; // 故障
    let offList: any = []; // 离线
    let warList: any = []; // 告警

    let layersList = layers;
    data.map((item: any) => {
      let status = item.properties.status;
      if (status == 0) {
        if (item.properties.subject_id == 1) {
          // 测震
          seismometryArr.push(item)
        } else if (item.properties.subject_id == 2) {
          strongArr.push(item)
        } else if (item.properties.subject_id == 3) {
          GNSSArr.push(item)
        } else if (item.properties.subject_id == 4) {
          infrasoundArr.push(item)
        } else if (item.properties.subject_id == 5) {
          terrestrialArr.push(item)
        } else if (item.properties.subject_id == 6) {
          gravityArr.push(item)
        }
      } else if (status == 1) {
        // 故障
        abnormalArr.push(item);
      } else if (status == 2) {
        // 告警
        warList.push(item);
      } else if (status == 3) {
        // 离线
        offList.push(item);

      }
    });

    layersList.forEach((item: any, index: any) => {
      switch (item.name) {
        case '测震':
          item.list = seismometryArr;
          break;
        case '强震':
          item.list = strongArr;
          break;
        case 'GNSS':
          item.list = GNSSArr;
          break;
        case '次声':
          item.list = infrasoundArr;
          break;
        case '地磁':
          item.list = terrestrialArr;
          break;
        case '重力':
          item.list = gravityArr;
          break;
        case '故障':
          item.list = abnormalArr;
          break;
        case '离线':
          item.list = offList;
          break;
        case '告警':
          item.list = warList;
          break;
        default:
          break;
      }
    })

    layersList.forEach((item: any, index: any) => {
      let featureCollection = {
        features: item.list,
        type: "FeatureCollection",
      };
      let options = {
        optionIcon: {
          url: item.image,
          id: 15 + index,
          name: "normalImg",
          base64: true,
        },
        layerId: item.layerId,
        name: "name",
      }

      this.addPoint(featureCollection, options);

    })
  }

  // 加载人口专题图
  addThematic(data: any) {
    let optionGeo = {
      jsonData: data,
      alias: 'mapTheme',
    };

    if (!this.globe) { return }
    let workspace = this.globe.getDocument();

    let dataSource = new PIE.GeoJsonDataSource();
    let featureLayer = new PIE.GlobeFeatureLayer();
    let globalLayer = this.globe.getLayer(optionGeo.alias);
    if (globalLayer) {
      this.globe.removeLayer(globalLayer);
    }
    featureLayer.setName(optionGeo.alias);
    dataSource.loadJsonData(optionGeo).then((value: any) => {
      if (!this.globe) { return }
      workspace.getDataSourceManager().addDataSource(value);

      let rangeItemStyles: any = [];
      for (let index = 0; index < 10; index++) {
        let vectorStyle = new PIE.VectorStyle({
          lineColor: [255, 255, 255, 120],
          lineWidth: 0.5,
          fillColor: [255, 255, 255, 120]
        });
        rangeItemStyles.push(vectorStyle);
      }
      rangeItemStyles[0].setForeFillColor([255, 255, 0, 215]);//
      rangeItemStyles[1].setForeFillColor([255, 225, 0, 200]);//
      rangeItemStyles[2].setForeFillColor([255, 200, 0, 200]);//
      rangeItemStyles[3].setForeFillColor([255, 180, 0, 200]);//
      rangeItemStyles[4].setForeFillColor([255, 160, 0, 200]);//
      rangeItemStyles[5].setForeFillColor([255, 130, 0, 200]);//
      rangeItemStyles[6].setForeFillColor([255, 100, 0, 200]);//
      rangeItemStyles[7].setForeFillColor([255, 80, 0, 200]);//
      rangeItemStyles[8].setForeFillColor([255, 40, 0, 200]);//
      rangeItemStyles[9].setForeFillColor([255, 0, 0, 200]);//
      let rangeItems: any = [];
      for (let index = 0; index < 10; index++) {
        let rangeItem = new PIE.RangeItem();
        rangeItem.setVisible(true); //设置图层可见
        rangeItem.setStyle(rangeItemStyles[index]); //设置几何对象风格
        rangeItems.push(rangeItem);
      }
      rangeItems[0].setCaption('0~20万'); //设置分段项标题
      rangeItems[1].setCaption('20~40万');
      rangeItems[2].setCaption('40~60万');
      rangeItems[3].setCaption('60~80万');
      rangeItems[4].setCaption('80~100万');
      rangeItems[5].setCaption('100~200万');
      rangeItems[6].setCaption('200~300万');
      rangeItems[7].setCaption('300~400万');
      rangeItems[8].setCaption('400~2000万');
      rangeItems[9].setCaption('2000万以上');
      /**创建分段专题图渲染器对象**/
      let themeRangeFeatureRenderer = new PIE.ThemeRangeFeatureRenderer();
      themeRangeFeatureRenderer.makeDefault(value, 10); //制作标签专题图
      themeRangeFeatureRenderer.setRangeExpression('sixSpectrum'); //设置渲染器的分段专题图字段
      themeRangeFeatureRenderer.setRangeItems(rangeItems); //设置分段项数组
      themeRangeFeatureRenderer.setRangeValues([0, 200000, 400000, 600000, 800000, 1000000, 2000000, 3000000, 4000000, 20000000]);
      featureLayer.setDataSource(value); // 设置图层数据源
      featureLayer.setRenderer(themeRangeFeatureRenderer); // 设置分段专题图渲染器
      this.globe.addLayer(featureLayer, true); // 添加图层
      this.globe.refresh(true, false); // 刷新地图窗口
    });
  }
  // 加载GDP专题图
  addGDPhematic(data: any) {
    let optionGeo = {
      jsonData: data,
      alias: 'GDPTheme',
    };
    if (!this.globe) { return }
    let workspace = this.globe.getDocument();
    let dataSource = new PIE.GeoJsonDataSource();
    let featureLayer = new PIE.GlobeFeatureLayer();
    let globalLayer = this.globe.getLayer(optionGeo.alias);
    if (globalLayer) {
      this.globe.removeLayer(globalLayer);
    }
    featureLayer.setName(optionGeo.alias);
    dataSource.loadJsonData(optionGeo).then((value: any) => {
      if (!this.globe) { return }
      workspace.getDataSourceManager().addDataSource(value);
      let rangeItemStyles: any = [];
      for (let index = 0; index < 9; index++) {
        let vectorStyle = new PIE.VectorStyle({
          lineColor: [255, 255, 255, 10],
          lineWidth: 0.1,
          fillColor: [255, 255, 255, 10]
        });
        rangeItemStyles.push(vectorStyle);
      }
      rangeItemStyles[0].setForeFillColor([69, 117, 181, 200]);//
      rangeItemStyles[1].setForeFillColor([123, 152, 186, 255]);//
      rangeItemStyles[2].setForeFillColor([174, 189, 188, 255]);//
      rangeItemStyles[3].setForeFillColor([227, 232, 190, 255]);//
      rangeItemStyles[4].setForeFillColor([255, 227, 166, 255]);//
      rangeItemStyles[5].setForeFillColor([247, 164, 116, 255]);//
      rangeItemStyles[6].setForeFillColor([235, 110, 75, 255]);//
      rangeItemStyles[7].setForeFillColor([214, 47, 39, 255]);//
      rangeItemStyles[8].setForeFillColor([214, 47, 39, 255]);//
      let rangeItems: any = [];
      for (let index = 0; index < 9; index++) {
        let rangeItem = new PIE.RangeItem();
        rangeItem.setVisible(true); //设置图层可见
        rangeItem.setStyle(rangeItemStyles[index]); //设置几何对象风格
        rangeItems.push(rangeItem);
      }
      rangeItems[0].setCaption('0~5'); //设置分段项标题
      rangeItems[1].setCaption('5~10'); //设置分段项标题
      rangeItems[2].setCaption('10~30');
      rangeItems[3].setCaption('30~50');
      rangeItems[4].setCaption('50~80');
      rangeItems[5].setCaption('80~100');
      rangeItems[6].setCaption('100~1000');
      rangeItems[7].setCaption('1000~4400');
      rangeItems[8].setCaption('4400以上');
      /**创建分段专题图渲染器对象**/
      let themeRangeFeatureRenderer = new PIE.ThemeRangeFeatureRenderer();
      themeRangeFeatureRenderer.makeDefault(value, 9); //制作标签专题图
      themeRangeFeatureRenderer.setRangeExpression('gridcode'); //设置渲染器的分段专题图字段
      themeRangeFeatureRenderer.setRangeItems(rangeItems); //设置分段项数组
      themeRangeFeatureRenderer.setRangeValues([0, 5, 10, 30, 50, 80, 100, 1000, 4400,]);
      featureLayer.setDataSource(value); // 设置图层数据源
      featureLayer.setRenderer(themeRangeFeatureRenderer); // 设置分段专题图渲染器
      this.globe.addLayer(featureLayer, true); // 添加图层
      this.globe.refresh(true, false); // 刷新地图窗口
    });
  }
}
export default VectorLayers;
