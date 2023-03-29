<template>
  <div class="dispatchCompleted">
    <div class="search-box">
      <div class="search-left">
        <div class="search-item">
          <span class="search-name">台网名称</span>
          <el-select
            :popper-append-to-body="false"
            v-model="state.netWorkName"
            placeholder="请选择台网"
            clearable
            filterable
            @clear="searchData"
          >
            <el-option
              v-for="item in state.netWorkList"
              :key="item.networkId"
              :label="item.networkName"
              :value="item.networkId"
            ></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span class="search-name">台站名称</span>
          <el-select
            clearable
            filterable
            :popper-append-to-body="false"
            v-model="state.stationName"
            placeholder="请选择台站"
            @clear="searchData"
            @change="changeType"
          >
            <el-option
              v-for="item in state.dataBaseList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span class="search-name">处理人</span>
          <el-select
            clearable
            filterable
            :popper-append-to-body="false"
            v-model="state.conductor"
            placeholder="请选择处理人"
            @clear="searchData"
          >
            <el-option
              v-for="item in state.conductorList"
              :key="item.userId"
              :label="item.name"
              :value="item.userId"
            ></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span class="search-name">单号</span>
          <el-input
            placeholder="请输入单号"
            v-model="state.orderNum"
            clearable
            @clear="searchData"
          >
          </el-input>
        </div>
        <div class="search-item">
          <span class="search-name">测项</span>
          <el-select
            clearable
            filterable
            :popper-append-to-body="false"
            v-model="state.textItem"
            placeholder="请选择测项"
            @clear="searchData"
          >
            <el-option
              v-for="item in state.textItemList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span class="search-name">派单日期</span>
          <el-date-picker
            v-model="state.value1"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD HH:mm:ss"
          >
          </el-date-picker>
        </div>
        <div class="search-right">
          <button @click="searchData">查询</button>
          <button @click="resetbtn">重置</button>
          <button @click="exportBtn">导出</button>
          <button @click="addCase">添加案例</button>
        </div>
      </div>
    </div>
    <!-- 表格内容  :maxHeight="600" -->
    <div class="table-content">
      <PIETable
        :data="state.sourceData"
        :columns="state.sourceColumns"
        :isAction="true"
        :detailBtn="true"
        :showCheckbox="true"
        @on-selection-change="onSelectionChange"
        @detail="detailClick"
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
        :total="state.total"
        :pageSize="state.pageSize"
        :currentPage="state.pageNum"
        @handleSizeChange="sizeChange"
        @handleNumChange="pageChange"
      ></PIEPage>
    </div>
    <!-- 流程图 -->
    <PIEModal
      v-model:visible="state.isHobby"
      :title="state.title"
      :resetBtn="false"
      :confirmBtn="false"
      :close="true"
      width="55"
      height="65"
      @cancel="cancel"
    >
      <template #operateItem>
        <!-- 信息 -->
        <div class="right-top">
          <div class="right-top-title">
            <span class="title-name">{{
              state.detailShowList.workOrderId
            }}</span>
            <span>{{ state.detailShowList.stationName }}</span>
          </div>
          <div class="right-top-bot">
            <div class="item-content">
              <span>描述：</span>
              <span>{{ state.detailShowList.description }}</span>
            </div>
            <div class="item-content">
              <span>原因：</span>
              <span>{{ state.detailShowList.faultPhenomenon }}</span>
            </div>
            <div class="item-content">
              <span>台站名称：</span>
              <span>{{ state.detailShowList.stationName }}</span>
            </div>
            <div class="item-content">
              <span>处理人：</span>
              <span>{{ state.detailShowList.handlerPhone }}</span>
            </div>
            <div class="item-content">
              <span>台站地址：</span>
              <span>{{ state.detailShowList.networkName }}</span>
            </div>
            <div class="item-content">
              <span>派单时间：</span>
              <span>{{ state.detailShowList.createTime }}</span>
            </div>
            <div class="item-content">
              <span>台站测项：</span>
              <span>{{ state.detailShowList.measurementName }}</span>
            </div>
            <div class="item-content">
              <span>派单人：</span>
              <span>{{ state.detailShowList.dispatcherName }}</span>
            </div>
            <div class="item-content"></div>
          </div>
        </div>
        <!-- 步骤条 -->
        <div class="steps-style">
          <el-steps :active="state.activeStep" direction="vertical">
            <el-step
              v-for="(item, index) in state.stepsInfo"
              :key="index"
              :title="item.title"
            >
              <template v-slot:icon>
                <i>{{ item.processStep }}</i>
              </template>
              <template v-slot:description>
                <div class="description-style">
                  <span>{{ item.info }}</span>
                  <div class="steps-info" v-if="item.processStep != 1">
                    故障是否解决：
                    <span class="is-Resolve">{{
                      item.resolve ? "解决" : "未解决"
                    }}</span>
                  </div>
                  <div class="steps-info" v-if="item.processStep != 1">
                    处理说明：<span class="is-Resolve">{{
                      item.solution
                    }}</span>
                  </div>
                  <!-- <img :src="item.images" alt="" v-if="item.processStep != 1" /> -->
                  <div
                    @click="imagesModal(item.images)"
                    class="file-modal"
                    v-if="
                      item.processStep != 1 &&
                      item.images &&
                      item.images.length > 0
                    "
                  >
                    查看图片({{ item.images.length }})>>
                  </div>
                  <!-- <div v-for="(items, index) in item.images" :key="index">
                    <img
                      :src="items.imagePath"
                      alt=""
                      v-if="item.processStep != 1"
                    />
                  </div> -->
                  <br />
                  <div>{{ item.time }}</div>
                  <div
                    @click="fileModal(item.files)"
                    class="file-modal"
                    v-if="
                      item.processStep != 1 &&
                      item.files &&
                      item.files.length > 0
                    "
                  >
                    查看附件({{ item.files.length }})>>
                  </div>
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>
      </template>
    </PIEModal>
    <!-- 查看附件 -->
    <PIEModal
      class="file-modal"
      v-model:visible="state.isFileTable"
      :title="state.titleFileImg"
      :resetBtn="false"
      :close="true"
      :cancelBtn="false"
      :confirmBtn="false"
      @cancel="cancelFun"
      width="45"
      height="55"
    >
      <template #operateItem>
        <div>
          <PIETable
            :data="state.fileData"
            :columns="state.fileColumns"
            :isAction="true"
            :actionSlot="true"
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
            <template #action="scope">
              <span class="start-enable" @click="downLoadBtn(scope.row)"
                ><i class="iconfont icon-xiazai"></i
              ></span>
            </template>
          </PIETable>
        </div>
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./index";
const {
  state,
  detailClick,
  searchData,
  resetbtn,
  exportBtn,
  addCase,
  pageChange,
  sizeChange,
  onSelectionChange,
  cancel,
  fileModal,
  downLoadBtn,
  cancelFun,
  imagesModal,
  changeType,
} = useHandler();
</script>

<style lang="less" scoped>
.dispatchCompleted {
  width: 100%;
  padding: @global-padding;
  .search-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .search-left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .search-item {
        display: flex;
        align-items: center;
        color: @main-font-color;
        margin-bottom: 10px;
        .search-name {
          padding-right: @title-padding;
          font-size: @main-font-size;
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
          flex-grow: 0;
          height: @input-height;
        }
        :deep(.el-date-editor .el-range-input) {
          &::placeholder {
            color: @special-font-color;
          }
        }
      }
    }
    .search-right {
      button {
        padding: @global-small-padding @global-padding;
        box-sizing: border-box;
        background: transparent;
        margin-left: 10px;
        color: @main-font-color;
        border: 1px solid @global-header-bbg;
        cursor: pointer;
        border-radius: 5px;
      }
    }
  }
  .table-content {
    margin-top: 20px;
  }
  .right-top {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 30%;
    // border: 1px solid @global-header-bbg;
    background: @content-bg;
    .right-top-title {
      display: flex;
      align-items: center;
      color: @main-font-color;
      font-size: @main-font-size;
      width: 100%;
      padding: 6px 0 6px 0;
      box-sizing: border-box;
      .title-name {
        padding: 5px 10px;
        box-sizing: border-box;
        background: @menu-active;
        margin-right: 10px;
      }
    }
    .right-top-item {
      display: flex;
      align-items: center;
      color: @main-font-color;
      font-size: @main-font-size;
      width: 100%;
      padding: 10px 0 10px 10px;
      box-sizing: border-box;
    }
    .right-top-bot {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item-content {
        width: 33%;
        padding: 10px 0 10px 10px;
        box-sizing: border-box;
        color: @main-font-color;
        font-size: @main-font-size;
      }
    }
  }
  .steps-style {
    max-height: 360px;
    margin-top: 40px;
    overflow-y: auto;
    :deep(.el-step__main) {
      width: 100%;
      height: 100%;
    }
    :deep(.el-step__description) {
      background: @content-bg;
    }
    :deep(.el-step.is-vertical .el-step__icon.is-icon) {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid;
      font-size: @main-font-size;
    }
    .description-style {
      font-size: 14px;
      margin-bottom: 20px;
      .steps-info {
        color: @template-color;
        margin: 5px 0;
        .is-Resolve {
          color: #98dcff;
          margin-left: 5px;
        }
      }
      img {
        width: 100px;
        height: 100px;
        margin-bottom: 5px;
      }
    }
  }
  .file-modal {
    button {
      cursor: pointer;
      border: none;
      color: @template-color;
      background-color: #024765;
      padding: 10px 26px;
      box-sizing: border-box;
      cursor: pointer;
      border-radius: 3px;
    }
  }
}
</style>
