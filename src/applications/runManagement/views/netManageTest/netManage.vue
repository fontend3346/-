<template>
  <div class="disView">
    <div class="net-manage">
      <!-- 1-4 台网管理 -->
      <div id="mapContainer"></div>
      <!-- <PIEMap
        class="map-container"
        @onload="onload"
        :options="pieOptions"
      ></PIEMap> -->
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
      <!-- <div class="map-check" v-show="isCheckLayerShow">
        <div
          class="map-check-item"
          v-for="(item, index) in state.baseLayerList"
          :key="index"
        >
          <img :src="item.img" @click="checkMapFn(item)" />
        </div>
      </div> -->
      <div class="map-check" v-show="isCheckLayerShow">
        <div class="map-check-item" @click="checkMapFn(1)">
          <img src="@/assets/images/map1.png" alt="" />
        </div>
        <div class="map-check-item" @click="checkMapFn(2)">
          <img src="@/assets/images/map2.png" alt="" />
        </div>
      </div>
      <div
        :class="state.showMap ? '' : 'legend-icon-up'"
        @click="toTable"
      ></div>
      <!-- 表格界面 -->
      <div class="instrument-admin" v-show="state.showMap">
         <div class="icon-close" @click="closeLegend">
          <span class="iconfont icon-guanbi"></span>
        </div>
        <div class="header-left-content">
          <div class="left-content-item">
            <span class="left-name">台网名称</span>
            <el-input
              v-model="state.netName"
              placeholder="请输入台网名称"
              clearable
            ></el-input>
          </div>

          <div class="left-content-items">
            <button @click="addEvent">添加</button>
            <button @click="searchList(false)">查询</button>
          </div>
        </div>

        <div class="pie-tb-iscontent">
          <PIETable
            :maxHeight="215"
            :data="state.linkageData"
            :columns="state.linkageColumns"
            :isAction="true"
            :deleteBtn="true"
            :showIndex="true"
            :showCheckbox="true"
            :detailBtnIcon="false"
            :dynamicShow="true"
            :operationWidth="200"
            :lookBtn="true"
            :isTableShow="false"
            :isSpecilShow="true"
            :dynamicBtnName="state.dynamicBtnName"
            @dynamicBtn="dynamicBtn"
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
      <!-- 新建 / 编辑弹窗 -->
      <PIEPanel
        :title="state.title"
        v-model:visible="state.showAdd"
        @confirm="confirmEdit"
        @cancel="cancel"
        class="add-modal"
        width="50"
        height="55"
        :moveRight="'80px'"
        :moveTop="'15%'"
      >
        <template #operateItem>
          <div class="modal-wrapper">
            <!--基本信息-->
            <div class="essential-information">
              <div class="information-title">基本信息</div>
              <div class="modal-content">
                <span class="modal-label-name">名称:</span>
                <el-input
                  v-model="state.editRow.name"
                  placeholder="请输入名称"
                ></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">英文名称:</span>
                <el-input
                  v-model="state.editRow.sname"
                  placeholder="请输入名称"
                ></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">数字编码:</span>
                <el-input
                  v-model="state.editRow.figureCode"
                  placeholder="请输入数字代码"
                ></el-input>
              </div>

              <div class="modal-content">
                <span class="modal-label-name">状态:</span>
                <el-select
                  :popper-append-to-body="false"
                  clearable
                  v-model="state.editRow.status"
                  placeholder="请选择状态"
                  class="style-select"
                >
                  <el-option
                    label="有效"
                    value="0"
                    class="select-item"
                  ></el-option>
                  <el-option
                    label="无效"
                    value="1"
                    class="select-item"
                  ></el-option>
                </el-select>
              </div>

              <div class="modal-content">
                <span class="modal-label-name">台网等级:</span>

                <el-select
                  :popper-append-to-body="false"
                  clearable
                  v-model="state.editRow.networkLevel"
                  placeholder="请选择台网等级"
                  class="style-select"
                >
                  <el-option
                    label="国家级"
                    value="1"
                    class="select-item"
                  ></el-option>
                  <el-option
                    label="省级"
                    value="2"
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
                <el-input
                  v-model="state.editRow.longitude"
                  placeholder="请输入经度"
                ></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">纬度:</span>
                <el-input
                  v-model="state.editRow.latitude"
                  placeholder="请输入纬度"
                ></el-input>
              </div>
            </div>
          </div>
        </template>
      </PIEPanel>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./netManage";
const {
  isCheckLayerShow,
  checkMapFn,
  state,
  pieOptions,
  dynamicBtn,
  onRowClick,
  searchList,
  locationPoint,
  toTable,
  closeLegend,
  addEvent,
  edit,
  confirmEditMap,
  confirmEdit,
  confirmDeleteMap,
  confirmDelete,
  deleteApi,
  pageChange,
  sizeChange,
  initMap,
  onClicks,
  onload,
  layerClicks,
  cancel,
  checkFn,
  enlargeFn,
  reduceFn,
  checkLayer,
  coverageList,
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
.net-manage {
  width: 100%;
  height: 100%;
  position: relative;
}
#mapContainer {
  width: 100%;
  height: 94vh;
}
.map-container {
  width: 100%;
  height: 94vh;
  // z-index: 10;
}

.instrument-admin {
  position: absolute;
  bottom: 0px;
  display: flex;
  right: 0px;
  left: 0;
  height: 45%;
  flex-direction: column;
  padding: @global-padding;
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
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .left-content-item {
      display: flex;
      align-items: center;
      width: 26%;
      justify-content: flex-start;
      .left-name {
        display: inline-block;
        padding-right: @title-padding;
        font-size: @main-font-size;
        color: @main-font-color;
        box-sizing: border-box;
      }
      :deep(.el-input) {
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
      :deep(.el-date-editor) {
        width: @input-width;
        height: @input-height;
      }
    }
    .left-content-items {
      width: auto;
      display: flex;
      flex-direction: row-reverse;
    }
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

  //新增
  .modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: @global-padding;
    .map-point {
      background: url("../../../../assets/qietu/position.png");
      width: 30px;
      height: 30px;
      background-size: 100% 100%;
      position: absolute;
      right: 140px;
      top: 225px;
    }
    .modal-label-name {
      display: inline-block;
      width: 100px;
      color: @main-font-color;
      font-size: @main-font-size;
      text-align: right;
      padding-right: @title-padding;
    }
    .el-input,
    .el-textarea {
      width: @input-width;
      background: transparent;
      border-radius: 5px;
      border: 1px solid @global-border-color;
      // height: 35px;
      color: @main-font-color;
    }
    :deep(.el-textarea__inner) {
      background: transparent;
      color: @main-font-color;
    }
    :deep(.el-input__wrapper) {
      width: @input-width;
    }
    :deep(.el-date-editor) {
      width: @input-width;
      height: @input-height;
    }
  }
  //详情
  .modal-details {
    display: flex;
    flex-direction: column;
    .single-content {
      display: flex;
      width: 100%;
      margin-bottom: @title-padding;
      .single-label {
        width: 30%;
        color: @main-font-color;
        font-size: @main-font-size;
        margin-right: @global-small-padding;
      }
      .single-content {
        color: @main-font-color;
        font-size: @main-font-size;
      }
    }
  }

  .pie-tb-iscontent {
    margin-top: @table-top-space;
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
.add-modal {
  // padding: 40px 0;
  position: absolute;
  display: flex;
  left: 20px;
  top: 30px;
}
// .add-modal {
//   z-index: 999;
// }
.modal-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  .essential-information {
    width: 100%;
    border: 1px solid #2181f0;
    margin-bottom: 20px;
    margin-top: 20px;
    padding-top: 20px;
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
      right: 60px;
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
    }
  }
}
</style>
