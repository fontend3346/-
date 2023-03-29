<template>
  <div class="mechanism-admin">
    <!-- 1-1 测点管理 -->
    <div class="header-left-content">
      <div class="left-content-justify">
        <div class="left-content-item">
          <span class="left-name">台网</span>
          <el-select
            :popper-append-to-body="false"
            clearable
            filterable
            v-model="state.selectNetwork"
            placeholder="请选择台网"
            class="style-select"
            @change="networkChange"
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
        <!-- <div class="left-content-item">
          <span class="left-name">台阵</span>
          <el-select
            :popper-append-to-body="false"
            clearable
            filterable
            v-model="state.stationArray"
            placeholder="请选择"
            class="style-select"
            @change="stationArrayChange"
          >
            <el-option
              v-for="item in state.stationArrayList"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
              class="select-item"
            ></el-option>
          </el-select>
        </div> -->

        <div class="left-content-item">
          <span class="left-name">台站</span>
          <el-select
            v-model="state.stationChild"
            clearable
            filterable
            placeholder="选择子台站"
            @clear="getList"
          >
            <el-option
              v-for="item in state.stationChildList"
              :key="item.stationId"
              :label="item.name"
              :value="item.stationId"
            >
            </el-option>
          </el-select>
        </div>

        <div class="left-content-item">
          <span class="left-name">测点</span>
          <el-input
            v-model="state.pointName"
            placeholder="请输入测点名称"
            clearable
            @clear="getList"
          ></el-input>
        </div>
      </div>
      <div class="left-content-justify">
        <div class="left-content-items">
          <button @click="getList">查询</button>
          <button @click="addConfig">新增</button>
          <!-- <button @click="backConfig">切换地图</button> -->
        </div>
      </div>
    </div>
    <!-- -->
    <div class="pie-tb-iscontent">
      <PIETable
        :data="state.linkageData"
        :columns="state.linkageColumns"
        :isAction="true"
        :showIndex="true"
        :dynamicShow="true"
        :deleteBtn="true"
        @confirmDelete="confirmDelete"
        :detailBtn="true"
        :dynamicBtnName="state.dynamicBtnName"
        @dynamicBtn="dynamicBtn"
        @detail="detail"
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
    <!-- 新建、修改弹窗 -->
    <PIEModal
      :title="state.title"
      v-model:visible="state.showAdd"
      :resetBtn="false"
      width="35"
      height="35"
      @cancel="cancel"
      @confirm="confirmEdit"
      class="add-modal"
    >
      <template #operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">测点名称:</span>
            <el-input v-model="state.editData.name" clearable></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">关联台站:</span>
            <el-select
              class="edit-select"
              v-model="state.editData.stationId"
              clearable
              filterable
              placeholder="选择子台站"
              @clear="getList"
            >
              <el-option
                v-for="item in state.stationChildList"
                :key="item.stationId"
                :label="item.name"
                :value="item.stationId"
              >
              </el-option>
            </el-select>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">经度:</span>
            <el-input v-model="state.editData.longitude" clearable></el-input>
          </div>

          <div class="modal-content">
            <span class="modal-label-name">纬度:</span>
            <el-input v-model="state.editData.latitude" clearable></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">高程:</span>
            <el-input v-model="state.editData.elevation" clearable></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">编码:</span>
            <el-input v-model="state.editData.code" clearable></el-input>
          </div>
        </div>
      </template>
    </PIEModal>
    <!-- 详情 -->
    <PIEModal
      v-model:visible="state.detailModal"
      :title="state.title"
      :resetBtn="false"
      :confirmBtn="false"
      :close="true"
      width="60"
      @cancel="cancel"
    >
      <template #operateItem>
        <!-- 安装信息 -->
        <div class="detail-item">
          <div class="item-title">详细信息</div>
          <div class="item-card">
            <div
              v-for="(item, index) in state.keepList"
              :key="index"
              class="card-border-bounds"
            >
              <div class="card-nape">
                <span>仪器名称:</span>{{ item.cate_name }}
              </div>
              <div class="card-nape">
                <span>仪器型号:</span>{{ item.inst_model_id }}
              </div>
              <div class="card-nape"><span>名称:</span>{{ item.name }}</div>
              <div class="card-nape">
                <span>启用时间:</span>{{ item.on_time }}
              </div>
              <div class="card-nape">
                <span>停用时间:</span>{{ item.off_time }}
              </div>
              <div class="card-nape">
                <span>序列号:</span>{{ item.serial_num }}
              </div>
              <div class="card-nape"><span>状态:</span>{{ item.state }}</div>
            </div>
          </div>
        </div>
        <!-- 维护信息 -->
        <div class="detail-item">
          <div class="item-title">
            设备挂接记录
            <span class="iconfont icon-jiahao" @click="addCard"></span>
          </div>
          <div class="item-card">
            <div class="card-border-bounds">
              <div class="card-nape">
                <span>测点:</span>{{ state.installList.isFlowType }}
              </div>
              <div class="card-nape">
                <span>维护人ID:</span>{{ state.installList.maintainerId }}
              </div>
              <div class="card-nape">
                <span>测点ID:</span>{{ state.installList.pointId }}
              </div>
              <div class="card-nape">
                <span>性质:</span>{{ state.installList.propertiesType }}
              </div>
              <div class="card-nape">
                <span>状态:</span>{{ state.installList.state }}
              </div>
              <div class="card-nape">
                <span>建设时间:</span>{{ state.installList.ctime }}
              </div>
              <div class="card-nape">
                <span>结束时间:</span>{{ state.installList.stime }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </PIEModal>
    <!-- 新增 -->
    <PIEModal
      v-model:visible="state.addRecord"
      :title="state.title"
      :resetBtn="false"
      :close="true"
      width="30"
      height="45"
      @cancel="recordCancel"
      @confirm="recordConfirm"
    >
      <template #operateItem>
        <div class="add-record">
          <!-- 仪器名称 -->
          <div class="record-item">
            <span class="item-title">仪器名称:</span>
            <el-input
              v-model="state.apparatuName"
              placeholder="请输入仪器名称"
              class="input-style"
            ></el-input>
          </div>
          <!-- 维护类型 -->
          <div class="record-item">
            <span class="item-title">维护类型:</span>
            <el-select
              v-model="state.apparatuType"
              class="input-style"
              placeholder="请选择维护类型"
              clearable
            >
              <el-option
                v-for="item in state.typeList"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </div>
          <!-- 维护时间 -->
          <div class="record-item">
            <span class="item-title">维护时间:</span>
            <el-date-picker
              v-model="state.apparatuTime"
              type="datetime"
              class="input-style"
              placeholder="请选择维护时间"
            />
          </div>
          <!-- 维护内容 -->
          <div class="record-item">
            <span class="item-title">维护内容:</span>
            <el-input
              v-model="state.apparatuContent"
              placeholder="请输入维护内容"
              class="input-style"
              :rows="2"
              type="textarea"
            ></el-input>
          </div>
          <!-- 维修人 -->
          <div class="record-item">
            <span class="item-title">维修人:</span>
            <el-input
              v-model="state.apparatuStaff"
              placeholder="请输入维修人"
              class="input-style"
            ></el-input>
          </div>
          <!-- 维修人 -->
          <!-- <div class="record-item">
            <span class="item-title">维修人:</span>
            <el-input
              v-model="state.apparatuStaff"
              placeholder="请输入维修人"
              class="input-style"
            ></el-input>
          </div> -->
          <!-- 维修机构 -->
          <div class="record-item">
            <span class="item-title">维修机构:</span>
            <el-input
              v-model="state.apparatuOrg"
              placeholder="请输入维修机构"
              class="input-style"
            ></el-input>
          </div>
          <!-- 送修人 -->
          <!-- <div class="record-item">
              <span class="item-title">送修人:</span>
              <el-input
                v-model="state.apparatuOrg"
                placeholder="请输入送修人"
                class="input-style"
              ></el-input>
            </div> -->
        </div>
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./measurementList";
const emit = defineEmits<{
  (event: "backConfig", e: MouseEvent): void;
}>();
const {
  state,
  init,
  backConfig,
  dynamicBtn,
  pageChange,
  sizeChange,
  cancel,
  getList,
  confirmDelete,
  deletePoint,
  addConfig,
  editItem,
  confirmEdit,
  getProvince,
  getTaiwanese,
  provinceTaiwanese,
  getStations,
  stationsTotal,
  networkChange,
  stationArrayChange,
  addCard,
  recordCancel,
  recordConfirm,
  detail,
} = useHandler();
</script>

<style lang="less" scoped>
.mechanism-admin {
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
      flex-wrap: wrap;
      .left-content-item {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        // margin-bottom: 10px;
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
}
.detail-item {
  .item-title {
    color: @main-font-color;
    font-size: @main-font-size;
    margin-bottom: @global-small-padding;
    .icon-jiahao {
      font-size: @main-font-size;
      color: @main-font-color;
      margin-left: 30px;
    }
  }

  .item-card {
    width: 100%;
    max-height: 250px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .card-border-bounds {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      background: @content-bg;
      margin-bottom: @global-small-padding;
      border-radius: 8px;
      padding: @global-small-padding;
      box-sizing: border-box;
    }
    .card-nape {
      width: 33%;
      font-size: @main-font-size;
      line-height: 30px;
      span {
        display: inline-block;
        width: 100px;
      }
    }
  }
}
.add-record {
  //新增维修记录
  .record-item {
    display: flex;
    align-items: center;
    margin: 20px 5px;
    .item-title {
      color: @main-font-color;
      font-size: @main-font-size;
      width: 25%;
      text-align: end;
      padding-right: @global-padding;
      box-sizing: border-box;
    }
    .input-style {
      display: flex;
      width: @input-width;
      :deep(.el-input) {
        height: @input-height;
        width: @input-width;
      }
    }
    :deep(.el-date-editor) {
      height: @input-height;
      width: @input-width;
      .el-input__prefix-inner {
        color: @main-font-color;
      }
    }
    :deep(.el-textarea__inner) {
      background: transparent;
    }
  }
}
// :deep(.el-select) {
//   width: 300px;
// }
</style>
