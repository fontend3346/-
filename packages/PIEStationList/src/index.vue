<template>
  <div
    class="list-box"
    :style="{
      width: width + 'vw',
      minHeight: height + 'vh',
    }"
  >
    <div class="list-title">
      <div class="title-line"></div>
      <span class="title-text">{{ titleName }}</span>
    </div>
    <div class="table-box">
      <!-- 表格 -->
      <PIETable
        :data="stationList"
        :columns="columns"
        :maxHeight="tableHeight"
        border
        @on-row-click="rowClick"
      >
        <template v-slot:level="level">
          <span
            v-if="level.row.level == 1"
            class="iconfont icon-yuandian"
          ></span>
          <span v-else class="iconfont icon-yuandiancheng-copy"></span>
        </template>
      </PIETable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "rowClick", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    stationList: any;
    titleName: string;
    columns: any;
    tableHeight: any;
    width: string;
    height: string;
  }>(),
  {
    stationList: [],
    labelList: [],
    titleName: "台站列表",
    iconName: "",
    tableHeight: "",
    width: "25",
    height: "30",
  }
);

const { activeIndex, rowClick } = useHandler(props, emit);
</script>
