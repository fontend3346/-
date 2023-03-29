<template>
  <div class="search-mark-modal" v-show="props.showearch">
    <div class="container-search-modal">
      <div class="mark-title">
        <span class="iconfont icon-ditu-youxia-tuceng"></span>
        <span>空间查询</span>
      </div>
      <div class="top-content">
        <div class="top-line">
          <div class="item" @click="change('1')">
            <span
              class="iconfont icon-mubiaohuizhi img-wrap"
              :class="state.searchWay == '1' ? 'img-active' : ''"
            ></span>
            <!-- <span>绘制区域</span> -->
          </div>
          <div class="item" @click="change('2')">
            <span
              class="iconfont icon-administrative-area_line img-wrap"
              :class="state.searchWay == '2' ? 'img-active' : ''"
            ></span>
            <!-- <span>行政区域</span> -->
          </div>
          <div class="item" @click="change('3')">
            <span
              class="iconfont icon-jingweidu img-wrap"
              :class="state.searchWay == '3' ? 'img-active' : ''"
            ></span>
            <!-- <span>经纬度</span> -->
          </div>
        </div>
        <div class="con-item administrative" v-show="state.searchWay == '2'">
          <span class="select-span">行政区域</span>
          <el-select
            placeholder="请选择省"
            v-model="state.provinceValue"
            class="select-admin"
          >
            <el-option
              v-for="(item, index) in state.provinceList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            placeholder="请选择市"
            v-model="state.cityValue"
            class="select-admin"
          >
            <el-option
              v-for="(item, index) in state.cityList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            placeholder="请选择县"
            v-model="state.countyValue"
            class="select-admin"
          >
            <el-option
              v-for="(item, index) in state.countyList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="con-item vector-cope" v-show="state.searchWay == '1'">
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
        <div class="con-item coordinate" v-show="state.searchWay == '3'">
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
        <div class="con-item assess-way">
          <span class="assess-span">日期</span>
          <el-date-picker
            v-model="state.value1"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD HH:mm:ss"
          >
          </el-date-picker>
        </div>
        <div class="con-item assess-way">
          <span class="assess-span">震级</span>
          <el-input
            v-model="state.earthMagnitudeStart"
            placeholder="请输入震级"
            clearable
            class="input-width-earth"
          />
          <span class="title">至</span>
          <el-input
            v-model="state.earthMagnitudeEnd"
            placeholder="请输入震级"
            clearable
            class="input-width-earth"
          />
        </div>
        <div class="con-item assess-way" v-show="props.showRputers">
          <span class="assess-span">地点</span>
          <el-select placeholder="请选择地点" v-model="state.location">
            <el-option
              v-for="item in props.locationList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="con-item pie-detection-btn">
        <el-button type="primary" @click="reset">重置</el-button>
        <el-button type="primary" @click="search">查询</el-button>
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
}>();

const props = withDefaults(
  defineProps<{
    curDraw: string;
    locationList: any;
    showRputers: boolean;
    showearch: boolean;
  }>(),
  {
    curDraw: "", //当前绘制图形类型
    locationList: "", //地点
    showRputers: true, //地点显示
    showearch: true,
  }
);
const modalRef = ref(null);
defineExpose({ modalRef });
let { curDraw } = toRefs(props);
const { state, search, change, drawEvent, reset } = useHandler(props, emit);
</script>
