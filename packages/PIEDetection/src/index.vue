<template>
  <div v-if="props.pieDetection" class="pie-mark-modal">
    <div class="container-pie-detection">
      <div class="mark-title">
        <span class="iconfont icon-ditu-youxia-tuceng"></span>
        <span>空间查询</span>
      </div>
      <div class="content">
        <div class="header-line">
          <div class="item" @click="change('1')">
            <span
              class="iconfont icon-mubiaohuizhi img-style"
              :class="state.searchWay == '1' ? 'active-img' : ''"
            ></span>
            <!-- <span>绘制区域</span> -->
          </div>
          <div class="item" @click="change('2')">
            <span
              class="iconfont icon-administrative-area_line img-style"
              :class="state.searchWay == '2' ? 'active-img' : ''"
            ></span>
            <!-- <span>行政区域</span> -->
          </div>
          <div class="item" @click="change('3')">
            <span
              class="iconfont icon-jingweidu img-style"
              :class="state.searchWay == '3' ? 'active-img' : ''"
            ></span>
            <!-- <span>经纬度</span> -->
          </div>
        </div>
        <div class="content-item address" v-show="state.searchWay == '2'">
          <span class="address-span">行政区域</span>
          <el-select placeholder="请选择省" v-model="state.provinceValue">
            <el-option
              v-for="(item, index) in state.provinceList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select placeholder="请选择市" v-model="state.cityValue">
            <el-option
              v-for="(item, index) in state.cityList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select placeholder="请选择县" v-model="state.countyValue">
            <el-option
              v-for="(item, index) in state.countyList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="content-item vector" v-show="state.searchWay == '1'">
          <span>矢量范围</span>
          <div
            @click="drawEvent('draw_rectangle')"
            :class="[curDraw == 'draw_rectangle' ? 'current' : '']"
          >
            <span class="iconfont icon-tubiao"></span>绘制矩形
          </div>
          <div
            @click="drawEvent('draw_polygon')"
            :class="[curDraw == 'draw_polygon' ? 'current' : '']"
          >
            <span class="iconfont icon-hexagon"></span>绘制多边形
          </div>
        </div>
        <div class="content-item range" v-show="state.searchWay == '3'">
          <span class="coordinate-span">经纬度</span>
          <div class="content-row">
            <div class="conetent-item-input">
              <el-input
                v-model="state.leftBotLon"
                placeholder="请输入左下角经度"
                clearable
                class="input-width"
              />
              <el-input
                v-model="state.leftBotLat"
                placeholder="请输入左下角纬度"
                clearable
                class="input-width"
              />
            </div>
            <div class="conetent-item-input">
              <el-input
                v-model="state.rightBotLon"
                placeholder="请输入右上角经度"
                clearable
                class="input-width"
              />
              <el-input
                v-model="state.rightBotLat"
                placeholder="请输入右上角纬度"
                clearable
                class="input-width"
              />
            </div>
          </div>
        </div>
        <div class="content-item assess-way">
          <span class="assess-span">评估类型</span>
          <el-select
            placeholder="请选择评估类型"
            v-model="state.assessWay"
            clearable
            @change="netWorkStation"
          >
            <el-option
              v-for="(item, index) in state.assessWayList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div
          class="content-item assess-way"
          v-if="state.assessWay == 'STATION'"
        >
          <span class="assess-span">台站类型</span>
          <el-select
            placeholder="请选择台站类型"
            v-model="state.stationType"
            clearable
          >
            <el-option
              v-for="(item, index) in props.stationTypeList"
              :key="index"
              :label="item.properties.type_name"
              :value="item.properties.id"
            />
          </el-select>
        </div>
        <div
          class="content-item assess-way"
          v-if="state.assessWay == 'STATION'"
        >
          <span class="assess-span">学科类型</span>
          <el-select
            placeholder="请选择学科类型"
            v-model="state.disciplineType"
            clearable
          >
            <el-option
              v-for="(item, index) in props.disciplineTypeList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="content-item pie-detection-btn">
        <el-button type="primary" @click="reset">重置</el-button>
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRefs } from "vue";
import { useHandler } from "./hooks";
const emit = defineEmits<{
  (event: "search", e: any): void;
  (event: "reset", e: any): void;
  (event: "drawEvent", type: string): void;
  (event: "netWorkStation", type: string): void;
}>();

const props = withDefaults(
  defineProps<{
    curDraw: string;
    disciplineTypeList: any; //学科类型
    stationTypeList: any; //台站类型
    pieDetection: Boolean;
  }>(),
  {
    curDraw: "", //当前绘制图形类型
    disciplineTypeList: [], //学科类型
    stationTypeList: [], //台站类型
    pieDetection: true,
  }
);
const modalRef = ref(null);
defineExpose({ modalRef });
let { curDraw } = toRefs(props);
const { state, search, change, drawEvent, reset, netWorkStation } = useHandler(
  props,
  emit
);
</script>
