<template>
  <!-- 报表分析 -->
  <div class="report-analyse-main">
    <div class="header-left-content">
      <div class="seatch-item">
        <div class="left-content-item" v-if="state.userType == 1">
          <span class="left-name">台网</span>
          <el-select
            :popper-append-to-body="false"
            clearable
            filterable
            disabled
            v-model="netStation"
            placeholder="请选择台站"
            @change="netStationChange"
          >
            <el-option
              v-for="item in state.netStationList"
              :key="item.unitId"
              :label="item.unitName"
              :value="item.unitId"
            ></el-option>
          </el-select>
        </div>
        <div class="left-content-item" v-if="state.userType == 1">
          <span class="left-name">台站</span>
          <el-select
            :popper-append-to-body="false"
            clearable
            filterable
            v-model="selectStation"
            placeholder="请选择台站"
          >
            <el-option
              v-for="item in state.unitIdList"
              :key="item.stationId"
              :label="item.name"
              :value="item.stationId"
            ></el-option>
          </el-select>
        </div>
        <div class="left-content-item" v-if="state.userType == 2">
          <span class="left-name">台站</span>
          <el-select
            :popper-append-to-body="false"
            clearable
            filterable
            v-model="selectStation"
            placeholder="请选择台站"
          >
            <el-option
              v-for="item in state.unitIdList"
              :key="item.unitId"
              :label="item.unitName"
              :value="item.unitId"
            ></el-option>
          </el-select>
        </div>
        <div class="left-content-item">
          <span class="left-name">时间</span>
          <el-date-picker
            v-model="timeValue"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </div>
      </div>
      <div class="btn">
        <button @click="searchFun">查询</button>
        <!-- <div class="data-style">
          <button @click="historyData">历史数据</button>
          <button @click="todayData">今日数据</button>
        </div> -->
        <!-- <button @click="backStatistics">返回</button> -->
      </div>
    </div>
    <!-- 历史数据 -->
    <div v-show="activeCon" class="history-style">
      <div class="content">
        <div class="bar">
          <!-- 异常状态 -->
          <div class="work-time" ref="warnGrade"></div>
          <!-- 预警状态 -->
          <div class="work-time" ref="warnInfo"></div>
        </div>
        <!--异常-类型 -->
        <div class="work-time" ref="workTime"></div>
        <!--预警-类型 -->
        <div class="work-time" ref="warnType"></div>
        <!--预警-级别  -->
        <div class="work-time" ref="warnLevel"></div>

        <!-- <div class="work-time" ref="gradeStatus"></div>
        <div class="work-time" ref="workRoom"></div>
        <div class="work-time" ref="eventType"></div> -->
      </div>
    </div>
    <!-- 今日数据 -->
    <!-- <div v-show="activeCon == false" class="today-style">
      <div class="content">
        <div class="work-time" ref="workTime1"></div>
        <div class="work-room" ref="workRoom1"></div>
        <div class="event-type" ref="eventType1"></div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./reportAnalyse";
const {
  state,
  ininEcharts,
  exceptionType,
  netStationApi,
  netStationChange,
  unitIdListFun,
  searchFun,
  gradeStatus1,
  warnGrade1,
  warnInfo1,
  fileSituation1,
  eventType1,
  workRoom1,
  workTime1,
  gradeStatus,
  eventType,
  workRoom,
  warnLevel,
  warnType,
  workTime,
  warnInfo,
  warnGrade,
  activeCon,
  selectStation,
  netStation,
  timeValue,
} = useHandler();
</script>

<style lang="less" scoped>
.report-analyse-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: @global-padding;
  .header-left-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    .btn {
      display: flex;
      justify-content: flex-end;
      box-sizing: border-box;
      .data-style {
        box-sizing: border-box;
        background: transparent;
        margin-left: 10px;
        color: @main-font-color;
        border: 1px solid @global-header-bbg;
        cursor: pointer;
        border-radius: 5px;
        button {
          margin: 0;
          border: none;
        }
        button:hover {
          background-color: rgba(24, 51, 126, 0.7);
        }
      }
    }
    .seatch-item {
      display: flex;
      justify-content: flex-end;
      // width: 24%;
      box-sizing: border-box;
      .left-content-item {
        display: flex;
        align-items: center;
        margin-right: @input-margin;
        // width: 24%;
        justify-content: flex-end;
        .left-name {
          display: inline-block;
          // width: 90px;
          font-size: @main-font-size;
          color: @main-font-color;
          padding-right: @title-padding;
        }
        :deep(.el-input) {
          width: @input-width;
          background: transparent;
          border-radius: 5px;
          border: 1px solid @global-border-color;
          height: 40px;
          color: @main-font-color;
        }
        :deep(.el-input__wrapper) {
          width: @input-width;
        }
        :deep(.el-date-editor) {
          width: @input-width;
          height: 40px;
        }
      }
      .left-content-items {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        width: 100%;
        justify-content: flex-end;
      }
    }
  }
  .history-style,
  .today-style {
    width: 100%;
    height: calc(100% - 61px);
    .content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      .bar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
      }
      .work-time {
        width: 500px;
        // height: 220px; //33%
        height: 250px;
      }
    }
  }
  button {
    padding: 10px 20px;
    box-sizing: border-box;
    background: transparent;
    margin-left: 10px;
    color: @main-font-color;
    border: 1px solid @global-header-bbg;
    cursor: pointer;
    border-radius: 5px;
  }
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background: transparent !important;
    box-shadow: none;
    border: 1px solid #00aadd;
  }
}
</style>
