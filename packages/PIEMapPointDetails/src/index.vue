<template>
  <div ref="modalRef" class="pie-mark-modal" v-if="showInfo">
    <div class="top">
      <div class="title">{{ title }}</div>
      <span class="iconfont icon-guanbi" v-if="close" @click="cancel"></span>
    </div>

    <!-- 详情弹窗 -->
    <div class="detail-data">
      <div class="data-main-warning">
        <div
          class="else-name"
          v-for="(item, index) in valueDataElse"
          :key="index"
          @click="facilityNetworkFun(item, index)"
          :class="{ activeindex: state.activeIndexs == index }"
        >
          {{ item.label }}
          <div
            class="else-info"
            :class="{ 'else-info-warning': item.label == '设备异常' }"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
      <div class="data-main" v-for="(item, index) in valueData" :key="index">
        <div class="data-name">{{ item.label }}:</div>
        <div class="data-info">
          {{ item.value }}
        </div>
      </div>
      <div class="data-btns" v-if="isConfig">
        <!-- <div
          class="data-btn"
          @click="configInfo"
          v-if="valueData.isConfig == 'false'"
        >
          配置
        </div> -->
        <div class="data-btn" @click="updateInfo">编辑</div>
        <div class="data-btn" @click="delInfo">删除</div>
      </div>
      <div class="table-item" v-if="tableShow">
        <slot age="10000" name="tableItem"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useHandler } from "./hooks";
import utils from "../../../src/utils/utils";
const emit = defineEmits<{
  (event: "delInfo", e: MouseEvent): void;
  (event: "updateInfo", e: MouseEvent): void;
  (event: "submitForm", e: any): void;
  (event: "configInfo", e: MouseEvent): void;
  (event: "cancel", e: MouseEvent): void;
  (event: "facilityNetworkFun", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    valueData: any;
    valueDataElse: any;
    showInfo: boolean;
    showUpdate: boolean;
    addInfoHttpList: any;
    agreementMap: any;
    isConfig: boolean;
    pointData: any;
    close: boolean;
    title: string;
    tableShow: boolean;
  }>(),
  {
    valueData: {},
    valueDataElse: {},
    showInfo: true,
    showUpdate: false,
    addInfoHttpList: [],
    agreementMap: "",
    isConfig: false,
    pointData: {},
    close: true,
    title: "",
    tableShow: false,
  }
);
const modalRef = ref(null);
defineExpose({ modalRef });

const {
  state,
  cancel,
  delInfo,
  updateInfo,
  submitForm,
  configInfo,
  facilityNetworkFun,
} = useHandler(props, emit);
</script>
<style scoped lang="less">
.pie-mark-modal {
  background: linear-gradient(
      rgba(0, 38, 73, 0.88) 0%,
      rgba(0, 47, 91, 0.96) 100%
    )
    transparent;
  box-shadow: rgb(61 141 255 / 30%) 0px 4px 20px 0px,
    rgb(0 100 186 / 50%) 0px 0px 32px 0px inset;
  border: 1px solid;
  border-image: linear-gradient(rgb(0, 133, 192), rgb(0, 91, 176)) 1 / 1 / 0
    stretch;
  color: @main-font-color;
  .top {
    display: flex;
    justify-content: space-between;
    .title {
      // color: #fff;
      margin: 15px 0 15px 25px;
      font-size: 17px;
    }
    .icon-guanbi {
      // color: #fff;
      margin-right: 20px;
      margin-top: 10px;
    }
  }

  .data-name {
    width: 100px !important;
    margin-left: 0 !important;
    color: @main-font-color;
  }

  .data-main-warning {
    display: flex;
    padding-bottom: 20px;
    justify-content: center;
    align-items: center;
    .activeindex {
      background: #2980ad !important;
    }
    .else-name {
      width: 30%;
      margin-right: 10px;
      padding: 5px 10px;
      color: @main-font-color;
      background: #172a3a;
      color: #98dcff;
      border: 1px solid #027395;
      border-radius: 2px;
      -webkit-box-shadow: 0 0 4px #00aadd;
      box-shadow: 0 0 4px #00aadd;
      text-align: center;
      cursor: pointer;
      box-sizing: border-box;

      .else-info {
        color: #00ff00;
        margin-left: 0;
        font-weight: bold;
        padding-top: 5px;
        box-sizing: border-box;
      }
      .else-info-warning {
        color: red;
        margin-left: 0;
        font-weight: bold;
      }
    }
    .else-name:last-child {
      margin-right: 0;
    }
  }
  .detail-data {
    padding: 0 30px 20px 25px;
    color: @main-font-color;
    .data-btns {
      color: #fff;
    }
  }
  .equipment-manage {
    padding: 0 30px 20px 25px;
    color: @main-font-color;
    .equipment-btn {
      color: #fff;
    }
  }
}
.pie-mark-modal::before {
  content: "";
  display: block;
  /* width: 8px; */
  // border-left: 28px solid rgba(0, 0, 0, 0);
  border-top: 10px solid transparent;
  border-left: 7px solid #0173dd;
  border-bottom: 10px solid transparent;
  /* border-right: 10px solid red; */
  height: 32px;
  position: absolute;
  left: -1px;
  top: 7%;
}

.pie-mark-modal::after {
  content: "";
  display: block;
  /* width: 8px; */
  border-top: 10px solid transparent;
  border-right: 7px solid #0173dd;
  border-bottom: 10px solid transparent;
  /* border-right: 10px solid red; */
  height: 20%;
  width: 0px;
  position: absolute;
  right: 0px;
  top: 67%;
}
</style>
