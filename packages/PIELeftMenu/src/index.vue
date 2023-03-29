<template>
  <div class="header-navigation">
    <div class="menutop">
      <div class="tickets" v-show="isCollapse == true">
        <el-tooltip content="点击展开目录" effect="dark" placement="right">
          <i class="iconfont icon-mulu" @click="showMenu"></i>
        </el-tooltip>
      </div>
      <div class="catelog" v-show="isCollapse == false">
        <span class="iconfont icon-liebiao1"></span>
        <span>目录</span>
        <i class="iconfont icon-shouqi-" @click="closeMenu"></i>
      </div>
    </div>
    <el-menu
      :unique-opened="true"
      :accordion="true"
      :default-active="activeIndex"
      class="left-menu-box"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <div v-for="item in leftMeuList" :key="item.id">
        <!-- 一级 -->
        <el-menu-item
          v-if="!item.ischild && item.isShowMenu"
          :index="item.path"
          @click="menuCkick(item)"
          :class="{ levelMenu: isCollapse }"
        >
          <el-tooltip :content="item.title" effect="dark" placement="right">
            <span class="iconfont" :class="item.icon"></span>
          </el-tooltip>
          <span class="menu-title" v-if="isCollapse == false">
            {{ item.title }}</span
          >
        </el-menu-item>
        <!-- 二级 -->
        <el-sub-menu v-if="item.ischild && item.isShowMenu" :index="item.path">
          <template #title>
            <div style="display: flex">
              <span class="iconfont" :class="item.icon"></span>
              <span v-if="isCollapse == false" class="menu-title">{{
                item.title
              }}</span>
            </div>
          </template>
          <div v-for="_item in item.children" :key="_item.id">
            <el-menu-item
              v-if="!_item.children && _item.isShowMenu"
              class="child-title"
              :index="_item.path"
              @click="menuCkick(_item)"
            >
              <span class="iconfont" :class="_item.icon"></span>
              {{ _item.title }}
            </el-menu-item>
            <!-- 第三级 -->
            <el-sub-menu
              v-if="_item.children && _item.isShowMenu"
              :index="_item.path"
            >
              <template #title>
                <div style="display: flex">
                  <span class="iconfont" :class="_item.icon"></span>
                  <span class="menu-title">{{ _item.title }}</span>
                </div>
              </template>
              <el-menu-item
                v-for="_item_ in _item.children"
                :key="_item_.path"
                :index="_item_.path"
                @click="menuCkick(_item_)"
                ><span class="iconfont" :class="_item_.icon"></span>
                {{ _item_.title }}</el-menu-item
              >
            </el-sub-menu>
          </div>
        </el-sub-menu>
      </div>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";
import { onMounted, ref, defineProps } from "vue";
const props = withDefaults(
  defineProps<{
    activeIndex: any;
    leftMeuList: any;
  }>(),
  {
    activeIndex: "",
    leftMeuList: [],
  }
);
const emit = defineEmits<{
  (event: "menuCkick", e: MouseEvent): void;
}>();
const { menuCkick, isCollapse, showMenu, closeMenu, handleOpen, handleClose } =
  useHandler(props, emit);
</script>
<style lang="less" scoped>
// /*隐藏 > */
// :deep(.el-sub-menu .el-sub-menu__icon-arrow) {
//   display: none;
// }
.levelMenu {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  padding-left: @global-padding;
  box-sizing: border-box;
}
.menutop {
  .tickets {
    cursor: pointer;
    width: 64px;
    height: 56px;
    .iconfont {
      display: inline-block;
      transform: translate(50%, 50%);
      font-size: 26px;
      color: @main-font-color;
    }
  }
  .tickets:hover {
    background: linear-gradient(
      270deg,
      #0e90ff 0%,
      rgba(14, 144, 255, 0.24) 100%
    );
  }
  .catelog {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    width: 300px;
    height: 56px;
    padding-left: @global-padding;
    box-sizing: border-box;
    span,
    i {
      display: inline-block;
      font-size: @main-font-size;
      color: @main-font-color;
      line-height: 56px;
    }
    i {
      cursor: pointer;
      width: 64px;
      height: 56px;
      line-height: 56px;
      margin-left: 110px;
      text-align: center;
      // margin-top: 5px;
      cursor: pointer;
    }
    i:hover {
      background: linear-gradient(
        270deg,
        #0e90ff 0%,
        rgba(14, 144, 255, 0.24) 100%
      );
    }
  }
}
:deep(.el-menu-item) {
  font-size: @main-font-size!important;
  color: @main-font-color!important;
  padding-left: @global-padding;
  box-sizing: border-box;
}
.header-navigation {
  background: url(../../../src/assets/qietu/modals-bg.png) no-repeat;
  background-size: 100% 100%;
  padding-top: @global-padding;
  display: flex !important;
  flex-direction: column;
  box-sizing: border-box;
  // width: 300px;
  height: 100%;
  overflow-y: auto;
  :deep(.el-menu),
  :deep(.el-sub-menu .el-menu) {
    background: transparent !important;
    border-right: none !important;
  }

  :deep(.el-sub-menu .el-menu-item),
  :deep(.el-menu-item) {
    font-size: @main-font-size!important;
    color: @main-font-color!important;
  }
  :deep(.el-menu-item:hover) {
    background: none;
    color: @menu-font-color !important;
  }

  :deep(.el-sub-menu__title) {
    // width: 200px;
    background-color: rgba(0, 0, 0, 0.2) !important;
    color: @main-font-color !important;
    font-size: @main-font-size;
  }
  :deep(.el-menu-item.is-active) {
    background: linear-gradient(
      270deg,
      #0e90ff 0%,
      rgba(14, 144, 255, 0.24) 100%
    );
    // background: @menu-active !important;
    color: @menu-selected!important;
    border-radius: 5px;
    span {
      color: @menu-font-color !important;
    }
  }
  :deep(.el-menu-item.is-active::before) {
    background-color: #0e90ff;
    content: "";
    display: block;
    width: 3px;
    height: 24px;
    position: absolute;
    left: -1px;
    top: 25%;
  }
  :deep(.el-icon svg) {
    color: @main-font-color!important;
  }
  .iconfont {
    padding-right: 12px;
    font-size: 20px;
  }
}

// .header-navigation::before {
//   content: "";
//   display: block;
//   /* width: 8px; */
//   // border-left: 28px solid rgba(0, 0, 0, 0);
//   border-top: 10px solid transparent;
//   border-left: 7px solid #0173dd;
//   border-bottom: 10px solid transparent;
//   /* border-right: 10px solid red; */
//   height: 32px;
//   position: absolute;
//   left: -1px;
//   top: 7%;
// }

// .header-navigation::after {
//   content: "";
//   display: block;
//   /* width: 8px; */
//   border-top: 10px solid transparent;
//   border-right: 7px solid #0173dd;
//   border-bottom: 10px solid transparent;
//   /* border-right: 10px solid red; */
//   height: 20%;
//   width: 0px;
//   position: absolute;
//   right: 0px;
//   top: 67%;
// }
.header-navigation::-webkit-scrollbar {
  display: none;
}
</style>
