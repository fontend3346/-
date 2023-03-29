import { Emits, Props } from "./interfaces";
import { reactive, onMounted, watch, ref, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const state = reactive({
    dispatchMainList: [],
    activeIndex: 0,
    // total: 10,
    pageSize: 10,
    pageNum: 1,
  });
  // 点击某一个
  const workTickets = (row: any, index: any) => {
    state.activeIndex = index;
    emit("workTickets", row, index);
  };
  // 查看附件
  const fileModal = (row: any) => {
    emit("fileModal", row);
  };
  // 查看图片
  const imagesModal = (row: any) => {
    emit("imagesModal", row);
  };
  // 分页
  const pageChange = (val: any) => {
    state.pageNum = val;
    emit("pageChange", val);
  };
  // 分页
  const sizeChange = (val: any) => {
    state.pageSize = val;
    emit("sizeChange", val);
  };
  onMounted(() => {});
  return { state, workTickets, fileModal,imagesModal, pageChange, sizeChange };
};
