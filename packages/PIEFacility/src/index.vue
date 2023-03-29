<template>
  <div>
    <PIEPanel
      class="panel-instruments"
      v-model:visible="showInstrument"
      :title="title"
      :width="width"
      :height="height"
      :cancelBtn="false"
      @cancel="calcelInstrument"
      :confirmBtn="false"
      :moveLeft="moveLeft"
      :moveTop="moveTop"
      :isDrage="false"
      :zIndex="10"
    >
      <!-- v-if="showInstrument" -->
      <template v-slot:operateItem>
        <!-- 设备波段 -->
        <div class="band-box">
          <div class="band-box-input">
            <div>
              <span>请选择设备</span>
              <!--v-model="facilityInfo.linkageData"-->
              <el-select
                v-model="waves.equipmentVal"
                clearable
                placeholder="请选择设备类型"
                @change="equipmentChange"
                value-key="value"
              >
                <el-option
                  v-for="(item, index) in equipmentArr"
                  :key="index"
                  :label="item.label"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
            <div class="confirms">
              <el-button class="btn" @click="historyWeave()"
                >历史波形</el-button
              >
            </div>
          </div>
          <div class="band-box-item">
            <div
              class="band-item"
              v-for="(item, index) in waveOptionList"
              :key="index"
            >
              <span> {{ item.series[0].name }}</span>
              <!-- <span>{{ equipmentVal.label }}-通道{{ index + 1 }}</span> -->

              <div class="title-name">
                <!-- <span v-if="Math.random() > 0.5">地震波</span>
              <span v-else>电磁波</span> -->
                <span></span>
                <el-button @click="bandConfirm(index)" class="confirm"
                  >事件</el-button
                >
              </div>
              <div class="echarts-box">
                <PIEEchartBox
                  :options="item"
                  :key="`${index}`"
                  @echartDrag="echartDragOne"
                ></PIEEchartBox>
                <!-- @echartDrag="echartDragOne" -->
                <!-- v-if="showEchartsValue" -->
              </div>
            </div>
            <!-- <div class="band-item">
            <span>{{ equipmentVal.label }}-通道2</span>
            <div class="title-name">
              <span v-if="Math.random() > 0.5">地震波</span>
              <span v-else>电磁波</span>
              <el-button @click="bandConfirm(2)" class="confirm"
                >事件</el-button
              >
            </div>
            <div class="echarts-box">
              <PIEEchartBox
                :options="options2"
                :key="new Date().getTime()"
                @echartDrag="echartDragTwo"
              ></PIEEchartBox>
            </div>
          </div> -->
          </div>
        </div>
      </template>
    </PIEPanel>
    <!--历史波形弹框-->
    <PIEPanel
      class="panel-history"
      v-model:visible="showHistoryWeave"
      title="历史波形"
      :width="90"
      :height="70"
      :cancelBtn="false"
      :confirmBtn="false"
      :moveLeft="moveLeft"
      :moveTop="moveTop"
      @cancel="historyCancel"
    >
      <template v-slot:operateItem>
        <div class="band-box-item">
          <div class="band-box-input">
            <span>选择时间</span>
            <el-date-picker
              v-model="historyTime"
              type="datetimerange"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              @change="historyTimeFun"
            />
          </div>
          <div
            class="band-item"
            v-for="(item, index) in waveHistory"
            :key="index"
          >
            <span> {{ item.series[0].name }}</span>
            <PIEProView
              class="history-box"
              :options="item"
              :key="`${index}`"
            ></PIEProView>
          </div>
        </div>
      </template>
    </PIEPanel>
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from "vue";
import { useHandler } from "./hooks";
const emit = defineEmits<{
  (event: "calcelInstrument", isShowFlage: boolean): void;
  (event: "equipmentChange", item: any): void;
  (event: "bandConfirm", row: any, xRange: any, waveData: any): void;
  (event: "echartDragOne", e: any): void;
  (event: "historyTimeFun", e: any): void;
  (event: "historyCancel", e: any): void;
  (event: "historyWeave", e: any): void;
  // (event: "echartDragTwo", e: MouseEvent): void;
}>();
const props = withDefaults(
  defineProps<{
    showInstrument: boolean;
    title: string;
    equipmentArr: any;
    showEchartsValue: boolean;
    width: number;
    height: number;
    moveLeft?: string;
    moveTop?: string;
    isShowFlage: any;
    facilityId: any;
    showHistoryWeave: boolean;
  }>(),
  {
    showInstrument: false, //是否显示设备弹框
    isShowFlage: null, //是否显示搜索弹框里的设备弹框
    title: "设备", //弹框标题
    equipmentArr: [], //设备列表
    width: 30, //弹框宽高
    height: 70,
    moveLeft: "35%",
    moveTop: "15%",
    showEchartsValue: false, //图表1是否显示
    facilityId: "", // 设备编号
    showHistoryWeave: false, //是否显示历史波形弹框
  }
);
let {
  showInstrument,
  title,
  equipmentArr,
  showEchartsValue,
  width,
  height,
  moveLeft,
  moveTop,
} = toRefs(props);
const {
  calcelInstrument,
  equipmentChange,
  bandConfirm,
  echartDragOne,
  echartDragTwo,
  waveOptionList,
  waves,
  showHistoryWeave,
  historyWeave,
  waveHistory,
  historyTime,
  historyTimeFun,
  historyCancel,
} = useHandler(props, emit);
</script>
<style scoped lang="less">
// 历史弹框
.panel-history {
  z-index: 10;
  .band-box-input {
    padding-bottom: 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    span {
      color: #98dcff;
      margin-right: 20px;
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
      flex-grow: 0;
      height: 40px;
    }
    :deep(.el-date-editor .el-range-input) {
      &::placeholder {
        color: @special-font-color;
      }
    }
  }
  .band-box-item {
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    .band-item {
      width: 99%;
      height: 350px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #fff;
      margin-bottom: 10px;
      span {
        color: #98dcff;
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        padding-right: 20px;
        box-sizing: border-box;
        font-size: 18px;
        margin-top: 5px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
        text-overfolw: ellipsis;
        white-space: nowrap;
      }
      .history-box {
        width: 1674px;
        height: 250px;
      }
    }
  }
}
// 设备波段弹框
.panel-instruments {
  .band-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // flex-wrap: wrap;
    margin-top: 14px;

    .band-box-input {
      // height:40px;
      padding-bottom: 12px;
      display: flex;
      justify-content: space-between;

      span {
        color: #98dcff;
        margin-right: 20px;
      }
      .confirms {
        padding-right: 10px;
      }
      .btn {
        width: 80px;
        border-radius: 4px;
        height: 2rem;
        margin-right: 10px;
        color: #98dcff !important;
      }
    }

    .band-box-item {
      height: 600px;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      .band-item {
        width: 99%;
        height: 350px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: #fff;
        // margin-left: 2%;
        margin-bottom: 10px;

        span {
          color: #98dcff;
          height: 30px;
          line-height: 30px;
          padding-left: 20px;
          padding-right: 20px;
          box-sizing: border-box;
          font-size: 18px;
          margin-top: 5px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          overflow: hidden;
          text-overfolw: ellipsis;
          white-space: nowrap;
        }

        .title-name {
          height: 30px;
          line-height: 30px;
          // padding-left: 20px;
          font-size: 18px;
          // margin-top: 5px;
          display: flex;
          justify-content: space-between;

          span {
            color: #98dcff;
          }

          :deep(.el-button > span) {
            color: #98dcff;
          }
        }
      }
    }

    :deep(.title) {
      display: none;
    }

    :deep(.echarts-assembly) {
      margin-top: 20px;
    }
  }
}
:deep(.el-input__wrapper) {
  width: 20rem !important;
}
:deep(.el-popper .is-pure) {
  width: 20rem !important;
}
:deep(.el-button) {
  background-color: transparent;
  border: 1px solid #00aadd;
}
:deep(.el-button > span) {
  color: #98dcff;
}
:deep(.confirm) {
  width: 4rem;
  border-radius: 4px;
  height: 2rem;
  margin-right: 10px;
}
</style>
