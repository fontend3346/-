<template>
  <div class="container-header">
    <!-- 左侧 -->
    <div class="top-grade">
      <div class="header-left">
        <img class="left-img" src="@/assets/logo.png" />
        <div class="left-title">{{ title }}</div>
      </div>
      <div class="right-content">
        <div class="center-trigon"></div>

        <!-- 中间目录 -->
        <div class="header-center">
          <!-- <div v-for="(item, index) in menuList" :class="[
          'menu-list-item',
          'center-menu',
          curId == item.id ? 'active' : '',
        ]" :key="index" @click="changeMenu(item)">
          <span class="menu-title"> {{ item.label }} </span>
        </div> -->
          <!-- <div class="center-trigon"></div> -->
          <div
            class="header-article"
            v-if="navigationShow && menuList.length > 0"
          >
            <div
              v-for="(item, index) in menuList"
              :class="[
                'menu-list-item',
                'center-menu',
                state.curId == item.parentId ? 'active' : '',
              ]"
              :key="index"
              @click="changeMenu(item)"
            >
              <span class="menu-title"> {{ item.label }} </span>
            </div>
          </div>
        </div>
        <!-- 右侧部分 -->
        <div class="header-right">
          <div class="home-button" @click="backHome">
            <img src="../assets/image/home.png" alt="" />
          </div>
          <div>
            标准时间:<span class="right-time">{{ state.time }}</span>
          </div>
          <div class="admin-span">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <span class="iconfont icon-yonghu"></span>
                管理员
                <span class="iconfont icon-xiala"></span>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <span @click="personalCenter">
                    <el-dropdown-item class="padding"
                      >个人中心</el-dropdown-item
                    >
                  </span>
                  <span @click="goBackHome">
                    <el-dropdown-item class="Center">退出</el-dropdown-item>
                  </span>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <!-- 告警 -->
          <div class="alarm-button">
            <span class="iconfont icon-gaojingkongxin"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 导航栏 -->
    <!-- <article class="heard-article" v-if="navigationShow && menuList.length > 0">
      <div
        v-for="(item, index) in menuList"
        :class="[
          'menu-list-item',
          'center-menu',
          state.curId == item.parentId ? 'active' : '',
        ]"
        :key="index"
        @click="changeMenu(item)"
      >
        <span class="menu-title"> {{ item.label }} </span>
      </div>
    </article> -->
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
} from "vue";
import store from "@/store";
const props = withDefaults(
  defineProps<{
    title: string;
    menuList: any;
    showMenu: boolean;
    showConfig: boolean;
    navigationShow: boolean;
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
  state.date = utils.formatDate(new Date(), 1);

  setInterval(() => {
    state.time = utils.formatDate(new Date(), 2);
    state.date = utils.formatDate(new Date(), 1);
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
.active {
  height: 100%;
  color: #4d96be;
  background: rgba(0, 0, 0, 0.2);
  text-shadow: 10px;
}

.iconfont {
  color: #fff;
  font-size: 24px;
}

.icon-yonghu {
  margin-right: 8px;
  font-size: 26px;
}

.container-header {
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: @global-header-bg;

  .top-grade {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    width: 100%;
    height: @header-menu-height;
    align-items: center;
    color: @main-font-color;
    border: 1px solid @global-header-bbg;

    .header-left {
      width: 500px;
      height: 100%;
      font-size: 23px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;
      // padding: 0 30px;
      background: url("../assets/image/header_bg.png") no-repeat;
      // background-repeat: no-repeat;
      background-size: 100% 100%;
      z-index: 6;

      // background-position: center;
      .left-img {
        width: 35px;
        margin-left: 30px;
      }

      .left-title {
        margin-left: 30px;
      }
    }

    .right-content {
      flex: 1;
      display: flex;
      box-sizing: border-box;
      margin: 6px 0;
      background: #0e3358;
      align-items: center;
      margin-left: -30px;

      // margin-left: -30px;
      .center-trigon {
        height: 40px;
        background: #0e3358;
        // transform: translate(-50px, -5px) rotate(-58deg); //   width:0;
        // overflow: hidden;
        border-top: solid 40px @global-header-bg;
        border-right: solid 26px rgba(0, 0, 0, 0); //   height:0;
        //   // border: none;
        //   border-left: 80px solid rgba(0,0,0,0);
        //   border-top: 80px solid rgba(0,0,0,0);
        //   border-right: 80px solid #02457a;
        //   border-bottom: 80px solid #02457a;
      }

      .header-center {
        // width: 75%;
        height: 100%;
        display: flex;
        overflow: hidden;
        flex: 1;

        .center-menu {
          // width: calc(100% - 160px);
          display: flex;
          justify-content: space-around;
        }
      }

      .header-right {
        width: 400px;
        height: 100%;
        padding-right: 30px;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .alarm-button {
          margin-left: 10px;
          cursor: pointer;

          .iconfont {
            font-size: 20px;
          }
        }

        .home-button {
          margin-right: 20px;
          cursor: pointer;

          img {
            height: 100%;
          }
        }

        .right-time {
          color: #008fc9;
          margin-left: 8px;
        }

        .admin-span {
          height: 100%;
          // width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 15px;

          .title-style {
            padding-left: 5px;
          }

          .el-dropdown-link {
            height: 100%;
            display: flex;
            align-items: center;
            color: #fff;
          }

          .icon-wang {
            margin-right: 8px;
          }
        }

        :deep(.el-dropdown-menu) {
          // padding: 5px 20px;
          padding: 0;
        }
      }
    }
  }

  .heard-article {
    display: flex;
    height: 44px;
    align-items: center;
    justify-content: center;
    background: #032129;
    color: #fff;
  }

  .header-article {
    display: flex;
    height: 44px;
    align-items: center;
    justify-content: flex-start;
    // background: #032129;
    color: #c9e1ff;
    flex: 1;
  }
}

.menu-list {
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  // justify-content: space-around;
  margin-left: 100px;

  &-item {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-size: @header-item-size;
    cursor: pointer;
    // flex: 1;
    min-width: 120px;
    // max-width: 240px;
    margin-left: 30px;
  }
}
</style>
