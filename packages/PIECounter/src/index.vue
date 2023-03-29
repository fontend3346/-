<template>
  <!-- PIECounter 组件 -->
  <div class="container">
    <div class="title">
      <div class="title-top">
        <div class="item-title">
          <span>数据接收</span>
        </div>
        <el-radio label="" size="large"></el-radio>
      </div>
      <div class="title-top">
        <div class="item-title">
          <span>数据归档</span>
        </div>
        <el-radio label="" size="large"></el-radio>
      </div>
      <div class="title-top">
        <div class="item-title">
          <span>信号数据预处理</span>
        </div>
        <el-radio label="" size="large"></el-radio>
      </div>
      <div class="title-top">
        <div class="item-title">
          <span>特征分析</span>
        </div>
        <el-radio label="" size="large"></el-radio>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="line"></div>
    <!-- 四个卡片 -->
    <div class="footcard">
      <div class="item-card item-cards">
        <div class="item-conent">
          <div class="left">
            <span></span>
            <span></span>
          </div>
          <div class="right">
            <span class="right-safe">今日</span>
            <span class="right-safe">总量</span>
          </div>
        </div>

        <div
          class="item-conent"
          v-for="(item, index) in receiveList"
          :key="index"
        >
          <div class="left">
            <span class="iconfont icon-yuandiancheng-copy"></span>
            <span>{{ item.name }}</span>
          </div>
          <div class="right">
            <span class="right-safe">{{ item.todayCount }}</span>
            <span class="right-safe">{{ item.sumCount }}</span>
          </div>
        </div>
      </div>
      <div class="item-card item-cards">
        <div class="item-conent">
          <div class="left">
            <span></span>
            <span></span>
          </div>
          <div class="right">
            <span class="right-safe">今日</span>
            <span class="right-safe">总量</span>
          </div>
        </div>
        <div
          class="item-conent"
          v-for="(item, index) in archiveList"
          :key="index"
        >
          <div class="left">
            <span class="iconfont icon-yuandiancheng-copy"></span>
            <span>{{ item.name }}</span>
          </div>
          <div class="right">
            <span class="right-safe">{{ item.todayCount }}</span>
            <span class="right-safe">{{ item.sumCount }}</span>
          </div>
        </div>
      </div>
      <!-- 预处理 -->
      <div class="item-card item-cards">
        <div class="item-conent">
          <div class="left">
            <span></span>
            <span></span>
          </div>
          <div class="right">
            <span class="right-safe">今日</span>
            <span class="right-safe">总量</span>
          </div>
        </div>

        <div
          class="item-conent"
          v-for="(item, index) in pretreatmentList"
          :key="index"
        >
          <div class="left">
            <span class="iconfont icon-yuandiancheng-copy"></span>
            <span>{{ item.name }}</span>
          </div>
          <div class="right">
            <span class="right-safe">{{ item.todayCount }}</span>
            <span class="right-safe">{{ item.sumCount }}</span>
          </div>
        </div>
      </div>
      <!-- 分析 -->
      <div class="item-card">
        <div class="item-conent">
          <div class="left">
            <span></span>
            <span></span>
          </div>
          <div class="right">
            <span class="right-safe">今日</span>
            <span class="right-safe">总量</span>
          </div>
        </div>

        <div
          class="item-conent"
          v-for="(item, index) in analysisList"
          :key="index"
        >
          <div class="left">
            <span class="iconfont icon-yuandiancheng-copy"></span>
            <span>{{ item.name }}</span>
          </div>
          <div class="right">
            <span class="right-safe">{{ item.todayCount }}</span>
            <span class="right-safe">{{ item.sumCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./hook";

const props = withDefaults(
  defineProps<{
    receiveList: any;
    archiveList: any;
    pretreatmentList: any;
    analysisList: any;
  }>(),
  {
    receiveList: [],
    archiveList: [],
    pretreatmentList: [],
    analysisList: [],
  }
);
const { state } = useHandler(props);
</script>
