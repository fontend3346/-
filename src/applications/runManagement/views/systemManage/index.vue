<template>
  <div class="disView">
    <div class="disView-content">
      <!-- 分布展示模块 -->
      <!-- <div id="mapContainer" :key="state.random"> </div>-->
      <PIEMap @onload="onload" :options="pieOptions"></PIEMap>
      <!-- 工具栏 -->
      <PIEMapTool
        :curTool="state.curTool"
        @checkFn="checkFn"
        @enlargeFn="enlargeFn"
        @reduceFn="reduceFn"
        @checkLayer="checkLayer"
        @coverageList="coverageList"
        @allStatisticsClick="allStatisticsClick"
      ></PIEMapTool>
      <!-- 控制图层列表 -->
      <PIECoverage
        class="coverage"
        :pieCoverage="isShowCoverage"
        @selectChange="selectChange"
        :coverageList="state.coverageList"
      ></PIECoverage>
      <!-- 统计 -->
      <div v-if="state.allStatisticsShow" class="table-box">
        <allStatistics @closeFun="closeFun"></allStatistics>
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
      <!-- 图例展开与收起 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="图例"
        placement="top"
        v-if="!showlegend"
      >
        <div
          :class="['legend-icon', 'iconfont', 'icon-daohangzhankai']"
          @click="clicklegend"
        ></div>
        <!-- 'icon-daohangshouqi'  -->
      </el-tooltip>
      <!-- 图例 -->
      <div class="legend-style" v-if="showlegend">
        <PIELegend
          @close="closeLegend"
          iconclass="icon-daohangshouqi"
        ></PIELegend>
      </div>
      <!-- 台站点击-弹框 -->
      <PIEPanel
        class="pie-equip-panel"
        v-model:visible="showPonit"
        :title="markData.pointTitle"
        :width="25"
        :height="40"
        :cancelBtn="false"
        @cancel="cancelStation"
        :confirmBtn="false"
        :moveLeft="'70%'"
        :moveTop="'20%'"
      >
        <template v-slot:operateItem>
          <div class="ponit-modal">
            <!-- 正常/异常设备 -->
            <div class="point-instrument">
              <div class="instrum-box">
                <span class="instrum-status">正常设备(台)</span>
                <div class="instrum-number inform">
                  {{ facilityInfo.nomalFactilityNum }}
                </div>
              </div>
              <!-- @click="instrumentClick(1)" -->
              <!-- @click="instrumentClick(0)" -->
              <div class="instrum-box">
                <span class="instrum-status">异常设备(台)</span>
                <div class="instrum-number">
                  {{ facilityInfo.abFactilityNum }}
                </div>
              </div>
            </div>
            <div class="point-modal-center">
              <div class="title">台站名称：</div>
              <div class="info">{{ markData.detailPoint.name }}</div>
            </div>
            <div class="point-modal-center">
              <div class="title">台站编码：</div>
              <div class="info">{{ markData.detailPoint.code }}</div>
            </div>
            <div class="point-modal-center">
              <div class="title">台网：</div>
              <div class="info">{{ markData.detailPoint.networkname }}</div>
            </div>
            <div class="point-modal-center">
              <div class="title">台阵：</div>
              <div class="info">{{ markData.detailPoint.stationtypename }}</div>
            </div>
            <div class="point-modal-center">
              <div class="title">经度：</div>
              <div class="info">{{ markData.detailPoint.longitude }}</div>
            </div>
            <div class="point-modal-center">
              <div class="title">纬度：</div>
              <div class="info">{{ markData.detailPoint.latitude }}</div>
            </div>
            <!-- <div class="point-modal-center">
              <div class="title">创建时间：</div>
              <div class="info">{{ markData.detailPoint.create_time }}</div>
            </div>
            <div class="point-modal-center">
              <div class="title">高程：</div>
              <div class="info">{{ markData.detailPoint.elevation }}</div>
            </div> -->
            <!-- <div class="point-modal-center">
              <div class="title">台站岩性：</div>
              <div class="info">
                {{ markData.detailPoint.stationLithology }}
              </div>
            </div> -->
            <!-- <div class="point-modal-center">
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
            </div> -->
            <div class="point-modal-center">
              <div class="title">状态：</div>
              <div class="info">
                {{ markData.detailPoint.status === 0 ? "正常" : "异常" }}
              </div>
            </div>
            <!--  v-show="state.isMonitor" -->
            <div class="point-modal-center">
              <div class="band-button" @click="bandClick">台站监控</div>
              <div class="band-button" @click="modelClick">台站模型</div>
            </div>
            <PIETable
              :maxHeight="200"
              :data="facilityInfo.linkageData"
              :columns="facilityInfo.linkageColumns"
              :showIndex="true"
              :operationWidth="130"
              @on-row-click="stationRowclick"
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
            <PIEPage
              :total="facilityInfo.total"
              :pageSize="state.pageSize"
              :currentPage="facilityInfo.pageNum"
              @handleSizeChange="sizeChangeDevice"
              @handleNumChange="pageChanges"
              :isSmall="'prev, pager, next'"
              :smallSize="true"
            ></PIEPage>
          </div>
        </template>
      </PIEPanel>
      <!-- 台站详情>台站监控  -->
      <PIEFacility
        :showInstrument="showInstrument"
        :equipmentVal="equipmentVal"
        :equipmentArr="facilityInfo.equipmentArr"
        :options1="options1"
        :showEchartsValue="showEchartsValue"
        :options2="options2"
        @calcelInstrument="calcelInstrument"
        @equipmentChange="equipmentChange"
        @bandConfirm="bandConfirm"
        @echartDragOne="echartDragOne"
        @echartDragTwo="echartDragTwo"
        :width="80"
        :height="70"
        moveLeft="10%"
        moveTop="15%"
      ></PIEFacility>
      <!--台站详情>正常/异常设备点击弹窗-->
      <PIEPanel
        class="facility-table"
        v-model:visible="facility"
        title="设备"
        :width="27"
        :height="30"
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
          </div>
        </template>
      </PIEPanel>
      <!--波段确定展示大图 “保存样本”框-->
      <PIEPanel
        class="panel-instrument-big"
        v-model:visible="showBigImgEcharts"
        title="保存样本"
        :width="25"
        :height="20"
        :cancelBtn="false"
        :confirmBtn="false"
        :moveLeft="'2%'"
        :moveTop="'15%'"
      >
        <template v-slot:operateItem>
          <div class="big-echarts">
            <div class="sample-name">
              <span>样本名称</span>
              <el-input
                v-model="sampleValue"
                placeholder="请输入样本名称"
              ></el-input>
            </div>
            <div class="sample-upload">
              <el-button @click="sampleClick(1)">保存</el-button>
            </div>
          </div>
        </template>
      </PIEPanel>
      <!--波段确定展示大图 “保存样本”框 从设备弹框点入-->
      <PIEPanel
        class="panel-instrument-big"
        v-model:visible="showBigImgEchartsEquip"
        title="保存样本"
        :width="25"
        :height="20"
        :cancelBtn="false"
        :confirmBtn="false"
        :moveLeft="'38%'"
        :moveTop="'40%'"
      >
        <template v-slot:operateItem>
          <div class="big-echarts">
            <div class="sample-name">
              <span>样本名称</span>
              <el-input
                v-model="sampleValue"
                placeholder="请输入样本名称"
              ></el-input>
            </div>
            <div class="sample-upload">
              <el-button @click="sampleClick(2)">保存</el-button>
            </div>
          </div>
        </template>
      </PIEPanel>
      <!-- 地图弹框（台网） -->
      <PIEMapPointDetails
        class="isNetwork"
        ref="modalRef"
        v-show="markShow"
        :valueData="state.markData1"
        :valueDataElse="state.valueDataElse"
        v-model:showInfo="showInfoMark"
        :showUpdate="showUpdate"
        :isConfig="false"
        :tableShow="isShowFacility"
        close="true"
        :title="netWorkTitle"
        @cancel="cancel"
        @facilityNetworkFun="facilityNetMark"
      >
        <template v-slot:tableItem>
          <!-- 设备、台网、测点信息 -->
          <div class="facility-Info">
            <PIETable
              height="200"
              :maxHeight="200"
              :data="facilityNetwork.linkageData"
              :columns="facilityNetwork.linkageColumns"
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
              @on-row-click="rowclick"
            >
            </PIETable>
            <div class="pie-tb-footer">
              <PIEPage
                :total="state.total"
                :pageSize="state.pageSize"
                :currentPage="state.pageNum"
                @handleSizeChange="sizeChangeDevice"
                @handleNumChange="pageChangeDevice"
                :isSmall="'prev, pager, next'"
                :smallSize="true"
              ></PIEPage>
            </div>
          </div>
        </template>
      </PIEMapPointDetails>
      <!-- 点击台网弹框，点击“设备”出现的弹框 -->
      <!-- <PIEPanel
        class="facility-table"
        v-model:visible="state.netDataShow"
        :title="facilityNetwork.title"
        :width="27"
        :height="30"
        :cancelBtn="false"
        :confirmBtn="false"
        :moveLeft="'42%'"
        :moveTop="'21%'"
      >
        <template v-slot:operateItem>
        </template>
      </PIEPanel> -->
      <!-- 点击测点弹框 -->
      <PIEThreeMeasure
        :measureShow="measureShow"
        :measureObj="measureObj"
        class="three-measure"
        :stationInfo="state.stationInfo"
        :netInfo="state.netInfo"
        @cancel="cancel"
      ></PIEThreeMeasure>
      <!-- 树形结构(dou) -->
      <div :class="state.showTree ? 'tree-total' : 'tree-total1'">
        <div class="icon-box">
          <span
            class="arrow-box"
            :class="
              state.showTree
                ? 'iconfont icon-shouqi-'
                : 'iconfont icon-zhankai-'
            "
            @click="treeShowClick"
            :title="state.showTree ? '收起' : '展开'"
          ></span>
        </div>

        <el-tree
          :props="treeProps"
          :data="state.treeStations"
          @node-click="nodeClick"
          v-show="state.showTree"
          :load="loadNode"
          lazy
          accordion
        />
      </div>
    </div>
    <div class="selectBtn" @click="searchClick">
      <el-input placeholder="请输入关键词">
        <template #prepend>
          <img class="search-img" src="@/assets/image/select.png" alt="搜索" />
        </template>
      </el-input>
    </div>
    <!-- 全部查询 -->
    <PIESelect
      v-show="state.facility"
      @cancelSelect="cancelSelect"
      @handleClick="handleClick"
      :roleLevel="state.roleLevel"
      :selectNetList="state.selectNetList"
      :selectNetLists="state.selectNetLists"
      :foreignList="state.foreignList"
      :stationChildList="state.stationChildList"
      :subjectListList="state.subjectListList"
      :stationChildList2="state.stationChildList2"
      :deviceList="state.deviceList"
      :deviceName="deviceName"
      :stationTableShow="stationTableShow"
      :stationTableList="facilityNetwork.stationTableList"
      :stationColumns="facilityNetwork.stationColumns"
      @TestSelect="TestSelect"
      :seeList="facilityNetwork.seeList"
      :seeColumns="facilityNetwork.seeColumns"
      :activeName="activeName"
      @networkChange1="networkChange1"
      @stationNetworkChange="stationNetworkChange"
      @netCodeChange="netCodeChange"
      @networkChange="networkChange"
      @stationChildChange="stationChildChange"
      @subjectListChange="subjectListChange"
      @stationEquipChange="stationEquipChange"
      @equipNetworkChange="equipNetworkChange"
      @stationCodeChange="stationCodeChange"
      @queryDeviceName="queryDeviceName"
      @deviceCodeChange="deviceCodeChange"
      @stationSelect="stationSelect"
      @foreignChang="foreignChang"
    ></PIESelect>
  </div>
</template>

<script lang="ts" setup>
import allStatistics from "./allStatistics.vue";
import { useHandler } from "./systemManage";
import { useHandlerThree } from "./threeSystem/threeMeasure";
import { reactive, nextTick, onMounted, ref, watch } from "vue";
let threeRef: any = ref(null);

onMounted(() => {
  // measurShow.value = measureShow.value;
});
const {
  state,
  showTable,
  tableNumber,
  activeName,
  isTableShow,
  isSpecilShow,
  echartsData,
  markShow,
  showInfoMark,
  netWorkTitle,
  showUpdate,
  modalRef,
  isShowFacility,
  stationTableShow,
  seePointShow,
  facilityNetwork,
  equipTitle,
  markShowEquip,
  cancelModalEquip,
  showInfoMarkEquip,
  showUpdateEquip,
  modalRefEquip,
  deviceName,
  equipmentType,
  equipmentCode,
  popup,
  isCheckLayerShow,
  searchVal,
  markData,
  showPonit,
  cancelStation,
  showInstrument,
  calcelInstrument,
  facility,
  sampleValue,
  equipmentVal,
  showBigImgEcharts,
  showBigImgEchartsEquip,
  facilityInfo,
  detailId,
  initMap,
  getProvince,
  getTaiwanese,
  getStations,
  getCountry,
  getTreeStations,
  baseMapObj,
  map,
  samllBaseMapObj,
  smallMap,
  options1,
  options2,
  options3,
  options4,
  getWorker,
  work,
  getWorker2,
  cancel,
  facilityNetMark,
  toTable,
  closeTable,
  isShowCoverage,
  timer,
  inputChange,
  addStationsPoint,
  addInternetPoint,
  internetApi,
  addMeasurementPoint,
  measurementApi,
  addEquipmentPoint,
  treeProps,
  loadNode,
  onClicks,
  onClickNet,
  onClicksEquip,
  updateInfo,
  submitForm,
  delInfo,
  searchId,
  provinceTaiwanese,
  stationsTotal,
  foreignChang,
  networkChange,
  networkChange1,
  stationNetworkChange,
  netCodeChange,
  addStationPoints,
  flyProvince,
  stationArrayChange,
  stationArrayChange1,
  stationChildChange,
  subjectListChange,
  stationEquipChange,
  equipNetworkChange,
  stationCodeChange,
  addStationChildPoints,
  addPointNormal,
  checkFn,
  enlargeFn,
  reduceFn,
  checkLayer,
  coverageList,
  allStatisticsClick,
  closeFun,
  selectChange,
  selectChangeLayer,
  checkMapFn,
  addContourLine,
  instrumentClick,
  pageChange,
  pageChanges,
  sizeChange,
  searchList,
  searchFacilityNum,
  showEchartsValue,
  showWave,
  showWaveBottom,
  bandClick,
  listenCount,
  echartDragOne,
  echartDragTwo,
  echartDragThree,
  echartDragFour,
  bandConfirm,
  bandConfirmEquip,
  equipmentChange,
  sampleClick,
  searchClick,
  cancelSelect,
  nodeClick,
  displayNet,
  displayStation,
  treeShowClick,
  contourLines,
  equipmentNameQuery,
  queryDeviceName,
  deviceCodeChange,
  handleClick,
  TestSelect,
  stationSelect,
  measureShow,
  measureObj,
  sizeChangeDevice,
  pageChangeDevice,
  closeLegend,
  pieOptions,
  onload,
  showlegend,
  clicklegend,
  rowclick,
  stationRowclick,
  modelClick,
} = useHandler();

// // 测点模型
// watch(measureShow, () => {
//   if (measureShow.value) {
//     nextTick(() => {
//       initModel();
//     });
//   }
// });

// const { initModel, moveShow, treePanelRef, threeData } =
//   useHandlerThree(threeRef);
</script>

<style lang="less" scoped>
//覆盖表格
.table-box {
  position: fixed;
  // z-index: 9999;
  z-index: 4;
  top: 5%;
  left: 0%;
  width: 100%;
  height: 95%;
  // padding-top: 40px;
  // padding-left: 40px;
  background: rgba(10, 37, 88, 1);
  display: flex;
  .iconfont {
    position: absolute;
    right: 1%;
    color: #fff;
    top: 2%;
    padding: 5px;
    border: 1px solid #fff;
    border-radius: 50%;
    z-index: 999;
  }
}
.disView {
  height: 100%;
  width: 100%;
  // position: relative;
}
.disView-content {
  height: 100%;
  position: relative;
}
.coverage {
  position: absolute;
  right: 60px;
  top: 300px;
  // width: 100px;
  // height: 100px;
  border: 1px solid #05c1f5;
  background: rgba(14, 35, 90, 0.5);
  z-index: 10;
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
  z-index: 10;
  .tool-item {
    width: 30px;
    height: 30px;
    // background-color: #ccc;
    margin-bottom: 20px;
    border-radius: 15px;
    border: 2px solid #005bb0;
    padding: 4px;
    position: relative;
    background: #002649;
    box-shadow: inset 0px 0px 40px 0px rgba(0, 80, 148, 0.4);
    opacity: 0.8;
  }
  // .tool-item:hover {
  //   background: #0e90ff;
  //   border: 2px solid rgba(255, 255, 255, 0.2);
  //   box-shadow: none;
  // }
  // .tool-item.active {
  //   background: #0e90ff;
  //   border: 2px solid rgba(255, 255, 255, 0.2);
  //   box-shadow: none;
  // }
  // 图层
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
//台站弹框
.pie-equip-panel {
  :deep(.pie-panel-content) {
    background-color: transparent !important;
    // background: url(../../../../assets/qietu/modals-bg.png);
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
      margin-right: 20px;
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
//设备弹框
.pie-mark-modal {
  position: absolute;
  right: 5%;
  top: 8%;
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
// 树形结构（dou）
.tree-total {
  z-index: 1;
  position: absolute;
  left: 38px;
  top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // border: 1px solid #05c1f5;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  background: linear-gradient(
      rgba(0, 38, 73, 0.88) 0%,
      rgba(0, 47, 91, 0.96) 100%
    )
    transparent;
  box-shadow: rgb(61 141 255 / 30%) 0px 4px 20px 0px,
    rgb(0 100 186 / 50%) 0px 0px 32px 0px inset;
  border: 1px solid;
  border-image: linear-gradient(rgb(0, 133, 192), rgb(0, 91, 176)) 1 / 1 / 0
    stretch;
  // background: url(../../../../assets/qietu/modals-bg.png);
  background-size: 100% 100%;
  // background: rgba(14, 35, 90, 0.5);
  :deep(.el-tree) {
    width: 300px;
    height: 500px;
    overflow-y: auto;
    --el-tree-node-hover-bg-color: rgba(255, 255, 255, 0.3);
  }
  :deep(.el-tree)::-webkit-scrollbar {
    display: none;
  }
  .icon-box {
    overflow: hidden;
    margin-right: -17px;
    margin-top: 4px;
    .arrow-box {
      color: #fff;
      float: right;
      // font-size: 16px;
      cursor: pointer;
    }
    .iconfont {
      font-size: 12px;
      background-color: #0e90ff;
      border-radius: 50%;
      padding: 5px;
    }
  }
}

.tree-total::before {
  content: "";
  display: block;
  /* width: 8px; */
  // border-left: 28px solid rgba(0, 0, 0, 0);
  border-top: 10px solid transparent;
  border-left: 7px solid #0173dd;
  border-bottom: 10px solid transparent;
  /* border-right: 10px solid red; */
  height: 32px;
  position: absolute;
  left: -1px;
  top: 7%;
}

.tree-total::after {
  content: "";
  display: block;
  /* width: 8px; */
  border-top: 10px solid transparent;
  border-right: 7px solid #0173dd;
  border-bottom: 10px solid transparent;
  /* border-right: 10px solid red; */
  height: 20%;
  width: 0px;
  position: absolute;
  right: 0px;
  top: 67%;
}
.tree-total1 {
  display: none;
  z-index: 1;
  position: absolute;
  left: 0px;
  top: 80px;

  .icon-box {
    overflow: hidden;
    margin-right: -17px;
    margin-top: 4px;
    .arrow-box {
      color: #fff;
      float: right;
      // font-size: 16px;
      cursor: pointer;
    }
    .iconfont {
      font-size: 12px;
      background-color: #0e90ff;
      border-radius: 50%;
      padding: 5px;
    }
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
    margin-top: 14px;
    .band-box-input {
      // height:40px;
      padding-bottom: 12px;
      span {
        color: #98dcff;
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
        // margin-left: 2%;
        margin-bottom: 10px;
        span {
          color: #98dcff;
          height: 30px;
          line-height: 30px;
          padding-left: 20px;
          padding-right: 20px;
          box-sizing: border-box;
          font-size: 18px;
          margin-top: 5px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          overflow: hidden;
          text-overfolw: ellipsis;
          white-space: nowrap;
        }
        .title-name {
          height: 30px;
          line-height: 30px;
          // padding-left: 20px;
          font-size: 18px;
          // margin-top: 5px;
          display: flex;
          justify-content: space-between;
          span {
            color: #98dcff;
          }
          :deep(.el-button > span) {
            color: #98dcff;
          }
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
}
.legend-style {
  position: absolute;
  left: 35px;
  bottom: 10px;
}
.legend-icon {
  position: absolute;
  left: 15px;
  bottom: 100px;
  font-size: 25px;
  color: #076dcc;
}
.legend-icon:hover {
  color: #2181f0;
}

//地图设备弹框 echart图特殊样式
.equip-box {
  // background: url(../../../../assets/qietu/modals-bg.png);
  background-size: 100% 100%;
  .band-item {
    border: 0 !important;
  }
}

.panel-instrument-big {
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  :deep(.pie-panel-content) {
    z-index: 2 !important;
  }
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
        width: 30%;
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
      margin-top: 30px;
      height: 40%;
      display: flex;
      justify-content: flex-end;
    }
  }
}
.isNetwork {
  position: absolute;
  // background: url(../../../../assets/qietu/modals-bg.png);
  background-size: 100% 100%;
  display: flex;
  right: 80px;
  top: 16%;
}
.facility-table {
  // padding: 40px 0;
  position: absolute;
  display: flex;
  left: 20px;
  top: 30px;
}
// 模型dom大小
#threeContainer {
  width: 1500px;
  height: 800px;
}
// :deep(.el-input__wrapper) {
//   width: 250px;
//   border-radius: 2px 0px 0px 2px;
// }
:deep(.el-button > span) {
  color: #fff;
}
:deep(.el-button) {
  width: 50px;
  height: 36px;
  border-radius: 0px 2px 2px 0px;
  background-color: #00aadd;
}
// :deep(.pie-panel .pie-panel-content) {
//   z-index: 0;
// }

:deep(.confirm) {
  width: 4rem;
  border-radius: 4px;
  height: 2rem;
  margin-right: 10px;
}
:deep(.el-button) {
  background-color: transparent;
  border: 1px solid #00aadd;
}

.home-content {
  height: 100%;
  overflow-y: auto;
  margin-left: 20px;
  width: 100%;
  border: 1px solid @global-header-bbg;
  // padding: 20px;
  box-sizing: border-box;
}

.selectBtn {
  position: absolute;
  top: 90px;
  left: 40px;
  // background: url("../../../../assets/image/select.png");
  background-size: 100% 100%;
  width: 325px;
  height: 40px;
  :deep(.el-input__wrapper) {
    border: none;
  }
  .search-img {
    height: 10px;
  }
  :deep(.el-input-group__prepend) {
    padding: 0 5px;
    background: transparent;
  }
  :deep(.el-input) {
    border: 1px solid #005bb0;
    background: rgba(24, 77, 126, 0.8);
    --el-input-focus-border-color: transparent;
    --el-input-hover-border-color: transparent;
  }
}
//panel背景
:deep(.pie-panel .pie-panel-content) {
  // background: url(../../../../assets/qietu/modals-bg.png);
  background-size: 100% 100%;
  // background: none;
  //backGroundColor="'rgba(26, 53, 74, 0.9)'"
}

:deep(.el-input__wrapper) {
  width: 10rem;
}
:deep(.el-tabs__nav-wrap::after) {
  position: static !important;
}
:deep(.el-tabs__item) {
  color: #fff;
}
:deep(.pie-panel .operate-item) {
  overflow-y: hidden;
  max-height: 850px;
}
:deep(.el-table tr) {
  cursor: pointer;
}
:deep(.el-select-dropdown__item) {
  padding: 0 @global-small-padding;
}
:deep(.select-box) {
  position: absolute;
  left: 20px;
  top: 20px;
}
</style>
