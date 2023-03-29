<template>
  <div class="stations-info-manage">
    <!-- 1-1 站点信息管理地图 -->
    <div class="disView-content" v-show="state.stationShow">
      <!-- 分布展示模块 -->
      <div id="mapContainer" :key="state.random">
        <!-- 地图定位弹框 -->
      </div>
      <!-- 工具栏 -->
      <div class="map-tool">
        <!-- 二三维切换 -->
        <div class="tool-item">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="二维/三维切换"
            placement="left"
          >
            <div class="iconfont icon-ditu" @click="checkFn"></div>
          </el-tooltip>
        </div>
        <!-- 放大 -->
        <div class="tool-item">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="放大"
            placement="left"
          >
            <div class="iconfont icon-jiahao" @click="enlargeFn"></div>
          </el-tooltip>
        </div>
        <!-- 缩小 -->
        <div class="tool-item">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="缩小"
            placement="left"
          >
            <div class="iconfont icon-suoxiao1" @click="reduceFn"></div>
          </el-tooltip>
        </div>
        <!-- 切换底图 -->
        <div class="tool-item">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="切换底图"
            placement="left"
          >
            <div class="iconfont icon-geshizhuanhuan" @click="checkLayer"></div>
          </el-tooltip>
        </div>
        <!-- 站点信息管理 -->
        <div class="tool-item">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="站点信息管理"
            placement="left"
          >
            <div class="iconfont icon-liebiao1" @click="siteInfo"></div>
          </el-tooltip>
        </div>
      </div>
      <!-- 底图切换 -->
      <div class="map-check" v-show="isCheckLayerShow">
        <div class="map-check-item" @click="checkMapFn(1)">
          <img src="@/assets/images/map1.png" alt="" />
        </div>
        <div class="map-check-item" @click="checkMapFn(2)">
          <img src="@/assets/images/map2.png" alt="" />
        </div>
      </div>
      <!-- 图例 -->
      <!-- <div class="legend-show">
        <div class="legend-img">
          <img src="@/assets/images/earthquake.png" alt="" />
          <div class="legend-font">台网</div>
        </div>
        <div class="legend-img">
          <img src="@/assets/images/toiletOne.png" alt="" />
          <div class="legend-font">台站</div>
        </div>
        <div class="legend-img"> -->
      <!-- <img src="@/assets/images/cediannomal.png" alt="" /> -->
      <!-- <div class="legend-small-img">
            <img src="@/assets/images/cediannomal.png" alt="" />
          </div>
          <div class="legend-font">测点</div>
        </div>
        <div class="legend-img">
          <img src="@/assets/images/equipmentShow.png" alt="" />
          <div class="legend-font">设备</div>
        </div>
      </div> -->
      <PIELegend class="legend-show"></PIELegend>
      <!-- 左侧所搜框 -->
      <div class="leftSearch-show">
        <div class="leftSearch-content">
          <div class="leftSearch-font">国家级</div>
          <el-select
            v-model="state.foreignValue"
            clearable
            placeholder="选择国家级"
            @change="foreignChang"
          >
            <el-option
              v-for="item in state.foreignList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <!--  -->
        <div class="leftSearch-content">
          <div class="leftSearch-font">省级</div>
          <el-select
            v-model="state.selectNetwork"
            clearable
            filterable
            placeholder="选择省级"
            @change="networkChange"
          >
            <el-option
              v-for="item in state.selectNetList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <!--  -->
        <div class="leftSearch-content">
          <div class="leftSearch-font">台阵</div>
          <el-select
            v-model="state.stationArray"
            clearable
            filterable
            placeholder="选择台阵/台站"
            @change="stationArrayChange"
          >
            <el-option
              v-for="item in state.stationArrayList"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <!--  -->
        <div class="leftSearch-content">
          <div class="leftSearch-font">台站</div>
          <el-select
            v-model="state.stationChild"
            clearable
            filterable
            placeholder="选择子台站"
            @change="stationChildChange"
          >
            <el-option
              v-for="item in state.stationChildList"
              :key="item.stationName"
              :label="item.stationName"
              :value="item.stationName"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 点位弹框 -->
      <PIEPanel
        class="pie-equip-panel"
        v-model:visible="showPonit"
        :title="markData.pointTitle"
        :width="25"
        :height="40"
        :backGroundColor="'rgba(26, 53, 74, 0.9)'"
        :cancelBtn="false"
        :confirmBtn="false"
        :moveLeft="'70%'"
        :moveTop="'20%'"
      >
        <template v-slot:operateItem>
          <div class="ponit-modal">
            <!-- 正常/异常设备 -->
            <div class="point-instrument">
              <div class="instrum-box" @click="instrumentClick(1)">
                <span class="instrum-status">正常设备(台)</span>
                <div class="instrum-number inform">
                  {{ facilityInfo.nomalFactilityNum }}
                </div>
              </div>
              <div class="instrum-box" @click="instrumentClick(0)">
                <span class="instrum-status">异常设备(台)</span>
                <div class="instrum-number">
                  {{ facilityInfo.abFactilityNum }}
                </div>
              </div>
            </div>
            <!-- <div class="point-modal-top">
              <div class="top-name">{{ markData.detailPoint.stationName }}</div>
              <div class="top-code">
                ({{ markData.detailPoint.stationCode }})
              </div>
            </div> -->
            <div class="point-modal-center">
              <div class="title">台站名称：</div>
              <div class="info">{{ markData.detailPoint.stationName }}</div>
            </div>
            <div class="point-modal-center">
              <div class="title">台站编码：</div>
              <div class="info">{{ markData.detailPoint.stationCode }}</div>
            </div>
            <div class="point-modal-center">
              <div class="title">台网：</div>
              <div class="info">{{ markData.detailPoint.unitName }}</div>
            </div>
            <div class="point-modal-center">
              <div class="title">台阵：</div>
              <div class="info">{{ markData.detailPoint.stationTypeName }}</div>
            </div>
            <div class="point-modal-center">
              <div class="title">台站岩性：</div>
              <div class="info">
                {{ markData.detailPoint.stationLithology }}
              </div>
            </div>
            <div class="point-modal-center">
              <div class="title">详细地址：</div>
              <div class="info">{{ markData.detailPoint.stationAddress }}</div>
            </div>
            <div class="point-modal-center">
              <div class="title">管理方式：</div>
              <div class="info">
                {{ markData.detailPoint.staionSupervisorMode }}
              </div>
            </div>
            <div class="point-modal-center">
              <div class="title">台站级别：</div>
              <div class="info">
                {{ markData.detailPoint.stationPropertyStr }}
              </div>
            </div>
            <!-- <div class="point-modal-center">
              <div class="title">经纬度：</div>
              <div class="info">{{ markData.detailPoint.pointStr }}</div>
            </div> -->
            <div class="point-modal-center">
              <div class="title">状态：</div>
              <div class="info">
                {{ markData.detailPoint.testStatus === 0 ? "正常" : "异常" }}
              </div>
            </div>
            <div class="point-modal-center">
              <!-- <img
                :src="markData.detailPoint.imageUrl"
                alt="暂无图片"
                class="infoImg"/>
                 -->
              <!-- <img class="infoImg" src="./01.png" alt="暂无图片" /> -->
            </div>
            <div class="point-modal-center">
              <div class="band-button" @click="bandClick">台站监控</div>
            </div>
          </div>
        </template>
      </PIEPanel>
      <!-- 正常/异常设备点击弹窗 -->
      <PIEPanel
        class="panel-instrument"
        v-model:visible="showInstrument"
        title="设备"
        :width="30"
        :height="70"
        :backGroundColor="'rgba(26, 53, 74, 0.9)'"
        :cancelBtn="false"
        :confirmBtn="false"
        :moveLeft="'35%'"
        :moveTop="'15%'"
        v-if="showInstrument"
      >
        <template v-slot:operateItem>
          <!-- 设备波段 -->
          <div class="band-box">
            <div class="band-box-input">
              <span>请选择设备</span>
              <!--v-model="facilityInfo.linkageData"-->
              <el-select
                v-model="equipmentVal"
                clearable
                placeholder="请选择设备类型"
                @change="equipmentChange"
              >
                <el-option
                  v-for="(item, index) in facilityInfo.equipmentArr"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="band-box-item">
              <div class="band-item">
                <div class="title-name">
                  <span>地震波</span>
                  <el-button @click="bandConfirm" class="confirm"
                    >样本</el-button
                  >
                </div>
                <div class="echarts-box">
                  <PIEEchartBox
                    :options="options1"
                    :key="new Date().getTime()"
                    @echartDrag="echartDrag"
                    v-if="showEchartsValue"
                  ></PIEEchartBox>
                </div>
              </div>
              <div class="band-item">
                <div class="title-name">
                  <span>电磁波</span>
                  <el-button @click="bandConfirm" class="confirm"
                    >样本</el-button
                  >
                </div>
                <div class="echarts-box">
                  <PIEEchartBox
                    :options="options2"
                    :key="new Date().getTime()"
                    @echartDrag="echartDrag"
                  ></PIEEchartBox>
                </div>
              </div>
            </div>
          </div>
        </template>
      </PIEPanel>
      <!--设备-->
      <PIEPanel
        class="facility-table"
        v-model:visible="facility"
        title="设备"
        :width="27"
        :height="30"
        :backGroundColor="'rgba(26, 53, 74, 0.9)'"
        :cancelBtn="false"
        :confirmBtn="false"
        :moveLeft="'42%'"
        :moveTop="'20%'"
      >
        <template v-slot:operateItem>
          <!-- 设备信息 -->
          <div class="facility-Info">
            <PIETable
              :maxHeight="200"
              :data="facilityInfo.linkageData"
              :columns="facilityInfo.linkageColumns"
              :showIndex="true"
              :operationWidth="130"
              :header-cell-style="{
                background: 'rgba(95, 152, 255, 0.1)',
                fontSize: '16px',
                height: '50px',
                fontWeight: '200',
                letterSpacing: '3px',
              }"
              :cell-style="{
                background: 'transparent',
                fontSize: '15px',
                height: '50px',
                fontWeight: '200',
                color: '@main-font-color',
                letterSpacing: '2px',
              }"
              :row-style="{
                borderBottom: '1px solid #13598C',
                background: 'transparent',
              }"
            >
            </PIETable>
            <!-- <div class="pie-tb-footer">
              <PIEPage
                :smallSize="true"
                :total="facilityInfo.total"
                :pageSize="facilityInfo.pageSize"
                :currentPage="facilityInfo.pageNum"
                @handleSizeChange="sizeChange"
                @handleNumChange="pageChange"
              ></PIEPage>
            </div> -->
          </div>
        </template>
      </PIEPanel>
      <!--波段确定展示大图-->
      <PIEPanel
        class="panel-instrument-big"
        v-model:visible="showBigImgEcharts"
        title="数据"
        :width="30"
        :height="30"
        :backGroundColor="'rgba(26, 53, 74, 0.9)'"
        :cancelBtn="false"
        :confirmBtn="false"
        :moveLeft="'2%'"
        :moveTop="'15%'"
        v-if="showInstrument"
      >
        <template v-slot:operateItem>
          <div class="big-echarts">
            <div class="sample-name">
              <span>样本名称</span>
              <el-input
                v-model="sampleValue"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="sample-upload">
              <el-button @click="sampleClick">保存</el-button>
            </div>
          </div>
        </template>
      </PIEPanel>
    </div>
    <div v-show="!state.stationShow">
      <stationList @backConfig="backConfig" @detail="detail"></stationList>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  reactive,
  nextTick,
  onMounted,
  ref,
  getCurrentInstance,
  watch,
} from "vue";
import baseMap from "@/plugins/lib/baseMaps";
import mapboxgl from "mapbox-gl";
import http from "@/api/index";
import geobuf from "geobuf";
import Pbf from "pbf";
import { ElMessage } from "element-plus";
import * as turf from "@turf/turf";
import { feature } from "@turf/turf";
import beijing from "@/assets/data/beijing.json";
import stationList from "../stationManage/stationList.vue";
import pieImage from "./pieImage"; //飞机打点图标

// import echartsData from "./echartsData";
const echartsData = reactive({
  options2: [],
});
const state = reactive({
  random: Math.random(), //随机数
  stationShow: false, //初始化页面
  foreignValue: "", //境内外
  foreignList: [], //境内外数据
  selectNetwork: "",
  selectNetList: [
    {
      label: 1,
      value: 2,
    },
  ], //选择台网
  stationArray: "",
  stationArrayList: [
    {
      label: 1,
      value: 2,
    },
  ], //台阵/台站
  stationChild: "",
  stationChildList: [
    {
      label: 1,
      value: 2,
    },
  ], //选择子台站
});
let popup: any = null;
let isCheckLayerShow: any = ref(false); // 缩略图是否显示
let searchVal: any = ref("");
let markData: any = reactive({
  pointTitle: "详情", //名称
  detailPoint: {
    stationName: "",
    stationCode: "",
    stationAddress: "",
    stationLithology: "",
    stationTypeName: "",
    unitName: "",
    staionSupervisorMode: "",
    stationPropertyStr: "",
    pointStr: "",
    testStatus: "null",
  }, //弹框数据
});
let showPonit = ref(false); //点位弹框
let showInstrument = ref(false); // 设备弹框
let facility = ref(false); // 设备表格弹框
let sampleValue = ref("");
let equipmentVal = ref(""); //设备类型

//设备表格弹框

let showBigImgEcharts = ref(false); //确定展示波段大图

const facilityInfo = reactive({
  linkageData: [], //表格数据
  equipmentArr: [],
  linkageColumns: [
    {
      prop: "deviceName",
      label: "名称",
    },
    {
      prop: "number",
      label: "编号",
      width: 100,
    },
    {
      prop: "unitName",
      label: "隶属台网",
    },
    // {
    //   prop: "stationTypeName",
    //   label: "隶属站台阵",
    // },

    {
      prop: "stationName",
      label: "隶属站台",
    },
    // {
    //   prop: "contactPerson",
    //   label: "联系人",
    // },
    // {
    //   prop: "manufacture",
    //   label: "设备厂家",
    // },
    // {
    //   prop: "longitude",
    //   label: "经度",
    // },
    // {
    //   prop: "latitude",
    //   label: "纬度",
    // },
  ], //表头
  total: 10,
  pageSize: 10,
  pageNum: 1,
  id: "", //地图点对应的id
  nomalFactilityNum: "", //正常设备
  abFactilityNum: "", //异常设备
  facilityStatus: "", //异常设备
});
let detailId = ref();

onMounted(() => {
  initMap();
  getProvince(); //台网
  getTaiwanese(); //台阵
  getStations(); //台站
  getCountry(); //获取国家级
});
let baseMapObj: any = null;
let map: any = null;
let samllBaseMapObj: any = null;
let smallMap: any = null;
let options1 = reactive({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      animation: false,
      label: {
        backgroundColor: "#ccc",
        borderColor: "#aaa",
        borderWidth: 1,
        // shadowBlur: 0,
        // shadowOffsetX: 0,
        // shadowOffsetY: 0,
        color: "#222",
      },
    },
  },
  lineStyle: {
    color: "rgba(0,255,223, 1)", //折线的颜色
  },
  grid: {
    left: "3%",
    right: "8%",
    bottom: "10%",
    top: "16%",
    containLabel: true,
  },
  dataZoom: [
    {
      type: "slider",
      show: false,
      // xAxisIndex: [0],
      start: 1,
      end: 100,
    },
    {
      type: "slider",
      show: false,
      start: 50,
      end: 100,
    },
    {
      type: "inside",
      // xAxisIndex: [0],
      start: 1,
      end: 100,
    },
    {
      type: "inside",
      // yAxisIndex: [0],
      start: 1,
      end: 100,
    },
  ],
  xAxis: {
    type: "value",
    name: "时间",
    nameTextStyle: {
      padding: [0, 0, 200, 500], // 上右下左与原位置距离
      color: "#fff",
    },
    nameGap: 30, // x轴name与横坐标轴线的间距
    nameLocation: "middle", // x轴name处于x轴的什么位置
    axisLine: {
      show: true,
      onZero: false, //不在y轴的零刻度线
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#fff",
      },
    },
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    name: "数量",
    // nameLocation: "left",
    nameTextStyle: {
      padding: [0, 0, 80, -10], // 上右下左与原位置距离
      color: "#fff",
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#fff",
      },
    },
    splitNumber: 10,
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      type: "line",
      data: [],
      itemStyle: {
        color: "#098ef7",
      },
      showSymbol: false,
    },
  ],
});
let options2 = reactive({
  animationDuration: 0,
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      animation: false,
      label: {
        backgroundColor: "#ccc",
        borderColor: "#aaa",
        borderWidth: 1,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        color: "#222",
      },
    },
  },
  grid: {
    left: "3%",
    right: "8%",
    bottom: "10%",
    top: "16%",
    containLabel: true,
  },
  dataZoom: [
    {
      type: "slider",
      show: false,
      start: 1,
      end: 100,
    },
    {
      type: "slider",
      show: false,
      start: 1,
      end: 100,
    },
    {
      type: "inside",
      // xAxisIndex: [0],
      start: 1,
      end: 100,
    },
    {
      type: "inside",
      // yAxisIndex: [0],
      start: 1,
      end: 100,
    },
  ],
  xAxis: {
    type: "value",
    name: "时间",
    nameTextStyle: {
      padding: [0, 0, 200, 500], // 上右下左与原位置距离
      color: "#fff",
    },
    nameGap: 30, // x轴name与横坐标轴线的间距
    nameLocation: "middle", // x轴name处于x轴的什么位置
    axisLine: {
      show: true,
      onZero: false, //不在y轴的零刻度线
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#fff",
      },
    },
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    name: "数量",
    nameLocation: "left",
    nameTextStyle: {
      padding: [0, 0, 80, -10], // 上右下左与原位置距离
      color: "#fff",
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#fff",
      },
    },
    splitNumber: 5,
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      type: "line",
      data: [],
      itemStyle: {
        color: "#098ef7",
      },
      showSymbol: false,
    },
  ],
});

// 初始化地图
const initMap = () => {
  baseMapObj = new baseMap({
    container: "mapContainer",
    zoom: 3,
    // projection: "globe",

    // center: [123.31054687499999, 36.38591277287651],
  });

  map = baseMapObj.map;
  map.on("load", () => {
    addPointNormal("mapContainerAbnormal"); // 添加异常点
    addPointNormal("mapContainerNormal"); // 添加正常点
    onClicks("mapContainerNormal");
    onClicks("mapContainerAbnormal");
    addContourLine(); //添加轮廓线
    map.addSource("mapbox-dem", {
      type: "raster-dem",
      url: "mapbox://mapbox.mapbox-terrain-dem-v1",
      tileSize: 512,
      maxzoom: 14,
    });
    map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
  });
};
// 站点信息管理
const siteInfo = () => {
  state.stationShow = false;
};
// 返回
const backConfig = () => {
  state.stationShow = true;
  // initMap();
};
const detail = (row: any) => {
  detailId.value = row.id;
  state.stationShow = true;
  showPonit.value = true;
  addPointNormal("mapContainerAbnormal"); // 添加异常点
  addPointNormal("mapContainerNormal"); // 添加正常点
  searchId(row.id); //表格数据
  searchFacilityNum(row.id); //设备条数
  // initMap();
};
// 地图点击事件
const onClicks = (layerIds: any) => {
  map.on("click", layerIds, (e: any) => {
    let features = map.queryRenderedFeatures(e.point, {
      layers: [layerIds],
    });
    facilityInfo.id = features[0].properties.id;
    searchId(features[0].properties.id);
    searchFacilityNum(features[0].properties.id);
    if (popup) {
      popup.remove();
    }
    // if (features.length > 0) {
    //   // listData.value = features[0].properties; // 坐标信息
    //   // markShow.value = true;
    //   // showInfoMark.value = true;
    //   // showUpdate.value = false;
    //   popup = new mapboxgl.Popup({
    //     offset: 25,
    //     maxWidth: "400px",
    //     anchor: "left",
    //     className: "local-boxs",
    //   }).setDOMContent(modalRef.value.modalRef);
    //   popup.setLngLat(features[0].geometry.coordinates).addTo(map);
    // }
  });
};
// 弹框里面的信息
const searchId = (id: any) => {
  markData.detailPoint.stationName = "";
  markData.detailPoint.stationCode = "";
  markData.detailPoint.stationAddress = "";
  markData.detailPoint.stationLithology = "";
  markData.detailPoint.stationTypeName = "";
  markData.detailPoint.unitName = "";
  markData.detailPoint.staionSupervisorMode = "";
  markData.detailPoint.stationPropertyStr = "";
  markData.detailPoint.pointStr = "";
  markData.detailPoint.testStatus = "";

  let params = {
    stationId: id,
    overseas: "",
    unit: "",
    stationType: "",
    stationName: "",
    stationStatus: "",
    pageNum: 1,
    pageSize: 10,
  };
  http.stationsInfoManage.searchId(params).then((res: any) => {
    if (res.code == 0) {
      if (res.data.list.length > 0) {
        let data = res.data.list;
        markData.detailPoint = data[0];
      } else {
        ElMessage.info("站点暂无信息");
      }
      showPonit.value = true;
    } else {
      ElMessage.error(res.message);
    }
  });
};
// 添加正常点
const addPointNormal = (layerId: any) => {
  let fieldValue: any;
  let pointId: any;
  let iconImgUrl: any;
  let overlap: any;
  if (layerId == "mapContainerNormal") {
    fieldValue = 0;
    overlap = false;
    pointId = "mapContainerNormal";
    iconImgUrl = pieImage.normalImg;
  } else if (layerId == "mapContainerAbnormal") {
    fieldValue = 1;
    overlap = true;
    pointId = "mapContainerAbnormal";
    iconImgUrl = pieImage.anomalousImg;
  }

  let params = {
    collectionName: "DETECTION_STATION_INFO",
    outputEpsg: 4326,
    outputGeobuf: true,
    queryConditionList: [
      {
        compareOp: "=",
        fieldName: "test_status",
        fieldValue: fieldValue,
        relationNextOne: "AND",
      },
    ],
    queryResultList: [],
  };
  //国家级
  // if (state.foreignValue) {
  //   let obj = {
  //     compareOp: "=",
  //     fieldName: "unit",
  //     fieldValue: state.foreignValue,
  //     relationNextOne: "AND",
  //   };
  //   params.queryConditionList.push(obj);
  // }
  //省级
  if (state.selectNetwork || state.foreignValue) {
    let obj = {
      compareOp: "=",
      fieldName: "unit",
      fieldValue: state.selectNetwork
        ? state.selectNetwork
        : state.foreignValue,
      relationNextOne: "AND",
    };
    params.queryConditionList.push(obj);
  }
  //台阵
  if (state.stationArray) {
    let obj = {
      compareOp: "=",
      fieldName: "station_type",
      fieldValue: state.stationArray,
      relationNextOne: "AND",
    };
    params.queryConditionList.push(obj);
  }
  //台站
  if (state.stationChild) {
    let obj = {
      compareOp: "LIKE",
      fieldName: "station_name",
      fieldValue: state.stationChild,
      relationNextOne: "AND",
    };
    params.queryConditionList.push(obj);
  }
  //台站表格详情
  if (detailId.value) {
    let obj = {
      compareOp: "=",
      fieldName: "id",
      fieldValue: detailId.value,
      relationNextOne: "AND",
    };
    params.queryConditionList.push(obj);
  }
  http.stationsInfoManage.getAddPoint(params).then((res: any) => {
    let data = res;
    let featureCollection = geobuf.decode(new Pbf(data)); // 对GeoBuf解码
    let option = {
      layerId: pointId,
      name: "station_name",
      iconImgUrl: iconImgUrl,
      overlap: overlap,
    };
    baseMapObj.addPoint(featureCollection, option);
  });
};
// 获取国家级
const getCountry = () => {
  let params = {
    parentId: 0,
  };
  http.stationsInfoManage.getCountry(params).then((res: any) => {
    if (res.code == 0) {
      state.foreignList = res.data;
    } else {
      ElMessage.error(res.message);
    }
  });
};
// 获取省级列表
const getProvince = () => {
  let selectNetwork: any;
  if (state.foreignValue) {
    selectNetwork = state.foreignValue;
  } else {
    selectNetwork = 32;
  }
  let params = {
    parentId: selectNetwork,
  };
  http.stationsInfoManage.getCountry(params).then((res: any) => {
    if (res.code == 0) {
      state.selectNetList = res.data;
    } else {
      ElMessage.error(res.message);
    }
  });
};

// 获取台阵列表
const getTaiwanese = () => {
  let params = {
    unitId: "",
  };
  provinceTaiwanese(params);
};
// 台阵api
const provinceTaiwanese = (data: any) => {
  http.stationsInfoManage.getTaiwanese(data).then((res: any) => {
    if (res.code == 0) {
      state.stationArrayList = res.data;
    } else {
      ElMessage({
        message: res.message,
        type: "error",
      });
    }
  });
};
// 获取子台站列表
const getStations = () => {
  let params = {
    unitId: "",
    stationTypeId: "",
  };
  stationsTotal(params);
};
// 台站api
const stationsTotal = (data: any) => {
  http.stationsInfoManage.getStationsEarth(data).then((res: any) => {
    if (res.code == 0) {
      state.stationChildList = res.data;
    } else {
      ElMessage({
        message: res.message,
        type: "error",
      });
    }
  });
};
//国家级
const foreignChang = (v: any) => {
  // 清空其他值
  state.selectNetwork = ""; //省级
  state.stationArray = ""; //台阵
  state.stationChild = ""; //台站
  getProvince(); //省级
  let params = {
    // unitId: v, //国家级
    unitId: state.selectNetwork ? state.selectNetwork : v, //省级// 加一个省级
  };
  provinceTaiwanese(params); // // 点击国家级查询台阵
  let data = {
    // unitId: v, //国家级
    unitId: state.selectNetwork ? state.selectNetwork : v, //省级
    stationTypeId: state.stationArray, //台阵
  };
  stationsTotal(data); // 点击台网查询子台站
  addPointNormal("mapContainerAbnormal"); // 添加异常点
  addPointNormal("mapContainerNormal"); // 添加正常点
};
//省级改变事件
const networkChange = (val: any) => {
  // 清空其他值
  state.stationArray = ""; //台阵
  state.stationChild = ""; //台站
  addPointNormal("mapContainerAbnormal"); // 添加异常点
  addPointNormal("mapContainerNormal"); // 添加正常点
  let params = {
    // unitId: state.foreignValue, //国家级
    unitId: state.selectNetwork ? state.selectNetwork : val, //省级
  };
  provinceTaiwanese(params); // // 点击省级查询台阵
  let data = {
    // unitId: state.foreignValue, //国家级
    unitId: state.selectNetwork ? state.selectNetwork : val, //省级
    stationTypeId: state.stationArray, //台站
  };
  stationsTotal(data); // 点击省级查询台站
  flyProvince(val); // 选择省级以后飞行定位
};
// 选择省级以后飞行定位
const flyProvince = (v: any) => {
  let params = {
    collectionName: "META_DATA_NETWORK_UNIT_CODE",
    outputEpsg: 4326,
    outputGeobuf: true,
    queryConditionList: [
      {
        compareOp: "=",
        fieldName: "id",
        fieldValue: v,
        relationNextOne: "AND",
      },
    ],
    queryResultList: [],
  };
  http.stationsInfoManage.getAddPoint(params).then((res: any) => {
    let data = res;
    let featureCollection = geobuf.decode(new Pbf(data)); // 对GeoBuf解码
    map.flyTo({ center: featureCollection.features[0].geometry.coordinates });
  });
};
//台阵改变事件
const stationArrayChange = (v: any) => {
  // 清空其他值
  state.stationChild = ""; //台站
  state.stationArray = v;
  addPointNormal("mapContainerAbnormal"); // 添加异常点
  addPointNormal("mapContainerNormal"); // 添加正常点
  let params = {
    // unitId: state.foreignValue, //国家级
    unitId: state.selectNetwork ? state.selectNetwork : v, //省级
    stationTypeId: v, //台阵
  };
  stationsTotal(params); // 点击台阵查询子台站
};
//台站改变事件
const stationChildChange = (v: any) => {
  addPointNormal("mapContainerAbnormal"); // 添加异常点
  addPointNormal("mapContainerNormal"); // 添加正常点
};
// 二三维切换
const checkFn = () => {
  const projection = map.getProjection();
  if (projection.name == "mercator") {
    // 切换三维
    map.setProjection("globe");
  } else {
    map.setProjection("");
  }
};
// 放大
const enlargeFn = () => {
  let zoom = map.getZoom();
  const center = map.getCenter();
  zoom = zoom + 1;
  map.flyTo({ center, zoom });
};
// 缩小
const reduceFn = () => {
  let zoom = map.getZoom();
  const center = map.getCenter();
  zoom = zoom - 1;
  map.flyTo({ center, zoom });
};
// 切换底图按钮
const checkLayer = () => {
  isCheckLayerShow.value = true;
};
// 切换地图
const checkMapFn = (index: any) => {
  if (index == 2) {
    baseMapObj.addImageLayer({
      mapUrl:
        "http://wprd04.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=7",
      center: [108, 35],
    });
  } else {
    baseMapObj.addImageLayer({
      mapUrl:
        "https://webst03.is.autonavi.com/appmaptile?style=6&z={z}&y={y}&x={x}",
      center: [108, 35],
    });
  }
  isCheckLayerShow.value = false;
};
//添加轮廓线
const addContourLine = () => {
  let option = {
    layerId: "beijing",
  };
  baseMapObj.addContourLine(beijing, option);
};

// 正常/异常设备点击
const instrumentClick = (vals: any) => {
  facilityInfo.facilityStatus = vals;
  facility.value = true;
  // normalValue.value=
  searchList(vals);
}; // 分页
const pageChange = (val: any) => {
  facilityInfo.pageNum = val;
  instrumentClick(facilityInfo.facilityStatus);
};
// 分页
const sizeChange = (val: any) => {
  facilityInfo.pageSize = val;
  instrumentClick(facilityInfo.facilityStatus);
};
//查询设备弹框列表
const searchList = (status: any) => {
  let params = {
    stationId: facilityInfo.id,
    status: status,
    pageSize: 10000,
    pageNum: facilityInfo.pageNum,
  };
  http.stationsInfoManage.searchfacility(params).then((res: any) => {
    if (res.code == 0) {
      facilityInfo.linkageData = res.data.list;
      facilityInfo.total = res.data.total;
    } else {
      ElMessage.error(res.message);
    }
  });
};
//查询设备total
const searchFacilityNum = (data: any) => {
  let params = {
    stationId: data,
  };
  http.stationsInfoManage.facilityNum(params).then((res: any) => {
    if (res.code == 0) {
      facilityInfo.nomalFactilityNum = res.data.normalNum; //正常设备
      facilityInfo.abFactilityNum = res.data.exNum;
    } else {
      ElMessage.error(res.message);
    }
  });
};
//
let showEchartsValue = ref(false);
//展示波段
const showWave = () => {
  let params = {
    sampleName: 1,
    startTime: zoomStartTime.value,
    endTime: zoomEndTime.value,
    deviceId: "",
  };
  http.stationsInfoManage.waveform(params).then((res: any) => {
    if (res.code == 0) {
      options1.series[0].data = res.data;
      options1.xAxis.min = res.data[0][0];
    } else {
      ElMessage.error(res.message);
    }
  });
};
const showWaveBottom = () => {
  let params = {
    sampleName: 2,
    startTime: "",
    endTime: "",
    deviceId: "",
  };
  http.stationsInfoManage.waveform(params).then((res: any) => {
    if (res.code == 0) {
      options2.series[0].data = res.data;
      options2.xAxis.min = res.data[0][0];
    } else {
      ElMessage.error(res.message);
    }
  });
};
// 查看波段点击事件
const bandClick = () => {
  let params = {
    stationId: facilityInfo.id,
    status: "",
    pageSize: 10000,
    pageNum: facilityInfo.pageNum,
  };
  http.stationsInfoManage.searchfacility(params).then((res: any) => {
    if (res.code == 0) {
      facilityInfo.linkageData = res.data.list;
      facilityInfo.linkageData.map((item) => {
        facilityInfo.equipmentArr.push({
          label: item.manufacture,
          value: item.manufacture,
        });
      });
    } else {
      ElMessage.error(res.message);
    }
  });
  showWave();
  showWaveBottom();
  nextTick(() => {
    showEchartsValue.value = true;
    showInstrument.value = true;
  });
};
let listenCount = ref(1);
let zoomStartTime = ref("");
let zoomEndTime = ref("");
// 鼠标移动后的数据
const echartDrag = (e: any) => {
  zoomStartTime.value = e.selectStartTime[0];
  zoomEndTime.value = e.selectEndTime[0];
  showWave();
};
//波段大图确定事件
const bandConfirm = () => {
  showBigImgEcharts.value = true;
};
//选择设备类型下拉框
const equipmentChange = () => {};

//波形图上传样本库点击确定事件
const sampleClick = () => {
  let params = {
    // name: "ceshi",
    name: sampleValue.value,
    waveType: 1,
    deviceId: 1,
    wave: options1.series[0].data,
  };
  http.stationsInfoManage.addZoomData(params).then((res: any) => {
    if (res.code == 0) {
      ElMessage.success("保存成功");
    } else {
      ElMessage.error(res.message);
    }
  });
  showBigImgEcharts.value = false;
};
</script>

<style lang="less" scoped>
.stations-info-manage {
  height: 100%;
  // position: relative;
}
.disView-content {
  height: 100%;
  position: relative;
}
#mapContainer {
  width: 100%;
  height: 100%;
  // position: relative;
  :deep(.local-boxs) {
    .mapboxgl-popup-content {
      padding: 0;
      background-color: transparent;
    }

    .mapboxgl-popup-close-button {
      color: #efe93b !important;
      font-size: 24px;
      right: 24px;
      top: 6px;
    }

    .mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
      background-color: transparent;
      border-right-color: transparent;
    }
  }
}
.map-tool {
  position: absolute;
  top: 100px;
  // bottom: 100px;
  right: 20px;
  text-align: center;
  padding: 5px;
  box-sizing: border-box;
  .tool-item {
    width: 30px;
    height: 30px;
    // background-color: #ccc;
    margin-bottom: 20px;
    border-radius: 15px;
    border: 2px solid #05c1f5;
    padding: 4px;
  }
  .iconfont {
    font-size: 18px;
    width: 15px;
    height: 15px;
    color: #fff;
  }
}
.map-check {
  position: absolute;
  display: flex;
  // justify-content: space-around;
  // align-items: center;
  right: 20px;
  // top: 300px;
  bottom: 30px;
  width: 240px;
  height: 100px;
  border: 1px solid #05c1f5;
  padding: 10px;
  .map-check-item {
    width: 120px;
    height: 80px;
    border: 1px solid #ccc;
    margin-right: 10px;
    img {
      background-size: cover;
    }
  }
}
.search-tool {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  .iconfont {
    font-size: 20px;
  }
}
// 点位弹框
.ponit-modal {
  display: flex;
  flex-direction: column;
  width: 100%;
  .point-modal-center {
    display: flex;
    // background: pink;
    color: @main-font-color;
    font-size: @main-font-size;
    padding-bottom: 10px;
    box-sizing: border-box;
    .title {
      width: 80px;
    }
    .info {
      width: calc(100% - 80px);
      white-space: pre-wrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
    }
    // .info:hover {
    //   overflow: visible;
    //   white-space: pre-wrap;
    // }
    .infoImg {
      width: 100%;
      height: 300px;
    }
    .band-button {
      // width: 100px;
      // height: 50px;
      font-size: 16px;
      color: #00aadd;
      cursor: pointer;
    }
  }
  .point-modal-top {
    display: flex;
    align-items: center;
    padding: 10px 0;
    box-sizing: border-box;
    .top-name {
      font-size: 18px;
      color: #fff;
      margin-right: 15px;
    }
    .top-code {
      font-size: 14px;
      color: #fff;
    }
  }
  .point-instrument {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    .instrum-box {
      width: 48%;
      height: 100%;
      background: #172a3a;
      color: @main-font-color;
      padding: 10px;
      font-size: 14px;
      border: 1px solid #027395;
      border-radius: 2px;
      box-shadow: 0 0 4px #00aadd;
      text-align: center;
      cursor: pointer;
      .instrum-status {
      }
      .instrum-number {
        text-align: center;
        margin-top: 10px;
        font-size: 24px;
        font-weight: 700;
        color: #dd0000;
      }
      .inform {
        color: #00ff00;
      }
    }
    .instrum-box:hover {
      box-shadow: 0 0 6px #00aadd;
    }
  }
}
// 左侧搜索框
.leftSearch-show {
  position: absolute;
  display: flex;
  left: 0;
  top: 0;
  padding: 10px 20px;
  width: 100%;
  background-color: rgba(17, 46, 110, 0.7);
  .leftSearch-content {
    display: flex;
    align-items: center;
    // background: red;
    margin-right: 10px;
    .leftSearch-font {
      font-size: @main-font-size;
      color: @main-font-color;
      margin-right: @title-padding;
    }
    .leftSearch-station {
      width: 37px;
    }
  }
  .leftSearch-content:last-child {
    margin-right: 0;
  }
}
// 图例
.legend-show {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  left: 20px;
  bottom: 30px;
  width: 113px;
  // height: 80px;
  border: 1px solid #05c1f5;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  // background: @global-header-bbg;
  .legend-img {
    display: flex;
    align-items: center;
    img {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
    .legend-small-img {
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      display: flex;
      img {
        width: 18px;
        height: 18px;
        margin-right: 0px;
      }
    }
  }

  .legend-font {
    color: #fff;
  }
}

// 设备波段弹框
.panel-instrument {
  .band-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // flex-wrap: wrap;
    margin-top: 20px;
    .band-box-input {
      // height:40px;
      padding-bottom: 20px;
      span {
        color: white;
        margin-right: 20px;
      }
    }
    .band-box-item {
      height: 600px;
      display: flex;
      flex-direction: column;
      .band-item {
        width: 100%;
        height: 350px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: #fff;
        margin-left: 2%;
        margin-bottom: 30px;
        .title-name {
          height: 40px;
          line-height: 40px;
          padding-left: 20px;
          font-size: 18px;
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    :deep(.title) {
      display: none;
    }
    :deep(.echarts-assembly) {
      margin-top: 30px;
    }
  }
  // :deep(.pie-panel .operate-item) {
  //   max-height: 100%;
  // }
}
.panel-instrument-big {
  display: flex;
  justify-content: center;
  align-items: center;
  .big-echarts {
    height: 100%;
    width: 100%;
    display: flex;
    // justify-content: space-around;
    // align-items: center;
    flex-direction: column;
    .sample-name {
      height: 40%;
      display: flex;
      justify-content: space-around;
      align-items: center;

      span {
        width: 15%;
        height: 100%;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .echarts-img {
        //  width:30%;
        height: 100%;
      }
    }
    .sample-upload {
      margin-top: 20px;
      height: 40%;
      display: flex;
      justify-content: flex-end;
    }
  }
}
.facility-table {
  padding: 40px 0;
  position: absolute;
  display: flex;
  left: 20px;
  top: 30px;
}
:deep(.el-input__wrapper) {
  width: 250px;
  border-radius: 2px 0px 0px 2px;
}
:deep(.el-button > span) {
  color: #fff;
}
:deep(.el-button) {
  width: 50px;
  height: 36px;
  border-radius: 0px 2px 2px 0px;
  background-color: #00aadd;
}
:deep(.pie-panel .pie-panel-content) {
  z-index: 7;
}
:deep(.confirm[data-v-1580d4cc]) {
  width: 4rem;
  border-radius: 4px;
  height: 2rem;
  margin-right: 10px;
}
:deep([data-v-1580d4cc] .el-button) {
  background-color: transparent;
  border: 1px solid #00aadd;
}
</style>
