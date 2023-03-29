<template>
  <div class="staff-content">
    <!--  人员名称页面 -->
    <div class="table-filter">
      <!-- 左边 -->
      <div class="search-style">
        <div class="table-select">
          <span class="table-select-name">人员</span>
          <el-input
            placeholder="请输入人员名称"
            v-model="state.staffData"
            clearable
            @clear="searchName"
          >
          </el-input>
        </div>
        <div class="table-select">
          <span class="table-select-name">状态</span>
          <el-select
            clearable
            :popper-append-to-body="false"
            v-model="state.statusVal"
            placeholder="请选择状态"
            @clear="searchName"
          >
            <el-option
              v-for="item in state.statusBindArry"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="table-select">
          <span class="table-select-name">台网</span>
          <el-select
            clearable
            :popper-append-to-body="false"
            v-model="state.netData"
            placeholder="请选择状态"
            @change="netDataChange"
            @clear="searchName"
            filterable
          >
            <el-option
              v-for="item in state.netDataList"
              :key="item.networkId"
              :label="item.cname"
              :value="item.networkId"
            ></el-option>
          </el-select>
        </div>
        <div class="table-select">
          <span class="table-select-name">台站</span>
          <el-select
            clearable
            :popper-append-to-body="false"
            v-model="state.stationData"
            placeholder="请选择状态"
            @clear="searchName"
            filterable
          >
            <el-option
              v-for="item in state.stationDataList"
              :key="item.stationId"
              :label="item.name"
              :value="item.stationId"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 右边 -->
      <div class="btn-total">
        <button @click="searchName">查询</button>
        <!-- <button @click="deleteBatch">批量删除</button> -->
        <button @click="addConfig">新增</button>
        <el-upload
          ref="importUpload"
          :limit="1"
          accept=".xlsx"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onChangeImport"
        >
          <button>导入</button>
        </el-upload>
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
        :editBtn="true"
        @edit="update"
        @confirmDelete="confirmDelete"
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
      @confirm="confirm"
    >
      <template v-slot:operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">人员名称:</span>
            <el-input
              v-model="state.ruleForm.name"
              placeholder="请输入人员名称"
            ></el-input>
          </div>
        </div>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">手机号:</span>
            <el-input
              v-model="state.ruleForm.phone"
              placeholder="请输入手机号"
            ></el-input>
          </div>
        </div>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">邮箱:</span>
            <el-input
              v-model="state.ruleForm.email"
              placeholder="请输入邮箱"
            ></el-input>
          </div>
        </div>
        <div class="modal-content">
          <span class="modal-label-name">单位类型:</span>
          <el-radio-group
            v-model="state.ruleForm.unitType"
            class="ml-4"
            @change="unitTypeFun"
          >
            <el-radio label="1" size="large">台网</el-radio>
            <el-radio label="2" size="large">台站</el-radio>
          </el-radio-group>
        </div>
        <!--  -->
        <div class="modal-content" v-if="state.ruleForm.unitType == '1'">
          <span class="modal-label-name">台网:</span>
          <el-select
            clearable
            :popper-append-to-body="false"
            v-model="state.ruleForm.unitTitle"
            placeholder="请选择台网"
            filterable
          >
            <el-option
              v-for="item in state.unitTitleList"
              :key="item.networkId"
              :label="item.cname"
              :value="item.networkId"
            ></el-option>
          </el-select>
        </div>
        <!-- 台网+台站 -->
        <div class="modal-content" v-if="state.ruleForm.unitType == '2'">
          <span class="modal-label-name">台网:</span>
          <el-select
            clearable
            :popper-append-to-body="false"
            v-model="state.ruleForm.unitTitleCopy"
            placeholder="请选择单位名称"
            @change="seleteData"
            filterable
          >
            <el-option
              v-for="item in state.unitTitleList"
              :key="item.networkId"
              :label="item.cname"
              :value="item.networkId"
            ></el-option>
          </el-select>
        </div>
        <div class="modal-content" v-if="state.ruleForm.unitType == '2'">
          <span class="modal-label-name">台站:</span>
          <el-select
            clearable
            :popper-append-to-body="false"
            v-model="state.ruleForm.unitTitleArr"
            placeholder="请选择单位名称"
            multiple
            collapse-tags
            filterable
          >
            <el-option
              v-for="item in state.unitTitleListCopy"
              :key="item.stationId"
              :label="item.name"
              :value="item.stationId"
            ></el-option>
          </el-select>
        </div>
        <!--  -->
      </template>
    </PIEModal>
    <!-- 修改弹窗 -->
    <PIEModal
      v-model:visible="state.showUpdate"
      :title="state.title"
      :resetBtn="false"
      width="35"
      height="35"
      @cancel="updatecancel"
      @confirm="updateconfirm"
    >
      <template v-slot:operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">人员名称:</span>
            <el-input
              v-model="state.updateData.name"
              placeholder="请输入人员名称"
            ></el-input>
          </div>
        </div>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">手机号:</span>
            <el-input
              v-model="state.updateData.phone"
              placeholder="请输入备注"
            ></el-input>
          </div>
        </div>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">邮箱:</span>
            <el-input
              v-model="state.updateData.email"
              placeholder="请输入备注"
            ></el-input>
          </div>
        </div>
        <div class="modal-content">
          <span class="modal-label-name">单位类型:</span>
          <el-radio-group
            v-model="state.updateData.unitType"
            class="ml-4"
            @change="unitTypeFun"
          >
            <el-radio label="1" size="large">台网</el-radio>
            <el-radio label="2" size="large">台站</el-radio>
          </el-radio-group>
        </div>
        <div class="modal-content" v-if="state.updateData.unitType == '1'">
          <span class="modal-label-name">台网:</span>
          <el-select
            clearable
            :popper-append-to-body="false"
            v-model="state.updateData.unitTitle"
            placeholder="请选择单位名称"
            filterable
          >
            <el-option
              v-for="item in state.unitTitleList"
              :key="item.networkId"
              :label="item.cname"
              :value="item.networkId"
            ></el-option>
          </el-select>
        </div>
        <!-- 台网+台站 -->
        <div class="modal-content" v-if="state.updateData.unitType == '2'">
          <span class="modal-label-name">台网:</span>
          <el-select
            clearable
            :popper-append-to-body="false"
            v-model="state.updateData.unitTitleCopy"
            placeholder="请选择单位名称"
            @change="seleteData"
            filterable
          >
            <el-option
              v-for="item in state.unitTitleList"
              :key="item.networkId"
              :label="item.cname"
              :value="item.networkId"
            ></el-option>
          </el-select>
        </div>
        <div class="modal-content" v-if="state.updateData.unitType == '2'">
          <span class="modal-label-name">台站:</span>
          <el-select
            clearable
            :popper-append-to-body="false"
            v-model="state.updateData.unitTitleArr"
            placeholder="请选择单位名称"
            multiple
            collapse-tags
            filterable
          >
            <el-option
              v-for="item in state.unitTitleListCopy"
              :key="item.stationId"
              :label="item.name"
              :value="item.stationId"
            ></el-option>
          </el-select>
        </div>
        <!--  -->
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./staffManage";
const {
  state,
  searchName,
  addConfig,
  update,
  confirmDelete,
  pageChange,
  sizeChange,
  cancel,
  updateconfirm,
  updatecancel,
  unitTypeFun,
  seleteData,
  confirm,
  netDataChange,
  onChangeImport,
  importUpload,
} = useHandler();
</script>

<style lang="less" scoped>
.staff-content {
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
      display: flex;
      align-items: center;
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
        :deep(.el-input__wrapper) {
          width: @input-width;
          flex-grow: 0;
          height: @input-height;
        }
      }
    }
  }
  //新增
  .modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: @global-margin;
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
    :deep(.el-radio-group) {
      width: @input-width;
    }
    :deep(.el-radio) {
      width: 100px;
      color: @template-color;
    }
  }
}
</style>
