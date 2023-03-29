import {
  reactive,
  nextTick,
  onMounted,
  ref,
  getCurrentInstance,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import store from "@/store";

export const useHandler = () => {
  let tableNumber: any = ref(1); //展示表格内容
  let showTable = ref(true); //展示表格
  let facility = ref(false); // 设备表格弹框
  const state: any = reactive({
    allStatisticsShow: false,
    menuList: [],
  });
  const route = useRoute();

  //展示表格
  const toTable = (item: any) => {
    // tableNumber.value = item.value;
    tableNumber.value = item.id;
    state.allStatisticsShow = false;
    nextTick(() => {
      showTable.value = true;
    });
    // router.push({
    //   path: item.path,
    // });
  };
  //关闭表格
  const closeTable = () => {
    state.showTree = true;
    state.facility = false;
    showTable.value = !showTable.value;
  };
  onMounted(() => {
    JSON.parse(store.state.user.menuList).forEach((item: any) => {
      if (item.label == "系统管理") {
        state.menuList = item.children;
      }
    });
  });
  return {
    toTable,
    tableNumber,
    showTable,
    facility,
    closeTable,
    state,
    store,
  };
};
