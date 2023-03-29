<template>
  <!-- 1 壳幔速度结构成像 -->
  <div class="mapContainer-event">
    <div class="input-query">
      <div class="position-query">
        <!-- <span>参考位置</span> -->
        <el-input
          v-model="positionValue"
          placeholder="请输入参考位置"
          @input="inputChange"
          @focus="focus"
        ></el-input>
      </div>
      <div class="position-query">
        <el-select
          v-model="equipmentVal"
          clearable
          placeholder="请选择地震强度"
          @change="earthquakeChange"
          @focus="focusSelect"
        >
          <el-option
            v-for="(item, index) in state.options"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="position-query">
        <el-date-picker
          v-model="state.valueTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeTime"
          clearable
        >
        </el-date-picker>
      </div>
    </div>
    <div id="mapContainerEvent"></div>
    <div class="seismic-bullet-frame">
      <div class="legend-img">
        <div class="circle">
          <div class="moderate-Strong-Earthquake"></div>
        </div>
        <div class="legend-font">中强震</div>
      </div>
      <div class="legend-img">
        <div class="circle">
          <div class="strong-Earthquake"></div>
        </div>
        <div class="legend-font">强震</div>
      </div>
      <div class="legend-img">
        <div class="circle">
          <div class="great-Earthquake"></div>
        </div>
        <div class="legend-font">大地震</div>
      </div>
      <div class="legend-img">
        <div class="circle">
          <div class="giant-Earthquake"></div>
        </div>
        <div class="legend-font">巨大地震</div>
      </div>
    </div>
    <PIEMarkPoint
      ref="modalRef"
      v-show="markShow"
      :location="location"
      :time="time"
      :depth="depth"
      :magnitude="magnitude"
      :width="offsetXPoint"
      :height="offsetYPoint"
    ></PIEMarkPoint>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./index";
const {
  state,
  positionValue,
  inputChange,
  focus,
  equipmentVal,
  earthquakeChange,
  focusSelect,
  markShow,
  location,
  time,
  depth,
  magnitude,
  offsetXPoint,
  offsetYPoint,
  changeTime,
} = useHandler();
</script>

<style lang="less" scoped>
.mapContainer-event {
  position: relative;
  width: 100%;
  height: 100%;
  .seismic-bullet-frame {
    padding: 10px;
    position: absolute;
    left: 20px;
    bottom: 20px;
    width: 113px;
    height: 100px;
    // border: 1px solid #05c1f5;
    box-sizing: border-box;
    border-radius: 5px;
    background: url(../../../../assets/qietu/legend.png);
    background-size: 100% 100%;
    // background: rgba(14, 35, 90, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .legend-img {
      display: flex;
      justify-content: space-around;
      height: 20%;
      width: 100%;
      .circle {
        height: 100%;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        .moderate-Strong-Earthquake {
          background-color: #e8df28;
          border-radius: 50%;
          width: 50%;
          height: 50%;
        }
        .strong-Earthquake {
          background-color: #e0620d;
          border-radius: 50%;
          width: 50%;
          height: 50%;
        }
        .great-Earthquake {
          background-color: #df1f05;
          border-radius: 50%;
          width: 50%;
          height: 50%;
        }
        .giant-Earthquake {
          background-color: #4e0d04;
          border-radius: 50%;
          width: 50%;
          height: 50%;
        }
      }
      .legend-font {
        height: 100%;
        width: 80%;
        color: white;
      }
    }
  }

  .input-query {
    position: absolute;
    left: 20px;
    top: 20px;
    // width: 400px;
    z-index: 9999;
    display: flex;
    justify-content: space-around;
    .position-query {
      display: flex;
      // width: 400px;
      justify-content: space-around;
      margin-right: 10px;
      span {
        color: #4d96be;
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
#mapContainerEvent {
  width: 100%;
  height: 100%;
  :deep(.local-boxs) {
    .mapboxgl-popup-content {
      padding: 0;
      background-color: transparent;
    }

    .mapboxgl-popup-close-button {
      color: #efe93b !important;
      font-size: 24px;
      right: 24px;
      top: 6px;
    }

    .mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
      background-color: transparent;
      border-right-color: transparent;
    }
  }
}
:deep(.el-input__wrapper) {
  height: 100%;
}
// :deep(.el-range-separator){
//   color: #4d96be;
// }
</style>
