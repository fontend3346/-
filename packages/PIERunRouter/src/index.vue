<template>
  <div ref="modalRef" class="router-list">
    <div
      v-for="item in leftMeuList"
      :key="item.id"
      class="single-menu"
      :index="item.path"
      @click="menuCkick(item)"
    >
      <img
        src="@/assets/qietu/router-active.png"
        class="img-style"
        v-if="state.activeIndex == item.path"
      />
      <img src="@/assets/qietu/router.png" class="img-style" v-else />
      <span class="menu-title"> {{ item.title }}</span>
    </div>

    <!-- 权限菜单显隐 -->
    <!-- <template v-for="item in state.mlist" :key="item">
      <div
        v-if="item.isShowMenu"
        class="single-menu"
        :index="item.path"
        @click="menuCkick(item)"
      >
        <img
          src="@/assets/qietu/router-active.png"
          class="img-style"
          v-if="state.activeIndex == item.path"
        />
        <img src="@/assets/qietu/router.png" class="img-style" v-else />
        <span class="menu-title"> {{ item.title }}</span>
      </div>
    </template> -->
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useHandler } from "./hooks";
import utils from "../../../src/utils/utils";
const emit = defineEmits<{
  (event: "toTable", e: any): void;
}>();

const props = withDefaults(
  defineProps<{
    leftMeuList: any;
  }>(),
  {
    leftMeuList: [
      { id: 1, path: "/netManage", title: "台网管理" },
      { id: 2, path: "/stationsManage", title: "台站管理" },
      { id: 3, path: "/placeManage", title: "场地管理" },
      { id: 4, path: "/measurementPoint", title: "测点管理" },
      { id: 5, path: "/instrumentRegistration", title: "设备管理" },
      { id: 6, path: "/sampleManagement", title: "事件管理" },
      { id: 7, path: "/earthquakeEvent", title: "地震事件" },
    ],
  }
);
const modalRef = ref(null);
defineExpose({ modalRef });

const { state, menuCkick } = useHandler(props, emit);
</script>
<style scoped lang="less">
.router-list {
  z-index: 5;
  position: absolute;
  top: 8%;
  // left: 0.1%;
  display: flex;
  flex-direction: column;

  .single-menu {
    display: flex;
    width: 35px;
    // height: 120px;
    // border-left: 28px solid rgba(0, 0, 0, 0);
    // border-top: 20px solid transparent;
    // border-bottom: 20px solid transparent;
    // justify-content: center;
    // align-items: center;
    .img-style {
      width: 35px;
      height: 120px;
    }
    .menu-title {
      writing-mode: vertical-rl;
      margin-left: -30px;
      margin-top: 22px;
      color: rgb(255, 255, 255, 0.6);
      // color: @menu-font-color;
      font-weight: 200;
      font-size: 13px;
      letter-spacing: 3px;
    }
  }
}
</style>
