import { onMounted, watch, reactive, ref } from "vue";
import { Emits, Props } from "./interfaces";
import http from "../../../src/api/index";
import { ElMessage } from "element-plus";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  // 二三维切换
  const checkFn = (e: any) => {
    emit('checkFn', e);
  }
  // 放大功能
  const enlargeFn = (e: any) => {
    emit('enlargeFn', e);
  };
  // 缩小功能
  const reduceFn = (e: any) => {
    emit('reduceFn', e);
  };
  // 切换底图
  const checkLayer = (e: any) => {
    emit('checkLayer', e);
  };
  // 图层
  const coverageList = (e: any) => {
    emit('coverageList', e);
  };
  // 统计按钮
  const allStatisticsClick = (e: any) => {
    emit('allStatisticsClick', e);
  }
  // 专题图
  const thematicMapFn = (e: any) => {
    emit('thematicMapFn', e);
  }
  const resetFn = (e: any) => {
    emit('resetFn', e)
  }
  onMounted(() => {

  });
  return {
    checkFn,
    enlargeFn,
    reduceFn,
    checkLayer,
    coverageList,
    allStatisticsClick,
    resetFn,
    thematicMapFn
  };
};
