<template>
  <div class="total-wrap">
    <!-- 台网/站/测点/设备统计 -->
    <div class="num-total">
      <div class="item-wrap">
        <div class="item-pic">
          台网总数:
          <span class="title-total">{{
            state.stationNumAll.stationNetworkTotal
          }}</span>
        </div>
        <div class="item-num">
          <!-- <span>总数:{{ state.stationNumAll.stationNetworkTotal }}</span> -->
          <span class="stationtnormal">正常:12</span>
          <span class="stationtabnormal">异常:13</span>
        </div>
      </div>
      <div class="item-wrap">
        <div class="item-pic">
          台站总数:<span class="title-total">{{
            state.stationNumAll.stationtotal
          }}</span>
        </div>
        <div class="item-num">
          <span class="stationtnormal"
            >正常:{{ state.stationNumAll.stationtnormal }}</span
          >
          <span class="stationtabnormal"
            >异常:{{ state.stationNumAll.stationtabnormal }}</span
          >
        </div>
      </div>
      <div class="item-wrap">
        <div class="item-pic">
          测点总数:<span class="title-total">{{
            state.stationNumAll.pointtotal
          }}</span>
        </div>
        <div class="item-num">
          <span class="stationtnormal"
            >正常:{{ state.stationNumAll.pointnormal }}</span
          >
          <span class="stationtabnormal"
            >异常:{{ state.stationNumAll.pointabnormal }}</span
          >
        </div>
      </div>
      <div class="item-wrap">
        <div class="item-pic">
          设备总数:<span class="title-total">{{
            state.stationNumAll.devicetotal
          }}</span>
        </div>
        <div class="item-num">
          <span class="stationtnormal"
            >正常:{{ state.stationNumAll.devicenormal }}</span
          >
          <span class="stationtabnormal"
            >异常:{{ state.stationNumAll.deviceabnormal }}</span
          >
        </div>
      </div>
    </div>
    <span class="iconfont icon-guanbi guanbi" @click="closeFun"></span>
    <!-- 台站级别与数量统计 -->
    <div class="station-total">
      <div class="station-statistics">
        <div class="station-one">
          <span class="title-style">台站数量统计(台网下的台站)</span>
          <div class="station-num" ref="stationNum"></div>
        </div>
        <div class="station-one">
          <span class="title-style">台站数量统计(台阵下的台站)</span>
          <div class="station-pic" ref="stationPic"></div>
        </div>
        <div class="station-one">
          <span class="title-style">台站级别统计</span>
          <div class="station-type" ref="stationType"></div>
        </div>
      </div>
    </div>
    <!-- 设备统计 -->
    <div class="facility-total">
      <div class="facility-statistics">
        <div class="station-one">
          <span class="title-style">设备学科统计</span>
          <div class="facility-num" ref="facilityNum"></div>
        </div>
        <div class="station-one">
          <span class="title-style">设备使用率</span>
          <div class="facility-type" ref="facilityType"></div>
        </div>
        <div class="station-one">
          <span class="title-style">设备状态统计</span>
          <div class="facility-pic" ref="facilityPic"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./allStatistics";
import {
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  nextTick,
  ref,
  defineEmits,
} from "vue";
const emit = defineEmits<{
  (event: "closeFun", e: MouseEvent): void;
}>();
const closeFun = () => {
  emit("closeFun");
};
const {
  state,
  stationNum,
  stationType,
  stationPic,
  facilityNum,
  facilityType,
  facilityPic,
} = useHandler();
</script>

<style lang="less" scoped>
.total-wrap {
  width: 100%;
  height: 100%;
  padding: 20px 50px;
  box-sizing: border-box;
  .guanbi {
    position: absolute;
    right: 12px;
    color: #fff;
    top: 20px;
    padding: 5px;
    border: 1px solid #fff;
    border-radius: 50%;
  }
  .num-total {
    width: 100%;
    height: 18%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item-wrap {
      width: 300px;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid @main-font-color;
      .item-pic {
        width: 100%;
        height: 60%;
        // background: green;
        color: @main-font-color;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .title-total {
          color: #4db8f0;
        }
      }
      .item-num {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
        height: 40%;
        span {
          // margin-right: 20px;
          color: @main-font-color;
          font-size: 17px;
        }
        .stationtnormal {
          color: #1db71d;
        }
        .stationtabnormal {
          color: red;
        }
      }
    }
  }
  .station-total {
    width: 100%;
    height: 39.5%;
    border: 1px solid @main-font-color;
    margin: 20px 0;
    padding: 5px;
    box-sizing: border-box;
    .station-statistics {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      .station-one {
        width: 33%;
        height: 100%;
        .station-num,
        .station-type,
        .station-pic {
          width: 600px;
          height: 295px;
          // width: 33%;
          // height: 100%;
        }
        .title-style {
          width: 100%;
          height: 25px;
          line-height: 25px;
          color: @main-font-color;
          font-size: @main-font-size;
          display: flex;
          justify-content: space-around;
        }
      }
    }
  }
  .facility-total {
    padding: 5px;
    width: 100%;
    height: 39.5%;
    border: 1px solid @main-font-color;

    .facility-statistics {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      .facility-num,
      .facility-type,
      .facility-pic {
        width: 600px;
        height: 295px;
        // width: 33%;
        // height: 100%;
      }
      .title-style {
        width: 100%;
        height: 25px;
        line-height: 25px;
        color: @main-font-color;
        font-size: @main-font-size;
        display: flex;
        justify-content: space-around;
      }
    }
  }
}
</style>
