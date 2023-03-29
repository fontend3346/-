<template>

  <div id="mapContainer">
    <!-- <EchartBox/> -->
  </div>

  <!-- <div>
    <my-table
        :data="tableData"
        :columns="fields"
        :showIndex="true"
        border
        :isAction="true"
        :lookBtn="true"
        :detailBtn="true"
        :output="true"
      ></my-table>
  </div> -->

  <div>
    <div id="mapContainer">
      <EchartBox/>
      <my-table>
      </my-table>
    </div>

    <my-table>
    </my-table>
</template>

<script lang="ts" setup>
import { reactive, onMounted, toRefs, getCurrentInstance } from "vue";
import baseMap from "@/plugins/lib/baseMaps";
//import EchartBox from '../../../components/echartBox/index.vue'
// import myTable from '@/components/table/my-table.vue'
onMounted(() => {
  initMap();
});
let baseMapObj: any = null;
let map: any = null;

// 初始化地图
const initMap = () => {
  baseMapObj = new baseMap({
    container: "mapContainer",
    zoom: 3,
    // center: [123.31054687499999, 36.38591277287651],
  });

  map = baseMapObj.map;
  map.on("load", function () {
    // addAreaString();
    // addPointString();
  });
};
</script>

<style lang="less" scoped>
#mapContainer {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
