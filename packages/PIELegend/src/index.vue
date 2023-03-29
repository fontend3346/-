<template>
  <!-- 图表 -->
  <div class="legend-show">
    <span
      :class="[
        'iconfont',
        'close-legend',
        iconclass ? iconclass : 'icon-guanbi',
      ]"
      title="关闭"
      @click="close"
    ></span>
    <template v-if="props.netWorkStatus">
      <div class="legend-img" v-for="item in props.options" :key="item.title">
        <img :src="item.imgUrl" alt="" />
        <div class="legend-font">{{ item.title }}</div>
      </div>
    </template>
    <!-- <div class="legend-img">
      <img src="@/assets/images/stationNor.png" alt="" />
      <div class="legend-font">台站正常</div>
    </div> -->
    <div class="legend-img">
      <img src="@/assets/images/stationAbnor.png" alt="" />
      <div class="legend-font">台站故障</div>
    </div>
    <div class="legend-imgs">
      <img src="@/assets/images/station6.png" alt="" />
      <div class="legend-font">台站告警</div>
    </div>
    <div class="legend-imgs">
      <img src="@/assets/images/station8.png" alt="" />
      <div class="legend-font">台站离线</div>
    </div>
    <div class="legend-imgs">
      <img width="18" src="@/assets/images/station2.png" alt="" />
      <div class="legend-font">测震</div>
    </div>
    <div class="legend-imgs">
      <img src="@/assets/images/station3.png" alt="" />
      <div class="legend-font">强震</div>
    </div>
    <div class="legend-imgs">
      <img src="@/assets/images/station4.png" alt="" />
      <div class="legend-font">GNSS</div>
    </div>
    <div class="legend-imgs">
      <img src="@/assets/images/station5.png" alt="" />
      <div class="legend-font">重力</div>
    </div>
    <div class="legend-imgs">
      <img src="@/assets/images/stationNor.png" alt="" />
      <div class="legend-font">次声</div>
    </div>
    <div class="legend-imgs">
      <img src="@/assets/images/station7.png" alt="" />
      <div class="legend-font">地磁</div>
    </div>
    <!-- <div class="legend-img">
      <div class="legend-small-img">
        <img src="@/assets/images/pointNor.png" alt="" />
      </div>
      <div class="legend-font">测点正常</div>
    </div>
    <div class="legend-img">
      <div class="legend-small-img">
        <img src="@/assets/images/pointAbnor.png" alt="" />
      </div>
      <div class="legend-font">测点异常</div>
    </div>
    <div class="legend-img">
      <img src="@/assets/images/equip.png" alt="" />
      <div class="legend-font">设备</div>
    </div> -->
  </div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";
import net from "@/assets/images/net.png";

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "close", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    options: any;
    iconclass: string;
    netWorkStatus: any;
  }>(),
  {
    options: [
      {
        title: "台网",
        imgUrl: net,
      },
      // {
      //   title: "台站正常",
      //   imgUrl: "../../../src/assets/images/earthquake.png",
      // },
    ],
    iconclass: "",
    netWorkStatus: true,
  }
);
const { state, onClick, getAssetsImage, close } = useHandler(props, emit);
</script>
<style lang="less" scoped>
.legend-show {
  padding: 20px;
  position: relative;
  .close-legend {
    font-size: 14px;
    color: #fff;
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }
}
</style>
