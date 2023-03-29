<template>
  <!-- 图表 -->
  <div class="legend-show" v-if="props.thematicDisplay">
    <div class="person-layout">
      <span>{{ props.thematicTitle }}</span>
      <span
        class="iconfont icon-guanbi close-legend"
        title="关闭"
        @click="close"
      ></span>
    </div>
    <div>
      <div
        v-for="(item, index) in props.thematicList"
        :key="index"
        class="total-layout"
      >
        <span :style="{ background: item.color }" class="color-layout"></span>
        <span class="num-layout">{{ item.num }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "close", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    thematicShow: boolean;
    thematicDisplay: boolean;
    thematicTitle: string;
    thematicList: any;
  }>(),
  {
    thematicShow: false,
    thematicDisplay: false,
    thematicTitle: '人口数量',
    thematicList: [
      {
        color: "rgba(0,0,128,0.3)",
        num: "0~20万"
      },
      {
        color: "rgba(0,0,205,0.3)",
        num: "20~40万"
      },
      {
        color: "rgba(0,0,255,0.3)",
        num: "40~60万"
      },
      {
        color: "rgba(65,105,225,0.3)",
        num: "60~80万"
      },
      {
        color: "rgba(30,144,255,0.3)",
        num: "80~100万"
      },
      {
        color: "rgba(0,191,255,0.3)",
        num: "100~200万"
      },
      {
        color: "rgba(135,206,210,0.3)",
        num: "200~300万"
      },
      {
        color: "rgba(135, 206, 250,0.3)",
        num: "300~400万"
      },
      {
        color: "rgba(173,216,230,0.3)",
        num: "400~2000万"
      },
      {
        color: "rgba(240,248,255,0.3)",
        num: "2000万以上"
      },
    ],
  }
);
const { state, close } = useHandler(props, emit);
</script>
<style lang="less" scoped>
.legend-show {
  display: flex;
  flex-direction: column;
  width: 180px;
  padding: 20px;
  box-sizing: border-box;
  .total-layout {
    display: flex;
    align-items: center;
  }
  .color-layout {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 20px;
  }
  .num-layout {
    font-size: 12px;
    display: inline-block;
    color: @main-font-color;
  }
  .person-layout {
    position: relative;
    width: 100%;
    font-size: 14px;
    color: @main-font-color;
    margin-bottom: 10px;
    span {
      display: inline-block;
    }
  }
  .close-legend {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
  }
}
</style>
