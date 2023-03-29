<template>
  <div
    class="right-menu"
    :style="{ left: props.left + 'px', top: props.top + 'px' }"
    v-show="props.menuShow"
    ref="rightMenu"
  >
    <template v-for="(item, index) in props.menuList" :key="item">
      <div
        v-if="item.show"
        class="menu-item"
        @click="menuClick(item)"
        @mousemove="moveClick(item, index, $event)"
        @mouseout="overClick(item, index)"
      >
        <span>{{ item.title }}</span>
        <span v-if="item.children" class="iconfont icon-youjiantou"></span>
        <span v-else></span>
        <div
          ref="menuChild"
          class="menu-children"
          :style="{
            left: state.childLeft + 'px',
            right: state.childRight + 'px',
          }"
          v-if="item.children && state.activeIndex === index"
        >
          <div
            class="menu-item"
            v-for="i in item.children"
            :key="i"
            @click="menuChildrenClick(i, item)"
          >
            <span>{{ i.title }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useHandler } from "./hooks";

const props = withDefaults(
  defineProps<{
    left: number;
    top: number;
    menuShow: boolean;
    menuList: any;
    isFlag: any;
  }>(),
  {
    left: 0,
    top: 0,
    menuShow: false,
    menuList: [],
    isFlag: false,
  }
);

const emit = defineEmits<{
  (event: "menuClick", e: MouseEvent): void;
  (event: "menuChildrenClick", e: MouseEvent, item: any): void;
}>();

const {
  state,
  menuClick,
  moveClick,
  overClick,
  menuChildrenClick,
  rightMenu,
  menuChild,
} = useHandler(props, emit);
defineExpose({ rightMenu });
</script>
<style lang="less" scoped>
.right-menu {
  width: 150px;
  background: @global-bg;
  border: 1px solid @global-header-bbg;
  position: fixed;
  font-size: 14px;
  box-shadow: 0 0 5px rgba(51, 51, 51, 0.5);
  color: @main-font-color;
  z-index: 10;
  .menu-item {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    transition: all 0.3s;
    position: relative;

    .iconfont {
      font-size: 14px;
    }
  }
  .menu-item:hover {
    background: @menu-active;
    cursor: pointer;
  }
  .menu-children {
    position: absolute;
    left: 140px;
    top: 0;
    width: 150px;
    background: @global-bg;
    border: 1px solid @global-header-bbg;
    font-size: 14px;
    box-shadow: 0 0 5px rgba(51, 51, 51, 0.5);
    color: @main-font-color;
  }
}
</style>
