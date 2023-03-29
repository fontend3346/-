<template>
  <div class="people-manage-content">
    <!-- 3-4 用户管理页面 -->
    <div class="userManagement-admin-content-top">
      <div class="domain-header-left">
        <div class="header-left-content">
          <span>账号</span>
          <el-input
            v-model="state.fitData"
            clearable
            placeholder="请输入账号"
          ></el-input>
        </div>
        <div class="header-left-content">
          <span>台网</span>
          <el-select
            clearable
            v-model="state.mechanism1"
            placeholder="请选择台网"
            class="modal-select"
            @change="changeDept"
            filterable
          >
            <el-option
              v-for="item in state.mechanismArry"
              :key="item.networkId"
              :label="item.cname"
              :value="item.networkId"
              class="select-item"
            ></el-option>
          </el-select>
        </div>
        <div class="header-left-content">
          <span>台站</span>
          <el-select
            clearable
            v-model="state.mechanism2"
            placeholder="请选择台站"
            class="modal-select"
            filterable
          >
            <el-option
              v-for="item in state.mechanismList"
              :key="item.stationId"
              :label="item.name"
              :value="item.stationId"
              class="select-item"
            ></el-option>
          </el-select>
        </div>
        <div class="header-left-content">
          <span>时间</span>
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
      </div>
      <div class="tables-button">
        <button title="查询" @click="searchClick">查询</button>
        <button title="批量删除" @click="batchesDelete">批量删除</button>
        <button title="新增" @click="commit">新增</button>
      </div>
    </div>
    <!--  -->
    <div class="pie-tb-iscontent">
      <!-- 表格 -->
      <PIETable
        :data="state.linkageData"
        :columns="state.linkageColumns"
        :isAction="true"
        :maxHeight="600"
        :deleteBtn="true"
        :showCheckbox="true"
        :showIndex="true"
        :actionSlot="true"
        :editBtn="true"
        @edit="update"
        @confirmDelete="confirmDelete"
        @on-selection-change="onSelectionChange"
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
            class="activeBtn-style"
            v-if="scope.row.status == 0"
            @click="confirmStartUse(scope.row)"
          >
            开启
          </span>
          <span
            class="activeBtn-style"
            v-if="scope.row.status == 1"
            @click="confirmCloseUse(scope.row)"
            >禁用</span
          >
          <span class="lookBtn-table" @click="groupEvent(scope.row)">角色</span>
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
    <!-- 新增用户 -->
    <PIEModal
      v-model:visible="state.isHobby"
      :title="state.title"
      :resetBtn="false"
      @confirm="confirm"
      width="35"
      height="35"
      @cancel="cancel"
      iconShow="true"
      :close="true"
    >
      <template #operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">账号:</span>
            <el-input
              v-model="state.ruleForm.userName"
              placeholder="请输入账号"
            ></el-input>
          </div>
          <!-- <div class="modal-content">
            <span class="modal-label-name">昵称:</span>
            <el-input
              v-model="state.ruleForm.nickname"
              placeholder="请输入昵称"
            ></el-input>
          </div> -->
          <div class="modal-content">
            <span class="modal-label-name">密码:</span>
            <el-input
              v-model="state.ruleForm.userPass"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">确认密码:</span>
            <el-input
              v-model="state.ruleForm.userPass1"
              placeholder="请输入确认密码"
              show-password
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">绑定人员:</span>
            <el-select
              :popper-append-to-body="false"
              v-model="state.ruleForm.assetUser"
              placeholder="请选择人员"
              clearable
              filterable
            >
              <el-option
                v-for="item in state.assetUserArry"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </template>
    </PIEModal>
    <!-- 修改用户 -->
    <PIEModal
      v-model:visible="state.isHobby1"
      :title="state.title"
      :resetBtn="false"
      @confirm="confirm"
      width="35"
      height="35"
      @cancel="cancel"
      iconShow="true"
      :close="true"
    >
      <template #operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">昵称:</span>
            <el-input
              v-model="state.ruleForm1.nickname"
              placeholder="请输入昵称"
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">修改密码:</span>
            <el-input
              v-model="state.ruleForm1.password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">确认密码:</span>
            <el-input
              v-model="state.ruleForm1.passwordConfirm"
              placeholder="请输入确认密码"
              show-password
            ></el-input>
          </div>
        </div>
      </template>
    </PIEModal>
    <!-- 角色框 -->
    <PIEModal
      width="40"
      height="40"
      :title="'角色'"
      v-model:visible="state.groupModal"
      :resetBtn="false"
      :confirmBtn="false"
      :cancelBtn="false"
      @cancel="cancel"
      class="group-role"
    >
      <template v-slot:operateItem>
        <div class="modal-box">
          <div class="header-line">
            <div class="text">角色</div>
            <el-select
              :popper-append-to-body="false"
              v-model="state.groupName"
              class="input-style"
              clearable
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in state.groupNameList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              ></el-option>
            </el-select>
            <button @click="insertRoleGroup">添加</button>
          </div>
          <PIETable
            :maxHeight="300"
            :data="state.groupTableData"
            :columns="state.groupColumns"
            :isAction="true"
            :showIndex="true"
            :deleteBtn="true"
            @confirmDelete="deleteRoleGroup"
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
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./peopleManage";
const {
  state,
  groupEvent,
  insertRoleGroup,
  deleteRoleGroup,
  confirmCloseUse,
  confirmStartUse,
  update,
  onSelectionChange,
  batchesDelete,
  searchClick,
  getRole,
  changeDept,
  pageChange,
  sizeChange,
  cancel,
  commit,
  confirm,
  confirmDelete,
} = useHandler();
</script>

<style lang="less" scoped>
.people-manage-content {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: @global-padding;
  box-sizing: border-box;
  :deep(.el-select-dropdown__item) {
    width: 300px;
  }
  .el-select-dropdown {
    width: 300px !important;
  }
  .userManagement-admin-content-top {
    display: flex;
    // justify-content: space-between;
    // flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    :deep(.el-input__inner),
    :deep(.el-input-group__prepend),
    :deep(.el-button) {
      background: transparent;
      color: @main-font-color;
    }
    .tables-button {
      width: 25%;
      display: flex;
      justify-content: flex-end;
      // margin-top: 20px;
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
    .domain-header-left {
      width: 100%;
      display: flex;
      // justify-content: space-between;
      flex-wrap: wrap;
      .header-left-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 5px;
        // width: 25%;
        justify-content: flex-end;
        margin-right: @input-margin;
        .el-input {
          width: @input-width;
          color: @main-font-color;
          background: transparent;
          border-bottom-right-radius: 5px;
          height: @input-height;
        }
        :deep(.el-range-input) {
          background: transparent;
          color: @main-font-color;
        }
        :deep(.el-range-separator) {
          color: @main-font-color;
        }
        :deep(.el-date-editor) {
          height: @input-height;
          width: @input-width;
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
        span {
          flex-shrink: 0;
          padding-right: @title-padding;
          font-size: @main-font-size;
          color: @main-font-color;
        }
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
      color: @main-font-color;
      font-size: @main-font-size;
      padding-right: @title-padding;
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
    .institution-select {
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
  //用户弹框
  .modal-box {
    .header-line {
      display: flex;
      align-items: center;
      color: @main-font-color;
      margin-bottom: 20px;
      justify-content: flex-start;
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
}
.activeBtn-style {
  cursor: pointer;
  padding-right: 15px;
  display: inline-block;
}
.lookBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}
</style>
