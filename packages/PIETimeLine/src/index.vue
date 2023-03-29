<template>
  <div class="timeAxis-box">
    <div :class="state.isPlay?'left-btn suspend' :'left-btn'" @click="handlerClickPlay"></div>
    <div class="shaft_box">
      <!-- 轴进度背景 -->
      <div class="line_bg">
        <!-- 影像点 -->
        <div class="image_line" :style="{width: getWidth()}"></div>
        <div v-for="(item, index) in timeList" :key="index" class="image_point"
          :style="{'left': 'calc('+ (94/(props.timeList.length - 1))*index + '% + 20px)'}" @click="onChoose(index)"
          :title="item.imageTime" :class="{'active': state.selectIndex === index}">
        </div>
      </div>
      <div class="current-time">
        {{props.timeList[state.selectIndex]}}
      </div>
    </div>
  </div>
</template>
<script  lang="ts" setup>
import { useHandler } from './hooks'
import { ref } from 'vue'
const props = withDefaults(
  defineProps<{
    timeList: any,
    timeReady:boolean
  }>(),
  {
    timeList: [],
    timeReady:false
  }
)

const emit = defineEmits<{
  (event: 'loadImageMap', e: MouseEvent): void
}>()
const { state, handlerClickPlay, onChoose, getWidth } = useHandler(props, emit)
</script>
<style lang="less" scoped>
.timeAxis-box {
  height: 63px;
  background: linear-gradient(
      rgba(0, 38, 73, 0.88) 0%,
      rgba(0, 47, 91, 0.96) 100%
    )
    transparent;
  border-radius: 32px;
  position: fixed;
  bottom: 30px;
  left: 638px;
  z-index: 9999;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  box-sizing: border-box;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  .left-btn {
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-color: #0173dd;
    background-position: center center;
    background-size: 18px 18px;
    background-repeat: no-repeat;
    border-radius: 50%;
    background-image: url(~@/assets/images/play.png);
    &.suspend {
      background-image: url(~@/assets/images/suspend.png);
    }
  }
  .shaft_box {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .line_bg {
      width: 500px;
      height: 32px;
      border: 1px solid #0173dd;
      border-radius: 12px;
      margin: 0 10px;
      padding: 0 10px;
      position: relative;
      box-sizing: border-box;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .image_line {
      max-width: calc(100% - 8px);
      height: 16px;
      background: #0173dd;
      border-radius: 9px;
      box-sizing: border-box;
      position: absolute;
      top: 6px;
      z-index: 2;
      &::after{
        content: '';
        width: 16px;
        height: 16px;
        position: absolute;   
        right: 0;
        top: -2px;
        background: #3f88e7;
        border-radius: 50%;
        cursor: pointer;
        border: 3px solid #fff;
        box-shadow: 0 0 1px #555;
      }
    }

    .image_point {
      width: 20px;
      height: 100%;
      cursor: pointer;
      z-index: 2;
    }
    .tick_box {
      position: absolute;
      bottom: -30px;
      color: #fff;
      transform: translateX(-50%);
      white-space: nowrap;
      cursor: pointer;
      font-family: DIN;
      font-size: 14px;
    }
    .current-time {
      width: fit-content;
      white-space: nowrap;
      font-size: 18px;
      margin: 0 10px;
      color: #fff;
    }
  }
}
</style>