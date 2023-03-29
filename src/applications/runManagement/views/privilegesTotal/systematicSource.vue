<template>
  <!-- 系统资源管理 -->
  <div class="encrypt-dispense">
    <div class="left-list">
      <div class="header">
        <div>
          <span>{{ state.menuTitle }}</span
          ><span
            class="iconfont icon-geshizhuanhuan change"
            @click="changeList"
          ></span>
        </div>
        <span class="iconfont icon-jiahao" @click="addNode"></span>
      </div>
      <el-tree
        :data="state.dataList"
        :props="state.defaultProps"
        node-key="objectId"
        :default-expanded-keys="defaultExpandedKeys"
        check-on-click-node
        highlight-current
        @node-click="handleNodeClick"
        class="catalog-tree-item"
        children="children"
        ref="catalogTree"
      >
        <template v-slot:{ data }>
          <span class="custom-tree-node flexStart">
            <div class="tree-item">
              <span>{{ data.name }}</span>
            </div>
          </span>
        </template>
      </el-tree>
    </div>
    <div class="right-content">
      <PIETable
        :maxHeight="510"
        :data="state.tableData"
        :columns="state.columns"
        :isAction="true"
        :deleteBtn="true"
        :showIndex="true"
        :editBtn="true"
        @edit="update"
        @confirmDelete="confirmDelete"
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
    <PIEModal
      width="35"
      height="35"
      :title="state.title"
      v-model:visible="state.isModal"
      :close="false"
      @confirm="confirm"
      @cancel="cancel"
    >
      <template v-slot:operateItem>
        <div class="look-item">
          <div class="text">资源名称:</div>
          <el-input v-model="state.name" class="input-style" />
        </div>
        <div class="look-item">
          <div class="text">资源路径:</div>
          <el-input v-model="state.url" class="input-style" />
        </div>
        <div class="look-item" v-if="state.menuTitle == 'API列表'">
          <div class="text">请求类型:</div>
          <el-select v-model="state.desc" placeholder="请选择请求类型">
            <el-option
              v-for="item in state.requestList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="look-item" v-if="state.menuTitle == '菜单列表'">
          <div class="text">资源描述</div>
          <el-input
            v-model="state.desc"
            class="input-style"
            type="textarea"
            maxlength="30"
            minlength="4"
          />
        </div>
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./systematicSource";
const {
  state,
  changeList,
  handleDrop,
  getData,
  handleNodeClick,
  addNode,
  update,
  confirm,
  confirmDelete,
  cancel,
} = useHandler();
</script>

<style lang="less" scoped>
.encrypt-dispense {
  display: flex;
  width: 98%; //设置成100%会疯狂拉宽
  height: 100%;
  color: @main-font-color;
  font-size: @main-font-size;
  .left-list {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 100%;
    max-height: 100%;
    overflow-y: scroll;
    border: 1px solid @global-header-bbg;
    scrollbar-width: none; //火狐隐藏
    margin-right: 20px;
    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid @global-header-bbg;
      padding: 10px;
      box-sizing: border-box;
    }
    .el-tree {
      background: transparent;
      color: @main-font-color;
      font-size: 14px;
    }
    .tree-item {
      display: flex;
      width: 250px;
      justify-content: space-between;
    }
    :deep(.el-tree--highlight-current
        .el-tree-node.is-current
        > .el-tree-node__content) {
      background: rgba(24, 144, 255, 0.3);
      color: @main-active-color;
    }
    :deep(.el-tree-node__content) {
      background: transparent;
    }
    :deep(.el-tree-node__content) {
      height: 36px;
      align-items: center;
    }
  }
  .left-list::-webkit-scrollbar {
    display: none;
  }
  .right-content {
    margin-top: 20px;
    width: calc(100% - 420px);
    height: 100%;
    .table-style {
      width: 100%;
    }
  }
}

.look-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  .text {
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
    height: 35px;
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
.change {
  margin-left: 10px;
}
</style>
