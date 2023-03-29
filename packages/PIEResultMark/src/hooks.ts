import { onMounted, watch, reactive, ref } from "vue";
import { Emits, Props } from "./interfaces";
import http from "../../../src/api/index";
import { ElMessage } from "element-plus";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const state = reactive({
    title: "结果展示",
  });
  // 取消
  const cancel = () => {
    emit("cancel");
  };

  watch(
    () => props,
    () => {},
    {
      deep: true,
    }
  );

  onMounted(() => {});
  return {
    state,
    cancel,
  };
};
