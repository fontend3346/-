<template>
  <div ref="modalRef" class="pie-mark-modal" v-if="showModal">
    <div class="top">
      <div class="title">{{ title }}</div>
      <span class="iconfont icon-guanbi" v-if="close" @click="cancel"></span>
    </div>
    <!-- 详情弹窗 -->
    <div class="detail-data" v-if="showInfo">
      <div class="detail-info">
        <div
          class="single-item"
          v-for="(item, index) in valueData"
          :key="index"
        >
          <div class="data-name">{{ item.label }}:</div>
          <div class="data-info">
            {{ item.value }}
          </div>
        </div>
      </div>

      <div class="data-btns" v-if="isConfig">
        <div class="data-btn" @click="updateInfo">编辑</div>
        <div class="data-btn" @click="delInfo">删除</div>
      </div>
      <div class="operate-item" :style="{ marginBottom: 0 }">
        <slot age="10000" name="operateItem"></slot>
      </div>
    </div>
    <!-- 编辑弹窗 -->
    <div class="equipment-manage" v-if="showUpdate">
      <div
        class="equipment-content"
        v-for="(item, index) in valueData"
        :key="index"
      >
        <div class="equip-name">{{ item.label }}</div>
        <el-select
          v-if="item.label == '设备类型'"
          v-model="item.name"
          class="m-2"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="item in state.equipmentModelList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-else-if="item.label == '隶属台站'"
          v-model="item.name"
          class="m-2"
          placeholder="请选择"
          filterable
          clearable
          @change="changeSelect"
        >
          <el-option
            v-for="item in state.subjectionPlatformList"
            :key="item.value"
            :label="item.label"
            :value="item"
          />
        </el-select>
        <el-select
          v-else-if="item.label == '设备型号'"
          v-model="item.name"
          class="m-2"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="item in state.equipmentTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-else-if="item.label == '测点'"
          v-model="item.name"
          class="m-2"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="item in state.measurementPointList"
            :key="item.name"
            :label="item.label"
            :value="item.name"
          />
        </el-select>
        <el-input
          v-else
          v-model="item.name"
          :placeholder="'请输入' + item.label"
        ></el-input>
      </div>
      <div class="equipment-btn">
        <div class="btn" @click="submitForm">提交</div>
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
  (event: "submitForm", e: any, id: any): void;
  (event: "configInfo", e: MouseEvent): void;
  (event: "cancel", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    valueData: any;
    showInfo: boolean;
    showModal: boolean;
    title: string;
    showUpdate: boolean;
    addInfoHttpList: any;
    agreementMap: any;
    isConfig: boolean;
    pointData: any;
    id: any;
    close: boolean;
  }>(),
  {
    valueData: {},
    showInfo: true,
    showModal: true,
    title: "",
    showUpdate: false,
    addInfoHttpList: [],
    agreementMap: "",
    isConfig: false,
    pointData: {},
    id: null,
    close: false,
  }
);
const modalRef = ref(null);
defineExpose({ modalRef });

const {
  state,
  delInfo,
  updateInfo,
  submitForm,
  configInfo,
  changeSelect,
  cancel,
} = useHandler(props, emit);
</script>
<style scoped lang="less">
.pie-mark-modal {
  position: absolute;
  right: 5%;
  top: 5%;
  width: 550px;
  color: @main-font-color;
  .top {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .title {
      // color: #fff;
      margin: 15px 0 5px 25px;
      font-size: 17px;
    }
    .icon-guanbi {
      // color: #fff;
      margin-right: 20px;
      margin-top: 10px;
    }
  }

  .detail-data {
    display: flex;
    color: @main-font-color;

    .detail-info {
      display: flex;
      flex-wrap: wrap;
      .single-item {
        display: flex;
        width: 240px;
        margin-bottom: 10px;
        .data-name {
          width: 80px !important;
          margin-left: 0 !important;
          color: @main-font-color;
        }
      }
    }
    .data-btns {
      color: #fff;
    }
  }
  .equipment-manage {
    color: @main-font-color;
    .equipment-btn {
      color: #fff;
    }
  }
}
</style>
