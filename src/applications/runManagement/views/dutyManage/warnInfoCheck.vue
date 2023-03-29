<template>
  <div class="warnInfo-check-admin">
    <!-- 2-4-2 预警信息发布登记 -->
    <div class="header-left-content">
      <div class="left-content-item">
        <span class="left-name">预警信息名称</span>
        <el-input
          v-model="state.eventName"
          placeholder="请输入事件名称"
          clearable
        ></el-input>
      </div>
      <div class="left-content-item">
        <span class="left-name">预警信息类型</span>
        <el-input
          v-model="state.eventType"
          placeholder="请输入事件类型"
          clearable
        ></el-input>
      </div>
      <div class="left-content-item">
        <span class="left-name">值班人员</span>
        <el-input
          v-model="state.dutyPeople"
          placeholder="请输入值班人员"
          clearable
        ></el-input>
      </div>
      <div class="left-content-item">
        <span class="left-name">填写时间</span>
        <el-date-picker
          v-model="state.dutyTime"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          clearable
        />
      </div>
      <div class="left-content-item">
        <span class="left-name">预警级别</span>
        <el-input
          v-model="state.warnLevel"
          placeholder="请输入预警级别"
          clearable
        ></el-input>
      </div>
      <div class="left-content-item">
        <span class="left-name">预警状态</span>
        <el-select
          :popper-append-to-body="false"
          v-model="state.warnStatus"
          clearable
        >
          <el-option
            v-for="item in state.warnStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>

      <div class="left-content-items">
        <button @click="searchList">查询</button>
        <button @click="exportList">导出</button>
        <button @click="batchesDelete">批量删除</button>
        <button @click="addEvent">添加预警信息</button>
      </div>
    </div>

    <div class="pie-tb-iscontent">
      <PIETable
        :maxHeight="500"
        :data="state.linkageData"
        :columns="state.linkageColumns"
        :isAction="true"
        :deleteBtn="true"
        :showCheckbox="true"
        :showIndex="true"
        :dynamicShow="true"
        :operationWidth="200"
        :dynamicBtnName="state.dynamicBtnName"
        @dynamicBtn="dynamicBtn"
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
          color: '#D7D7D9',
          letterSpacing: '2px',
        }"
        :row-style="{
          borderBottom: '1px solid #13598C',
          background: 'transparent',
        }"
      >
        <template #action="scope">
          <span class="editBtn-table" @click="handleEdit(scope.row)">{{
            state.titleWrap
          }}</span>
        </template>
      </PIETable>
    </div>

    <div class="pie-tb-footer">
      <PIEPage
        :total="state.total"
        :pageSize="state.pageSize"
        :currentPage="state.pageNum"
        @handleSizeChange="sizeChange"
        @handleNumChange="pageChange"
      ></PIEPage>
    </div>
    <!-- 新建 / 编辑弹窗 -->
    <PIEModal
      :title="state.title"
      v-model:visible="state.showAdd"
      width="30"
      height="50"
      @confirm="confirm"
      class="add-modal"
    >
      <template #operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">台站:</span>
            <el-select
              :popper-append-to-body="false"
              v-model="state.editRow.stationValue"
            >
              <el-option
                v-for="item in state.editRow.stationList"
                :key="item.unitId"
                :label="item.unitName"
                :value="item.unitId"
              ></el-option>
            </el-select>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">预警名称:</span>
            <el-input
              v-model="state.editRow.eventName"
              placeholder="请输入预警名称"
            ></el-input>
          </div>

          <div class="modal-content">
            <span class="modal-label-name">预警内容:</span>
            <el-input
              type="textarea"
              :rows="2"
              v-model="state.editRow.content"
              placeholder="请输入预警内容"
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">预警级别:</span>
            <el-input
              v-model="state.editRow.warnLevel"
              placeholder="请输入预警级别"
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">预警类型:</span>
            <el-input
              v-model="state.editRow.warnType"
              placeholder="请输入预警类型"
            ></el-input>
          </div>
          <div class="modal-content" v-if="state.title == '编辑'">
            <span class="modal-label-name">状态:</span>
            <el-select
              :popper-append-to-body="false"
              v-model="state.editRow.dutyStatus"
              clearable
            >
              <el-option
                v-for="item in state.warnStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="modal-content" v-if="state.title == '编辑'">
            <span class="modal-label-name">创建时间:</span>
            <el-date-picker
              v-model="state.editRow.createTime"
              type="datetime"
              placeholder="请选择结束时间"
            />
          </div>
        </div>
      </template>
    </PIEModal>
    <!-- 查看弹框 -->
    <PIEModal
      :title="state.title"
      v-model:visible="state.showExamine"
      width="30"
      height="50"
      @confirm="examineConfirm()"
      class="modify-modal"
    >
      <template #operateItem>
        <div class="modal-details">
          <div class="single-content">
            <span class="single-label">突发事件名称:</span>
            <div class="single-content">
              {{ state.examineData.eventName }}
            </div>
          </div>
          <div class="single-content">
            <span class="single-label">突发事件类型:</span>
            <div class="single-content">
              {{ state.examineData.eventType }}
            </div>
          </div>
          <div class="single-content">
            <span class="single-label">值班人员:</span>
            <div class="single-content">
              {{ state.examineData.dutyPeople }}
            </div>
          </div>

          <div class="single-content">
            <span class="single-label">填写时间:</span>
            <div class="single-content">
              {{ state.examineData.fillTime }}
            </div>
          </div>

          <div class="single-content">
            <span class="single-label">内容:</span>
            <div class="single-content">
              {{ state.examineData.content }}
            </div>
          </div>
        </div>
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./warnInfoCheck";
const {
  state,
  judgmentStatus,
  sizeChange,
  pageChange,
  batchesDelete,
  onSelectionChange,
  deleteFun,
  confirmDelete,
  examineConfirm,
  examine,
  edit,
  confirm,
  clear,
  addEvent,
  exportList,
  getList,
  searchList,
  dynamicBtn,
} = useHandler();
</script>

<style lang="less" scoped>
.warnInfo-check-admin {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: @global-padding;
  box-sizing: border-box;
  .header-left-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .left-content-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      width: 24%;
      justify-content: flex-end;
      .left-name {
        display: inline-block;
        // width: 110px;
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
        flex-grow: 0;
        width: @input-width;
      }
      :deep(.el-date-editor) {
        width: @input-width;
        height: @input-height;
      }
    }
    .left-content-items {
      width: 49.3%;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;
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

  //新增
  .modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    .modal-label-name {
      text-align: right;
      padding-right: @title-padding;
      display: inline-block;
      width: 100px;
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
    :deep(.el-textarea__inner) {
      background: transparent;
      color: @main-font-color;
    }
    :deep(.el-input__wrapper) {
      width: @input-width;
    }
    :deep(.el-date-editor) {
      width: @input-width;
      height: @input-height;
    }
    :deep(.el-radio-group) {
      width: @input-width;
      height: @input-height;
    }
    :deep(.el-radio) {
      width: 100px;
    }
  }
  //详情
  .modal-details {
    display: flex;
    flex-direction: column;
    .single-content {
      display: flex;
      width: 100%;
      margin-bottom: 8px;
      .single-label {
        // display: inline-block;
        width: 30%;
        color: @main-font-color;
        font-size: @main-font-size;
        margin-right: 10px;
      }
      .single-content {
        // width: 500px;
        color: @main-font-color;
        // font-size: 14px;
        font-size: @main-font-size;
      }
    }
  }

  .pie-tb-iscontent {
    margin-top: 10px;
  }
}
</style>
