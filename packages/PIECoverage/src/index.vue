<template>
  <!-- 图表 -->
  <div class="echart-coverage" v-if="pieCoverage">
    <div class="content" v-for="(item, index) in coverageList" :key="index">
      <div @click="selectChange(item,$event)" class="item-coverage" v-if="item.isShow">
        <div>{{ item.label }}</div>

        <span v-if="!item.value" class="iconfont icon-yanjing_bi"></span>
        <span v-else class="iconfont icon-yanjing-kai"></span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "selectChange", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    pieCoverage: boolean;
    coverageList: any;
  }>(),
  {
    pieCoverage: true,
    coverageList: [
      {
        label: "台网",
        value: true,
      },
    ],
  }
);
// const props = defineProps({q'AAAA
//   options: {
//     type: Object,
//   }
// })
const { state, selectChange } = useHandler(props, emit);
</script>
