<template>
  <div class="role-manage-content">
    <!-- 3-3 角色管理页面 -->
    <div class="jurisdiction-content-top">
      <div class="table-filter">
        <div class="role-name">角色名称</div>
        <el-input
          placeholder="请输入角色名称"
          clearable
          v-model="state.roleName1"
          @clear="search"
        />
      </div>
      <div class="tables-button">
        <button title="查询" @click="search">查询</button>
        <button title="批量删除" @click="batchesDelete">批量删除</button>
        <button title="新增" @click="addConfig">新增</button>
      </div>
    </div>
    <!--  -->
    <div class="pie-tb-iscontent">
      <!-- 表格 -->
      <!-- :groupBtn="true"
        @group="groupEvent" -->
      <PIETable
        :data="state.tableData"
        :columns="state.columns"
        :isAction="true"
        :deleteBtn="true"
        :showIndex="true"
        :showCheckbox="true"
        :editBtn="true"
        :actionSlot="true"
        @edit="update"
        @confirmDelete="confirmDelete"
        @selection-change="onSelectionChange"
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
          <span class="lookBtn-table" @click="limit(scope.row)">权限</span>
        </template>
      </PIETable>
    </div>
    <!--  -->
    <div class="pie-tb-footer">
      <PIEPage
        :total="state.pageTotal"
        :pageSize="state.pageSize"
        :currentPage="state.pageNum"
        @handleSizeChange="handleSizeChange"
        @handleNumChange="handleNumChange"
      ></PIEPage>
    </div>
    <!-- 新增 修改弹窗 -->
    <PIEModal
      :title="state.title"
      v-model:visible="state.showAdd"
      :resetBtn="false"
      width="35"
      height="35"
      @cancel="cancel"
      @confirm="confirm(state.ruleForm)"
      class="add-role"
    >
      <template v-slot:operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">角色名称:</span>
            <el-input
              placeholder="请输入角色名称"
              v-model="state.ruleForm.roleName"
            />
          </div>
          <div class="modal-content">
            <span class="modal-label-name">角色描述:</span>
            <el-input
              placeholder="请输入角色描述"
              v-model="state.ruleForm.roleDes"
            />
          </div>
          <div class="modal-content" v-if="state.showUserLevel">
            <span class="modal-label-name">角色级别:</span>
            <el-select
              :popper-append-to-body="false"
              v-model="state.ruleForm.roleLevel"
              placeholder="请选择角色级别"
              clearable
              filterable
            >
              <el-option
                v-for="item in state.userLevel"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </template>
    </PIEModal>
    <!-- 权限弹框 -->
    <!-- :confirmBtn="false" -->
    <PIEModal
      width="45"
      height="55"
      :title="'权限'"
      v-model:visible="state.limitModal"
      :resetBtn="false"
      :cancelBtn="false"
      @cancel="cancel"
      @confirm="confirmLimit"
      class="limit-role"
    >
      <template v-slot:operateItem>
        <div class="modal-box">
          <el-transfer
            class="transfer-class"
            v-model="state.limitsValue"
            :data="state.limitTableData"
            filterable
            :titles="['全部权限', '已有权限']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}',
            }"
          />
        </div>
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./roleManage";
const {
  state,
  search,
  batchesDelete,
  confirmDelete,
  confirm,
  update,
  cancel,
  addConfig,
  limit,
  confirmLimit,
  onSelectionChange,
  handleSizeChange,
  handleNumChange,
} = useHandler();
</script>

<style lang="less" scoped>
.role-manage-content {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: @global-padding;
  box-sizing: border-box;
  .jurisdiction-content-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: @main-font-color;
    margin-bottom: 20px;
    .table-filter {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-right: @input-margin;
      .role-name {
        display: inline-block;
        flex-shrink: 0;
        // margin-right: 20px;
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
    }
  }
  //新增
  .modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
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
    :deep(.el-select) {
      width: @input-width;
    }
  }
  .modal-box {
    .header-line {
      display: flex;
      align-items: center;
      color: @main-font-color;
      margin-bottom: 20px;
      .text {
        padding-right: @title-padding;
      }
      :deep(.el-select) {
        width: @input-width;
      }
      .el-input {
        height: @input-height;
      }
      :deep(.el-input__wrapper) {
        width: @input-width;
        flex-grow: 0;
        height: @input-height;
      }
    }
    .transfer-class {
      text-align: center;
      padding-top: 20px;
      :deep(.el-transfer-panel) {
        // background: rgba(14, 35, 90, 0.5);
        background: transparent;
        .el-transfer-panel__header {
          color: @main-font-color;
          background: transparent;
          border: 1px solid #2c80ba;
          span {
            color: @main-font-color;
          }
        }
        .el-checkbox .el-checkbox__label {
          color: @main-font-color;
        }
        .el-transfer-panel__body {
          border: 1px solid #2c80ba;
          border-top: none;
          .el-transfer-panel__list.is-filterable::-webkit-scrollbar {
            width: 5px;
          }
        }
      }
    }
  }
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
  :deep(.el-input__inner) {
    background: transparent;
  }
  .lookBtn-table {
    margin-right: 15px;
    color: #00aeff;
    cursor: pointer;
  }
}
</style>
