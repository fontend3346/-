<template>
  <!-- 图表 -->
  <div class="echart-box">
    <div class="echart">
      <!--图表标题-->
      <div v-if="alone" class="title-center">
        地震发送情况<span class="iconfont icon-guanbi"></span>
      </div>
      <span v-else :class="{ title: props.noIcon == false }"
        >{{ echartsTitle }}
      </span>

      <!--图表内容-->
      <div
        ref="echartsKeyId"
        :key="new Date().getTime()"
        class="echarts-assembly"
      ></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "echartDrag", seleteList: any, params: any): void;
}>();

interface Props {
  options: object;
}
const props = withDefaults(
  defineProps<{
    options?: any;
    echartsTitle: "";
    noIcon: boolean; //是否展示标题下的蓝色背景
    alone?: boolean;
    seleteList: any;
    startIndex: any;
    endIndex: any;
  }>(),
  {
    options: {},
    // 单个echarts图
    echartsTitle: "",
    alone: false,
    noIcon: false,
    seleteList: {},
    startIndex: "",
    endIndex: "",
  }
);
const {
  state,
  echartsKeyId,
  onClick,
  seleteList,
  startIndex,
  endIndex,
  echartDrag,
} = useHandler(props, emit);
</script>

<style scoped lang="less">
.echart-box {
  color: white;
  height: 100%;
  width: 100%;
  .title {
    background: url("../../../src/assets/image/title-bg.png");
    background-size: 100% 100%;
    padding: 1px;
  }
  #main {
    margin-top: 10px;
  }
  .echarts-assembly {
    margin-top: 10px;
    height: 200px;
    width: 100%;
  }
  .title-center {
    position: relative;
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background-image: none;
    background: #053276;

    .icon-guanbi {
      position: absolute;
      right: 10px;
    }
  }
}
</style>
