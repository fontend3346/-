import http from "@/api/index";
import geobuf from "geobuf";
import Pbf from "pbf";
import { ElMessage } from "element-plus";
// // 加载轮廓线
export const addLIne = (name: any) => {
  return new Promise((resolve, reject) => {
    let params = {
      collectionName: name,
      outputEpsg: 4326,
      outputGeobuf: true,
      queryConditionList: [],
      queryResultList: [],
    };
    http.stationsInfoManage.getAddPoint(params).then((res: any) => {
      if (res) {
        let data = res;
        let featureCollection = geobuf.decode(new Pbf(data)); // 对GeoBuf解码
        resolve(featureCollection);
      } else {
        ElMessage.error(res.message);
        reject(false);
      }
    });
  });
};
