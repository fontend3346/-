<template>
  <div class="place-admin">
    <!-- 观测场地检索框 -->
    <div class="header-left-content">
      <div class="left-content-justify">
        <div class="left-content-item">
          <span class="left-name">台网</span>
          <el-select
            filterable
            clearable
            v-model="state.selectNetwork"
            placeholder="请选择台网"
            class="style-select"
            @change="networkChange"
            @clear="getList"
          >
            <el-option
              v-for="item in state.selectNetList"
              :key="item.networkId"
              :label="item.cname"
              :value="item.networkId"
              class="select-item"
            ></el-option>
          </el-select>
        </div>
        <div class="left-content-item">
          <span class="left-name">台站</span>
          <el-select
            :popper-append-to-body="false"
            clearable
            filterable
            v-model="state.stationArray"
            placeholder="请选择"
            class="style-select"
            @clear="getList"
          >
            <el-option
              v-for="item in state.stationChildList"
              :key="item.stationId"
              :label="item.name"
              :value="item.stationId"
              class="select-item"
            ></el-option>
          </el-select>
        </div>

        <div class="left-content-item">
          <span class="left-name">观测场地</span>
          <el-select
            v-model="state.placeId"
            remote
            filterable
            reserve-keyword
            placeholder="请输入观测场地"
            :remote-method="remoteMethodPlace"
            clearable
            @clear="getList"
          >
            <el-option
              v-for="item in state.placesList"
              :key="item.placeId"
              :label="item.name"
              :value="item.placeId"
            />
          </el-select>
        </div>
      </div>
      <div class="left-content-justify">
        <div class="left-content-items">
          <button @click="getList">查询</button>
          <button @click="addConfig">新增</button>
        </div>
      </div>
    </div>
    <!-- 观测场地表格 -->
    <div class="pie-tb-iscontent">
      <PIETable
        :data="state.linkageData"
        :columns="state.linkageColumns"
        :isAction="true"
        :deleteBtn="true"
        :actionSlot="true"
        @confirmDelete="confirmDelete"
        @onSelectAll="onSelectAll"
        @select="select"
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
            class="start-enable"
            v-if="scope.row.status == 0"
            @click="statusChange(scope.row.status, { id: scope.row.placeId })"
            >启用</span
          >
          <span
            class="start-enable"
            v-if="scope.row.status == 0"
            @click="editItem(scope.row)"
            >编辑</span
          >
          <span
            class="start-enable"
            v-if="scope.row.status == 1"
            @click="statusChange(scope.row.status, { id: scope.row.placeId })"
            >禁用</span
          >
        </template>
      </PIETable>
    </div>
    <!-- 分页 -->
    <div class="pie-tb-footer">
      <PIEPage
        :total="state.total"
        :pageSize="state.pageSize"
        :currentPage="state.pageNum"
        @handleSizeChange="sizeChange"
        @handleNumChange="pageChange"
      ></PIEPage>
    </div>
    <!-- 新建、修改弹窗 -->
    <PIEModal
      :title="state.title"
      v-model:visible="state.showAdd"
      :resetBtn="false"
      width="40"
      height="35"
      @cancel="cancel"
      @confirm="confirmEdit"
      class="add-modal"
    >
      <template #operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">台网:</span>
            <el-select
              class="edit-select"
              v-model="state.editData.unitId"
              clearable
              filterable
              placeholder="请选择台网"
              @change="editStationChange"
            >
              <el-option
                v-for="item in state.selectNetList"
                :key="item"
                :label="item.cname"
                :value="item.networkId"
              >
              </el-option>
            </el-select>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">台站:</span>
            <el-select
              class="edit-select"
              v-model="state.editData.stationId"
              clearable
              filterable
              placeholder="请选择台站"
            >
              <el-option
                v-for="item in state.editstationChildList"
                :key="item.station_id"
                :label="item.name"
                :value="item.station_id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">场地名称:</span>
            <el-input
              v-model="state.editData.name"
              clearable
              placeholder="请输入场地名称"
            ></el-input>
          </div>

          <div class="modal-content">
            <span class="modal-label-name">场地描述:</span>
            <el-input
              type="textarea"
              v-model="state.editData.description"
              clearable
              placeholder="请输入场地描述"
            ></el-input>
          </div>
        </div>
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./index";
const emit = defineEmits<{
  (event: "backConfig", e: MouseEvent): void;
}>();
const {
  state,
  init,
  pageChange,
  sizeChange,
  cancel,
  getList,
  statusChange,
  onSelectAll,
  select,
  confirmDelete,
  deletePlace,
  addConfig,
  editItem,
  editSelectStation,
  editStationChange,
  confirmEdit,
  getProvince,
  getStations,
  stationsTotal,
  networkChange,
  remoteMethodPlace,
} = useHandler();
</script>

<style lang="less" scoped>
.place-admin {
  display: flex;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  padding: @global-padding;
  .header-left-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .left-content-justify {
      display: flex;
      .left-content-item {
        display: flex;
        align-items: center;
        margin-right: @input-margin;
        // margin-bottom: 10px;
        // width: 24%;
        // justify-content: space-around;
        .left-name {
          display: inline-block;
          // width: 90px;
          font-size: @main-font-size;
          color: @main-font-color;
          padding-right: @title-padding;
          box-sizing: border-box;
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
      }
      .left-content-items {
        // width: 100%;
        display: flex;
        justify-content: flex-end;
        // margin-bottom: 10px;
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

  //新增
  .modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: @global-padding;
    width: 100%;

    .modal-label-name {
      display: inline-block;
      width: 76px;
      text-align: right;
      color: @main-font-color;
      font-size: @main-font-size;
      padding-right: @title-padding;
    }
    .edit-select {
      width: @input-width;
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
    :deep(.el-textarea__inner) {
      background: transparent;
      color: @main-font-color;
    }
    :deep(.el-cascader) {
      width: @input-width;
    }
  }
  .pie-tb-iscontent {
    margin-top: @table-top-space;
    width: 100%;
  }
  .start-enable {
    margin-right: @global-small-padding;
    cursor: pointer;
  }
}
// :deep(.el-select) {
//   width: 300px;
// }
</style>
