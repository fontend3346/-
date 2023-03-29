<template>
  <div class="dispatchCompleted">
    <div class="search-box">
      <div class="top-title">
        元字段类型信息管理：数据库表中拥有的字段类型信息
      </div>
      <div class="search-left">
        <div class="search-item-wrap">
          <div class="search-item">
            <span class="search-name">名称</span>
            <el-input
              placeholder="请输入名称"
              v-model="state.orderNum"
              clearable
              @clear="searchData"
            >
            </el-input>
          </div>
          <div class="search-item">
            <span class="search-name">标题</span>
            <el-input
              placeholder="请输入标题"
              v-model="state.title"
              clearable
              @clear="searchData"
            >
            </el-input>
          </div>
          <div class="search-item">
            <span class="search-name">长度</span>
            <el-input
              placeholder="请输入长度"
              v-model="state.length"
              clearable
              @clear="searchData"
            >
            </el-input>
          </div>
        </div>
        <div class="search-right">
          <button @click="searchData">查询</button>
          <button @click="addStation">添加</button>
        </div>
      </div>
    </div>
    <div class="table-content">
      <PIETable
        :data="state.sourceData"
        :columns="state.sourceColumns"
        :isAction="true"
        :showCheckbox="true"
        :showIndex="true"
        :deleteBtn="true"
        :editBtn="true"
        @confirmDelete="deleted"
        @edit="edit"
        :isTableShow="false"
        :isSpecilShow="true"
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
    <!-- 添加 -->
    <PIEModal
      title="添加"
      v-model:visible="state.showAdd"
      :resetBtn="false"
      width="30"
      height="35"
      @cancel="addCancel"
      @confirm="addConfirm"
      class="add-role"
    >
      <template v-slot:operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">名称:</span>
            <el-input placeholder="请输入名称" v-model="state.addName" />
          </div>
          <div class="modal-content">
            <span class="modal-label-name">标题:</span>
            <el-input placeholder="请输入标题" v-model="state.addTitle" />
          </div>
          <div class="modal-content">
            <span class="modal-label-name">长度:</span>
            <el-input placeholder="请输入长度" v-model="state.addLength" />
          </div>
        </div>
      </template>
    </PIEModal>
    <!-- 编辑 -->
    <PIEModal
      title="编辑"
      v-model:visible="state.showUpdate"
      :resetBtn="false"
      width="30"
      height="35"
      @cancel="updateCancel"
      @confirm="updateConfirm"
      class="add-role"
    >
      <template v-slot:operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">名称:</span>
            <el-input placeholder="请输入名称" v-model="state.updateName" />
          </div>
          <div class="modal-content">
            <span class="modal-label-name">标题:</span>
            <el-input placeholder="请输入标题" v-model="state.updateTitle" />
          </div>
          <div class="modal-content">
            <span class="modal-label-name">长度:</span>
            <el-input placeholder="请输入长度" v-model="state.updateLength" />
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
  searchData,
  pageChange,
  sizeChange,
  deleted,
  edit,
  addCancel,
  addConfirm,
  addStation,
  updateCancel,
  updateConfirm,
} = useHandler();
</script>

<style lang="less" scoped>
.dispatchCompleted {
  width: 100%;
  padding: @global-padding;
  .search-box {
    .top-title {
      font-size: @main-font-size;
      color: @main-font-color;
      padding-bottom: 15px;
      margin-bottom: 15px;
      border-bottom: 1px solid #13598c;
      box-sizing: border-box;
    }
    .search-left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      .search-item-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .search-item {
          display: flex;
          align-items: center;
          color: @main-font-color;
          padding-right: @title-padding;
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
    }
    .search-right {
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
  .table-content {
    margin-top: @table-padding;
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
  //新增
  .modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: @global-padding;
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
    :deep(.el-select) {
      width: @input-width;
    }
  }
}
</style>
