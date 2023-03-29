<template>
  <div ref="modalRef" class="pie-mark-modal">
    <div class="detail-data" v-if="showInfo">
      <div class="data-main">
        <div class="data-name">设备名称:</div>
        <div class="data-info">
          {{ valueData.device_name }}
        </div>
      </div>
      <!-- <div class="data-main">
            <div class="data-name">设备类型:</div>
            {{ valueData.type_id}}
          </div> -->
      <div class="data-main">
        <div class="data-name">设备厂家:</div>
        <div class="data-info">
          {{ valueData.manufacture }}
        </div>
      </div>
      <div class="data-main">
        <div class="data-name">生产日期:</div>
        <div class="data-info">
          {{ utils.formatDate(valueData.manufacture_date, 1) }}
        </div>
      </div>
      <div class="data-main">
        <div class="data-name">采购时间:</div>
        <div class="data-info">
          {{ utils.formatDate(valueData.purchase_time, 1) }}
        </div>
      </div>
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
        <div class="data-name">维修次数:</div>
        <div class="data-info">
          {{ valueData.maintain_times }}
        </div>
      </div>
      <div class="data-main">
        <div class="data-name">存储容量(GB):</div>
        <div class="data-info">
          {{ valueData.storage_capacity }}
        </div>
      </div>
      <div class="data-main">
        <div class="data-name">信息传输协议:</div>
        <div class="data-info">
          {{ agreementMap[valueData.msg_transport_port] }}
        </div>
      </div>
      <div class="data-main">
        <div class="data-name">设备IP:</div>
        <div class="data-info">
          {{ valueData.ip }}
        </div>
      </div>
      <div class="data-main">
        <div class="data-name">指令控制端口:</div>
        <div class="data-info">
          {{ valueData.port }}
        </div>
      </div>
      <div class="data-main">
        <div class="data-name">联系人:</div>
        <div class="data-info">
          {{ valueData.contact_person }}
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
      <!--  -->
      <div class="equipment-content">
        <div class="equip-name">设备名称</div>
        <el-input
          class="input-style"
          v-model="valueData.device_name"
          placeholder="请输入设备名称"
        ></el-input>
      </div>
      <!--  -->
      <div class="equipment-content">
        <div class="equip-name">设备类型</div>
        <el-select
          v-model="valueData.type_id"
          clearable
          placeholder="选择设备类型"
        >
          <el-option
            v-for="item in state.equipmentTypeLis"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <!--  -->
      <div class="equipment-content">
        <div class="equip-name">设备厂家</div>
        <el-input
          v-model="valueData.manufacture"
          placeholder="请输入设备厂家"
        ></el-input>
      </div>
      <!--  -->
      <div class="equipment-content">
        <div class="equip-name">生产日期</div>
        <el-date-picker
          v-model="valueData.manufacture_date"
          type="date"
          placeholder="请选择生产日期"
        />
      </div>
      <!--  -->
      <div class="equipment-content">
        <div class="equip-name">采购时间</div>
        <el-date-picker
          v-model="valueData.purchase_time"
          type="date"
          placeholder="请选择生产日期"
        />
      </div>
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
      <!--  -->
      <div class="equipment-content">
        <div class="equip-name">维修次数</div>
        <el-input
          v-model="valueData.maintain_times"
          placeholder="请输入维修次数"
        ></el-input>
      </div>
      <!--  -->
      <div class="equipment-content">
        <div class="equip-name">存储容量(GB):</div>
        <el-input
          v-model="valueData.storage_capacity"
          placeholder="请输入存储容量"
        ></el-input>
      </div>
      <!--  -->
      <div class="equipment-content">
        <div class="equip-name">信息传输协议</div>
        <el-select
          v-model="valueData.msg_transport_port"
          clearable
          placeholder="选择信息传输协议"
        >
          <el-option
            v-for="item in addInfoHttpList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <!--  -->
      <div class="equipment-content">
        <div class="equip-name">设备IP</div>
        <el-input v-model="valueData.ip" placeholder="请输入设备IP"></el-input>
      </div>
      <!--  -->
      <div class="equipment-content">
        <div class="equip-name">指令控制端口</div>
        <el-input
          v-model="valueData.port"
          placeholder="请输入指令控制端口"
        ></el-input>
      </div>
      <!--  -->
      <div class="equipment-content">
        <div class="equip-name">联系人</div>
        <el-input
          v-model="valueData.contact_person"
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
