<template>
  <div ref="modalRef" class="pie-mark-modal">
    <div class="container">
      <div class="check-btn">
        <el-button type="primary" plain @click="checkFn(1)">属性查询</el-button>
        <el-button type="primary" plain @click="checkFn(2)">空间查询</el-button>
      </div>
      <div class="content">
        <div class="content1" v-show="state.isShowIndex == 1">
          <div class="content-item">
            <span>观测点名称：</span>
            <el-input
              v-model="state.observationName"
              placeholder="请输入观测点名称"
              clearable
              class="input-width"
            />
          </div>
          <div class="content-item">
            <span>观测点编号：</span>
            <el-input
              v-model="state.observationNumber"
              placeholder="请输入观测点编号"
              clearable
              class="input-width"
            />
          </div>
          <div class="content-item address">
            <span>观测点地址：</span>
            <div class="left-content-item">
              <span class="left-name">省</span>
              <el-select
                :popper-append-to-body="false"
                clearable
                filterable
                v-model="state.selectNetwork"
                placeholder="请选择省"
                class="style-select"
                @change="networkChange"
              >
                <el-option
                  v-for="item in state.provinceList"
                  :key="item"
                  :label="item.label"
                  :value="item.value"
                  class="select-item"
                ></el-option>
              </el-select>
            </div>
            <div class="left-content-item">
              <span class="left-name">市</span>
              <el-select
                :popper-append-to-body="false"
                clearable
                filterable
                v-model="state.stationArray"
                placeholder="请选择市"
                class="style-select"
                @change="stationArrayChange"
              >
                <el-option
                  v-for="item in state.cityList"
                  :key="item"
                  :label="item.label"
                  :value="item.value"
                  class="select-item"
                ></el-option>
              </el-select>
            </div>

            <div class="left-content-item">
              <span class="left-name">县</span>
              <el-select
                v-model="state.stationChild"
                clearable
                filterable
                placeholder="选择县"
              >
                <el-option
                  v-for="item in state.countyList"
                  :key="item"
                  :label="item.label"
                  :value="item.value"
                  class="select-item"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="content-item">
            <div class="left-content-item">
              <span class="left-name-time">观测点部署时间：</span>
              <el-date-picker
                v-model="state.timeVal"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions1"
                :default-value="new Date(2010, 9, 1)"
                class="date-picker"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="content2" v-show="state.isShowIndex == 2">
          <div class="content-item">
            <span>查询方式：</span>
            <el-select
              placeholder="请选择"
              v-model="state.searchWay"
              @change="change"
            >
              <el-option
                v-for="(item, index) in state.searchWayList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

          <div class="content-item address" v-show="state.searchWay == '1'">
            <span>行政区：</span>
            <el-select placeholder="请选择省">
              <el-option
                v-for="(item, index) in state.provinceList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select placeholder="请选择市">
              <el-option
                v-for="(item, index) in state.cityList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select placeholder="请选择县">
              <el-option
                v-for="(item, index) in state.countyList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="content-item vector" v-show="state.searchWay == '2'">
            <span>矢量范围:</span>
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
            <span>经纬度范围：</span>
            <div class="content-row">
              <div class="conetent-item-input">
                <el-input
                  v-model="state.rightBtm"
                  placeholder="请输入右下角经度"
                  clearable
                  class="input-width"
                />
                <el-input
                  v-model="state.leftTop"
                  placeholder="请输入左上角纬度"
                  clearable
                  class="input-width"
                />
              </div>
              <div class="conetent-item-input">
                <el-input
                  v-model="state.rightTop"
                  placeholder="请输入右上角经度"
                  clearable
                  class="input-width"
                />
                <el-input
                  v-model="state.rightTopL"
                  placeholder="请输入右上角纬度"
                  clearable
                  class="input-width"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-item btn">
        <el-button type="primary" @click="reset">重置</el-button>
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRefs } from "vue";
// import { toRef } from "vue-demi";
import { useHandler } from "./hooks";
const emit = defineEmits<{
  (event: "search", e: any): void;
  (event: "reset", e: any): void;
  (event: "drawEvent", type: string): void;
}>();

const props = withDefaults(
  defineProps<{
    valueData: any;
    showInfo: boolean;
    showUpdate: boolean;
    addInfoHttpList: any;
    agreementMap: any;
    curDraw: string;
  }>(),
  {
    valueData: {},
    showInfo: true,
    showUpdate: false,
    addInfoHttpList: [],
    agreementMap: "",
    curDraw: "", //当前绘制图形类型
  }
);
const modalRef = ref(null);
defineExpose({ modalRef });
let { curDraw } = toRefs(props);
const { state, checkFn, search, change, drawEvent,reset } = useHandler(props, emit);
</script>
<style lang="less" scoped>
@import "./PIESearchMark.less";
</style>
