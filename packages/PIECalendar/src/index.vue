<template>
  <div ref="modalRef" class="pie-calendar-modal">
    <el-calendar v-model="dateValue" ref="calendar">
      <template #header="{ date }">
        <span>{{ date }}</span>
        <div class="modal-content">
          <span class="modal-label-name">选择日期:</span>
          <el-date-picker
            v-model="dateValue"
            type="date"
            :size="size"
            @change="dateChange"
          />
        </div>
        <div class="legend">
          <span class="iconfont icon-yuandianxiao main"></span>主班人员
          <span class="iconfont icon-yuandianxiao standby"></span>备班人员
        </div>
        <el-button-group>
          <el-button size="small" @click="selectDate('prev-month')">
            上一月
          </el-button>
          <el-button size="small" @click="selectDate('today')">今天</el-button>
          <el-button size="small" @click="selectDate('next-month')">
            下一月
          </el-button>
        </el-button-group>
      </template>
      <template #dateCell="{ data }">
        <div
          class="cell-inner"
          @dblclick="editCell(data)"
          @click="detailsCell(data)"
        >
          {{ data.day.split("-").slice(2).toString() }}
          <div class="cell-content">
            <div class="watch-name">
              <div class="main-shift">
                <span
                  class="iconfont icon-yuandianxiao"
                  v-if="dateContent(data).mainShift"
                ></span>
                <div class="mainShift">
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    placement="top-start"
                  >
                    <template #content>
                      <span>{{ dateContent(data).mainShift }}</span>
                    </template>
                    {{ dateContent(data).mainShift }}
                  </el-tooltip>
                </div>
              </div>
              <div class="standby-shift">
                <span
                  class="iconfont icon-yuandianxiao"
                  v-if="dateContent(data).standbyShift"
                ></span>
                <div class="mainShift">
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    placement="top-start"
                  >
                    <template #content>
                      <span>{{ dateContent(data).standbyShift }}</span>
                    </template>
                    {{ dateContent(data).standbyShift }}
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="preview">
          <span
            class="iconfont icon-yuandianxiao"
            v-if="dateContent(data).mainShift"
          ></span>
        </div> -->
      </template>
    </el-calendar>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useHandler } from "./hooks";
import utils from "../../../src/utils/utils";
const emit = defineEmits<{
  (event: "dblclick", data: any, currentContent: any): void;
  (event: "monthChange", data: any): void;
  (event: "dateChange", data: any): void;
}>();

const props = withDefaults(
  defineProps<{
    allDateContent: any;
  }>(),
  {
    allDateContent: [],
  }
);
const modalRef = ref(null);
defineExpose({ modalRef });

const {
  state,
  dateValue,
  editCell,
  detailsCell,
  dateContent,
  selectDate,
  calendar,
  dateChange,
} = useHandler(props, emit);
</script>
<style scoped lang="less">
.pie-calendar-modal {
  width: 96%;
  height: 66vh;
  color: @main-font-color;
  background-color: transparent;
  // background-image: radial-gradient(rgba(58, 92, 166, 0.1), #090e57);
  border: 1px solid #00aadd;
  // padding: @global-padding;
  .cell-inner {
    // width: 100%;
    .cell-content {
      width: 100%;
      height: 50px;
      .preview{
        position: relative;

      }
      .main-shift  {
        display: flex;
        justify-content: space-between;
        .iconfont{
          color: #9c1d0f;
          width: 10%;
        }
        .mainShift{
          overflow:hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          width: 85%;
          .box-item{
                      overflow:hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          }
        }
      }
      .standby-shift {
        display: flex;
        justify-content: space-between;
        .mainShift{
          // width: 20px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          width: 85%;
        }
        .iconfont {
          color: #5f8fb2;
          width: 10%;
        }
      }
    }
  }
}
:deep(.el-calendar) {
  background-color: transparent;
}
:deep(.el-calendar-table td) {
  background-color: transparent;
  border-color: #00aadd !important;
}

//头部字体
:deep(.el-calendar-table thead th) {
  color: #98dcff;
  font-size: 18px;
}
//头部
:deep(.el-calendar__header) {
  border-color: #00aadd;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .el-button {
    background-color: transparent;
    color: @main-font-color;
    border-color: #00aadd;
  }
  .modal-content {
    margin-left: 50px;
    .modal-label-name {
      margin-right: 15px;
    }
    // button {
    //   padding: 10px 20px;
    //   box-sizing: border-box;
    //   background: transparent;
    //   margin-left: 10px;
    //   color: @main-font-color;
    //   border: 1px solid @global-header-bbg;
    //   cursor: pointer;
    //   border-radius: 5px;
    // }
  }
  .legend {
    margin-left: 50px;
    .main {
      color: #9c1d0f;
      font-size: 16px;
    }
    .standby {
      color: #5f8fb2;
    }
  }
  .el-button-group {
    margin-left: auto;
    .el-button {
      padding: 5px 11px;
    }
  }
}
//body
:deep(.el-calendar__body) {
  padding: 12px 20px 20px;
}
//非当月字体
:deep(.el-calendar-table__row .prev) {
  // font-size: 13px;
}
//当月字体
:deep(.el-calendar-table__row .current) {
  // font-size: 16px;
}
:deep(.el-calendar-table td.is-today) {
  color: red;
}
//选中样式
:deep(.el-calendar-table td.is-selected) {
  background-color: rgba(39, 80, 164, 0.4);
}
//滑过样式
:deep(.el-calendar-table .el-calendar-day:hover) {
  background-color: rgba(39, 80, 164, 0.4);
}
</style>
