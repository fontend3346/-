// 二维地图方法
import * as turf from "@turf/turf";
/*不同坐标系之间的转换
 *传入数据为 FeatureCollection时返回结果为 FeatureCollection
 *传入数据为 geometry时返回结果为 geometry
 */
class CoordinateTransformation {
  constructor() {}
  //墨卡托转经纬度
  mercator2lonlat(data: any) {
    if (data.type === "FeatureCollection" && data.features.length > 0) {
      data.features.map((item: any) => {
        if (item.geometry.type === "Point") {
          data = turf.toWgs84(data);
        } else if (item.geometry.type === "LineString") {
          item.geometry = turf.toWgs84(item.geometry);
        } else if (item.geometry.type === "Polygon") {
          item.geometry = turf.toWgs84(item.geometry);
        }
      });
    } else if (data.type) {
      data = turf.toWgs84(data);
    } else {
      data = turf.toWgs84(data);
    }

    return data;
  }
  //  //墨卡托转经纬度

  lonLat2Mercator(data: any) {
    if (data.type === "FeatureCollection" && data.features.length > 0) {
      data.features.map((item: any) => {
        if (item.geometry.type === "Point") {
          data = turf.toMercator(data);
        } else if (item.geometry.type === "LineString") {
          item.geometry = turf.toMercator(item.geometry);
        } else if (item.geometry.type === "Polygon") {
          item.geometry = turf.toMercator(item.geometry);
        }
      });
    } else if (data.type) {
      data = turf.toMercator(data);
    } else {
      data = turf.toMercator(data);
    }
    return data;
  }
}
export default new CoordinateTransformation();
