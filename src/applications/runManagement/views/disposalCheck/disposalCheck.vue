<template>
  <div class="disposal-check-admin">
    <!-- 2-4-1 突发事件处置登记 -->
    <div class="header-left-content">
      <div class="left-content-item">
        <span class="left-name">突发事件名称</span>
        <el-input
          v-model="state.eventName"
          placeholder="请输入事件名称"
          clearable
        ></el-input>
      </div>
      <div class="left-content-item">
        <span class="left-name">突发事件类型</span>
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
        <span class="left-name">状态</span>
        <el-select
          :popper-append-to-body="false"
          v-model="state.dutyStatus"
          clearable
        >
          <el-option
            v-for="item in state.dutyStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="left-content-item">
        <span class="left-name left-style">填写时间</span>
        <el-date-picker
          :popper-append-to-body="false"
          v-model="state.dutyTime"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          clearable
        />
      </div>
      <!-- <div class="left-content-item">
        <span class="left-name">开始时间</span>
        <el-date-picker
          v-model="state.startTime"
          type="datetime"
          placeholder="请选择开始时间"
        />
      </div>
      <div class="left-content-item">
        <span class="left-name">结束时间</span>
        <el-date-picker
          v-model="state.endTime"
          type="datetime"
          placeholder="请选择结束时间"
        />
      </div> -->

      <div class="left-content-items">
        <button @click="searchList">查询</button>
        <button @click="exportList">导出</button>
        <button @click="batchesDelete">批量删除</button>
        <button @click="addEvent">添加突发事件</button>
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
      width="35"
      height="50"
      @confirm="confirm"
      @cancel="cancel"
      class="add-modal"
    >
      <template #operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">台站:</span>
            <el-select
              :popper-append-to-body="false"
              v-model="state.addRow.stationValue"
              clearable
              filterable
              @change="getPonint"
            >
              <el-option
                v-for="item in state.addRow.stationList"
                :key="item.unitId"
                :label="item.unitName"
                :value="item.unitId"
              ></el-option>
            </el-select>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">测点:</span>
            <el-select
              :popper-append-to-body="false"
              v-model="state.addRow.pointValue"
              clearable
              filterable
              @change="getEquipMent"
            >
              <el-option
                v-for="item in state.addRow.pointList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">设备:</span>
            <el-select
              clearable
              filterable
              :popper-append-to-body="false"
              v-model="state.addRow.equipmentValue"
            >
              <el-option
                v-for="item in state.addRow.equipmentList"
                :key="item.id"
                :label="item.device_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">突发事件名称:</span>
            <el-input
              v-model="state.addRow.eventName"
              placeholder="请输入异常名称"
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">突发事件类型:</span>
            <!-- <el-select v-model="state.eventType" placeholder="类型">
              <el-option label="故障" value="故障" />
              <el-option label="异常" value="异常" />
            </el-select> -->
            <el-input
              v-model="state.addRow.eventType"
              placeholder="请输入异常名称"
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">突发事件内容:</span>
            <el-input
              type="textarea"
              :rows="2"
              v-model="state.addRow.evenContent"
              placeholder="请输入异常内容"
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">开始时间:</span>
            <el-date-picker
              v-model="state.addRow.startTime"
              type="datetime"
              placeholder="请选择开始时间"
            />
          </div>
          <div class="modal-content">
            <span class="modal-label-name">结束时间:</span>
            <el-date-picker
              v-model="state.addRow.endTime"
              type="datetime"
              placeholder="请选择结束时间"
            />
          </div>
          <div class="modal-content" v-if="state.title == '编辑'">
            <span class="modal-label-name">状态:</span>
            <el-select
              :popper-append-to-body="false"
              v-model="state.addRow.dutyStatus"
              clearable
            >
              <el-option
                v-for="item in state.dutyStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
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
      :confirmBtn="false"
      @cancel="examineConfirm"
      class="modify-modal"
    >
      <template #operateItem>
        <div class="modal-details">
          <div class="single-content">
            <span class="single-label">台站:</span>
            <div class="single-content">
              {{ state.examineData.stationName }}
            </div>
          </div>
          <div class="single-content">
            <span class="single-label">测点:</span>
            <div class="single-content">
              {{ state.examineData.pointName }}
            </div>
          </div>
          <div class="single-content">
            <span class="single-label">设备:</span>
            <div class="single-content">
              {{ state.examineData.deviceName }}
            </div>
          </div>

          <div class="single-content">
            <span class="single-label">突发事件名称:</span>
            <div class="single-content">
              {{ state.examineData.exceptionName }}
            </div>
          </div>
          <div class="single-content">
            <span class="single-label">突发事件类型:</span>
            <div class="single-content">
              {{ state.examineData.exceptionType }}
            </div>
          </div>

          <div class="single-content">
            <span class="single-label">突发事件内容:</span>
            <div class="single-content">
              {{ state.examineData.exceptionContent }}
            </div>
          </div>

          <div class="single-content">
            <span class="single-label">值班人员:</span>
            <div class="single-content">
              {{ state.examineData.dutyOfficerName }}
            </div>
          </div>
          <div class="single-content">
            <span class="single-label">开始时间:</span>
            <div class="single-content">
              {{ state.examineData.startTime }}
            </div>
          </div>
          <div class="single-content">
            <span class="single-label">结束时间:</span>
            <div class="single-content">
              {{ state.examineData.endTime }}
            </div>
          </div>
          <div class="single-content">
            <span class="single-label">状态:</span>
            <div class="single-content">
              {{ state.examineData.status }}
            </div>
          </div>
        </div>
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./disposalCheck";
const {
  state,
  personUserId,
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
  cancel,
  clear,
  addEvent,
  exportList,
  getList,
  getEquipMent,
  getPonint,
  judgmentStatus,
  searchList,
  dynamicBtn,
} = useHandler();
</script>

<style lang="less" scoped>
.disposal-check-admin {
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
      justify-content: flex-end;
      .left-style {
        padding-left: 31px;
        box-sizing: border-box;
      }
      .left-name {
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
        width: @input-width;
      }

      :deep(.el-date-editor) {
        width: @input-width;
        height: @input-height;
      }
    }
    .left-content-items {
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
      width: 110px;
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
    :deep(.el-select) {
      width: @input-width;
    }
    :deep(.el-date-editor) {
      width: @input-width;
      height: @input-height;
    }
  }
  //详情
  .modal-details {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .single-content {
      display: flex;
      width: 100%;
      margin-bottom: @title-padding;
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
