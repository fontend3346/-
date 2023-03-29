<template>
  <div class="dispatchCompleted">
    <div class="search-box">
      <div class="search-left">
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
            :popper-append-to-body="false"
            v-model="state.textItem"
            placeholder="请选择台网名称/代码"
            @clear="searchData"
          >
            <el-option
              v-for="item in state.textItemList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span class="search-name">台站</span>
          <el-select
            :popper-append-to-body="false"
            v-model="state.stationName"
            placeholder="请选择台网名称/代码"
            @clear="searchData"
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
            :popper-append-to-body="false"
            v-model="state.conductor"
            placeholder="请选择台网名称/代码"
            @clear="searchData"
          >
            <el-option
              v-for="item in state.conductorList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span class="search-name">状态</span>
          <el-select
            :popper-append-to-body="false"
            v-model="state.statusValue"
            placeholder="请选择工单状态"
            @clear="searchData"
            @change="netWorkNameChange"
          >
            <el-option
              v-for="item in state.statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div class="search-item">
          <span class="search-name">日期</span>
          <el-date-picker
            v-model="state.value1"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <div class="search-right">
          <button @click="searchData">查询</button>
          <button @click="sendOrders">派单</button>
          <button @click="resetbtn">重置</button>
          <button @click="exportBtn">导出</button>
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
    <!--详情-->
    <PIEModal
      v-model:visible="state.isHobby"
      :title="state.title"
      :resetBtn="false"
      :close="true"
      @confirm="confirm"
      width="40"
      height="35"
      @cancel="cancel"
    >
      <template #operateItem>
        <!-- 信息 -->
        <div class="right-top">
          <div class="right-top-title">
            <span class="title-name">{{ state.detailShowList.code }}</span>
            <span>{{ state.detailShowList.name }}</span>
          </div>
          <div class="right-top-item">
            描述 : {{ state.detailShowList.desc }}
          </div>
          <div class="right-top-item">
            原因 : {{ state.detailShowList.cause }}
          </div>
          <div class="right-top-bot">
            <div class="item-content">
              <span>台站名称:</span>
              <span>{{ state.detailShowList.stationName }}</span>
            </div>
            <div class="item-content">
              <span>处理人:</span>
              <span>{{ state.detailShowList.disposeName }}</span>
            </div>
            <div class="item-content">
              <span>台站地址:</span>
              <span>{{ state.detailShowList.stationAddress }}</span>
            </div>
            <div class="item-content">
              <span>派单时间:</span>
              <span>{{ state.detailShowList.ticketsTime }}</span>
            </div>
            <div class="item-content">
              <span>台站测项:</span>
              <span>{{ state.detailShowList.stationDeal }}</span>
            </div>
            <div class="item-content">
              <span>派单人:</span>
              <span>{{ state.detailShowList.ticketsName }}</span>
            </div>
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
              <template v-slot:description>
                <div class="description-style">
                  <span>{{ item.info }}</span>
                  <div class="steps-info">
                    款障是否解决:
                    <span class="is-Resolve">{{ item.isResolve }}</span>
                  </div>
                  <div class="steps-info">
                    处理说明:<span class="is-Resolve">{{
                      item.description
                    }}</span>
                  </div>
                  <img :src="item.src" alt="" />
                  <br />
                  <div>{{ item.time }}</div>
                  <div @click="fileModal">{{ item.file }}</div>
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>
      </template>
    </PIEModal>
    <!--查看附件-->
    <PIEModal
      class="file-modal"
      v-model:visible="state.isFileTable"
      :title="state.title"
      :resetBtn="false"
      :close="true"
      :cancelBtn="false"
      :confirmBtn="false"
      width="45"
      height="55"
    >
      <template #operateItem>
        <div>
          <PIETable
            :data="state.fileData"
            :columns="state.fileColumns"
            :isAction="true"
            :showCheckbox="true"
            :actionSlot="true"
            @on-selection-change="onSelectionFile"
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
      <template v-slot:more>
        <button @click="confirmFile">下载</button>
      </template>
    </PIEModal>
    <!--派单-->
    <PIEModal
      class="file-modal"
      v-model:visible="state.isSendModal"
      :title="state.title"
      :resetBtn="false"
      :close="true"
      width="35"
      @confirm="confirmFun"
      @cancel="cancleFun"
    >
      <template #operateItem>
        <div class="sendOrders">
          <!-- <span class="title title-top">手动派单</span> -->
          <div class="main-con">
            <!-- 选择测项 -->
            <div class="search-item">
              <span class="main-title title">选择测项</span>
              <el-radio-group v-model="state.testOption">
                <div v-for="(item, index) in state.testOptionList" :key="index">
                  <el-radio :label="item.id">{{ item.name }}</el-radio>
                </div>
              </el-radio-group>
            </div>
            <!-- 目标台网 -->
            <div class="search-item">
              <span class="main-title title">目标台网</span>
              <el-select
                :popper-append-to-body="false"
                v-model="state.targetNetwork"
                placeholder="请选择目标台站"
                clearable
                @change="changeType"
              >
                <el-option
                  v-for="item in state.networkList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <!-- 目标台站 -->
            <div class="search-item">
              <span class="main-title title">目标台站</span>
              <el-select
                :popper-append-to-body="false"
                v-model="state.targetStation"
                placeholder="请选择目标台站"
                clearable
                @change="changeType"
              >
                <el-option
                  v-for="item in state.targetStationList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <!-- 处理人 -->
            <div class="search-item">
              <span class="main-title title">处理人</span>
              <el-select
                :popper-append-to-body="false"
                v-model="state.conductorSend"
                placeholder="请选择处理人"
                clearable
                @change="changeType"
              >
                <el-option
                  v-for="item in state.conductorListSend"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <!-- 故障现象 -->
            <div class="search-item">
              <span class="main-title title">故障现象</span>
              <el-input
                placeholder="请输入故障现象"
                v-model="state.malFunction"
                clearable
              >
              </el-input>
            </div>
            <!-- 初步说明 -->
            <div class="search-item">
              <span class="main-title title">初步说明</span>
              <el-input
                placeholder="请输入初步说明"
                v-model="state.explain"
                clearable
                type="textarea"
                :rows="4"
              >
              </el-input>
            </div>
            <!-- <div class="btns">
              <button @click="cancleFun" class="canclebtn">取消</button>
              <button @click="confirmFun" class="confirmbtn">确定</button>
            </div> -->
          </div>
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
  stationNameChange,
  searchData,
  netWorkNameChange,
  resetbtn,
  exportBtn,
  pageChange,
  sizeChange,
  onSelectionChange,
  confirm,
  cancel,
  fileModal,
  confirmFile,
  onSelectionFile,
  downLoadBtn,
  sendOrders,
  changeType,
  cancleFun,
  confirmFun,
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
        padding-right: @title-padding;
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
          height: 40px;
          color: @main-font-color;
        }
        :deep(.el-input__wrapper) {
          width: @input-width;
          flex-grow: 0;
          height: 40px;
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
        padding: 10px 20px;
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
    height: 200px;
    margin-top: 40px;
    :deep(.el-step__main) {
      width: 100%;
      height: 100%;
    }
    :deep(.el-step__description) {
      background: @content-bg;
    }
    .description-style {
      font-size: 14px;
      margin-bottom: 20px;
      .steps-info {
        color: #fff;
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
      color: #fff;
      background-color: #024765;
      padding: 10px 26px;
      box-sizing: border-box;
      cursor: pointer;
      border-radius: 3px;
    }
  }

  //派单
  .sendOrders {
    width: 100%;
    padding: @global-padding;
    .title {
      display: inline-block;
      color: @main-font-color;
      font-size: @main-font-size;
    }
    .title-top {
      margin-bottom: 10px;
    }
    .search-item {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      .main-title {
        margin-right: @title-padding;
        width: 80px;
        text-align: right;
      }
      .main-title::before {
        display: inline-block;
        content: "*";
        color: red;
        display: inline-block;
        margin-right: 8px;
      }
    }

    .el-input {
      height: 40px;
      width: 300px;
      background: transparent;
      border-radius: 5px;
      border: 1px solid @global-border-color;
      color: @main-font-color;
    }
    .el-textarea {
      width: 300px; //840
      background: transparent;
      border-radius: 5px;
      border: 1px solid @global-border-color;
      color: @main-font-color;
    }
    :deep(.el-input__wrapper) {
      width: 300px;
      height: 40px;
      flex-grow: 0;
    }
    :deep(.el-textarea__inner) {
      background: transparent;
      color: @main-font-color;
    }
    :deep(.el-radio) {
      margin-right: 34px;
      color: @main-font-color;
    }
    :deep(.el-select) {
      width: 300px;
    }
    :deep(.el-date-editor) {
      width: 300px;
      height: 40px;
    }
    .canclebtn {
      padding: 10px 27px;
      box-sizing: border-box;
      background: transparent;
      margin-left: 10px;
      color: @main-font-color;
      border: 1px solid @global-header-bbg;
      cursor: pointer;
      font-weight: bold;
      border-radius: 3px;
    }
    .confirmbtn {
      padding: 11px 27px;
      box-sizing: border-box;
      background: transparent;
      margin-left: 10px;
      color: @main-font-color;
      cursor: pointer;
      border-radius: 3px;
      color: #fff;
      font-weight: bold;
      background-color: #024765;
    }
    .btns {
      width: 387px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
