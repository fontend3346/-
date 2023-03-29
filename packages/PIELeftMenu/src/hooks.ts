import { Emits, Props } from "./interfaces";
import { ref, onMounted, watch } from "vue";
import store from "@/store";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  let isCollapse = ref(true);
  onMounted(() => {});
  const menuCkick = (row: any) => {
    emit("menuCkick", row);
  };
  const showMenu = () => {
    isCollapse.value = false;
    store.commit("SET_MENUSHOW", isCollapse.value);
  };
  const closeMenu = () => {
    isCollapse.value = true;
    store.commit("SET_MENUSHOW", isCollapse.value);
  };
  const handleOpen = () => {};
  const handleClose = () => {};
  watch(
    () => isCollapse.value,
    (value) => {},
    {
      immediate: true,
    }
  );
  return {
    menuCkick,
    isCollapse,
    showMenu,
    closeMenu,
    handleOpen,
    handleClose,
  };
};
