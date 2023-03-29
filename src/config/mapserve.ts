// import { mapServe } from '@/type/config/mapserve'

// const TDT_Key = "15726f4e17e75ce9a7b7e84014b7e143"; //天地图申请的密钥
const TDT_Key = "dc0808bdfa2766725788d4effa1ec2cd"; //天地图申请的密钥

const mapServe: any = {
  //在线天地图矢量中文标记服务(墨卡托投影)
  TDT_CVA_W: `https://t0.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&FORMAT=tiles&tk=${TDT_Key}`,
  //中国近海海洋等深面
  TDT_SHUISHEN_W: `http://{s}.tianditu.gov.cn/shuishen_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=shuishen&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=${TDT_Key}`,

  //在线天地图影像中文标记服务(墨卡托投影)
  TDT_CIA_W: `http://{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}"&style=default.jpg&tk=${TDT_Key}`,
  //全球境界
  TDT_IBO_C: `http://{s}.tianditu.gov.cn/ibo_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=ibo&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&tk=${TDT_Key}`,
  //政区要素服务
  TDTService: `https/wfs?service=wmts&request=GetTile&version=1.0.0&LAYER=TDTService&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&FORMAT=tiles&tk=${TDT_Key}`,

  IMGService: `http://{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=${TDT_Key}`,
  //在线天地图影像服务地址(墨卡托投影)
  TDT_IMG_W: `http://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${TDT_Key}`,
  //在线天地图矢量地图服务(墨卡托投影)
  TDT_VEC_W: `http://{s}.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${TDT_Key}`,
  // 天地图地形
  TDT_SWDX: `https://{s}.tianditu.gov.cn/ter_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=ter&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${TDT_Key}`,

  MAP_STREET: `https://engine.piesat.cn/hr_data/streetArea?x={x}&y={y}&z={z}`,

  // 最新天地图地址(球面墨卡托投影--3587)
  SKY_MAP: `https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TDT_Key}`,
};

export default mapServe;
