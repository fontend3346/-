<template>
  <div ref="modalRef" class="pie-mark-modal">
    <div class="detail-data" v-if="showInfo">
      <div class="data-main">
        <div class="data-name">台站:</div>
        <div class="data-info">
          {{ valueData.station_name }}
        </div>
      </div>
      <div class="data-main">
        <div class="data-name">经纬度:</div>
        {{ valueData.longitude }} &nbsp;&nbsp;，&nbsp;&nbsp;{{
          valueData.latitude
        }}
      </div>

      <div class="data-main">
        <div class="data-name">运行状态:</div>
        <div class="data-info">
          {{ valueData.status }}
        </div>
      </div>
      <div class="data-main">
        <div class="data-name">联系人:</div>
        <div class="data-info">
          {{ valueData.linkman }}
        </div>
      </div>
      <div class="data-main">
        <div class="data-name">联系电话:</div>
        <div class="data-info">
          {{ valueData.linkphone }}
        </div>
      </div>
      <div class="data-btns">
        <div
          class="data-btn"
          @click="configInfo"
          v-if="valueData.isConfig == 'false'"
        >
          配置
        </div>
        <div class="data-btn" @click="updateInfo">编辑</div>
        <div class="data-btn" @click="delInfo">删除</div>
      </div>
    </div>
    <div class="equipment-manage" v-if="showUpdate">
      <div class="equipment-content">
        <div class="equip-name">台站</div>
        <el-select
          v-model="valueData.station_name"
          clearable
          placeholder="选择设备类型"
          @change="loadIcon"
        >
          <el-option
            v-for="item in state.addStationList"
            :key="item.id"
            :label="item.stationName"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <!--  -->
      <div class="equipment-contents">
        <div class="equip-name">经度</div>
        <el-input
          v-model="valueData.longitude"
          placeholder="请输入经度"
        ></el-input>
        <div class="equip-names">纬度</div>
        <el-input
          v-model="valueData.latitude"
          placeholder="请输入纬度"
        ></el-input>
        <!-- <el-tooltip
          class="box-item"
          effect="dark"
          content="点击获取位置"
          placement="right"
        >
          <div class="iconfont icon-weizhi3" @click="loadIconEvent"></div>
        </el-tooltip> -->
      </div>

      <div class="equipment-content">
        <div class="equip-name">运行状态</div>
        <el-input
          v-model="valueData.status"
          placeholder="请输入指令控制端口"
        ></el-input>
      </div>
      <!--  -->
      <div class="equipment-content">
        <div class="equip-name">联系人</div>
        <el-input
          v-model="valueData.linkman"
          placeholder="请输入联系人"
        ></el-input>
      </div>
      <div class="equipment-content">
        <div class="equip-name">联系电话</div>
        <el-input
          v-model="valueData.linkphone"
          placeholder="请输入联系人"
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
  (event: "submitForm", e: MouseEvent): void;
  (event: "configInfo", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    valueData: any;
    showInfo: boolean;
    showUpdate: boolean;
    addInfoHttpList: any;
    agreementMap: any;
  }>(),
  {
    valueData: {},
    showInfo: true,
    showUpdate: false,
    addInfoHttpList: [],
    agreementMap: "",
  }
);
const modalRef = ref(null);
defineExpose({ modalRef });
const { state, delInfo, updateInfo, submitForm, loadIcon, configInfo } =
  useHandler(props, emit);
</script>
