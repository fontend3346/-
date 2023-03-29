<template>
  <div class="sample-management-admin">
    <!-- 1-2 事件管理 -->
    <div class="header-left-content">
      <div class="left-content-justify">
        <div class="left-content-item">
          <span class="left-name">事件名称</span>
          <el-input
            v-model="state.fitData"
            clearable
            placeholder="请输入事件名称"
          ></el-input>
        </div>
        <div class="left-content-item">
          <span class="left-name">事件类型</span>
          <el-select
            v-model="equipmentVal"
            clearable
            placeholder="请选择事件类型"
            @change="equipmentChange"
            filterable
          >
            <el-option
              v-for="(item, index) in state.equipmentArr"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="left-content-justify">
        <div class="left-content-item"></div>
        <div class="left-content-items">
          <button @click="searchClick">查询</button>
          <!-- <button @click="addMaintain">批量删除</button> -->
        </div>
      </div>
    </div>

    <div class="pie-tb-iscontent">
      <!-- 表格 -->
      <PIETable
        :data="state.linkageData"
        :columns="state.linkageColumns"
        :isAction="true"
        :showCheckbox="true"
        :showIndex="true"
        :deleteBtn="true"
        :lookBtn="true"
        @confirmDelete="confirmDelete"
        @look="lookWave"
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
          color: '#D7D7D9',
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
        @handleSizeChange="pageSizeChange"
        @handleNumChange="pageChange"
      ></PIEPage>
    </div>
    <!-- 波形展示 -->
    <PIEModal
      v-model:visible="state.lookEcharts"
      :title="state.title"
      width="60"
      height="60"
      :cancelBtn="false"
      :confirmBtn="false"
    >
      <template #operateItem>
        <div class="modal-wrapper">
          <div class="warn-grade" ref="warnGrade"></div>
        </div>
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./index";
const {
  state,
  equipmentVal,
  warnGrade,
  facilityId,
  waveOptions,
  showEcharts,
  equipmentChange,
  pageChange,
  pageSizeChange,
  confirmDelete,
  sampleList,
  lookWave,
  queryWaveTable,
  lookEcharts,
  deleteWave,
  searchClick,
} = useHandler();
</script>

<style lang="less" scoped>
.sample-management-admin {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: @global-padding;
  box-sizing: border-box;
  padding-left: @global-padding;
  padding-top: @global-padding;
  // background-color:#121e51;
  .header-left-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    // justify-content: space-between;
    align-items: center;
    justify-content: space-between;
    .left-content-justify {
      display: flex;
      .left-content-item {
        display: flex;
        align-items: center;
        margin-bottom: @global-small-padding;
        // width: 24%;
        justify-content: flex-end;
        margin-right: @input-margin;
        .left-name {
          display: inline-block;
          // width: 90px;
          font-size: @main-font-size;
          color: @main-font-color;
          padding-right: @title-padding;
        }
        .left-name-time {
          padding-left: 2px;
          display: inline-block;
          font-size: @main-font-size;
          color: @main-font-color;
          padding-right: @title-padding;
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
          height: @input-height;
          width: @input-width;
        }
        :deep(.el-date-editor) {
          width: @input-width;
          height: @input-height;
        }
      }
      .left-content-items {
        margin-bottom: @global-small-padding;
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
  }
  .pie-tb-iscontent {
    margin-top: @global-small-padding;
  }
  //新增
  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: @global-padding;
    .edit {
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      // align-items: center;
    }
    .modal-label-name {
      display: inline-block;
      width: 100px;
      margin-right: @global-small-padding;
      color: @main-font-color;
      font-size: @main-font-size;
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
    :deep(.el-input__wrapper) {
      height: @input-height;
      width: @input-width;
    }
    :deep(.el-textarea__inner) {
      background: transparent;
      color: @main-font-color;
    }
    :deep(.el-select) {
      width: @input-width;
    }
  }
}
.modal-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .warn-grade {
    width: 1080px;
    height: 600px;
  }
}
</style>
