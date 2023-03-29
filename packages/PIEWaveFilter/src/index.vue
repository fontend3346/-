<template>
  <div class="pie-wave">
    <div class="pie-header-show" v-show="props.headerShow">
      <div
        v-for="(item, index) in state.headerList"
        :key="index"
        class="header-item"
        @click="headerClick(item)"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="pie-content-show">
      <!-- <div class="select-item">
      <span class="title">时间：</span>
      <el-date-picker
        v-model="state.dateRange"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        size="small"
        @change="timeChange"
        format="YYYY-MM-DD hh:mm:ss"
      />
    </div> -->
      <div class="select-left">
        <div class="select-item">
          <span class="titles">通道：</span>
          <el-select
            v-model="props.passageway"
            size="small"
            @change="passageChange"
          >
            <el-option
              v-for="item in props.passageOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="select-item">
          <div class="check-box">
            <el-checkbox-group
              size="large"
              v-model="state.checkPointer"
              @change="checkChange"
            >
              <el-checkbox label="N" />
              <el-checkbox label="E" />
              <el-checkbox label="Z" />
            </el-checkbox-group>
          </div>
        </div>
        <div class="select-item">
          <span class="titles">时间：</span>
          <el-select v-model="state.times" size="small">
            <el-option
              v-for="item in props.dateTimes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <!-- <div class="select-item">
      <span class="title">波向：</span>
      <el-select
        v-model="props.direction"
        size="small"
        @change="directionChange"
      >
        <el-option
          v-for="item in props.directiOnptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div> -->
        <!-- <div class="select-item">
      <span class="title">震幅：</span>
      <el-input-number
        v-model="props.wave"
        :min="1"
        :max="10"
        @change="handleChangeWave"
      />
    </div> -->
        <div class="select-item">
          <span class="titles">事件标号：</span>
          <span class="titles">GD.201610311626.0005C.001</span>
        </div>
        <div class="select-item">
          <span class="titles">标注：</span>
          <el-select
            clearable
            v-model="state.typePlot"
            size="small"
            @change="typePlotChange"
          >
            <el-option
              v-for="item in state.typePlotOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="select-item">
          <span class="titles">振幅调节：</span>
          <div class="echarts-setItem">
            <div class="echarts-btn" title="缩小">
              <span class="iconfont icon-shangjiantou"></span>
            </div>
            <div class="echarts-btn" title="归一化处理">
              <span class="normal-btn">O</span>
            </div>
            <div class="echarts-btn" title="扩大">
              <span class="iconfont icon-xiajiantou"></span>
            </div>
          </div>
        </div>
        <!-- <div class="select-item">
      <span class="title">标注：</span>
      <el-checkbox
        v-model="state.radioSelect"
        label="震相"
        border
        @change="checkboxChange"
      />
    </div> -->
      </div>
      <div class="select-item select-btn" v-show="props.headerShow">
        <div class="select-item">
          <div
            class="button-item wavep"
            @click="wavePClick('P')"
            :class="{ active: state.waveP }"
          >
            <span>P</span>
          </div>
        </div>
        <div class="select-item">
          <div
            class="button-item waves"
            @click="wavePClick('S')"
            :class="{ active: state.waveS }"
          >
            <span>S</span>
          </div>
        </div>
        <div class="select-item">
          <div class="button-item" title="撤销">
            <span class="iconfont icon-shuaxin"></span>
          </div>
        </div>
        <div class="select-item">
          <div class="button-item" title="保存">
            <span class="iconfont icon-baocun"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useHandler } from "./hooks";

const props = withDefaults(
  defineProps<{
    time: string;
    passageway: any;
    wave: any;
    dateRange: any;
    passageOptions: any; // 通道选项
    direction: any; // 波向绑定值
    directiOnptions: any; // 波向选项
    waveP: boolean; // P波
    waveS: boolean; // S波
    dateTimes: any;
    headerShow: boolean;
  }>(),
  {
    time: "1",
    passageway: "6",
    wave: 1,
    dateRange: [],
    passageOptions: [
      {
        value: "6",
        label: "6",
      },
      {
        value: "12",
        label: "12",
      },
      {
        value: "15",
        label: "15",
      },
      {
        value: "18",
        label: "18",
      },
      {
        value: "21",
        label: "21",
      },
      {
        value: "30",
        label: "30",
      },
      {
        value: "45",
        label: "45",
      },
      {
        value: "ALL",
        label: "ALL",
      },
    ],
    direction: [],
    directiOnptions: [
      {
        value: "P",
        label: "P",
      },
      {
        value: "S",
        label: "S",
      },
      {
        value: "Pn",
        label: "Pn",
      },
      {
        value: "Sn",
        label: "Sn",
      },
      {
        value: "Pg",
        label: "Pg",
      },
      {
        value: "Sg",
        label: "Sg",
      },
      {
        value: "SM",
        label: "SM",
      },
      {
        value: "L",
        label: "L",
      },
    ],
    waveP: false,
    waveS: false,
    dateTimes: [
      {
        value: "6",
        label: "6",
      },
      {
        value: "12",
        label: "12",
      },
      {
        value: "120",
        label: "120",
      },
      {
        value: "300",
        label: "300",
      },
      {
        value: "600",
        label: "600",
      },
      {
        value: "1200",
        label: "1200",
      },
      {
        value: "2400",
        label: "2400",
      },
      {
        value: "3600",
        label: "3600",
      },
      {
        value: "1d",
        label: "1d",
      },
      {
        value: "2d",
        label: "2d",
      },
    ],
    headerShow: true,
  }
);

const emit = defineEmits<{
  (event: "passageChange", e: MouseEvent): void;
  (event: "handleChangeWave", e: MouseEvent): void;
  (event: "timeChange", e: MouseEvent): void;
  (event: "directionChange", e: MouseEvent): void;
  (event: "typePlotChange", e: MouseEvent): void;
  (event: "headerClick", e: MouseEvent): void;
}>();

const {
  state,
  passageChange,
  handleChangeWave,
  timeChange,
  directionChange,
  checkboxChange,
  wavePClick,
  checkChange,
  typePlotChange,
  headerClick,
} = useHandler(props, emit);
</script>
<style lang="less" scoped>
.pie-wave {
  // height: 40px;
  padding: @global-small-padding 0;
  box-sizing: border-box;
  border-bottom: 1px solid @global-header-bbg;
  display: flex;
  flex-direction: column;
  align-items: center;
  // 头部
  .pie-header-show {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0 @global-small-padding 0px;
    .header-item {
      min-width: 50px;
      height: 28px;
      line-height: 28px;
      margin-left: @global-padding;
      cursor: pointer;
      font-size: @btn-font-size;
      color: @main-font-color;
      border: 1px solid @global-header-bbg;
      border-radius: 4px;
      padding: 0 @global-small-padding;
    }
  }
  .pie-content-show {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .select-left {
    display: flex;
    align-items: center;
  }
  .select-item {
    height: 100%;
    margin-left: @global-margin;
    display: flex;
    align-items: center;
    .titles {
      display: inline-block;
      font-size: @main-font-size;
      color: @main-font-color;
      padding: 5px 0;
      box-sizing: border-box;
    }
    .button-item {
      width: 30px;
      height: 30px;
      border: 1px solid @global-header-bbg;
      border-radius: 4px;
      box-sizing: border-box;
      line-height: 30px;
      text-align: center;
      font-size: @main-font-size;
      font-weight: 700;
      cursor: pointer;
      .iconfont {
        color: @main-font-color;
      }
    }
    .active {
      background: #e5e5e5;
    }
    .wavep {
      color: rgb(29, 73, 221);
    }
    .waves {
      color: rgb(207, 64, 28);
    }
    .check-box {
      :deep(.el-checkbox__label) {
        padding-left: 4px;
        font-size: @btn-font-size;
        // color: @main-font-color;
      }
      :deep(.el-checkbox) {
        margin-right: @global-margin;
        color: @main-font-color;
      }
      :deep(.el-checkbox:last-child) {
        margin-right: 0;
      }
      :deep(.el-checkbox__inner) {
        background: transparent;
        // border: 1px solid @main-font-color;
      }
    }
    .echarts-setItem {
      display: flex;
      margin-right: @global-small-padding;
      .echarts-btn {
        width: 32px;
        height: 32px;
        border: 1px solid @global-header-bbg;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 4px;
        .iconfont {
          color: @main-font-color;
          font-size: 18px;
        }
        cursor: pointer;
        background: transparent;
        .normal-btn {
          color: @main-font-color;
          font-size: @main-font-size;
        }
      }
    }
  }
  .select-btn {
    margin-right: @input-margin;
    .select-item {
      margin-left: @input-margin;
    }
  }
  // :deep(.el-input--suffix .el-input__inner) {
  //   padding: 10px;
  //   width: 70px;
  // }
}
</style>
