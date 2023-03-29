<template>
  <div class="warn-box">
    <!-- 头部 -->
    <div class="content-main">
      <div class="title-top">
        <div class="title-trape"></div>
        <span class="title-text">疑似HB告警</span>
      </div>
      <div class="center-content">
        <div class="content-left">
          <img src="../../../src/assets/image/lamp.png" alt="" />
        </div>
        <div class="content-right">
          <div class="right-two">疑似参数</div>
          <div class="right-two">
            <div class="right-cont">
              <span class="right-title">时 间:</span><span>2021年9月28日</span>
            </div>
            <div class="right-cont">
              <span class="right-title">爆 高:</span><span>2086米</span>
            </div>
          </div>
          <div class="right-two">
            <div class="right-cont">
              <span class="right-title">经纬度:</span
              ><span class="right-title-num">28°37'</span><span>77°13'</span>
            </div>
            <div class="right-cont">
              <span class="right-title">当 量:</span><span>300吨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 中间 -->
    <div class="center-box-main">
      <div class="title-top">
        <div class="title-trape"></div>
        <span class="title-text">SHRJC知识</span>
      </div>
      <div class="center-safe">核安全一直是备受人们关注的话题。</div>
    </div>
    <!-- 底部 -->
    <div class="center-box-main">
      <div class="title-top">
        <div class="title-trape"></div>
        <span class="title-text">SHRJC态势</span>
      </div>
      <div class="center-safe specil-style">
        核技术的应用范围很大！它几乎涉及到了我们生活中的方方面面。
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./hooks";

const props = withDefaults(
  defineProps<{
    timeData: any;
    heightData: any;
    duDataOne: any;
    duDataTwo: any;
    weightData: any;
  }>(),
  {
    timeData: "",
    heightData: "",
    duDataOne: "",
    duDataTwo: "",
    weightData: "",
  }
);
const { state } = useHandler(props);
</script>
