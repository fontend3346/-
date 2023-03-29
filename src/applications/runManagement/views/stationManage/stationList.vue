<template>
  <div class="disView">
    <div class="station-list">
      <!-- <div id="mapContainer"></div> -->
      <PIEMap
        class="map-container"
        @onload="onload"
        @mousewheelEvent="mousewheelEvent"
        :options="pieOptions"
      ></PIEMap>
      <!-- 地图工具栏 -->
      <PIEMapTool
        :curTool="state.curTool"
        :allStatiShow="false"
        @checkFn="checkFn"
        @enlargeFn="enlargeFn"
        @reduceFn="reduceFn"
        @checkLayer="checkLayer"
        @coverageList="coverageList"
        :coverageShow="false"
      ></PIEMapTool>
      <!-- 底图切换 -->
      <div class="map-check" v-show="isCheckLayerShow">
        <div
          class="map-check-item"
          v-for="(item, index) in state.baseLayerList"
          :key="index"
        >
          <img :src="item.img" @click="checkMapFn(item)" />
        </div>
      </div>
      <div
        :class="state.showTable ? '' : 'legend-icon-up'"
        @click="clicklegend"
      ></div>
      <div class="station-list-admin" v-show="state.showTable">
        <div class="icon-close" @click="closeLegend">
          <span class="iconfont icon-guanbi"></span>
        </div>
        <!-- 1-1 站点信息管理表格 -->
        <div class="header-left-content">
          <div class="left-content-justify">
            <!-- <div class="left-content-item">
            <span class="left-name">国家级</span>
            <el-select
              :popper-append-to-body="false"
              clearable
              v-model="state.overseas"
              placeholder="请选择国家级"
               
              @change="foreignChang"
            >
              <el-option
                v-for="item in state.localList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                class="select-item"
              ></el-option>
            </el-select>
          </div> -->
            <div class="left-content-item">
              <span class="left-name">台网</span>
              <el-select
                :popper-append-to-body="false"
                clearable
                filterable
                v-model="state.selectNetwork"
                placeholder="请选择省级"
                @change="networkChangeMain"
                @clear="search"
                value-key="networkId"
              >
                <el-option
                  v-for="item in state.selectNetList"
                  :key="item.networkId"
                  :label="item.cname"
                  :value="item"
                  class="select-item"
                ></el-option>
              </el-select>
            </div>
            <div class="left-content-item">
              <span class="left-name">台站类型</span>
              <el-select
                :popper-append-to-body="false"
                clearable
                filterable
                v-model="state.stationArray"
                placeholder="请选择台站类型"
                @change="stationArrayChange"
              >
                <el-option
                  v-for="item in state.stationArrayList"
                  :key="item.id"
                  :label="item.typeName"
                  :value="item.id"
                  class="select-item"
                ></el-option>
              </el-select>
            </div>
            <div class="left-content-item">
              <span class="left-name">学科类型</span>
              <el-select
                :popper-append-to-body="false"
                clearable
                filterable
                v-model="state.subjectionSubkect"
                placeholder="请选择学科类型"
                @change="subjectionSubkectChange"
              >
                <el-option
                  v-for="item in state.subjectionSubkectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  class="select-item"
                ></el-option>
              </el-select>
            </div>
            <div class="left-content-item">
              <span class="left-name left-name-long">台站名称</span>
              <el-input
                v-model="state.fitData"
                placeholder="请输入台站名称"
                clearable
                @clear="search"
              ></el-input>
            </div>
          </div>
          <div class="btn-style">
            <div class="btn">
              <button @click="search">查询</button>
              <button @click="addConfig">新增</button>
            </div>
          </div>
        </div>

        <!-- -->
        <div class="pie-tb-iscontent">
          <PIETable
            :maxHeight="215"
            :data="state.linkageData"
            :columns="state.linkageColumns"
            :isAction="true"
            :editBtn="true"
            :deleteBtn="true"
            :showIndex="true"
            :operationWidth="200"
            :lookBtn="true"
            @edit="update"
            @confirmDelete="confirmDelete"
            @on-row-click="onRowClick"
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
        <!--  -->
        <div class="pie-tb-footer">
          <PIEPage
            :total="state.total"
            :pageSize="state.pageSize"
            :currentPage="state.pageNum"
            @handleSizeChange="sizeChange"
            @handleNumChange="pageChange"
          ></PIEPage>
        </div>
      </div>
      <!-- 新建弹窗 -->
      <PIEPanel
        :title="state.title"
        v-model:visible="state.showAdd"
        class="add-modal"
        width="50"
        height="85"
        :moveRight="'80px'"
        :moveTop="'60px'"
        @confirm="confirm"
        @cancel="cancel"
      >
        <template #operateItem>
          <div class="modal-wrapper">
            <!--基本信息-->
            <div class="essential-information">
              <div class="information-title">基本信息</div>
              <div class="modal-content">
                <span class="modal-label-name">台站名称:</span>
                <el-input v-model="ruleForm.stationName"></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">台站编码:</span>
                <el-input v-model="ruleForm.stationCode"></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">台站级别:</span>
                <el-select
                  :popper-append-to-body="false"
                  clearable
                  v-model="ruleForm.stationProperty"
                  placeholder="请选择台站级别"
                >
                  <el-option
                    v-for="item in ruleForm.stationPropertyList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    class="select-item"
                  ></el-option>
                </el-select>
              </div>
              <!-- <div class="modal-content">
                <span class="modal-label-name">台站岩性:</span>
                <el-input v-model="ruleForm.stationLithology"></el-input>
              </div> -->
              <div class="modal-content">
                <span class="modal-label-name">台站岩性:</span>
                <el-select
                  :popper-append-to-body="false"
                  clearable
                  v-model="ruleForm.stationLithology"
                  placeholder="请选择台站岩性"
                >
                  <el-option
                    v-for="item in state.stationLithologyList"
                    :key="item.id"
                    :label="item.typeName"
                    :value="item.id"
                    class="select-item"
                  ></el-option>
                </el-select>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">隶属学科:</span>
                <el-select
                  :popper-append-to-body="false"
                  clearable
                  v-model="ruleForm.subjectionSubkect"
                  placeholder="请选择隶属学科"
                >
                  <el-option
                    v-for="item in state.subjectionSubkectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    class="select-item"
                  ></el-option>
                </el-select>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">隶属台网:</span>
                <el-select
                  :popper-append-to-body="false"
                  clearable
                  v-model="ruleForm.unit"
                  placeholder="请选择台网"
                  @change="networkChangeAdd"
                  filterable
                >
                  <el-option
                    v-for="item in state.selectNetList"
                    :key="item.networkId"
                    :label="item.cname"
                    :value="item.networkId"
                    class="select-item"
                  ></el-option>
                </el-select>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">台站类型:</span>
                <el-select
                  :popper-append-to-body="false"
                  clearable
                  v-model="ruleForm.stationType"
                  placeholder="请选择台站类型"
                >
                  <el-option
                    v-for="item in state.stationArrayList"
                    :key="item.id"
                    :label="item.typeName"
                    :value="item.id"
                    class="select-item"
                  ></el-option>
                </el-select>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">建台时间:</span>
                <el-date-picker
                  v-model="ruleForm.ctime"
                  type="datetime"
                  placeholder="请选择建台时间"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss"
                >
                </el-date-picker>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">台站状态:</span>
                <el-select
                  :popper-append-to-body="false"
                  clearable
                  v-model="ruleForm.stationState"
                  placeholder="请选择台站状态"
                >
                  <el-option
                    v-for="item in state.stationStateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    class="select-item"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <!--位置信息-->
            <div class="essential-information">
              <div class="position-title">位置信息</div>
              <div class="map-point" @click="onClicks"></div>
              <div class="modal-content">
                <span class="modal-label-name">经度:</span>
                <el-input v-model="ruleForm.longitude"></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">纬度:</span>
                <el-input v-model="ruleForm.latitude"></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">高程:</span>
                <el-input v-model="ruleForm.elevation"></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">是否境内外:</span>
                <el-radio-group v-model="ruleForm.overseas" class="ml-4">
                  <el-radio label="0" size="large">境内</el-radio>
                  <el-radio label="1" size="large">境外</el-radio>
                </el-radio-group>
              </div>
            </div>
            <!--其他信息-->
            <div class="essential-information">
              <div class="other-title">其他信息</div>
              <div class="modal-content">
                <span class="modal-label-name">详细信息:</span>
                <el-input
                  type="textarea"
                  v-model="ruleForm.stationAddress"
                ></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">管理方式:</span>
                <el-select
                  :popper-append-to-body="false"
                  clearable
                  v-model="ruleForm.supervisorMode"
                  placeholder="请选择管理方式"
                >
                  <el-option
                    v-for="item in ruleForm.supervisorModeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    class="select-item"
                  ></el-option>
                </el-select>
              </div>
              <!-- <div class="modal-content">
                <span class="modal-label-name">开启检测:</span>
                <el-radio-group v-model="ruleForm.testStatus" class="ml-4">
                  <el-radio label="0" size="large">开启</el-radio>
                  <el-radio label="1" size="large">关闭</el-radio>
                </el-radio-group>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">描述:</span>
                <el-input
                  type="textarea"
                  v-model="ruleForm.description"
                ></el-input>
              </div> -->
            </div>
          </div>
        </template>
      </PIEPanel>
      <!-- 修改弹窗 -->
      <PIEPanel
        :title="state.editTitle"
        v-model:visible="state.showModify"
        class="add-modal"
        width="50"
        height="85"
        :moveRight="'40px'"
        :moveTop="'60px'"
        @confirm="updatConfirm"
        @cancel="cancel"
      >
        <template #operateItem>
          <div class="modal-wrapper">
            <div class="essential-information">
              <div class="information-title">基本信息</div>
              <div class="modal-content">
                <span class="modal-label-name">台站名称:</span>
                <el-input v-model="updateForm.stationName"></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">台站编码:</span>
                <el-input v-model="updateForm.stationCode"></el-input>
              </div>
              <!-- <div class="modal-content">
                <span class="modal-label-name">台站岩性:</span>
                <el-input v-model="updateForm.stationLithology"></el-input>
              </div> -->
              <div class="modal-content">
                <span class="modal-label-name">台站级别:</span>
                <el-select
                  :popper-append-to-body="false"
                  clearable
                  v-model="updateForm.stationProperty"
                  placeholder="请选择台站级别"
                >
                  <el-option
                    v-for="item in updateForm.stationPropertyList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">台站岩性:</span>
                <el-select
                  :popper-append-to-body="false"
                  clearable
                  v-model="updateForm.stationLithology"
                  placeholder="请选择台站岩性"
                >
                  <el-option
                    v-for="item in state.stationLithologyList"
                    :key="item.id"
                    :label="item.typeName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">隶属学科:</span>
                <el-select
                  :popper-append-to-body="false"
                  clearable
                  v-model="updateForm.subjectionSubkect"
                  placeholder="请选择台阵"
                >
                  <el-option
                    v-for="item in state.subjectionSubkectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">隶属台网:</span>
                <el-select
                  :popper-append-to-body="false"
                  clearable
                  v-model="updateForm.unit"
                  placeholder="请选择台网"
                  @change="networkChangeEdit"
                  filterable
                >
                  <el-option
                    v-for="item in state.selectNetList"
                    :key="item.networkId"
                    :label="item.cname"
                    :value="item.networkId"
                  ></el-option>
                </el-select>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">台站类型:</span>
                <el-select
                  :popper-append-to-body="false"
                  clearable
                  v-model="updateForm.stationType"
                  placeholder="请选择台站类型"
                >
                  <el-option
                    v-for="item in state.stationArrayList"
                    :key="item.id"
                    :label="item.typeName"
                    :value="item.id"
                    class="select-item"
                  ></el-option>
                </el-select>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">建台时间:</span>
                <el-date-picker
                  v-model="updateForm.ctime"
                  type="datetime"
                  placeholder="请选择建台时间"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss"
                >
                </el-date-picker>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">台站状态:</span>
                <el-select
                  :popper-append-to-body="false"
                  clearable
                  v-model="updateForm.stationState"
                  placeholder="请选择台站状态"
                >
                  <el-option
                    v-for="item in state.stationStateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    class="select-item"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div class="essential-information">
              <div class="information-title">位置信息</div>
              <div class="modal-content">
                <span class="modal-label-name">经度:</span>
                <el-input v-model="updateForm.longitude"></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">纬度:</span>
                <el-input v-model="updateForm.latitude"></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">高程:</span>
                <el-input v-model="updateForm.elevation"></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">是否境内外:</span>
                <el-radio-group v-model="updateForm.overseas" class="ml-4">
                  <el-radio label="0" size="large">境内</el-radio>
                  <el-radio label="1" size="large">境外</el-radio>
                </el-radio-group>
              </div>
            </div>

            <div class="essential-information">
              <div class="information-title">其他信息</div>
              <div class="modal-content">
                <span class="modal-label-name">详细信息:</span>
                <el-input v-model="updateForm.stationAddress"></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">管理方式:</span>
                <el-select
                  :popper-append-to-body="false"
                  clearable
                  v-model="updateForm.supervisorMode"
                  placeholder="请选择管理方式"
                >
                  <el-option
                    v-for="item in updateForm.supervisorModeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    class="select-item"
                  ></el-option>
                </el-select>
              </div>
              <!-- <div class="modal-content">
                <span class="modal-label-name">开启检测:</span>
                <el-radio-group v-model="updateForm.testStatus" class="ml-4">
                  <el-radio label="0" size="large">开启</el-radio>
                  <el-radio label="1" size="large">关闭</el-radio>
                </el-radio-group>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">描述:</span>
                <el-input
                  type="textarea"
                  v-model="updateForm.description"
                ></el-input>
              </div> -->
            </div>
          </div>
        </template>
      </PIEPanel>
      <!-- 图例展开与收起 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="图例"
        placement="top"
        v-if="!state.showLegend && state.compatibleLegend"
      >
        <div
          :class="['legend-icon-station', 'iconfont', 'legend-icon-up']"
          @click="stationLegend"
        ></div>
        <!-- 'icon-daohangshouqi'  -->
      </el-tooltip>
      <!-- 图例 -->
      <div class="legend-style" v-if="state.showLegend">
        <PIELegend
          @close="stationLegendClose"
          iconclass="icon-daohangshouqi"
          :netWorkStatus="false"
        ></PIELegend>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./stationList";
const {
  stationLegend,
  stationLegendClose,
  cancel,
  mousewheelEvent,
  stationArrayChange,
  subjectionSubkectChange,
  isCheckLayerShow,
  checkMapFn,
  state,
  ruleForm,
  updateForm,
  pieOptions,
  clicklegend,
  closeLegend,
  foreignChang,
  networkChangeMain,
  networkChangeAdd,
  networkChangeEdit,
  getUnitList,
  getTaiwanese,
  provinceTaiwanese,
  getCountry,
  search,
  addConfig,
  confirm,
  update,
  updatConfirm,
  confirmDelete,
  onRowClick,
  init,
  onClicks,
  onload,
  layerClicks,
  checkFn,
  enlargeFn,
  reduceFn,
  checkLayer,
  coverageList,
  pageChange,
  sizeChange,
  initMap,
} = useHandler();
</script>

<style lang="less" scoped>
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
  padding: @global-small-padding;
  box-sizing: border-box;

  .map-check-item {
    width: 120px;
    height: 80px;
    border: 1px solid #ccc;
    margin-right: @global-small-padding;
    img {
      background-size: cover;
    }
  }
}
.disView {
  height: 100%;
  width: 100%;
}
.station-list {
  width: 100%;
  position: relative;
  height: 100%;
  // 台站图例
  .legend-icon-station {
    position: absolute;
    left: 15px;
    bottom: 20px;
    font-size: 25px;
    color: #076dcc;
  }
  .legend-style {
    position: absolute;
    left: 35px;
    bottom: 10px;
  }
}
#mapContainer {
  width: 100%;
  height: 94vh;
}
.map-container {
  width: 100%;
  height: 94vh;
}
.station-list-admin {
  position: absolute;
  bottom: 0px;
  display: flex;
  right: 0px;
  left: 0;
  height: 45%;
  flex-direction: column;
  padding: @global-padding;
  // margin: 20px 20px 0 20px;
  box-sizing: border-box;
  // padding-left: 60px;
  // padding-top: 65px;
  box-sizing: border-box;
  background: rgba(15, 49, 112, 0.8);
  max-height: 50%;
  .icon-close {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    cursor: pointer;
    height: 50px;
    .iconfont {
      color: @main-font-color;
      font-size: 24px;
      z-index: 10;
    }
  }
  .header-left-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .left-content-justify {
      // margin-bottom: 10px;
      display: flex;
      align-items: center;
      .left-content-item {
        display: flex;
        align-items: center;
        margin-right: @global-small-padding;
        justify-content: space-around;
        .left-name {
          display: inline-block;
          padding-right: @title-padding;
          font-size: @main-font-size;
          color: @main-font-color;

          box-sizing: border-box;
        }
        .left-name-long {
          width: 90px;
        }
        :deeep(.el-input) {
          width: @input-width;
          background: transparent;
          border-radius: 5px;
          border: 1px solid @global-border-color;
          height: @input-height;
          color: @main-font-color;
        }
        :deep(.el-input__wrapper) {
          width: @input-width;
        }
      }
      .left-content-items {
        justify-content: flex-end;
      }
    }
    .btn-style {
      // width: 9%;
      // padding-top: 10px;
      display: flex;
      justify-content: flex-end;
      button {
        padding: @global-small-padding @global-padding;
        box-sizing: border-box;
        background: transparent;
        margin-left: @global-small-padding;
        color: @main-font-color;
        border: 1px solid @global-header-bbg;
        cursor: pointer;
        border-radius: 5px;
      }
    }
  }
}
.legend-icon {
  position: absolute;
  right: 20px;
  bottom: 390px;
  font-size: 25px;
  color: #076dcc;
  background: url("../../../../assets/qietu/up.png");
  background-size: 100% 100%;
  width: 28px;
  height: 28px;
  border: 1px solid #076dcc;
  border-radius: 20px;
  padding: 6px;
}
.legend-icon-up {
  padding: 6px;
  border: 1px solid #076dcc;
  border-radius: 20px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  font-size: 25px;
  color: #076dcc;
  background: url("../../../../assets/qietu/down.png");
  background-size: 100% 100%;
  width: 28px;
  height: 28px;
}
.modal-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  // flex-wrap: wrap;
  .essential-information {
    width: 100%;
    border: 1px solid #2181f0;
    margin-bottom: @global-padding;
    margin-top: @global-padding;
    padding-top: @global-padding;
    padding-left: 5%;
    padding-right: 5%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .information-title,
    .position-title,
    .other-title {
      background: linear-gradient(rgba(0, 38, 73) 0%, rgba(0, 47, 91) 100%)
        transparent;
      width: 100px;
      height: 30px;
      position: absolute;
      left: 40px;
      top: -16px;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: @main-font-size;
    }
    .map-point {
      background: url("../../../../assets/qietu/position.png");
      width: 30px;
      height: 30px;
      background-size: 100% 100%;
      position: absolute;
      right: 70px;
      top: 25px;
      z-index: 10;
    }

    .modal-content {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: @global-padding;

      .modal-label-name {
        display: inline-block;
        width: 120px;
        color: @main-font-color;
        font-size: @main-font-size;
        margin-right: @title-padding;
        text-align: right;
      }
      .el-input,
      .el-textarea {
        width: @input-width;
        background: transparent;
        border-radius: 5px;
        border: 1px solid @global-border-color;
        color: @main-font-color;
      }
      .el-input {
        height: @input-height;
      }
      :deep(.el-textarea__inner) {
        background: transparent;
        color: @main-font-color;
      }
      :deep(.el-radio-group) {
        width: @input-width;
      }
      :deep(.el-radio) {
        margin-right: 50px;
      }
      :deep(.el-select) {
        width: @input-width;
        height: @input-height;
      }
      :deep(.el-date-editor) {
        width: @input-width;
        height: @input-height;
      }
    }
  }
}
.pie-tb-iscontent {
  margin-top: @table-top-space;
}
.add-modal {
  position: absolute;
  display: flex;
  left: 20px;
  top: 30px;
}
</style>
