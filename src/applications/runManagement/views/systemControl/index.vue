<template>
  <div class="container">
    <!-- 表格跳转  :leftMeuList="JSON.parse(store.state.user.menuList)"-->
    <!-- <PIERunRouter @toTable="toTable"></PIERunRouter> -->
    <!-- 表格组件 -->
    <!-- <div v-show="showTable" class="table-box"> -->
    <!-- <span class="iconfont icon-guanbi" @click="closeTable"></span> -->
    <!-- <netManage v-if="tableNumber == 1"></netManage>
      <stationListTable v-if="tableNumber == 2"></stationListTable>
      <placeManage v-if="tableNumber == 3"></placeManage>
      <measurementList
        v-if="tableNumber == 4"
        :key="new Date().getTime()"
      ></measurementList>
      <instrumentRegistration v-if="tableNumber == 5"></instrumentRegistration>
      <eventManagement v-if="tableNumber == 6"></eventManagement>
      <earthquakeEvent v-if="tableNumber == 7"></earthquakeEvent>
    </div> -->
  </div>
</template>

<script script lang="ts" setup>
// import netManage from "../netManage/netManage.vue";
// import stationListTable from "../stationManage/stationList.vue";
// import measurementList from "../measureManage/measurementList.vue";
// import instrumentRegistration from "../nstrumentManage/instrumentRegistration.vue";
// import stationList from "../systemManage/stationList.vue";
// import allStatistics from "../systemManage/allStatistics.vue";
// import eventManagement from "../eventManage/index.vue";
// import earthquakeEvent from "../earthquakeEvent/index.vue";
// import placeManage from "../stationsInfoManage/placeManage.vue";
import { useHandler } from "./index";
const { toTable, tableNumber, showTable, facility, closeTable, state, store } =
  useHandler();
</script>

<style style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
}
.table-box {
  position: fixed;
  // z-index: 9999;
  z-index: 4;
  top: 5%;
  left: 0%;
  width: 100%;
  height: 95%;
  // padding-top: 40px;
  // padding-left: 40px;
  background: rgba(10, 37, 88, 1);
  display: flex;
  .iconfont {
    position: absolute;
    right: 1%;
    color: #fff;
    top: 2%;
    padding: 5px;
    border: 1px solid #fff;
    border-radius: 50%;
    z-index: 999;
  }
}
</style>
