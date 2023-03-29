<template>
  <div class="container-header">
    <div class="header-left">
      <div class="time-info">
        <div class="time">
          <div>{{ state.date }}</div>
          <div>{{ state.time }}</div>
        </div>
        <div class="line"></div>
        <div class="time">
          <div><span class="iconfont icon-a-qingbeifen5 day"></span>晴</div>
          <div>3/17℃</div>
        </div>
      </div>
      <!-- 未对接登录权限后的头部 -->
      <!-- <div class="left-menu-list" v-if="navigationShow && menuList.length > 0">
        <template v-for="(item, index) in menuList" :key="index">
          <div
            v-if="index < 3"
            class="menu-items"
            :class="[state.curId == item.parentId ? 'active' : 'normal']"
            @click="changeMenu(item)"
          >
            <span class="menu-title"> {{ item.label }} </span>
          </div>
        </template>
      </div>
      <div class="right-menu-list" v-if="navigationShow && menuList.length > 0">
        <template v-for="(item, index) in menuList" :key="index">
          <div
            v-if="index >= 3"
            class="menu-items"
            :class="[state.curId == item.parentId ? 'active' : 'normal']"
            @click="changeMenu(item)"
          >
            <span class="menu-title"> {{ item.label }} </span>
          </div>
        </template>
      </div> -->
      <!-- 对接登录权限后的头部 -->
      <div class="left-menu-list" v-if="navigationShow && menuList.length > 0">
        <div v-for="(item, index) in menuList" :key="index">
          <div
            v-if="index < 3 && item.isShowMenu"
            class="menu-items"
            :class="[state.curId == item.parentId ? 'active' : 'normal']"
            @click="changeMenu(item)"
          >
            <span class="menu-title">
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
      <div class="right-menu-list" v-if="navigationShow && menuList.length > 0">
        <template v-for="(item, index) in menuList" :key="index">
          <div
            v-if="index >= 3 && item.isShowMenu"
            class="menu-items"
            :class="[state.curId == item.parentId ? 'active' : 'normal']"
            @click="changeMenu(item)"
          >
            <span class="menu-title"> {{ item.label }} </span>
          </div>
        </template>
      </div>
    </div>
    <div class="title">
      <!-- <img class="left-img" src="@/assets/logo.png" /> -->
      <div class="left-title">{{ title }}</div>
    </div>
    <!-- 右侧部分 -->
    <div class="header-right">
      <div class="admin-span">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <span class="iconfont icon-renyuanguanli user"></span>
            {{ userName }}
            <span class="iconfont icon-xiala"></span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <span @click="personalCenter">
                <el-dropdown-item class="padding">个人中心</el-dropdown-item>
              </span>
              <span @click="goBackHome">
                <el-dropdown-item class="Center">退出</el-dropdown-item>
              </span>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="login-out" @click="goBackHome" title="退出">
        <span class="iconfont icon-tuichu tuichu"></span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import utils from "@/utils/utils";
import {
  reactive,
  onBeforeMount,
  onMounted,
  toRefs,
  getCurrentInstance,
  ref,
} from "vue";
import store from "@/store";
import { log } from "console";
const props = withDefaults(
  defineProps<{
    title: string;
    menuList: any;
    showMenu?: boolean;
    showConfig?: boolean;
    navigationShow?: boolean;
  }>(),
  {
    menuList: [],
    navigationShow: true,
    // 标题
    title: "标题",
    // 是否展示菜单
    showMenu: true,
    // 是否可设置
    showConfig: true,
  }
);
const userName = ref("admin");
const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "reset", e: MouseEvent): void; //点击事件
  (event: "confirm", e: MouseEvent): void; //点击事件
  (event: "cancel", e: MouseEvent): void; //点击事件
  (event: "mouseModalDown", e: MouseEvent): void; //点击事件
}>();
const {
  appContext: {
    config: { globalProperties },
  },
} = getCurrentInstance() as any;
const state = reactive({
  isFullscreen: true,
  time: "",
  date: "",
  curId: "",
  loginTitle: "admin",
  show: true,
});
onBeforeMount(() => {
  isTime();
});
onMounted(() => {
  userName.value = localStorage.getItem("user");
  if (globalProperties.$route.meta.parentId) {
    state.curId = globalProperties.$route.meta.parentId;
  } else {
    state.curId = "home";
  }
});
// 跳转到主页
const toHome = () => {
  // console.log("home");
  globalProperties.$router.push("/home");
};
// 跳转
const backHome = () => {
  window.location.href = (window as any).gateway.homeUrl;
};

const fullScreen = () => {
  if (state.isFullscreen) {
    utils.screenFullEnter();
  } else {
    utils.screenFullOut();
  }

  state.isFullscreen = !state.isFullscreen;
};
//去主页
const goHome = () => {
  let urlAddress = `http://${window.location.host}/tj/admin/`;
  location.href = urlAddress;
  // this.$router.push("/");
};
// 计时器
const isTime = () => {
  // let time = setInterval(() => {
  //   _this.time = _this.$utils.formatDate(new Date(), 2);
  // }, 1000);
  state.time = utils.formatDate(new Date(), 2);
  state.date = utils.formatDate(new Date(), 8);

  setInterval(() => {
    state.time = utils.formatDate(new Date(), 2);
    state.date = utils.formatDate(new Date(), 8);
  }, 1000);
};
const changeMenu = (item: any) => {
  // if (item.name == "QB数据服务") {
  //   window.open(this.iframeURL);
  //   return;
  // }
  // console.log(item,'item')
  // if(props.navigationShow){
  emit("changeMenu", item);
  // }

  // globalProperties.$router.push({ path: item.path, query: {} });
  state.curId = item.parentId;
};
// 个人中心
const personalCenter = () => {
  emit("personalCenter");
};
// 退出
const goBackHome = () => {
  store.commit("REMOVE_INFO");
  globalProperties.$router.push("/login");
  emit("goBackHome");
};
</script>

<style scoped lang="less">
.container-header {
  position: relative;
  width: 100%;
  height: @header-menu-height;
  background: url("../assets/qietu/header-bg.png");
  background-size: 100% 100%;
  z-index: 6;
  display: flex;
  color: #fff;
  .header-left {
    display: flex;
    .time-info {
      display: flex;
      height: 44px;
      align-items: center;
      margin-left: @global-margin;
      .time {
        display: flex;
        flex-direction: column;
        height: 44px;
        justify-content: center;
        // margin-left: @global-margin;
        .day {
          color: #ffda00;
          margin-right: 10px;
        }
      }
      .line {
        width: 1px;
        height: 34px;
        background-color: rgba(2, 170, 251, 0.4);
        margin: 0 6px;
      }
    }

    .left-menu-list {
      display: flex;
      flex-direction: row;
      height: 44px;
      align-items: center;
      position: absolute;
      left: 10%;
      z-index: 9;
      .menu-items {
        height: 36px;
        width: 152px;
        text-align: center;
        line-height: 36px;
        margin-right: -20px;
        .menu-title {
          font-size: @header-item-size;
        }
      }
      .active {
        background: url("../assets/qietu/menu-active.png");
        background-size: 100% 100%;
      }
      .normal {
        background: url("../assets/qietu/menu.png");
        background-size: 100% 100%;
      }
    }
    .right-menu-list {
      display: flex;
      flex-direction: row;
      height: 44px;
      align-items: center;
      position: absolute;
      left: 68%;
      z-index: 9;
      .menu-items {
        height: 36px;
        width: 152px;
        text-align: center;
        line-height: 36px;
        margin-right: -20px;
        .menu-title {
          font-size: @header-item-size;
        }
      }
      .active {
        background: url("../assets/qietu/menu-active2.png");
        background-size: 100% 100%;
      }
      .normal {
        background: url("../assets/qietu/menu2.png");
        background-size: 100% 100%;
      }
    }
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    // left: 46%;
    .left-img {
      width: 30px;
      height: 30px;
    }

    .left-title {
      // margin-left: 20px;
      font-size: 26px;
      color: #ffffff;
      font-family: "DouYuFont";
    }
  }
  .header-right {
    display: flex;
    height: 44px;
    align-items: center;
    position: absolute;
    right: 0;
    font-size: 16px;
    .login-out {
      border-left: 1px solid rgba(2, 170, 251, 0.4);
      padding: 0 10px;
      margin-left: 10px;
      .tuichu {
        font-size: 20px;
      }
    }
  }
}
.el-dropdown-link {
  height: 100%;
  display: flex;
  align-items: center;
  color: #fff;
}
.user {
  font-size: 20px;
  background: rgba(0, 78, 150, 0.6);
  color: #00fff8;
  padding: 2px;
  border-radius: 5px;
  border: 1px solid rgba(7, 158, 238, 1);
  margin-right: 10px;
}
</style>
