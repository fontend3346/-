<template>
  <div class="dispatchCompleted">
    <div class="search-box">
      <div class="top-title">
        地震学科分类管理：台站按照地震学科进行分类的分类标准
      </div>
      <div class="search-left">
        <div class="search-item">
          <span class="search-name">学科名称</span>
          <el-input
            placeholder="请输入学科名称"
            v-model="state.subjectName"
            clearable
            @clear="searchData"
          >
          </el-input>
        </div>
        <div class="search-right">
          <button @click="searchData">查询</button>
          <button @click="addConfig">新增</button>
        </div>
      </div>
    </div>
    <!-- 表格内容  :maxHeight="600"  :showCheckbox="true" -->
    <div class="table-content">
      <PIETable
        :data="state.sourceData"
        :columns="state.sourceColumns"
        :showIndex="true"
        :isAction="true"
        :editBtn="true"
        :deleteBtn="true"
        :isTableShow="false"
        :isSpecilShow="true"
        @confirmDelete="confirmDelete"
        @on-selection-change="onSelectAll"
        @edit="update"
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
    <!-- 新建弹窗 -->
    <PIEModal
      v-model:visible="state.showAdd"
      :title="state.title"
      :resetBtn="false"
      width="40"
      height="35"
      @cancel="cancel"
      @confirm="confirm(state.ruleForm)"
    >
      <template v-slot:operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">名称:</span>
            <el-input
              v-model="state.ruleForm.name"
              placeholder="请输入名称"
            ></el-input>
          </div>
        </div>
        <!--  -->
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">编码:</span>
            <el-input
              v-model="state.ruleForm.code"
              placeholder="请输入名称"
            ></el-input>
          </div>
        </div>
        <!--  -->
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">父学科编码:</span>
            <el-input
              v-model="state.ruleForm.parent_code"
              placeholder="请输入名称"
            ></el-input>
          </div>
        </div>
        <!--  -->
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">描述:</span>
            <el-input
              v-model="state.ruleForm.desc"
              type="textarea"
              :rows="5"
              placeholder="请输入描述"
            ></el-input>
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
  pageChange,
  sizeChange,
  cancel,
  confirm,
  update,
  addConfig,
  searchData,
  confirmDelete,
  onSelectAll,
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
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
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
    .search-right {
      button {
        padding: @global-small-padding @global-padding;
        box-sizing: border-box;
        background: transparent;
        margin-left: @global-padding;
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
</style>
