<template>
  <div class="watch-admin">
    <div class="header-left-content">
      <div class="network" v-if="state.userType == 1">
        <div class="left-content-item">
          <span class="left-name">台网</span>
          <el-input v-model="state.netWorkInput" disabled />
        </div>
        <div class="left-content-item">
          <span class="left-name">当前站点</span>
          <el-select
            :popper-append-to-body="false"
            v-model="state.netWorkSiteValue"
            placeholder="请选择当前站点"
            class="modal-select"
            clearable
            @change="netWorkStation"
          >
            <el-option
              v-for="item in state.netWorkCurrentSiteList"
              :key="item.stationId"
              :label="item.name"
              :value="item.stationId"
              class="select-item"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="station" v-if="state.userType == 2">
        <div class="left-content-item">
          <span class="left-name">当前站点</span>
          <el-select
            :popper-append-to-body="false"
            v-model="state.netWorkSiteValue"
            placeholder="请选择当前站点"
            class="modal-select"
            @change="netWorkStation"
            clearable
          >
            <el-option
              v-for="item in state.netWorkCurrentSiteList"
              :key="item.unitId"
              :label="item.unitName"
              :value="item.unitId"
              class="select-item"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div class="left-content-items">
        <button
          @click="rostering"
          :disabled="state.rosteringValue && state.userType == 1"
          :style="
            state.rosteringValue && state.userType == 1
              ? 'color:#6e6c6c'
              : 'color:#98dcff'
          "
        >
          排班
        </button>
        <button @click="exportList">导出排班表</button>
        <el-upload
          ref="upload"
          :limit="1"
          accept=".xlsx"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onChangeM"
          :http-request="httpRequestUpload"
          :disabled="state.rosteringValue && state.userType == 1"
        >
          <button
            title="导入"
            :style="
              state.rosteringValue && state.userType == 1
                ? 'color:#6e6c6c'
                : 'color:#98dcff'
            "
          >
            导入排班表
          </button>
        </el-upload>
        <div class="changeShow">
          <div class="change-calendar" @click="changeCalendar"></div>
          <div class="change-table" @click="changeTable"></div>
        </div>
      </div>
    </div>
    <!-- <div class="header-left-content">
      <div class="changeShow"></div>
      <div class="changeShow">
        <div class="change-calendar" @click="changeCalendar"></div>
        <div class="change-table" @click="changeTable"></div>
      </div>
    </div> -->
    <div class="watch-right">
      <div class="pie-tb-iscontent" v-if="state.showCalender">
        <PIECalendar
          :allDateContent="state.allDateContent"
          @dblclick="toDetails"
        ></PIECalendar>
        <div class="triangle-btn">
          <div class="close" v-if="!state.sidebarValue">
            <img src="../../../../assets/qietu/sidebar-close.png" />
          </div>
          <div class="open" v-else @click="triangleBtn">
            <img src="../../../../assets/qietu/sidebar-open.png" />
          </div>
          <el-drawer
            v-model="state.sidebarValue"
            title="I am the title"
            :with-header="false"
          >
            <div class="drawer-content">
              <div class="drawer-data">
                {{ dateFormat(state.beChangeDate) }}值班日志
              </div>
              <div class="drawer-main">主班：{{ state.mainPeopel }}</div>
              <div class="drawer-standby">备班：{{ state.standbyPeopel }}</div>
              <div class="drawer-duty-title">当天日报内容</div>
              <div class="drawer-duty">
                {{ state.previewContent }}
              </div>
            </div>
          </el-drawer>
        </div>
      </div>
      <div class="table-show" v-else>
        <div class="header-left-content">
          <!-- <span>2022年11月</span>
          <div class="modal-content">
            <span class="modal-label-name">选择日期:</span>
            <el-date-picker
              v-model="state.dateValue"
              type="date"
              :size="size"
              @change="dateChange"
              class="date-picker"
            />
          </div> -->
          <div class="legend">
            <!-- <span class="iconfont icon-yuandianxiao main"></span>主班人员
            <span class="iconfont icon-yuandianxiao standby"></span>备班人员 -->
          </div>
        </div>
        <!--排班信息以表格形式展示 -->
        <div class="pie-tb-change">
          <PIETable
            :maxHeight="550"
            :data="state.mergeTable"
            :objectSpanMethod="objectSpanMethod"
            :columns="state.mergeTableColumns"
            :isAction="true"
            :deleteBtn="true"
            @confirmDelete="handleDelete"
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
        <!--  -->
        <div class="pie-tb-footer">
          <PIEPage
            :total="state.totalTable"
            :pageSize="state.pageSizeTable"
            :currentPage="state.pageNumTable"
            @handleSizeChange="sizeChangeTable"
            @handleNumChange="pageChangeTable"
          ></PIEPage>
        </div>
      </div>
    </div>
    <!-- 列表替班换班弹框 -->
    <PIEModal
      title="替班换班"
      v-model:visible="state.tableModalShow"
      width="30"
      height="40"
      @cancel="tableCancelModal"
      @confirm="tableConfirmModal"
      class="modify-modal"
    >
      <template #operateItem>
        <div class="one-day-show">
          <div class="date-item">
            <span>日期:</span>
            <el-radio-group
              v-model="state.tableradioValue"
              @change="tableChangeRadio"
            >
              <el-radio :label="1" class="radio-style">换班</el-radio>
              <el-radio :label="2">替班</el-radio>
            </el-radio-group>
          </div>
          <div class="date-item" v-if="state.tableradioValue == 1">
            <span>日期:</span>
            <el-date-picker
              v-model="state.tableDate"
              type="date"
              :size="size"
              @change="tableDateChange"
              placeholder="请选择日期"
            />
          </div>
          <div class="date-item" v-if="state.tableradioValue == 1">
            <span>换班人员:</span>
            <el-select
              :popper-append-to-body="false"
              v-model="state.tablechangePeople"
              placeholder="请选择换班人员"
              class="modal-select"
            >
              <el-option
                v-for="item in state.tablePeopleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                class="select-item"
              ></el-option>
            </el-select>
          </div>
          <div class="replace-item" v-if="state.tableradioValue == 2">
            <div class="date-item">
              <span>替班人员:</span>
              <el-select
                :popper-append-to-body="false"
                v-model="state.tablereplaceValue"
                placeholder="请选择替班人员"
                class="modal-select"
              >
                <el-option
                  v-for="item in state.replaceArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  class="select-item"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
      </template>
    </PIEModal>
    <!-- 查看弹框 -->
    <PIEModal
      :title="state.title"
      v-model:visible="state.showDetails"
      width="30"
      height="40"
      :cancelBtn="false"
      :elseBtn="true"
      :elseText="'编辑'"
      @elseConfirm="toEdit"
      @confirm="detailsConfirm()"
      class="modify-modal details-box"
    >
      <template #operateItem>
        <div class="modal-details">
          <div class="single-detail">
            <span class="single-label">日期:</span>
            <div class="single-content">
              {{ state.detailsData.day }}
            </div>
          </div>
          <div class="single-detail">
            <span class="single-label">主班人员:</span>
            <div class="single-content">
              {{ state.detailsData.mainShift }}
            </div>
          </div>
          <div class="single-detail">
            <span class="single-label">备班人员:</span>
            <div class="single-content">
              {{ state.detailsData.standbyShift }}
            </div>
          </div>
          <div class="single-detail">
            <span class="single-label">值班日报:</span>

            <div class="single-content">
              <el-input
                v-model="state.detailsData.dutyLog"
                placeholder="填写日报"
                type="textarea"
                rows="5"
              ></el-input>

              <!-- {{ state.detailsData.dutyLog }} -->
            </div>
          </div>
        </div>
      </template>
    </PIEModal>
    <!-- 排班 -->
    <PIEModal
      :title="state.title"
      v-model:visible="state.showAdd"
      :elseBtn="true"
      width="50"
      height="50"
      @confirm="addConfirm()"
      @elseConfirm="browse()"
      class="modify-modal"
    >
      <template #operateItem>
        <div class="modal-top">
          <div class="title">排班信息</div>
          <div class="title">排班规则</div>
        </div>
        <div class="modal-bottom">
          <div class="modal-wrapper">
            <div class="modal-content">
              <span class="modal-label-name">值班时间:</span>
              <div class="modal-label-content">
                <el-date-picker
                  v-model="state.addData.day"
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
            <div class="modal-content">
              <span class="modal-label-name">主班人员:</span>
              <div class="modal-label-content select-people">
                <div class="add-main add" @click="addMainShift(1)">
                  <span class="iconfont icon-jiahao"></span>
                </div>
                <div
                  class="add-main"
                  v-for="(item, index) in state.selectMainPerson"
                  :key="index"
                >
                  {{ item }}
                </div>
              </div>
            </div>
            <div class="modal-content">
              以上人员轮流排班，每班
              <el-input
                class="add-every"
                v-model="state.addData.mainEvery"
              ></el-input
              >人
            </div>

            <div class="modal-content">
              <span class="modal-label-name">备班人员:</span>
              <div class="modal-label-content select-people">
                <div class="add-main add" @click="addMainShift(2)">
                  <span class="iconfont icon-jiahao"></span>
                </div>

                <div
                  class="add-main"
                  v-for="(item, index) in state.selectStandbyPerson"
                  :key="index"
                >
                  {{ item }}
                </div>
              </div>
            </div>
            <div class="modal-content">
              以上人员轮流排班，每班
              <el-input
                class="add-every"
                v-model="state.addData.standbyEvery"
              ></el-input
              >人
            </div>
          </div>
          <div class="modal-wrapper">
            <div class="modal-right top">班次：一天一班</div>
            <div class="modal-right">
              值班日：
              <el-radio-group
                v-model="state.watchTimeType"
                @change="changeTimeType"
              >
                <el-radio label="1" size="large">手动选择</el-radio>
                <el-radio label="2" size="large">工作日</el-radio>
                <el-radio label="3" size="large">双休日</el-radio>
              </el-radio-group>
            </div>
            <div class="modal-right" v-if="state.isManual">
              <el-checkbox-group
                v-model="state.addData.watchTime"
                @change="changeWatchTime"
                class="select-name"
              >
                <el-checkbox
                  v-for="item in state.watchTimeList"
                  :key="item.label"
                  :checked="item.checked"
                  :label="item.label"
                  >{{ item.label }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </template>
    </PIEModal>
    <!-- 选择人员 穿梭框-->
    <PIEModal
      :title="'选择值班人员'"
      v-model:visible="state.isAdd"
      width="35"
      height="40"
      @confirm="confirmSelect()"
      class="select-modal"
    >
      <template #operateItem>
        <div class="select-box">
          <el-transfer
            v-model="state.addData.mainShift"
            :titles="['所有人员', '值班人员']"
            @change="changeSelect"
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请选择人员"
            :data="state.watchPersonList"
          />
        </div>
      </template>
    </PIEModal>
    <!-- 预览表格 -->
    <PIEModal
      :title="'预览'"
      v-model:visible="state.isBrowse"
      width="35"
      height="60"
      :showBtn="false"
      @confirm="confirmBrowse()"
      class="browse-modal"
    >
      <template #operateItem>
        <div class="browse-table">
          <PIETable
            :maxHeight="510"
            :columns="state.browsecolumns"
            :data="state.browseData"
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
    <!-- 单击某一天替班换班 -->
    <PIEModal
      :title="state.oneDayTitle"
      v-model:visible="state.showOneDay"
      :elseBtn="true"
      :elseText="'日报详情'"
      width="24"
      height="30"
      @confirm="addEveryDay()"
      @cancel="cancelChangeShift"
      @elseConfirm="browseModel()"
      class="modify-modal"
    >
      <template #operateItem>
        <div class="one-day-show">
          <div class="date-item">
            <span>日期:</span>
            <el-radio-group v-model="state.radioValue" @change="radioChange">
              <el-radio :label="1" class="radio-style">换班</el-radio>
              <el-radio :label="2">替班</el-radio>
            </el-radio-group>
          </div>
          <div class="date-item" v-if="state.radioValue == 1">
            <span>日期:</span>
            <el-date-picker
              v-model="oneDateValue"
              type="date"
              :size="size"
              @change="oneDateChange"
            />
          </div>
          <div class="date-item" v-if="state.radioValue == 1">
            <span>被换班人员:</span>
            <el-select
              :popper-append-to-body="false"
              v-model="state.changePeopleValue"
              placeholder="请选择被换班人员"
              class="modal-select"
              value-key="value"
              @change="changePeople"
            >
              <el-option
                v-for="(item, index) in state.changePeopleArr"
                :key="index"
                :label="item.name"
                :value="item"
                class="select-item"
              ></el-option>
            </el-select>
          </div>
          <div class="date-item" v-if="state.radioValue == 1">
            <span>换班人员:</span>
            <el-select
              :popper-append-to-body="false"
              v-model="state.changePeopleValue1"
              placeholder="请选择换班人员"
              class="modal-select"
            >
              <el-option
                v-for="item in state.changePeopleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                class="select-item"
              ></el-option>
            </el-select>
          </div>
          <div class="replace-item" v-if="state.radioValue == 2">
            <div class="date-item">
              <span>被替班人员:</span>
              <el-select
                :popper-append-to-body="false"
                v-model="state.beReplaceValue"
                placeholder="请选择替班人员"
                class="modal-select"
                value-key="value"
                @change="replacePeople"
              >
                <el-option
                  v-for="(item, index) in state.beReplaceArr"
                  :key="index"
                  :label="item.name"
                  :value="item"
                  class="select-item"
                ></el-option>
              </el-select>
            </div>
            <div class="date-item">
              <span>替班人员:</span>
              <el-select
                :popper-append-to-body="false"
                v-model="state.replaceValue"
                placeholder="请选择替班人员"
                class="modal-select"
              >
                <el-option
                  v-for="item in state.replaceArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  class="select-item"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./watchList";
const {
  state,
  judgmentStatus,
  triangleBtn,
  sizeChangeTable,
  pageChangeTable,
  searchList,
  addEveryDay,
  addConfirm,
  netWorkStation,
  selectNetWork,
  querystations,
  exportRoster,
  previewRoster,
  replaceRoste,
  replaceRoster,
  cancelChangeShift,
  handleDelete,
  handleEdit,
  tableConfirmModal,
  tableCancelModal,
  tableChangeRadio,
  tableDateChange,
  getRosterTable,
  getRoster,
  generateRoster,
  dateFormat,
  confirmBrowse,
  browseModel,
  browse,
  changeWatchTime,
  changeTimeType,
  confirmSelect,
  changeSelect,
  addMainShift,
  toEdit,
  detailsConfirm,
  replacePeople,
  changePeople,
  toDetails,
  exportList,
  onSelectionChange,
  queryPeople,
  rostering,
  onChangeM,
  httpRequestUpload,
  upload,
  changeTable,
  changeCalendar,
  radioChange,
  dynamicBtn,
  previewDateChange,
  dateChange,
  oneDateChange,
  oneDateValue,
  getRow,
  objectSpanMethod,
} = useHandler();
</script>

<style lang="less" scoped>
.watch-admin {
  .editBtn-table {
    margin-right: 15px;
    color: #00aeff;
    cursor: pointer;
  }
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: @global-padding;
  box-sizing: border-box;
  .header-left-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: @global-small-padding;
    .changeShow {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-left: @global-small-padding;
      .change-calendar {
        background-color: rgb(195, 193, 193);
        width: 32px;
        height: 32px;
        background: url("../../../../../src/assets/image/changeCalender.png");
        background-size: 100% 100%;
      }
      .change-table {
        background-color: rgb(195, 193, 193);
        width: 26px;
        height: 26px;
        background: url("../../../../../src/assets/image/changeTable.png");
        background-size: 100% 100%;
        margin-left: @global-small-padding;
      }
    }
    .network {
      width: 50%;
      height: 100%;
      display: flex;
      .left-content-item {
        display: flex;
        align-items: center;
        margin-bottom: @global-small-padding;
        // width: 30%;
        // padding-right: @title-padding;
        margin-right: @input-margin;
        box-sizing: border-box;
        :deep(.el-input.is-disabled .el-input__wrapper) {
          background-color: transparent;
          -webkit-box-shadow: none;
        }

        // justify-content: flex-end;
        .left-name {
          display: inline-block;
          // width: 1@global-small-padding;
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
        :deep(.el-date-editor) {
          width: @input-width;
          height: @input-height;
        }
      }
    }
    .station {
      width: 50%;
      height: 100%;
      display: flex;
      .left-content-item {
        display: flex;
        align-items: center;
        margin-bottom: @global-small-padding;
        width: 100%;
        // justify-content: flex-end;
        .left-name {
          display: inline-block;
          // width: 1@global-small-padding;
          font-size: @main-font-size;
          color: @main-font-color;
          padding-right: @title-padding;
          box-sizing: border-box;
        }
        ::v-deep .el-input {
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
    }
    .left-content-items {
      // width: 60%;
      display: flex;
      justify-content: flex-end;
      margin-bottom: @global-small-padding;
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
.watch-right {
  width: 100%;
  .header-right-top {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .left-content-item {
      display: flex;
      align-items: center;
      margin-bottom: @global-small-padding;
      width: 24%;
      justify-content: flex-end;
      .left-name {
        display: inline-block;
        // width: 1@global-small-padding;
        font-size: @main-font-size;
        color: @main-font-color;
        padding-right: @title-padding;
      }
      ::v-deep .el-input {
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
      width: 24%;
      display: flex;
      flex-direction: row-reverse;
      margin-bottom: @global-small-padding;
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
  //表格
  .pie-tb-iscontent {
    height: 60%;
    display: flex;
    justify-content: space-around;
  }
  .table-show {
    .header-left-content {
      display: flex;
      justify-content: space-around;

      span {
        color: #1ab3e0;
        width: 8%;
        padding-left: @global-small-padding;
        box-sizing: border-box;
      }
      .legend {
        width: 65%;
        // margin-left: 50px;
        color: #1ab3e0;
        .main {
          color: #9c1d0f;
          font-size: 16px;
        }
        .standby {
          color: #5f8fb2;
        }
      }
      .modal-content {
        width: 22%;
        span {
          padding-right: @global-small-padding;
          box-sizing: border-box;
        }
      }
    }
  }
  :deep(.el-table .cell) {
    white-space: pre-line;
  }
}
//查看详情弹框
.details-box {
  :deep(.else-btn.confirm-btn) {
    border: 1px solid #00aadd;
    color: #fff;
    background-color: transparent;
  }
}
//查看详情框
.modal-details {
  display: flex;
  flex-direction: column;
  .single-detail {
    display: flex;
    width: 100%;
    margin-bottom: 15px;
    .single-label {
      // display: inline-block;
      width: 30%;
      color: @main-font-color;
      font-size: @main-font-size;
      margin-right: @global-small-padding;
    }
    .single-content {
      width: @input-width;
      color: @main-font-color;
      // font-size: 14px;
      font-size: @main-font-size;
      :deep(.el-textarea__inner) {
        background-color: transparent;
      }
    }
  }
}
//新建 编辑 弹框
.modify-modal {
  :deep(.operate-item) {
    display: flex;
    flex-direction: column;
  }
  .modal-top {
    display: flex;
    // justify-content: space-between;
    .title {
      width: 50%;
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 19px;
      background-color: #024765;
      padding-left: 15px;
      margin-bottom: 30px;
    }
  }
  .one-day-show {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    .date-item {
      width: 100%;
      height: 30%;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      padding-bottom: @global-small-padding;
      box-sizing: border-box;
      span {
        color: #00aadd;
        padding-right: 14px;
        box-sizing: border-box;
        width: 30%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .radio-style {
        padding-right: @global-small-padding;
        box-sizing: border-box;
      }
      :deep(.el-input__wrapper) {
        width: @input-width;
      }
      :deep(.el-date-editor) {
        width: @input-width;
      }
      .radio {
        .radio-border {
        }
      }
    }
  }
  .modal-bottom {
    display: flex;
    .modal-wrapper {
      margin-right: 50px;
      width: 450px;
    }
  }
}

.modal-wrapper {
  .modal-content {
    display: flex;
    justify-content: flex-start;
    margin-left: @global-padding;
    // justify-content: center;
    align-items: center;
    font-size: @main-font-size;
    margin-bottom: @global-padding;
    .modal-label-name {
      display: inline-block;
      width: 100px;
      color: @main-font-color;
      // font-size: @main-font-size;
    }
    .modal-label-content {
      width: @input-width;
      display: flex;
      flex-wrap: wrap;
      .add-main {
        width: 50px;
        height: 50px;
        font-size: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #1ab3e0;
        border-radius: 50%;
        margin-right: @global-small-padding;
        margin-bottom: @global-small-padding;
      }
      .add:hover {
        background-color: #233968;
      }
    }
    .select-people {
      overflow-y: scroll;
      max-height: 100px;
    }
    .select-people::-webkit-scrollbar {
      width: 0;
      display: none; //隐藏滚动条
    }
    :deep(.add-every.el-input) {
      width: 30px;
      height: 30px;
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
  }
  .modal-right {
    display: flex;
    margin-bottom: @global-padding;
    align-items: center;
    font-size: @main-font-size;
    :deep(.el-radio__label) {
      color: @main-font-color;
      margin-right: @global-small-padding;
    }
    // :deep(.el-checkbox) {
    //   margin-right: @global-small-padding;
    // }
    :deep(.el-input__inner),
    :deep(.el-checkbox__inner) {
      background: transparent;
      color: @main-font-color;
    }
    :deep(.el-checkbox__label) {
      color: @main-font-color;
      margin-right: @global-small-padding;
    }
  }
  .modal-right.top {
    margin-bottom: 100px;
  }
}
//复选框
.select-modal {
  .select-box {
    width: 100%;
    height: 100%;
    border: 0;
    background-color: transparent;
    :deep(.el-transfer-panel),
    :deep(.el-transfer-panel .el-transfer-panel__header) {
      background: transparent;
      color: @main-font-color;
    }
    :deep(.el-input__inner),
    :deep(.el-checkbox__inner) {
      background: transparent;
      color: @main-font-color;
    }
    :deep(.el-checkbox__label) {
      color: @main-font-color;
    }
  }

  .select-name {
    display: flex;
    flex-direction: column;
    //  color: @main-font-color;
    :deep(.el-checkbox) {
      color: @main-font-color;
    }
    :deep(.el-checkbox__inner) {
      background-color: transparent;
      border: 1px solid #1ab3e0;
    }
    :deep(.el-checkbox.is-checked .el-checkbox__inner) {
      background-color: #233968;
      border: 1px solid #1ab3e0;
    }
  }
}
:deep(.el-drawer) {
  background-color: rgba(9, 22, 97, 0.3);
}
.triangle-btn {
  .close {
    position: fixed;
    top: 44vh;
    right: 2vw;
  }
  .open {
    position: fixed;
    top: 44vh;
    right: 31vw;
  }
  .drawer-content {
    padding: 15px;
    display: flex;
    flex-direction: column;
    .drawer-input {
      height: 15%;
      width: 100%;
      margin-bottom: 35px;
    }
    .drawer-data {
      height: 15%;
      width: 100%;
      color: white;
      font-size: 22px;
      font-weight: 700px;
      margin-bottom: 15px;
    }
    .drawer-main {
      height: 15%;
      width: 100%;
      color: white;
      font-size: 18px;
      font-weight: 500px;
      margin-bottom: 15px;
      padding-left: @global-padding;
      box-sizing: border-box;
    }
    .drawer-standby {
      height: 15%;
      width: 100%;
      color: white;
      font-size: 18px;
      font-weight: 500px;
      margin-bottom: 35px;
      padding-left: @global-padding;
      box-sizing: border-box;
    }
    .drawer-duty-title {
      height: 15%;
      width: 100%;
      color: white;
      font-size: 18px;
      font-weight: 500px;
      margin-bottom: 15px;
    }
    .drawer-duty {
      height: 15%;
      width: 100%;
      color: white;
      font-size: 18px;
      font-weight: 500px;
      border: 1px solid #00aadd;
      overflow-y: scroll;
      height: 160px;
      margin-bottom: 15px;
    }
    // color:red;
  }
}
</style>
