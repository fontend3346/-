<template>
  <div class="limit-manage-content">
    <!-- 3-5 权限管理页面 -->
    <div class="table-filter">
      <!-- 左边 -->
      <div class="table-select">
        <span class="table-select-name">权限名称</span>
        <el-input
          placeholder="请输入权限名称"
          v-model="state.fitData"
          clearable
          @clear="searchName"
        >
        </el-input>
      </div>
      <!-- 右边 -->
      <div class="btn-total">
        <button @click="searchName">查询</button>
        <button @click="deleteBatch">批量删除</button>
        <button @click="addConfig">新增</button>
      </div>
    </div>
    <!--  -->
    <div class="pie-tb-iscontent">
      <!-- 表格 -->
      <PIETable
        :data="state.linkageData"
        :columns="state.linkageColumns"
        :isAction="true"
        :deleteBtn="true"
        :showCheckbox="true"
        :editBtn="true"
        @edit="update"
        :actionSlot="true"
        @confirmDelete="confirmDelete"
        @on-selection-change="onSelectAll"
        :showIndex="true"
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
          <span
            :class="
              scope.row.authoritiesCode != '29ua4cZVKNZmqJf7bHsHo'
                ? 'lookBtn-table'
                : 'no-access-editBtn'
            "
            @click="sourceManage(scope.row)"
            >资源</span
          >
        </template>
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
    <!-- 新建弹窗 -->
    <PIEModal
      v-model:visible="state.showAdd"
      :title="state.title"
      :resetBtn="false"
      width="35"
      height="35"
      @cancel="cancel"
      @confirm="confirm(state.ruleForm)"
    >
      <template v-slot:operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">权限名称:</span>
            <el-input
              v-model="state.ruleForm.name"
              placeholder="请输入权限名称"
            ></el-input>
          </div>
        </div>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">备注:</span>
            <el-input
              v-model="state.ruleForm.desc"
              type="textarea"
              :rows="5"
              placeholder="请输入备注"
            ></el-input>
          </div>
        </div>
        <div class="modal-content" v-if="state.showLimitLevel">
          <span class="modal-label-name">权限级别:</span>
          <el-select
            :popper-append-to-body="false"
            v-model="state.ruleForm.roleLevel"
            placeholder="请选择角色级别"
            clearable
            filterable
          >
            <el-option
              v-for="item in state.limitLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </template>
    </PIEModal>
    <!-- 资源 -->
    <PIEModal
      :title="state.limitTitle"
      :resetBtn="false"
      :confirmBtn="true"
      confirmText="保存"
      v-model:visible="state.showLimit"
      @cancel="cancelLimit"
      @confirm="getCheckedNodes"
      width="40"
      height="35"
    >
      <!-- :current-node-key="state.currCode" -->
      <template v-slot:operateItem>
        <div class="limitTree">
          <div class="limit-content">
            <div class="limit-name">菜单列表</div>
            <el-tree
              :data="state.dataListMenu"
              :props="state.defaultProps"
              node-key="code"
              :default-checked-keys="state.checkedKeysMenu"
              :default-expand-all="true"
              show-checkbox
              check-on-click-node
              highlight-current
              ref="treeMenu"
            >
            </el-tree>
          </div>
          <div class="limit-content">
            <div class="limit-name">API列表</div>
            <el-tree
              :data="state.dataListApi"
              :props="state.defaultProps"
              node-key="code"
              :default-checked-keys="state.checkedKeysApi"
              :default-expand-all="true"
              show-checkbox
              check-on-click-node
              highlight-current
              ref="treeApi"
            >
            </el-tree>
          </div>
        </div>
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./limitManage";
const {
  state,
  treeMenu,
  treeApi,
  getCheckedNodes,
  cancelLimit,
  sourceManage,
  searchName,
  confirm,
  update,
  getRolesByUserLevel,
  cancel,
  addConfig,
  pageChange,
  sizeChange,
  onSelectAll,
  deleteBatch,
  confirmDelete,
} = useHandler();
</script>

<style lang="less" scoped>
.limit-manage-content {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: @global-padding;
  box-sizing: border-box;
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
    .table-select {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .table-select-name {
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
      height: @input-height;
      color: @main-font-color;
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
  }
  // 资源
  .limitTree {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .limit-content {
      width: 45%;
      max-height: 500px;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    .limit-name {
      font-size: @main-font-size;
    }
    :deep(.el-tree--highlight-current
        .el-tree-node.is-current
        > .el-tree-node__content) {
      background-color: @content-bg !important;
    }
    :deep(.el-tree) {
      max-height: 500px;
      overflow-y: auto;
    }
    .el-tree::-webkit-scrollbar {
      display: none;
    }
  }
  .el-textarea {
    --el-input-placeholder-color: @special-font-color;
  }
  .lookBtn-table {
    margin-right: 15px;
    color: #00aeff;
    cursor: pointer;
  }
  .no-access-editBtn {
    margin-right: 15px;
    color: #868181;
    cursor: not-allowed;
    cursor: no-drop;
  }
}
</style>
