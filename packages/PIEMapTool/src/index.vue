<template>
  <div class="map-tool">
    <!-- 二三维切换 -->
    <div class="tool-item" :class="{ active: props.curTool == 1 }">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="二维/三维切换"
        placement="left"
      >
        <div class="iconfont icon-ditu" @click="checkFn"></div>
      </el-tooltip>
    </div>
    <!-- 放大 -->
    <div class="tool-item" :class="{ active: props.curTool == 2 }">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="放大"
        placement="left"
      >
        <div class="iconfont icon-jiahao" @click="enlargeFn"></div>
      </el-tooltip>
    </div>
    <!-- 缩小 -->
    <div class="tool-item" :class="{ active: props.curTool == 3 }">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="缩小"
        placement="left"
      >
        <div class="iconfont icon-suoxiao1" @click="reduceFn"></div>
      </el-tooltip>
    </div>
    <!-- 切换底图 -->
    <div class="tool-item" :class="{ active: props.curTool == 4 }">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="切换底图"
        placement="left"
      >
        <div class="iconfont icon-geshizhuanhuan" @click="checkLayer"></div>
      </el-tooltip>
    </div>
    <!-- 图层 -->
    <div
      class="tool-item"
      :class="{ active: props.curTool == 5 }"
      v-if="props.coverageShow"
    >
      <el-tooltip
        class="box-item"
        effect="dark"
        content="图层"
        placement="left"
      >
        <div
          class="iconfont icon-ditu-youxia-tuceng"
          @click="coverageList"
        ></div>
      </el-tooltip>
    </div>
    <!-- 统计 -->
    <div
      class="tool-item"
      :class="{ active: props.curTool == 6 }"
      v-if="props.allStatiShow"
    >
      <el-tooltip
        class="box-item"
        effect="dark"
        content="统计"
        placement="left"
      >
        <div
          class="iconfont icon-tongjifenxi-xiangmubiaogetongji"
          @click="allStatisticsClick"
        ></div>
      </el-tooltip>
    </div>
    <!-- 专题图 -->
    <div
      class="tool-item"
      :class="{ active: props.curTool == 8 }"
      v-if="props.thematicMap"
    >
      <el-tooltip
        class="box-item"
        effect="dark"
        content="专题图"
        placement="left"
      >
        <div
          class="iconfont icon-zhuantitu"
          @click="thematicMapFn"
        ></div>
      </el-tooltip>
    </div>
    <!-- 重置 -->
    <div
      class="tool-item"
      :class="{ active: props.curTool == 7 }"
      v-if="props.resetMap"
    >
      <el-tooltip
        class="box-item"
        effect="dark"
        content="重置"
        placement="left"
      >
        <div
          class="iconfont icon-shuaxin1"
          @click="resetFn"
        ></div>
      </el-tooltip>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";
const emit = defineEmits<{
  (event: "checkFn", e: MouseEvent): void;
  (event: "enlargeFn", e: MouseEvent): void;
  (event: "reduceFn", e: MouseEvent): void;
  (event: "checkLayer", e: MouseEvent): void;
  (event: "coverageList", e: MouseEvent): void;
  (event: "allStatisticsClick", e: MouseEvent): void;
  (event: "resetFn", e: MouseEvent): void;
  (event: "thematicMapFn", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    curTool: any;
    coverageList: any;
    coverageShow: boolean;
    allStatiShow: boolean;
    resetMap: boolean;
    thematicMap: boolean;
  }>(),
  {
    curTool: "",
    coverageList: [],
    coverageShow: true,
    allStatiShow: true,
    resetMap: false,
    thematicMap: false,
  }
);
const {
  checkFn,
  enlargeFn,
  reduceFn,
  checkLayer,
  coverageList,
  allStatisticsClick,
  resetFn,
  thematicMapFn
} = useHandler(props, emit);
</script>
