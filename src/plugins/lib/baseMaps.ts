// mapbox地图基础方法
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import CoordinateTransformation from "./CoordinateTransformation";
import http from "@/api/index";
import geobuf from "geobuf";
import Pbf from "pbf";
import mapserve from "@/config/mapserve";
import utils from "../../utils/utils"; // 导入api接口

mapboxgl.accessToken =
  "pk.eyJ1IjoiemhhbmdsdTAyMDEwNiIsImEiOiJjbGFhaDYwcjUwN3F0M250aWtzNHVhazduIn0.aBkDfvSn7otZKoDdWi3A6w";
const defaultOptions = {
  container: "mapContainer",
  //style: "mapbox://styles/mapbox/streets-v10",
  style: {
    version: 8,
    //   // glyphs: "http://172.23.144.1:11000/fonts/mapbox/{fontstack}/{range}.pbf",
    glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    sources: {
      baseMap: {
        type: "raster",
        tiles: [
          // mapServe.mapURL
          (window as any).gateway.mapUrl,
        ],
        tileSize: 256,
      },
    },
    layers: [
      {
        id: "base-map",
        type: "raster",
        source: "baseMap",
        minzoom: 0,
        maxzoom: 22,
      },
    ],
  },
  // style: 'mapbox://styles/mapbox/streets-v11',

  center: [112.47, 34.55],
  minzoom: 0,
  zoom: 10,
  maxzoom: 22,
  preserveDrawingBuffer: true, // 这个需要开启，才能获取正确的base64
  projection: "globe",
};

class baseMap {
  options: any;
  map: any;
  constructor(options: any) {
    if (options.map) {
      this.map = options.map;
    } else if (options.map == undefined) {
      this.options = extend(Object.create(defaultOptions), options);
      this.map = this.initMap();

      // this.addEventDot();
    }
    let overlap = true;
    // 加载点
    // this.addPoint(dzdata, {}, overlap);
    // 加载国界线
    // this.getVdata('gjx')
    this.map.on("load", () => {
      // this.addLineString(chinaBounds, {
      //   lineColor: "#ffff00",
      //   layerId: "chinaLineString",
      //   dasharray: true,
      // });
      // this.addImageLayers({ mapUrl: mapserve.TDT_CVA_W });
      // this.addImageLayers({ mapUrl: mapserve.TDTService })
    });
  }
  //初始化底图
  initMap() {
    return new mapboxgl.Map(this.options);
  }
  /*
*加载影像图层
*@options {
  bounds：范围，
  mapUrl：地图链接
}
*/
  //加载影像
  addImageLayers(options) {
    let defaultOptions = {
      layerId: "rasterLayer",
    };
    options = { ...defaultOptions, ...options };
    this.removeLayer(options.layerId);
    this.removeDataSource(options.layerId);

    this.map.addSource(options.layerId, {
      type: "raster",
      tiles: [options.mapUrl],
      tileSize: 256,
    });

    this.map.addLayer({
      id: options.layerId,
      type: "raster",
      source: options.layerId,
      minzoom: 0,
      maxzoom: 22,
    });
    let centroid = turf.centroid(options.bounds);

    // this.map.flyTo({ center: centroid.geometry.coordinates, zoom: 6 });

    // this.map.fitBounds(this.getGeojsonFitBounds(options.bounds), {
    //   padding: { top: 10, bottom: 25, left: 15, right: 5 },
    // });
  }

  //加载影像图层
  addImageLayer(options: any) {
    // this.map.flyTo({ center: options.center, zoom: 14 });
    this.map.flyTo({
      center: options.center,
      essential: true,
    });

    this.map.setStyle({
      metadata: {},
      sources: {
        baseMap: {
          tiles: [options.mapUrl],
          tileSize: 256,
          type: "raster",
        },
      },
      // glyphs: "http://172.23.144.1:11000/fonts/mapbox/{fontstack}/{range}.pbf",
      glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
      center: options.center,
      // projection: options.projection,
      name: "China Basic Map",
      layers: [
        {
          id: "baseMap",
          source: "baseMap",
          type: "raster",
          minzoom: 0,
          maxzoom: 22,
        },
      ],
      // zoom: 14,
      // id: "36k17k9qb",
      version: 8,
      minzoom: 0,
      zoom: 8,
      maxzoom: 22,
      id: "36k17k9qb",
      preserveDrawingBuffer: true, // 这个需要开启，才能获取正确的base64
      maxBounds: options.maxBounds, // Set the map's geographical boundaries.
      // projection: "equirectangular", // wgs84的epsg
    });
  }
  //设置投影
  // setProjection(options: any) {
  //   this.map.setStyle({
  //     name: options.name,
  //     center: options.center,
  //     parallels: options.parallels,
  //     projection: options.projection,
  //   });
  // }
  //加载图片
  addLayersImage(options: any) {
    this.map.flyTo({
      center: options.center,
      essential: true,
    });

    this.map.addSource("imageLayers", {
      type: "image",
      url: options.mapUrl,
      coordinates: options.coordinates,
      //  [
      //   //左下角开始 逆时针
      //   [114.931, 35.9952],
      //   [115.742, 35.8687],
      //   [115.897, 36.475],
      //   [115.079, 36.6019],
      // ],
    });
    this.map.addLayer({
      id: "imageLayersId",
      type: "raster",
      source: "imageLayers",
      minzoom: 0,
      zoom: 6,
      maxzoom: 24,
    });
  }

  //移除图层
  removeLayer(id: any) {
    if (this.map.getLayer(id)) {
      this.map.removeLayer(id);
    }
  }
  //移除数据源
  removeDataSource(id: any) {
    if (this.map.getSource(id)) {
      this.map.removeSource(id);
    }
  }
  removeImage(id: any) {
    if (this.map.hasImage(id)) {
      this.map.removeImage(id);
    }
  }
  //FeatureCollection格式数据-地图加线
  addArea(datas: any, options: any) {
    const defaultOptions = {
      layerId: "mapPolygon",
      description: "description",
      iconImgUrl:
        "data: image / png; base64, iVBORw0KGgoAAAANSUhEUgAAACwAAAA4CAYAAACGwxqMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARZSURBVHgBzZrPbxtVEMe/ sw5UVBE1LSCQqEghiAOXdVOQ4FA2EoeecCz1TiLxBzg3bk3 / gpS / IO6NQ6UkPeXWTSUuIDc + 8qMqq3IgAloMRA0p8b7OrH/Ubmzvvtl1sx/Jsnf37b6vx / PmzZtnQgq89Z0iv7kglOFgBgaugZFzxU6TJr8CImoiRIOvb / Jxw6 + UmlBCUMBCPRRwxRjj9olLjjE1Ms51Fu7DEivBfUI9ZENAoBW / XLqe9IZEglnoDAtdy1DooAiiDbT + W / YrHwdxbZ24Bt56fdE4ZmdSYgV + 9oJxTuxwX9W4tmMFe5v1FePQGjR + ak + R + 1qVPsc1GukSkVjQFRwDBHPVL8 + tDL82hOMU22WU6COCvZv1qjG0ihxgEC7eLl8YiCADgiUayADD8 / HZJDQpPCj1R4 / BQVeAWDYvYoWiKZxY6z / RExyFLw4vyBsGnrf + vdc9nOqdd9INMvfVaVw6ewbumWm8cfLF6Nzdv / dx9599bN1 / gMaDPWgxhYJo8 + Vz5MMy5bLv3oICEfdV6e1I6Di2fn2I2o + /YffRY2igsDXvVz702y5RwBdQIGKvffJerFjh0tnTUduu9W3pWBkkKSJb9y8o+OazD6wFiIW/9H / A3mELlnDEoHNiYRcKFt9 / U2UtuefyO69BAUevQ9eJkm8F8hNrufzu65ieKsAamio7HNisLSwRQeuLwvQLBcyeegm28Mw343DstZ4oZl + 27 + zIMxSCOXF2xYdnYIlYKC3KZxRFsLWF9 / 63HuFZPaMYu + IYhsxeaZFZUIMItl5yS2dprCyxWDlVNx1etVoLFrE37v0OLZJbqDAIJA43oODGvT9UeYHcU / tpF0qaDldkAigQK1e//dlKtLSVe7SwNzQcmMNNKNndbwtI8hM3/vy3/QX3ddlaBMHvJj+/IOVKI8qH3zodTQizp05G53YfHUSDa+v+w1T5cE9vSK9E+fCnN+/cksweeYbrcdsLc0tRHKZW6ypyjuNQTd57q+acWznYLp8/Jx96M12erSwVzqef+8illY3ZYN+tdA8Hcglq0RIUU/UEaZJ5vNx/YkAwV8QDCs0ycgK7QvXZmvGRbM2vzNV4n2IFx4xoGFaZH1NuvcPCdcv/1BD77edP/baf0flwSFINVyVGKQmo5SyNujhSsGxN8VQo3zLA84PH0MH8uG2x2E0Zb/071zhTUsaadFXzSGl1GLFLJL/yUYPCcAkTRvrIZBdJ8CsXNiYZOaKIwH0kaWu1sXhxo77Ke2qxW1M2cF3k2u2FucSx33rrNtPp28DfXjg/b3OL9TKfp++sIkdAhiq2N1kL7oQ7sUoAPbHhaxSq3XyhE+52oIDCw5JEHyhQVX6Edrgz1uGOK5BVrVhBLViwTZSkLW8Ufo0UqF2inySJkm34GkUqC/eIT5QaWYgVMhEckyhJRLAOX6PIxCW6DNmrTpTQ2JCNS3RoL7FaPWsmTWiOHfkLw8XN+kT+b/EEhgjdVdsknN0AAAAASUVORK5CYII=",
    };

    options = extend(Object.create(defaultOptions), options);
    this.removeLayer(options.layerId);

    this.removeDataSource(options.layerId);
    // this.removeLayer("mapPolygon");

    // this.removeDataSource("mapPolygon");
    // map.removelayer("mapLineString");
    // map.removesource("mapLineString");
    this.map.addSource(options.layerId, {
      type: "geojson",
      data: datas,
    });
    if (!options.fillColor) {
      options.fillColor = "#0464CB";
    }
    this.map.addLayer({
      id: options.layerId,
      type: "fill",
      source: options.layerId,
      // layout: {
      //   "line-join": "round",
      //   "line-cap": "round"
      // },
      paint: {
        "fill-color": options.fillColor,
        "fill-opacity": 0.4,
        // "fill-outline-color": "#ff0000",//缓冲区边框线，
        //"line-gap-width": 10
        //"background-color": "rgba(3, 20, 57, 0.4)"
      },
    });
    let _this = this;
    _this.map.on("click", options.layerId, function () {
      // var features = _this.map.queryRenderedFeatures(e.point, {
      //   layers: [options.layerId]
      // });
    });
  }

  //FeatureCollection格式数据-地图加线

  addLineString(datas: any, options: any) {
    const defaultOptions = {
      lineColor: "#ffff00",
      layerId: "mapLineString",
      name: "poi_name",
      time: "time",
      description: "description",
      iconImgUrl:
        "data: image / png; base64, iVBORw0KGgoAAAANSUhEUgAAACwAAAA4CAYAAACGwxqMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARZSURBVHgBzZrPbxtVEMe/ sw5UVBE1LSCQqEghiAOXdVOQ4FA2EoeecCz1TiLxBzg3bk3 / gpS / IO6NQ6UkPeXWTSUuIDc + 8qMqq3IgAloMRA0p8b7OrH/Ubmzvvtl1sx/Jsnf37b6vx / PmzZtnQgq89Z0iv7kglOFgBgaugZFzxU6TJr8CImoiRIOvb / Jxw6 + UmlBCUMBCPRRwxRjj9olLjjE1Ms51Fu7DEivBfUI9ZENAoBW / XLqe9IZEglnoDAtdy1DooAiiDbT + W / YrHwdxbZ24Bt56fdE4ZmdSYgV + 9oJxTuxwX9W4tmMFe5v1FePQGjR + ak + R + 1qVPsc1GukSkVjQFRwDBHPVL8 + tDL82hOMU22WU6COCvZv1qjG0ihxgEC7eLl8YiCADgiUayADD8 / HZJDQpPCj1R4 / BQVeAWDYvYoWiKZxY6z / RExyFLw4vyBsGnrf + vdc9nOqdd9INMvfVaVw6ewbumWm8cfLF6Nzdv / dx9599bN1 / gMaDPWgxhYJo8 + Vz5MMy5bLv3oICEfdV6e1I6Di2fn2I2o + /YffRY2igsDXvVz702y5RwBdQIGKvffJerFjh0tnTUduu9W3pWBkkKSJb9y8o+OazD6wFiIW/9H / A3mELlnDEoHNiYRcKFt9 / U2UtuefyO69BAUevQ9eJkm8F8hNrufzu65ieKsAamio7HNisLSwRQeuLwvQLBcyeegm28Mw343DstZ4oZl + 27 + zIMxSCOXF2xYdnYIlYKC3KZxRFsLWF9 / 63HuFZPaMYu + IYhsxeaZFZUIMItl5yS2dprCyxWDlVNx1etVoLFrE37v0OLZJbqDAIJA43oODGvT9UeYHcU / tpF0qaDldkAigQK1e//dlKtLSVe7SwNzQcmMNNKNndbwtI8hM3/vy3/QX3ddlaBMHvJj+/IOVKI8qH3zodTQizp05G53YfHUSDa+v+w1T5cE9vSK9E+fCnN+/cksweeYbrcdsLc0tRHKZW6ypyjuNQTd57q+acWznYLp8/Jx96M12erSwVzqef+8illY3ZYN+tdA8Hcglq0RIUU/UEaZJ5vNx/YkAwV8QDCs0ycgK7QvXZmvGRbM2vzNV4n2IFx4xoGFaZH1NuvcPCdcv/1BD77edP/baf0flwSFINVyVGKQmo5SyNujhSsGxN8VQo3zLA84PH0MH8uG2x2E0Zb/071zhTUsaadFXzSGl1GLFLJL/yUYPCcAkTRvrIZBdJ8CsXNiYZOaKIwH0kaWu1sXhxo77Ke2qxW1M2cF3k2u2FucSx33rrNtPp28DfXjg/b3OL9TKfp++sIkdAhiq2N1kL7oQ7sUoAPbHhaxSq3XyhE+52oIDCw5JEHyhQVX6Edrgz1uGOK5BVrVhBLViwTZSkLW8Ufo0UqF2inySJkm34GkUqC/eIT5QaWYgVMhEckyhJRLAOX6PIxCW6DNmrTpTQ2JCNS3RoL7FaPWsmTWiOHfkLw8XN+kT+b/EEhgjdVdsknN0AAAAASUVORK5CYII=",
    };
    options = extend(Object.create(defaultOptions), options);
    let _this = this;
    this.removeLayer(options.layerId);

    this.removeDataSource(options.layerId);
    // map.removelayer("mapLineString");
    // map.removesource("mapLineString");
    _this.map.addSource(options.layerId, {
      type: "geojson",
      data: datas,
    });
    if (!options.lineColor) {
      options.lineColor = "#ffff00";
    }
    let paintOpt: Object = "";
    if (!options.dasharray) {
      paintOpt = {
        // "line-color": "#ffff00",
        "line-color": options.lineColor,
        "line-width": 2,
        "line-dasharray": [5, 5],
      };
    } else {
      paintOpt = {
        // "line-color": "#ffff00",
        "line-color": options.lineColor,
        "line-width": 2,
      };
    }
    _this.map.addLayer({
      id: options.layerId,
      type: "line",
      source: options.layerId,
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: paintOpt,
      epsg: 4326, // wgs84的epsg
    });
    // _this.map.on("click", options.layerId, function(e) {
    //   // console.log(1111111111111);
    //   // let features = _this.map.querySourceFeatures(options.layerId, {
    //   //   layers: [options.layerId]
    //   // });
    //   const bbox = [
    //     [e.point.x - 5, e.point.y - 5],
    //     [e.point.x + 5, e.point.y + 5]
    //   ];
    //   let renderFeatures = _this.map.queryRenderedFeatures(bbox, {
    //     layers: [options.layerId]
    //   });
    //   console.log(renderFeatures[0], "线");
    //   let obj = {
    //     geometry: renderFeatures[0].geometry
    //   };
    //   _this.addSelectLayer(obj);
    // });
  }

  //添加轮廓线
  addContourLine(datas: any, options: any) {
    let _this = this;
    let arr = [];
    datas.features.map((feature: any) => {
      let obj = arr.find((item) => item == feature.properties.Contour);
      if (obj == undefined) {
        arr.push(feature.properties.Contour);
      }
    });
    arr.sort((x, y) => y - x);
    let colorList = [];
    arr.map((item: any, index: any) => {
      colorList.push({
        Contour: item,
        color: utils.adjustColor("#E2A146", (index + 1) * -5),
      });
    });

    datas.features.map((feature: any) => {
      let objs = colorList.find(
        (item) => item.Contour == feature.properties.Contour
      );
      feature.properties.color = objs.color;
    });

    this.removeLayer(options.layerId);

    this.removeDataSource(options.layerId);
    _this.map.addSource(options.layerId, {
      type: "geojson",
      data: datas,
    });

    _this.map.addLayer({
      id: options.layerId,
      type: "line",
      source: options.layerId,
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": ["get", "color"],
        "line-width": 1,
        "line-opacity": 1,
      },
      epsg: 4326, // wgs84的epsg
    });
  }
  //选中某一个目标
  addSelectLayer(feature: any) {
    this.removeLayer("show_select");
    this.removeDataSource("show_select");
    // let _feature = turf.lineString(feature.geometry.coordinates[0]);
    // let _feature = feature.geometry.coordinates
    this.map.addSource("show_select", {
      type: "geojson",
      data: feature.geometry,
    });
    this.map.addLayer({
      id: "show_select",
      type: "line",
      source: "show_select",
      paint: {
        "line-color": "#00FFFF",
        "line-width": 5,

        /*"line-dasharray":[2,4]*/
      },
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
    });
  }
  addPoint(datas: any, options: any = "") {
    //默认参数
    let overlap = options.overlap || false;
    const defaultOptions = {
      layerId: "mapPoints",
      name: "name",
      time: "time",
      description: "description",
      iconImgUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAydJREFUWEfFll1IFFEUx/9nViF7SYqc3SwiKvrYmVkVI4QCK+ilqBTyoV76gN6KwIcICu0DgpAi6CUo6qEICpPsKQq0qEAIdOfuWoESVLizFZGVmLW7JyZcUXdm7nUNuq/nnP/5zbn/c3cJ//mQav/ocHI+jfzeRppWA2A9GEtAWAzCEIAUM/US8/Pc3FBncl70i6quEoCZtveCcRxAVEE4CcI5oVu3FHIhBTDT9h0wdquITckh3BW61SSrCwQwHZtlArK4CFuBPXyDVjrexkzNsgbSuGQSngDjd35TKq6YwMynEpFYq1d6AYDrdm00+1TRcGoIhKGMVlL7auHa1PSCAgDDEQcJfDVYmX4C3M7MA6TRUjDWSYEJzUK3LkgBTMe+AuBQAEAyVxpqSi6I9udzqt72lufKSroYXOVXx8zPEpHYRhWAFwDqvIQY+KaBF9nh2IhX3HTsLgD1fhCj38vmDKxcOTY5XnAFZsp+//eF83ZM4G4bH8URyvEl3ykQrUjo5mAwQMDuB7nZFTVSvfVEIXcKnoc5uykRqe6WTeA1CKt8JnBD6NZ+vwaGIw4Q+JpfnDK8xF4c+yCZQPw+QDt8RJKh0eyGvmXVXz09EPRsE4aFbpWrmPAigKO+XwHqs8Nm9fS4kYq3ElFLwPa8FGHLXdcpp9CEQ/YuaOgIEHJD3axRB7IZW9O0NcxUC+BAYI2Gs6LCOikFcBNk6ySB8wr/yGmh6mRFdEANIGXvA+F6EY38Si6LsHXYK+j7a2g69j0ADf8AYjBXGtox+eUM3IJ80EiL5cT8EMDy2UAwUWNCN309FfhnwUiLBmJ2J1HUkT1crqj0L5nCevnBdYiw1SgjlwKMb8VM/TCYzf7a3F9Z++6fAMQ+v6nMZcaeqPqBwDvtcKxT1lzpCiZM6fRtJ2gPpKKEFqFbp6V54wlKV5AXMx37BIAzAeJK9660hn5NjFS8nYi8zDVYwpm63kjNJ9Wvn9EV5EVXf+hZUFpS1jPdD0y0NaGbj2bSvCgAt8hy4lsY9HiiGeOYiFjnZ9q8aAC30EiLZmJuA3BbhK09xTSfFUCxDafX/QEBVBswHgbtMwAAAABJRU5ErkJggg==",
    };
    options = extend(Object.create(defaultOptions), options);
    // console.log(options);
    let _this = this;
    this.removeLayer(options.layerId.toString());
    this.removeDataSource(options.layerId.toString());
    this.removeImage(options.layerId.toString());
    _this.map.loadImage(options.iconImgUrl, function (error, image) {
      // if (error) throw error;
      _this.map.addImage(options.layerId.toString(), image);
      // Add a GeoJSON source with 2 points
      _this.map.addSource(options.layerId.toString(), {
        type: "geojson",
        data: datas,
      });

      // _this.map.flyTo({ center: datas.features[0].geometry.coordinates });

      // Add a symbol layer
      if (!options.textColor) {
        options.textColor = "#ffffff";
      }
      let pointOpt = {
        id: options.layerId.toString(),
        type: "symbol",
        source: options.layerId.toString(),
        layout: {
          "icon-image": options.layerId.toString(),
          "icon-size": 0.5,
          "text-field": ["get", options.name],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 1],
          "text-anchor": "top",
          "text-size": 14,
          // "text-allow-overlap": true,
          // "icon-allow-overlap": true
        },
        paint: {
          "text-color": options.textColor,
        },
        minzoom: 0,
        maxzoom: 22,
      };
      if (overlap) {
        pointOpt.layout["text-allow-overlap"] = true;
        pointOpt.layout["icon-allow-overlap"] = true;
      }
      //移动图层层级 让台网置于最上方
      if (_this.map.getLayer("mapStations")) {
        _this.map.addLayer(pointOpt, "mapStations");
      } else {
        _this.map.addLayer(pointOpt);
      }
    });

    let popup: any = null;
    // _this.map.on("click", options.layerId, function (e) {
    //   var features = _this.map.queryRenderedFeatures(e.point, {
    //     layers: [options.layerId],
    //   });
    //   if (features.length) {
    //     // let el = document.createElement("div");
    //     // el.className = "marker";
    //     if (popup) {
    //       popup.remove();
    //     }
    //     let keysData = Object.keys(features[0].properties);
    //     console.log(keysData, "keysData");

    //     debugger;
    //     let valueData = features[0].properties;
    //     let showInfo: any = `<div class="makerTop"><h2 class="markerHear" > ${
    //       valueData[keysData[0]]
    //     } </h2></div><div class="markerBody" ><p>${keysData[1]}：${
    //       valueData[keysData[1]]
    //     }</p><p>${keysData[2]}：${valueData[keysData[2]]}</p><p>${
    //       keysData[3]
    //     }：${valueData[keysData[3]]}</p><p>${keysData[4]}：${
    //       valueData[keysData[4]]
    //     } </p></div >`;
    //     popup = new mapboxgl.Popup({ offset: 25, className: "my-Popup" })
    //       .setLngLat(features[0].geometry.coordinates)
    //       .setHTML(showInfo)
    //       // .setMaxWidth("300px")
    //       .addTo(_this.map);
    //     // let marker = new mapboxgl.Marker()
    //     //   .setLngLat(features[0].geometry.coordinates)
    //     //   .setPopup(
    //     //     new mapboxgl.Popup({ offset: 25 }) // add popups
    //     //       .setHTML()
    //     //   )
    //     //   .addTo(_this.map);
    //   }
    // });
  }
  addPointCircle(datas: any, options: any = "") {
    let _this = this;
    this.removeLayer(options.layerId.toString());
    this.removeDataSource(options.layerId.toString());
    _this.map.loadImage(options.iconImgUrl, function (error, image) {
      _this.map.addSource(options.layerId.toString(), {
        type: "geojson",
        data: datas,
      });
      if (!options.textColor) {
        options.textColor = "#ffffff";
      }
      let pointOpt = {
        id: options.layerId.toString(),
        type: "circle",
        source: options.layerId.toString(),
        paint: {
          "circle-radius": 5,
          "circle-color": [
            "case",
            ["boolean", ["<", ["get", "magnitude"], 6]],
            "#e8df28",
            ["boolean", ["<", ["get", "magnitude"], 7]],
            "#e0620d",
            ["boolean", ["<", ["get", "magnitude"], 8]],
            "#df1f05",
            // ["boolean", [">=", ["get", "magnitude"], 8]],
            // "#4e0d04",
            "#4e0d04",
          ],
        },
        minzoom: 0,
        maxzoom: 22,
      };
      _this.map.addLayer(pointOpt);
    });

    let popup: any = null;
  }
  //FeatureCollection格式数据-地图加线
  addGeojson(datas: any, options: any) {
    let defaultoption = {
      layerId: "addGeojson",
      name: "ogc_fid",
      time: "time",
      description: "description",
      iconImgUrl:
        "data: image / png; base64, iVBORw0KGgoAAAANSUhEUgAAACwAAAA4CAYAAACGwxqMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARZSURBVHgBzZrPbxtVEMe/ sw5UVBE1LSCQqEghiAOXdVOQ4FA2EoeecCz1TiLxBzg3bk3 / gpS / IO6NQ6UkPeXWTSUuIDc + 8qMqq3IgAloMRA0p8b7OrH/Ubmzvvtl1sx/Jsnf37b6vx / PmzZtnQgq89Z0iv7kglOFgBgaugZFzxU6TJr8CImoiRIOvb / Jxw6 + UmlBCUMBCPRRwxRjj9olLjjE1Ms51Fu7DEivBfUI9ZENAoBW / XLqe9IZEglnoDAtdy1DooAiiDbT + W / YrHwdxbZ24Bt56fdE4ZmdSYgV + 9oJxTuxwX9W4tmMFe5v1FePQGjR + ak + R + 1qVPsc1GukSkVjQFRwDBHPVL8 + tDL82hOMU22WU6COCvZv1qjG0ihxgEC7eLl8YiCADgiUayADD8 / HZJDQpPCj1R4 / BQVeAWDYvYoWiKZxY6z / RExyFLw4vyBsGnrf + vdc9nOqdd9INMvfVaVw6ewbumWm8cfLF6Nzdv / dx9599bN1 / gMaDPWgxhYJo8 + Vz5MMy5bLv3oICEfdV6e1I6Di2fn2I2o + /YffRY2igsDXvVz702y5RwBdQIGKvffJerFjh0tnTUduu9W3pWBkkKSJb9y8o+OazD6wFiIW/9H / A3mELlnDEoHNiYRcKFt9 / U2UtuefyO69BAUevQ9eJkm8F8hNrufzu65ieKsAamio7HNisLSwRQeuLwvQLBcyeegm28Mw343DstZ4oZl + 27 + zIMxSCOXF2xYdnYIlYKC3KZxRFsLWF9 / 63HuFZPaMYu + IYhsxeaZFZUIMItl5yS2dprCyxWDlVNx1etVoLFrE37v0OLZJbqDAIJA43oODGvT9UeYHcU / tpF0qaDldkAigQK1e//dlKtLSVe7SwNzQcmMNNKNndbwtI8hM3/vy3/QX3ddlaBMHvJj+/IOVKI8qH3zodTQizp05G53YfHUSDa+v+w1T5cE9vSK9E+fCnN+/cksweeYbrcdsLc0tRHKZW6ypyjuNQTd57q+acWznYLp8/Jx96M12erSwVzqef+8illY3ZYN+tdA8Hcglq0RIUU/UEaZJ5vNx/YkAwV8QDCs0ycgK7QvXZmvGRbM2vzNV4n2IFx4xoGFaZH1NuvcPCdcv/1BD77edP/baf0flwSFINVyVGKQmo5SyNujhSsGxN8VQo3zLA84PH0MH8uG2x2E0Zb/071zhTUsaadFXzSGl1GLFLJL/yUYPCcAkTRvrIZBdJ8CsXNiYZOaKIwH0kaWu1sXhxo77Ke2qxW1M2cF3k2u2FucSx33rrNtPp28DfXjg/b3OL9TKfp++sIkdAhiq2N1kL7oQ7sUoAPbHhaxSq3XyhE+52oIDCw5JEHyhQVX6Edrgz1uGOK5BVrVhBLViwTZSkLW8Ufo0UqF2inySJkm34GkUqC/eIT5QaWYgVMhEckyhJRLAOX6PIxCW6DNmrTpTQ2JCNS3RoL7FaPWsmTWiOHfkLw8XN+kT+b/EEhgjdVdsknN0AAAAASUVORK5CYII=",
    };
    options = extend(Object.create(defaultoption), options);
    this.removeLayer(options.layerId + "Circle");
    this.removeLayer(options.layerId + "Line");
    this.removeLayer("layerFill");
    this.removeLayer("mapLineString");

    this.removeLayer(options.layerId + "_label");

    this.removeLayer(options.layerId);
    this.removeDataSource(options.layerId);
    this.removeDataSource(options.layerId + "_label");

    // let dataObj = new DataTool({
    //   datas: datas,
    //   colors: options.colors
    // }).initDataShibie();
    // if (dataObj.lineStringArr) {
    //   this.addLineString(turf.featureCollection(dataObj.lineStringArr), {});
    // }

    // map.removesource("mapLineString");
    this.map.addSource(options.layerId, {
      type: "geojson",
      data: datas,
    });
    this.map.addLayer({
      id: options.layerId + "Circle",
      type: "circle",
      source: options.layerId,
      paint: {
        "circle-radius": 6,
        "circle-color": "#B42222",
      },
      filter: ["==", "$type", "Point"],
    });

    this.map.addLayer({
      id: options.layerId + "Line",
      type: "line",
      source: options.layerId,
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": options.lineColor ? options.lineColor : "#ffff00",
        "line-width": options.lineWidth ? options.lineWidth : 5,
        "line-dasharray": options.lineDasharray
          ? options.lineDasharray
          : [5, 0],
      },
      filter: ["==", "$type", "LineString"],
    });

    if (!options.fillColor) {
      options.fillColor = "#E8D072";
    }
    this.map.addLayer({
      id: options.layerId,
      type: "fill",
      source: options.layerId,
      // layout: {
      //   "line-join": "round",
      //   "line-cap": "round"
      // },
      paint: {
        "fill-color": options.fillColor,
        "fill-opacity": 0.8,
      },
      filter: ["==", "$type", "Polygon"],
    });
    // this.map.addLayer({
    //   id: "layerFill",
    //   type: "fill",
    //   source: options.layerId,
    //   metadata: {
    //     // 元数据（可选，用于为 layer 附加任意的属性。为避免冲突，建议添加前缀，如 mapbox:）
    //     "mapbox:name": "test",
    //   },
    //   layout: {},
    //   paint: {
    //     "fill-color": "#ff0000", // 填充的颜色（可选，默认值为 #000000。如果设置了 fill-pattern，则 fill-color 将无效）
    //     "fill-opacity": 0,
    //     // "fill-outline-color": "#ffff00"
    //     // "fill-color": {
    //     //   "type": "identity",
    //     //   "property": "valueColor"
    //     // },
    //     "fill-outline-color": {
    //       type: "identity",
    //       property: "outlineColor",
    //     },
    //   },
    //   filter: ["==", "$type", "Polygon"],
    // });
    // this.map.addSource(options.layerId + "_label", {
    //   type: "geojson",
    //   data: turf.featureCollection(dataObj.pointLabel),
    // });
    // const _self = this;
    // 拖拽同步
    // this.map.on("dragend", function () {
    //   const mapX = _self.map.getCenter().lng;
    //   const mapY = _self.map.getCenter().lat;
    //   this.lngLAt = [mapX, mapY];
    //   bus.$emit("dragend", [mapX, mapY]);
    // });
    // this.map.addLayer({
    //   id: options.layerId + "_label",
    //   type: "symbol",
    //   source: options.layerId + "_label",
    //   layout: {
    //     "text-field": [
    //       "format",
    //       ["upcase", ["get", "class_name"]],
    //       {
    //         "font-scale": 1.0,
    //       },
    //       "\t\t\t\t\t",
    //       {},
    //       ["upcase", ["get", "confidence"]],
    //       {
    //         "font-scale": 1.0,
    //       },
    //     ],

    //     "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
    //     "text-size": 18,
    //     "text-allow-overlap": true,
    //     "text-ignore-placement": true,
    //     "text-offset": [0, -0.8],
    //     "text-anchor": "left",
    //   },
    //   paint: {
    //     "text-color": {
    //       type: "identity",
    //       property: "valueColor",
    //     },
    //   },
    //   filter: ["==", "$type", "Point"],
    // });
    // //获得当前点击得目标
    this.map.on("click", "layerFill", (e) => {
      const bbox = [
        [e.point.x - 5, e.point.y - 5],
        [e.point.x + 5, e.point.y + 5],
      ];
      let renderFeatures = this.map.queryRenderedFeatures(bbox, {
        layers: ["layerFill"],
      });
      let obj = {
        geometry: renderFeatures[0].geometry,
      };
      this.addSelectLayer(obj);
    });
  }
  //加载线
  // addLineString(datas, options) {
  //   const defaultOptions = {
  //     layerId: "mapLineString",
  //     name: "poi_name",
  //     time: "time",
  //     description: "description",
  //     iconImgUrl:
  //       "data: image / png; base64, iVBORw0KGgoAAAANSUhEUgAAACwAAAA4CAYAAACGwxqMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARZSURBVHgBzZrPbxtVEMe/ sw5UVBE1LSCQqEghiAOXdVOQ4FA2EoeecCz1TiLxBzg3bk3 / gpS / IO6NQ6UkPeXWTSUuIDc + 8qMqq3IgAloMRA0p8b7OrH/Ubmzvvtl1sx/Jsnf37b6vx / PmzZtnQgq89Z0iv7kglOFgBgaugZFzxU6TJr8CImoiRIOvb / Jxw6 + UmlBCUMBCPRRwxRjj9olLjjE1Ms51Fu7DEivBfUI9ZENAoBW / XLqe9IZEglnoDAtdy1DooAiiDbT + W / YrHwdxbZ24Bt56fdE4ZmdSYgV + 9oJxTuxwX9W4tmMFe5v1FePQGjR + ak + R + 1qVPsc1GukSkVjQFRwDBHPVL8 + tDL82hOMU22WU6COCvZv1qjG0ihxgEC7eLl8YiCADgiUayADD8 / HZJDQpPCj1R4 / BQVeAWDYvYoWiKZxY6z / RExyFLw4vyBsGnrf + vdc9nOqdd9INMvfVaVw6ewbumWm8cfLF6Nzdv / dx9599bN1 / gMaDPWgxhYJo8 + Vz5MMy5bLv3oICEfdV6e1I6Di2fn2I2o + /YffRY2igsDXvVz702y5RwBdQIGKvffJerFjh0tnTUduu9W3pWBkkKSJb9y8o+OazD6wFiIW/9H / A3mELlnDEoHNiYRcKFt9 / U2UtuefyO69BAUevQ9eJkm8F8hNrufzu65ieKsAamio7HNisLSwRQeuLwvQLBcyeegm28Mw343DstZ4oZl + 27 + zIMxSCOXF2xYdnYIlYKC3KZxRFsLWF9 / 63HuFZPaMYu + IYhsxeaZFZUIMItl5yS2dprCyxWDlVNx1etVoLFrE37v0OLZJbqDAIJA43oODGvT9UeYHcU / tpF0qaDldkAigQK1e//dlKtLSVe7SwNzQcmMNNKNndbwtI8hM3/vy3/QX3ddlaBMHvJj+/IOVKI8qH3zodTQizp05G53YfHUSDa+v+w1T5cE9vSK9E+fCnN+/cksweeYbrcdsLc0tRHKZW6ypyjuNQTd57q+acWznYLp8/Jx96M12erSwVzqef+8illY3ZYN+tdA8Hcglq0RIUU/UEaZJ5vNx/YkAwV8QDCs0ycgK7QvXZmvGRbM2vzNV4n2IFx4xoGFaZH1NuvcPCdcv/1BD77edP/baf0flwSFINVyVGKQmo5SyNujhSsGxN8VQo3zLA84PH0MH8uG2x2E0Zb/071zhTUsaadFXzSGl1GLFLJL/yUYPCcAkTRvrIZBdJ8CsXNiYZOaKIwH0kaWu1sXhxo77Ke2qxW1M2cF3k2u2FucSx33rrNtPp28DfXjg/b3OL9TKfp++sIkdAhiq2N1kL7oQ7sUoAPbHhaxSq3XyhE+52oIDCw5JEHyhQVX6Edrgz1uGOK5BVrVhBLViwTZSkLW8Ufo0UqF2inySJkm34GkUqC/eIT5QaWYgVMhEckyhJRLAOX6PIxCW6DNmrTpTQ2JCNS3RoL7FaPWsmTWiOHfkLw8XN+kT+b/EEhgjdVdsknN0AAAAASUVORK5CYII="
  //   };
  //   options = extend(Object.create(defaultOptions), options);
  //   this.removeLayer(options.layerId);
  //   this.removeDataSource(options.layerId);
  //   // map.removelayer("mapLineString");
  //   // map.removesource("mapLineString");
  //   this.map.addSource(options.layerId, {
  //     type: "geojson",
  //     data: datas
  //   });
  //   this.map.addLayer({
  //     id: options.layerId,
  //     type: "line",
  //     source: options.layerId,
  //     layout: {
  //       "line-cap": "round",
  //       "line-join": "round"
  //     },
  //     paint: {
  //       "line-color": {
  //         type: "identity",
  //         property: "valueColor"
  //       },
  //       "line-width": 3
  //     }
  //   });

  //   //获得当前点击得目标
  //   // this.map.on("click", "mapLineString", (e) => {
  //   //   console.log(e)
  //   //   const bbox = [
  //   //     [e.point.x - 5, e.point.y - 5],
  //   //     [e.point.x + 5, e.point.y + 5]
  //   //   ];
  //   //   let renderFeatures = this.map.queryRenderedFeatures(bbox, {
  //   //     layers: ["mapLineString"]
  //   //   }
  //   //   );
  //   //   let obj = {
  //   //     geometry: renderFeatures[0].geometry
  //   //   }
  //   //   this.addSelectLayer(obj)
  //   // });
  // }
  //为图层添加标签颜色
  addTagLayer(feature: any, layerColor: any) {
    // this.map.removeLayer("");
    // this.removeDataSource("show_select");
    let _feature = turf.lineString(feature.geometry.coordinates[0]);

    this.map.addSource(feature.id, {
      type: "geojson",
      data: turf.featureCollection([_feature]),
    });
    this.map.addLayer({
      id: feature.id,
      type: "fill",
      source: feature.id,
      paint: {
        "fill-color": layerColor.fillColor,
        // "fill-color": layerColor.fillColor // 填充的颜色（可选，默认值为 #000000。如果设置了 fill-pattern，则 fill-color 将无效）
        "fill-opacity": 0.8,
        "fill-outline-color": layerColor.borderColor,
        // "fill-outline-width": 3,
      },
      layout: {
        // "fill-join": "round",
        // "fill-cap": "round"
      },
    });
  }

  //删除
  delete() {
    this.draw.getSelectedIds().forEach((element) => {
      this.draw.delete(element);
    });
  }
  //控制图层显隐
  chageLayer(layerId, visible?) {
    if (!this.map.getLayer(layerId)) { return }
    if (visible == undefined) {
      var visibility = this.map.getLayoutProperty(layerId, "visibility");
      if (visibility === "visible" || visibility == undefined) {
        this.map.setLayoutProperty(layerId, "visibility", "none");
      } else {
        this.map.setLayoutProperty(layerId, "visibility", "visible");
      }
    } else {
      if (visible == false) {
        //  设置隐藏
        this.map.setLayoutProperty(layerId, 'visibility', 'none')
      } else {
        // 设置显示
        this.map.setLayoutProperty(layerId, "visibility", "visible");
      }
    }

  }

  // 添加tiff文件
  addTiffLayer(mapObject: any, path: any, bounds: any) {
    mapObject.removeLayer("addLayer");
    mapObject.removeDataSource("addLayer");
    mapObject.map.addLayer({
      id: "addLayer",
      type: "raster",
      source: {
        type: "raster",
        tiles: [
          (window as any).gateway.factory +
          `/image-server/v1?request=GetTile&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&info={"info":[{"path":"${path}","style":{"stretch":{"externalNodataValue":[0,0,0]}}}]}`,
        ],
        tileSize: 256,
      },
      minzoom: 0,
      maxzoom: 22,
      zoom: 16,
      maxBounds: this.getFitBounds(bounds),
    });
    mapObject.map.fitBounds(this.getFitBounds(bounds), {
      padding: 20,
    });
  }
  getFitBounds(data: any) {
    let bboxPolygon = CoordinateTransformation.mercator2lonlat(data);
    // let bboxPolygon = data;
    let mapbounds = [
      [bboxPolygon.coordinates[0][2][0], bboxPolygon.coordinates[0][2][1]],
      [bboxPolygon.coordinates[0][0][0], bboxPolygon.coordinates[0][0][1]],
    ];
    console.log(mapbounds, "mapbounds");
    return mapbounds;
  }
  //加载点动画
  addPulsingDot(dzdataDot: Object, name: String) {
    this.removeLayer("layerulsingDot");
    this.removeDataSource("dotPoint");
    this.removeImage("pulsingDot");
    this.map.addImage("pulsingDot", this.pulsingDot(), { pixelRatio: 2 });

    this.map.addSource("dotPoint", {
      type: "geojson",
      data: dzdataDot,
    });
    this.map.addLayer({
      id: "layerulsingDot",
      type: "symbol",
      source: "dotPoint",
      layout: {
        "icon-image": "pulsingDot",
        "icon-size": 0.6,
        "text-field": ["get", name],
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 1],
        "text-anchor": "top",
        "text-allow-overlap": true,
        "icon-allow-overlap": true,
        "text-size": 12,
      },
      paint: {
        "text-color": "#ffffff",
      },
    });
    let popup: any = null;
    // let _this = this;
    // _this.map.on("click", "layerulsingDot", function (e: any) {
    //   var features = _this.map.queryRenderedFeatures(e.point, {
    //     layers: ["layerulsingDot"],
    //   });
    //   if (features.length) {
    //     // let el = document.createElement("div");
    //     // el.className = "marker";
    //     if (popup) {
    //       popup.remove();
    //     }
    //     let keysData = Object.keys(features[0].properties);
    //     let valueData = features[0].properties;
    //     let showInfo: any = `<div class="makerTop"><h2 class="markerHear" > ${
    //       valueData[keysData[0]]
    //     } </h2></div><div class="markerBody" ><p>${keysData[1]}：${
    //       valueData[keysData[1]]
    //     }</p><p>${keysData[2]}：${valueData[keysData[2]]}</p><p>${
    //       keysData[3]
    //     }：${valueData[keysData[3]]}</p><p>${keysData[4]}：${
    //       valueData[keysData[4]]
    //     } </p></div >`;
    //     popup = new mapboxgl.Popup({ offset: 25, className: "my-Popup" })
    //       .setLngLat(features[0].geometry.coordinates)
    //       .setHTML(showInfo)
    //       .addTo(_this.map);
    //   }
    // });
  }
  //生成活动的点
  pulsingDot() {
    let size = 600;
    let _this = this;
    const pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

      // When the layer is added to the map,
      // get the rendering context for the map canvas.
      onAdd: function () {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext("2d");
      },

      // Call once before every frame where the icon will be used.
      render: function () {
        const duration = 5000;
        const t = (performance.now() % duration) / duration;
        const radius = (size / 8) * 0.3;
        const outerRadius = (size / 2) * 0.2 * t + radius;
        const context = this.context;

        // Draw the outer circle.
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2
        );
        context.fillStyle = `rgba(180,38,48, ${1 - t})`;
        context.fill();
        // context.clearRect(0, 0, this.width, this.height);
        // context.beginPath();
        // context.arc(
        //   this.width / 2,
        //   this.height / 2,
        //   outerRadius2 / 2,
        //   0,
        //   Math.PI * 2
        // );

        // context.fillStyle = `rgba(0,255,243,${1 - t2})`;
        // context.fill();

        // context.clearRect(0, 0, this.width, this.height);
        // context.beginPath();
        // context.arc(
        //   this.width / 2,
        //   this.height / 2,
        //   outerRadius3 / 2,
        //   0,
        //   Math.PI * 2
        // );

        // context.fillStyle = `rgba(0,183,255, ${1 - t3})`;
        // context.fill();

        // Draw the inner circle.
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 100, 100, 1)";
        context.strokeStyle = "white";
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // 字体颜色
        // context.beginPath();

        // context.fillStyle = "#fff";
        // context.fillText("地", 100, 100);
        // context.font = "24px Arial";
        // context.strokeText("地", this.width, this.height);

        // context.fillStyle = "blue";
        // context.fillText("电", 200, 200);
        // context.font = "24px Arial";
        // context.strokeText("电", this.width, this.height);

        // context.fill();
        // context.stroke();

        // Update this image's data with data from the canvas.
        this.data = context.getImageData(0, 0, this.width, this.height).data;

        // Continuously repaint the map, resulting
        // in the smooth animation of the dot.
        _this.map.triggerRepaint();

        // Return `true` to let the map know that the image was updated.
        return true;
      },
    };
    return pulsingDot;
  }
  //添加事件图层
  addEventDot() {
    this.map.addImage("explodeDotImg", this.drawImageDot(), { pixelRatio: 2 });
    let eventDotData = {
      type: "FeatureCollection",
      features: [
        {
          geometry: {
            coordinates: [112.47, 34.55],
            type: "Point",
          },
          type: "Feature",
          properties: {
            tw_code: "JL",
            dzj: "JCZ-1",
            updata: 39904,
            latitude: 129.5,
            name: "核事件",
            start: "2007年至今",
            Z: null,
            ogc_fid: 11,
            tz_code: "YNB",
            objectid: 11,
            longitude: 42.89,
          },
        },
      ],
    };
    // this.removeimage("explodeDotImg")
    this.removeLayer("explodeDotLayer");
    this.removeDataSource("explodeDotSource");
    this.map.addSource("explodeDotSource", {
      type: "geojson",
      data: eventDotData,
    });
    this.map.addLayer({
      id: "explodeDotLayer",
      type: "symbol",
      source: "explodeDotSource",
      layout: {
        "icon-image": "explodeDotImg",
      },
    });

    let popup: any = null;
    let _this = this;
    _this.map.on("click", "explodeDotLayer", function (e: any) {
      var features = _this.map.queryRenderedFeatures(e.point, {
        layers: ["explodeDotLayer"],
      });
      if (features.length) {
        // let el = document.createElement("div");
        // el.className = "marker";
        if (popup) {
          popup.remove();
        }
        let keysData = Object.keys(features[0].properties);
        let valueData = features[0].properties;
        let showInfo: any = `<div class="makerTop"><h2 class="markerHear" > ${valueData[keysData[0]]
          } </h2></div><div class="markerBody" ><p>${keysData[1]}：${valueData[keysData[1]]
          }</p><p>${keysData[2]}：${valueData[keysData[2]]}</p><p>${keysData[3]
          }：${valueData[keysData[3]]}</p><p>${keysData[4]}：${valueData[keysData[4]]
          } </p></div >`;
        popup = new mapboxgl.Popup({ offset: 25, className: "my-Popup" })
          .setLngLat(features[0].geometry.coordinates)
          .setHTML(showInfo)
          .addTo(_this.map);
      }
    });
    let lightMarker = document.createElement("div");
    lightMarker.className = "lightMarker";

    let el1 = document.createElement("p");
    lightMarker.appendChild(el1);
    let el2 = document.createElement("span");
    el1.appendChild(el2);

    new mapboxgl.Marker(lightMarker).setLngLat([112.47, 34.55]).addTo(this.map);
    // this.flyTo({ center: [128.135995, 41.028613], zoom: 6 })
  }
  //生成活动的点
  drawImageDot() {
    let size = 300;
    let _this = this;
    const pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

      // When the layer is added to the map,
      // get the rendering context for the map canvas.
      onAdd: function () {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        _this.context = canvas.getContext("2d");
      },

      // Call once before every frame where the icon will be used.
      render: function () {
        let image = new Image();
        image.src = getImageUrl();
        image.onload = function () {
          let wid = image.width;
          let hei = image.height;
          let com = 0.5;
          let com2 = 0.3;
          _this.context.drawImage(image, 100, 100, wid * com, hei * com);
          // _this.context.drawImage(image, 400, 400, wid * com2, hei * com2)
        };

        // Update this image's data with data from the canvas.
        this.data = _this.context.getImageData(
          0,
          0,
          this.width,
          this.height
        ).data;

        // Continuously repaint the map, resulting
        // in the smooth animation of the dot.
        _this.map.triggerRepaint();

        // Return `true` to let the map know that the image was updated.
        return true;
      },
    };
    return pulsingDot;
  }
  //定位
  //options：{ center: [120, 30], zoom: 10 }
  flyTo(options: object) {
    this.map.flyTo(options);
  }
  // setLayerVisible(layerId) {
  //   let visibility = this.map.getLayoutProperty(layerId, "visibility");
  //   if (visibility === "visible") {
  //     this.map.setLayoutProperty(layerId, "visibility", "none");
  //   } else {
  //     this.map.setLayoutProperty(layerId, "visibility", "visible");
  //   }
  // }
  getVdata(name) {
    let params = {
      collectionName: name,
      epsg: 4326,
      geometry: "",
      orderColName: "",
      outputGeobuf: true,
      outputEpsg: 0,
      queryConditionList: [],
      queryResultList: [],
    };
    http.dataEngine
      .getGeobufByQueryParameter(params)
      .then((res: any) => {
        let data = res;
        let featureCollection = geobuf.decode(new Pbf(data)); // 对GeoBuf解码
        let option = {
          layerId: name,
          lineColor: "#8f8d8d",
        };
        this.addLineString(featureCollection, option);
      })
      .catch((e: any) => { });
  }
  //加载不同颜色圆点
  addCircle(data: any, option: any) {
    this.removeLayer(option.layerId);
    this.removeLayer(option.clusters);
    this.removeLayer(option.clustersLabel);
    this.removeDataSource("points");
    this.map.addSource("points", {
      type: "geojson",
      data: data,
      cluster: option.cluster,
      //最大的聚合级别，超过级别不进行聚合
      clusterMaxZoom: 12,
      //聚合的半径，单位是像素
      clusterRadius: 20,
      //最小聚合的点数量
      clusterMinPoints: 2,
    });
    // 未聚合点
    this.map.addLayer({
      id: option.layerId,
      type: "circle",
      source: "points",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": [
          "step",
          ["to-number", ["get", "acceptability"]],
          'rgba(254 ,46 ,0,0.5)',
          60,
          'rgba(240,199,0,0.5)',
          75,
          'rgba(235,255,0,0.5)',
          85,
          'rgba(165,255,5,0.5)',
          95,
          'rgba(37,255,15,0.5)',
          100,
          "rgba(0 ,255 ,0,0.5)"
          // "rgba(0 ,255 ,0,0.5)",
          // 1,
          // "rgba(255,0,0,0.7)",
          // 60,
          // "rgba(240,199,0,0.7)",
          // 75,
          // "rgba(235,255,0,0.7)",
          // 85,
          // "rgba(165,255,5,0.7)",
          // 95,
          // "rgba(37,255,15,0.7)",
        ],
        "circle-radius": 10,
        "circle-stroke-width": 3,
        "circle-stroke-color": [
          "step",
          ["to-number", ["get", "acceptability"]],
          '#FE2E00',
          60,
          '#F0C700',
          75,
          '#EBFF00',
          85,
          '#A5FF05',
          95,
          '#25FF0F',
          100,
          "rgb(0 ,255 ,0)"

          // "rgb(0 ,255 ,0)",
          // 1,
          // "#FE2E00",
          // 60,
          // "#F0C700",
          // 75,
          // "#EBFF00",
          // 85,
          // "#A5FF05",
          // 95,
          // "#25FF0F",
        ],
      },
    });
    if (option.cluster) {
      // 聚合点
      this.map.addLayer({
        id: option.clusters,
        type: "circle",
        source: "points",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "rgba(81,187,214,0.5)",
          "circle-radius": 10,
          "circle-stroke-width": 3,
          "circle-stroke-color": "#51bbd6",
        },
      });
      // 聚合点上的数字
      this.map.addLayer({
        id: option.clustersLabel,
        type: "symbol",
        source: "points",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count}",
          "text-font": ["Arial Unicode MS Bold"],
          "text-size": 12,
        },
        paint: {
          "text-color": "#fff",
        },
      });
    }
  }
  // 根据震级和时间加载点
  addMagnitudeTime(data: any, option: any) {
    this.removeLayer(option.layerId);
    this.removeDataSource("points");
    this.map.addSource("points", {
      type: "geojson",
      data: data,
    });
    this.map.addLayer({
      id: option.layerId,
      type: "circle",
      source: "points",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": [
          "match",
          ["to-number", ["get", "timeSign"]],//时间
          1,
          '#FF0000',
          2,
          '#FF9900',
          3,
          '#FFFF00',
          4,
          '#FFFFFF',
          '#CCCCCC'
        ],
        "circle-radius": [
          "step",
          ["to-number", ["get", "magnitude"]],//震级
          5,
          3,
          7,
          5,
          10,
          7,
          13
        ],
        "circle-stroke-width": 0,
      },
    });
  }
  addTimePoint(data: any, option: any) {
    this.removeLayer(option.layerId.toString());
    this.removeDataSource(option.layerId.toString());
    this.map.addSource(option.layerId.toString(), {
      type: "geojson",
      data: data,
    });
    this.map.addLayer({
      id: option.layerId,
      type: "circle",
      source: option.layerId.toString(),
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": [
          "match",
          ["to-number", ["get", "timeSign"]],//时间
          1,
          '#FF0000',
          2,
          '#FF9900',
          3,
          '#FFFF00',
          4,
          '#FFFFFF',
          '#CCCCCC'
        ],
        "circle-radius": [
          "step",
          ["to-number", ["get", "magnitude"]],//震级
          5,
          3,
          7,
          5,
          10,
          7,
          13
        ],
        "circle-stroke-width": 0,
      },
    });
  }
  //加载不同颜色圆点
  addCircle2(data: any, option: any) {
    this.removeLayer(option.layerId);
    this.removeLayer(option.clusters);
    this.removeLayer(option.clustersLabel);
    this.removeDataSource("points");
    this.map.addSource("points", {
      type: "geojson",
      data: data,
      cluster: option.cluster,
      //最大的聚合级别，超过级别不进行聚合
      clusterMaxZoom: 12,
      //聚合的半径，单位是像素
      clusterRadius: 20,
      //最小聚合的点数量
      // clusterMinPoints: 2,
    });
    // 未聚合点
    this.map.addLayer({
      id: option.layerId,
      type: "circle",
      source: "points",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#11b4da",
        "circle-radius": 4,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
      },
    });
    if (option.cluster) {
      // 聚合点
      this.map.addLayer({
        id: option.clusters,
        type: "circle",
        source: "points",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "rgba(81, 187, 214, 0.8)",
            100,
            "rgba(241, 240, 117, 0.8)",
            750,
            "rgba(242, 140, 177, 0.8)",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            12, //蓝色，当点数小于100时为20px圆
            100, //对应上面circle-color 数字，意思为100以内
            21, //点计数在100到750之间时为黄色，21px圆
            750, //对应上面circle-color 数字，意思为750以内
            22, //点计数大于或等于750时为22像素的粉红色圆圈
          ],
          // 这个是外边框的颜色 circle-stroke-color这个对应了上面circle-color
          "circle-stroke-color": [
            "step",
            ["get", "point_count"],
            "rgba(81, 187, 214, 0.2)",
            100,
            "rgba(241, 240, 117, 0.2)",
            750,
            "rgba(242, 140, 177, 0.2)",
          ],
          // 这个是外边框晕染的范围
          "circle-stroke-width": [
            "step",
            ["get", "point_count"],
            5, //蓝色晕染长度，当点数小于100时为5px晕染
            100, //对应上面circle-color 数字，意思为100以内
            6, //点计数在100到750之间时为黄色，6px晕染
            750, //对应上面circle-color 数字，意思为750以内
            7, //点计数大于或等于750时为7px像素的粉红色晕染
          ],
        },
      });
      // 聚合点上的数字
      this.map.addLayer({
        id: option.clustersLabel,
        type: "symbol",
        source: "points",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
        paint: {
          "text-color": "#fff",
          "text-opacity": 1,
        },
      });
    }
  }

  addPointImge(data: any, options: any) {
    let filter = ['!=', 'latitude', "null"];

    this.removeLayer(options.layerId.toString());
    this.removeDataSource(options.layerId.toString());
    this.removeImage(options.layerId.toString());
    if (!options.textColor) {
      options.textColor = "#ffffff";
    }
    this.map.addSource(options.layerId.toString(), {
      type: "geojson",
      data: data,
    });

    let pointOpt = {
      id: options.layerId.toString(),
      type: "symbol",
      source: options.layerId.toString(),
      layout: {
        "icon-image": [
          "case",
          ["==", ["get", "status"], 1],
          "anomalousImg",
          ["==", ["get", "status"], 2],
          "warnImg",
          ["==", ["get", "status"], 3],
          "offImg",
          [
            "all",
            ["==", ["get", "status"], 0],
            ["==", ["get", "subject_id"], 1],
          ],
          "seismometry",
          [
            "all",
            ["==", ["get", "status"], 0],
            ["==", ["get", "subject_id"], 2],
          ],
          "strongShock",
          [
            "all",
            ["==", ["get", "status"], 0],
            ["==", ["get", "subject_id"], 3],
          ],
          "GNSS",
          [
            "all",
            ["==", ["get", "status"], 0],
            ["==", ["get", "subject_id"], 4],
          ],
          "infrasound",
          [
            "all",
            ["==", ["get", "status"], 0],
            ["==", ["get", "subject_id"], 5],
          ],
          "geomagnetism",
          [
            "all",
            ["==", ["get", "status"], 0],
            ["==", ["get", "subject_id"], 6],
          ],
          "gravity",
          "infrasound",
        ],
        "icon-size": 0.5,
        "text-field": ["get", options.name],
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 1],
        "text-anchor": "top",
        "text-size": 14,
      },
      paint: {
        "text-color": options.textColor,
      },
      minzoom: 0,
      maxzoom: 22,
      filter: filter
    };
    this.map.addLayer(pointOpt);
  }

  loadImages(datas) {
    for (let i in datas) {
      this.map.loadImage(datas[i], (error, image) => {
        this.map.addImage(i, image);
      });
    }
  }
  // 添加人口专题图
  addPeoplehematic(data: any) {
    this.removeLayer('mapTheme');
    this.removeDataSource("mapPolygon");
    this.map.addSource("mapPolygon", {
      type: "geojson",
      data: data,
    });
    this.map.addLayer({
      id: 'mapTheme',
      type: "fill",
      source: "mapPolygon",
      paint: {
        "fill-color": [
          "step",
          ["to-number", ["get", "sixSpectrum"]],//时间
          'rgba(255, 255, 0 ,0.5)',
          200000,
          'rgba(255, 225, 0 ,0.8)',
          400000,
          'rgba(255, 200, 0 ,0.8)',
          600000,
          'rgba(255, 180, 0 ,0.8)',
          800000,
          'rgba(255, 160, 0 ,0.8)',
          1000000,
          "rgba(255 ,130, 0 ,0.8)",
          2000000,
          "rgba(255, 100 ,0 ,0.8)",
          3000000,
          "rgba(255, 80, 0 ,0.8)",
          4000000,
          "rgba(255, 40, 0 ,0.8)",
          20000000,
          'rgba(255, 0, 0 ,0.8)'
          // 'rgba(0,0,128,0.5)',
          // 200000,
          // 'rgba(0,0,205,0.5)',
          // 400000,
          // 'rgba(0,0,255,0.5)',
          // 600000,
          // 'rgba(65,105,225,0.5)',
          // 800000,
          // 'rgba(30,144,255,0.5)',
          // 1000000,
          // "rgba(0,191,255,0.5)",
          // 2000000,
          // "rgba(135,206,210,0.5)",
          // 3000000,
          // "rgba(135, 206, 250,0.5)",
          // 4000000,
          // "rgba(173,216,230,0.5)",
          // 20000000,
          // 'rgba(240,248,255,0.5)'
        ],
        "fill-opacity": 1 /* 透明度 */
      },
    });
  }
  // 添加GDP专题图
  addGDPhematic(data: any) {
    this.removeLayer('GDPTheme');
    this.removeDataSource("GDPPolygon");
    this.map.addSource("GDPPolygon", {
      type: "geojson",
      data: data,
    });
    this.map.addLayer({
      id: 'GDPTheme',
      type: "fill",
      source: "GDPPolygon",
      paint: {
        "fill-color": [
          "step",
          ["to-number", ["get", "gridcode"]],//GDP
          'rgba(69,117,181,0.8)',
          5,
          'rgba(123,152,186,0.8)',
          10,
          'rgba(174 ,189, 188,0.8)',
          30,
          'rgba(227, 232, 190,0.8)',
          50,
          'rgba(255 ,227 ,166,0.8)',
          80,
          'rgba(247 ,164 ,116,0.8)',
          100,
          'rgba(235 ,110, 75 ,0.8)',
          1000,
          'rgba(214, 47,39 ,0.8)',
          4400,
          'rgba(214, 47,39 ,0.8)',
        ],
        "fill-opacity": 1 /* 透明度 */
      },
    });
  }
}
//name 为图片的名称 包含 图片后缀
const getImageUrl = () => {
  return require(`@/assets/icon.png`);
};
function extend(dest, src) {
  for (const i in src) {
    if (dest[i] instanceof Object) {
      extend(dest[i], src[i]);
    } else {
      dest[i] = src[i];
    }
  }
  return dest;
}
export default baseMap;
