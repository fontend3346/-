import { onMounted, watch, reactive, ref } from "vue";
import { Emits, Props } from "./interfaces";
import http from "../../../src/api/index";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const state: any = reactive({
    // activeIndex: "", //选中菜单名,
    activeIndex: "/netManage", //选中菜单名,
    mlist: [],
  });
  // 点击每一项事件
  const menuCkick = (item: any) => {
    emit("toTable", item);
    // router.push({
    //   path: item.path,
    // });
    state.activeIndex = item.path;
  };
  onMounted(() => {
    props.leftMeuList.forEach((item: any) => {
      if (item.label == '系统管理') {
        state.mlist = item.children;
        return;
      }
    })
    // getType();
    // searchStationList();
  });
  return {
    state,
    menuCkick,
  };
};
