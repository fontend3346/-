<template>
  <div class="dispatch-pending-main">
    <!--  待处理页面 -->
    <div class="table-filter">
      <!-- 左边 -->
      <div class="search-style">
        <div class="table-select">
          <span class="table-select-name">台网</span>
          <el-select
            :popper-append-to-body="false"
            v-model="state.netWorkName"
            placeholder="请选择台网"
            clearable
            filterable
            @clear="searchPending"
          >
            <el-option
              v-for="item in state.netWorkNameList"
              :key="item.networkId"
              :label="item.networkName"
              :value="item.networkId"
            ></el-option>
          </el-select>
        </div>
        <div class="table-select">
          <span class="table-select-name">台站</span>
          <el-select
            :popper-append-to-body="false"
            v-model="state.stationName"
            placeholder="请选择台站"
            clearable
            filterable
            @clear="searchPending"
          >
            <el-option
              v-for="item in state.stationNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 右边 -->
      <div class="btn-total">
        <button @click="searchPending">查询</button>
        <button @click="clearPending">重置</button>
        <button @click="handlePending">处理</button>
      </div>
    </div>
    <!-- 中间组件 -->
    <div class="dispatch-pending-content">
      <PIEDispatchManage
        :dispatchMainTitle="state.dispatchMainTitle"
        :dispatchMainList="state.dispatchMainList"
        :detailShowList="state.detailShowList"
        :activeStep="state.activeStep"
        :stepsInfo="state.stepsInfo"
        :total="state.totalNum"
        @workTickets="workTickets"
        @fileModal="fileModal"
        @imagesModal="imagesModal"
        @sizeChange="sizeChange"
        @pageChange="pageChange"
      ></PIEDispatchManage>
    </div>
    <!-- 处理 -->
    <PIEModal
      v-model:visible="state.disposeTickets"
      width="45"
      height="50"
      title="处理工单"
      @cancel="disposeTicketsCancel"
      @confirm="disposeTicketsConfirm"
    >
      <template #operateItem>
        <div class="dispose-tickets">
          <div class="modal-wrapper">
            <div class="item">
              <span class="modal-label-name">是否解决</span>
              <el-switch v-model="state.settleTickets" />
            </div>
            <div class="item">
              <span class="modal-label-name">是否挂起</span>
              <el-switch v-model="state.suspendTickets" />
            </div>
            <div class="item">
              <span class="modal-label-name">故障原因</span>
              <el-input
                placeholder="请输入故障原因"
                v-model="state.faultCause"
                clearable
              >
              </el-input>
            </div>
            <div class="item">
              <span class="modal-label-name">解决方式</span>
              <el-input
                placeholder="请输入解决方式"
                v-model="state.settleManner"
                clearable
              >
              </el-input>
            </div>
            <div class="item">
              <span class="modal-label-name">解决说明</span>
              <el-input
                v-model="state.settleIllustrate"
                :rows="2"
                type="textarea"
                placeholder="请输入解决说明"
              />
            </div>
            <div class="item">
              <span class="modal-label-name">设备附件</span>
              <div class="modal-right">
                <el-upload
                  class="upload-demo"
                  accept=".txt,.xlsx,.docx"
                  multiple
                  ref="uploadRef"
                  :limit="50"
                  :http-request="httpRequestFile"
                >
                  <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </div>
            </div>
            <div class="item">
              <span class="modal-label-name">设备照片</span>
              <div class="modal-right">
                <el-upload
                  class="upload-demo"
                  accept=""
                  multiple
                  :limit="50"
                  :http-request="httpRequestUploadM"
                  :before-upload="beforeAvatarUpload"
                >
                  <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
                <!-- <el-upload
                  class="upload-demo"
                  :show-file-list="false"
                  :http-request="httpRequestUploadM"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"
                    ><Plus
                  /></el-icon>
                </el-upload> -->
              </div>
            </div>
          </div>
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
      width="45"
      height="55"
    >
      <template #operateItem>
        <div>
          <!-- :showCheckbox="true"   暂时不用 -->
          <PIETable
            :data="state.fileData"
            :columns="state.fileColumns"
            :isAction="true"
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
      <!-- <template v-slot:more>
        <button @click="confirmFile">下载</button>
      </template> -->
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./index";
import { Plus } from "@element-plus/icons-vue";
const {
  state,
  searchPending,
  clearPending,
  handlePending,
  workTickets,
  disposeTicketsCancel,
  disposeTicketsConfirm,
  imageUrl,
  httpRequestUploadM,
  beforeAvatarUpload,
  httpRequestFile,
  fileModal,
  imagesModal,
  onSelectionFile,
  downLoadBtn,
  sizeChange,
  pageChange,
} = useHandler();
</script>

<style lang="less" scoped>
.dispatch-pending-main {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: @global-padding;
  box-sizing: border-box;
  // 查看附件
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
  // 处理
  .dispose-tickets {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    .modal-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      height: 100%;
      .modal-right {
        display: flex;
        flex-direction: column;
        align-items: top;
        width: 50%;
        height: 100%;
        // 上传文件
        .upload-demo {
          width: 100px;
          height: 50px;
          line-height: 50px;
          display: block;
          text-align: center;
          border: 1px dashed @global-header-bbg;
          border-radius: 5px;
          .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: @main-font-color;
            margin-top: 10px;
          }
          .el-upload-list {
            margin-top: 0;
          }
        }
        // 上传照片
        .avatar-uploader {
          width: 150px;
          height: 150px;
          line-height: 150px;
          display: block;
          text-align: center;
          border: 1px dashed @global-header-bbg;
          border-radius: 5px;
          .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: @main-font-color;
          }
          .avatar {
            width: 150px;
            height: 150px;
            display: inline-block;
          }
        }
      }
      .item {
        display: flex;
        align-items: center;
        width: 50%;
        padding: 10px 0;
        box-sizing: border-box;
      }
      .modal-label-name {
        display: inline-block;
        width: 100px;
        text-align: right;
        padding-right: @title-padding;
        color: @main-font-color;
        font-size: @main-font-size;
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
      .el-input {
        height: @input-height;
      }
      :deep(.el-input__wrapper) {
        width: @input-width;
        flex-grow: 0;
        height: @input-height;
      }
      :deep(.el-textarea__inner) {
        background: transparent;
        color: @main-font-color;
      }
    }
  }

  // 中间组件
  .dispatch-pending-content {
    width: 100%;
    height: 92%;
    // background: pink;
  }
  // 头部
  .table-filter {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: @main-font-color;
    margin-bottom: 20px;
    .btn-total {
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
    .search-style {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: @main-font-color;
      .table-select {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: @input-margin;
        .table-select-name {
          display: inline-block;
          flex-shrink: 0;
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
      }
    }
  }
}
</style>
