<template>
  <div class="layout pie-interspace">
    <header>
      <basic-header
        class="basic-header"
        :menuList="menuList"
        title="数据引接系统定制软件"
        @changeMenu="changeTopMenu"
      >
      </basic-header>
    </header>
    <div class="content">
      <div class="home-content">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component
              v-if="$route.meta && $route.meta.keepAlive"
              :is="Component"
            />
          </keep-alive>
          <component v-if="!$route.meta.keepAlive" :is="Component" />
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, toRefs, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import basicHeader from "./basicHeader.vue";

export default {
  components: {
    basicHeader,
  },
  setup() {
    const {
      appContext: {
        config: { globalProperties },
      },
    } = getCurrentInstance() as any;

    //跳转登录页面
    const jump: any = () => {
      const router = useRouter();
      globalProperties.$router.push({ path: "/" });
      // router.replace({path:"home"});
    };
    const state = reactive({
      isMenuShow: true, // 是否显示头部
      newDisplay: false, // 头部消息框的显示与隐藏
      selectIdh: "userManagement",
      dateTime: globalProperties.$utils.formatDate(new Date(), 1),
      time: "",
      week: globalProperties.$utils.getWeek(new Date()),
      isShow: false,
      isColl: false,
      activeName: globalProperties.$route.meta.parentId
        ? "/" + globalProperties.$route.meta.parentId
        : "/needToAccept", //选中菜单名
      //  activeName:'/', //选中菜单名
      openNames: [], //哪个Menuitem应该展开
      meuList: [
        {
          id: "0",
          icon: "icon-wxbbaobiao",
          url: "sceneEditor",
          title: "场景编辑",
          ischild: false,
        },
        // {
        //   id: 1,
        //   icon: "icon-renwuguanli",
        //   url: "sceneMonitor",
        //   title: "场景监控",
        //   ischild: false,
        // },
        {
          id: "2",
          icon: "icon-chakantiaodurizhi",
          url: "deductionRecord",
          title: "推演记录",
          ischild: false,
        },
        {
          id: "3",
          icon: "icon-shuliang_mianxing",
          url: "assetsManage",
          title: "资产管理",
          ischild: false,
        },
      ],
      // 顶部菜单
      menuList: [
        {
          id: "1",
          path: "/",
          label: "数据汇集与管理",
          childre: false,
        },
        {
          id: "2",
          path: "/",
          label: "数据质量与监测能力分析",
          childre: false,
        },
        {
          id: "3",
          path: "/",
          label: "数据公报与服务分系统",
          childre: false,
        },

        // {
        //   id: "4",
        //   path: "dataIngestion",
        //   label: "方案数据与成果管理",
        //   children: [
        //     {
        //       id: "4-0",
        //       title: "数据管理",
        //       ischild: true,
        //       children: [
        //         {
        //           url: "/dataIngestion",
        //           title: "数据入库",
        //         },
        //         {
        //           url: "/dataPush",
        //           title: "数据推送",
        //         },
        //         {
        //           url: "/directoryManagement",
        //           title: "目录管理",
        //         },
        //         {
        //           url: "/sampleTask",
        //           title: "样本标注任务管理",
        //         },
        //       ],
        //     },
        //     {
        //       id: "4-1",
        //       title: "查询展示",
        //       ischild: true,
        //       children: [
        //         {
        //           url: "/remoteSensing",
        //           title: "遥感影像",
        //         },
        //         // {
        //         //   url: "/algorithm",
        //         //   title: "算法模型",
        //         // },
        //         {
        //           url: "/sampleData",
        //           title: "样本数据",
        //         },
        //         {
        //           url: "/productOutcomesAll",
        //           title: "产品成果",
        //         },
        //         {
        //           url: "/taskData",
        //           title: "任务数据",
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
    });
    onMounted(() => {
      // state.activeName = globalProperties.$route.name;
      // state.openNames = globalProperties.$route.meta.parentId;
      // state.selectIdh = globalProperties.$route.meta.parentId;
      // getData();
      // isTime();
      // debugger
      // select('验证任务方案规划')
      if (globalProperties.$route.name == "home") {
        state.isMenuShow = false;
      }
      let topMenu = localStorage.getItem("topMenu");
      if (topMenu) {
        state.meuList = JSON.parse(topMenu).children;
      }
    });
    //获取数据
    const getData = () => {
      let params = {
        parentId: 0,
        systemId: 1,
        type: "",
        pageNum: "",
        pageSize: "",
      };
      globalProperties.$api.menuList.getMenuList(params).then((res: any) => {
        if (res.code == 0) {
          // state.navigationList = res.data.permissionList;
          // state.dataList = res.data.groupList;
        } else {
          globalProperties.$Message.info(res.message);
        }
      });
    };
    const route = useRoute();
    const store = useStore();
    const menuCkick = (item: any) => {
      // console.log(item)
      globalProperties.$router.push({
        path: item.url,
      });
    };
    //计时器
    const isTime = () => {
      let _state = state;
      let time = setInterval(() => {
        _state.time = globalProperties.$utils.formatDate(new Date(), 2);
      }, 1000);
    };
    //通知
    const notice = () => {
      state.isShow = !state.isShow;
    };
    // 头部消息框
    const newsCheck = () => {
      // 获取消息框
      state.newDisplay = !state.newDisplay;
    };
    // 点击每条消息跳转到具体页面
    const news_router = () => {
      console.log("跳转到新闻页面");
      globalProperties.$router.push({
        path: "/news",
        query: {},
      });
    };

    //弹出
    const change = () => {
      state.isColl = !state.isColl;
      // setTimeout(() => {
      // state.isColl = !state.isColl;

      // }, 4000);
    };
    //点击顶部按钮
    const changeTopMenu = (item: any) => {
      if (item.hasOwnProperty("children")) {
        globalProperties.$router.push(item.path);
        state.meuList = item.children;
        // console.log(item,'item')
        localStorage.setItem("topMenu", JSON.stringify(item));
        state.isMenuShow = true;
      } else {
        state.isMenuShow = false;
        globalProperties.$router.push(item.path);
      }
    };
    // 寻找目录递归函数
    const searchMenu = (target: any, obj: any) => {
      if (obj.children) {
        for (let i = 0; i < obj.children.length; i++) {
          if (target == obj.children[i].path) {
            return obj.children;
          }
          if (obj.children[i].children) {
            let _item = searchMenu(target, obj.children[i]);
            if (_item) return obj.children;
          }
        }
      } else {
        for (let i = 0; i < obj.length; i++) {
          if (target == obj[i].path) {
            return obj;
          }
        }
      }
    };

    return {
      ...toRefs(state),
      getData,
      menuCkick,
      isTime,
      notice,
      newsCheck,
      news_router,
      change,
      jump,
      changeTopMenu,
    };
  },
};
</script>

<style scoped lang="less">
.child-title {
  margin-left: 20px;
}

/* 视口调整 */
.layout {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.home-header {
  display: flex;
  width: 100%;
  height: 50px;
  position: relative;
  // margin-bottom: 25px;
}

.home-main-title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin-bottom: 8px;

  .main-title {
    font-size: @main-title-size;
    color: @menu-font-color;
    font-weight: bold;
  }
}

.left-item {
  justify-content: flex-end;
  align-items: flex-end;
  padding-bottom: 8px;
}

.right-item {
  justify-content: space-between;
  padding-bottom: 8px;
  flex-direction: row;
  /* flex-direction: column; */
  flex: 1;
}

.el-menu-item.is-active,
.el-sub-menu-item.is-active {
  background: #0077a9;
}

.el-menu-item.is-active,
.el-sub-menu-item.is-active {
  color: #fff !important;
}

.content {
  min-height: calc(100vh - 80px);
  display: flex;
  box-sizing: border-box;

  .home-content {
    flex: 1;
  }
}

.menu-title {
  margin-left: 15px;
}

.notice {
  position: relative;

  .notice-message {
    position: absolute;
    top: 30px;
    left: -40px;
    width: 100px;
    max-height: 200px;
    background-color: #09123e;
    opacity: 0.8;
    overflow-y: scroll;
  }
}

ul {
  font-size: 15px;

  li {
    padding: 5px 0;
    text-align: center;
  }
}

.badge {
  :v-deep(.el-badge-count) {
    border: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    top: 5px;
    right: -15px;
  }
}

.system-setting-item {
  margin-right: 40px;
}

.logout {
  margin-right: 0;
}

.exit-btn {
  font-size: 20px;
  cursor: pointer;
}

.icon-xitong {
  font-size: 18px;
  color: @main-font-color;
  margin-right: 10px;
}

.el-menu {
  background: transparent;
  border: none;
}

:deep(.el-sub-menu .el-menu) {
  background: transparent;
}

:deep(.menu-item) {
  color: @main-font-color;
}

:deep(.el-sub-menu__title) {
  font-size: 18px;
  color: @main-font-color;
  margin-left: 30px;
}

:deep(.el-sub-menu__title:hover) {
  background: transparent;
}

:deep(.el-sub-menu .el-icon) {
  color: transparent;
  vertical-align: bottom;
  left: -180px;
}

:deep(.el-sub-menu .el-sub-menu__icon-arrow::before) {
  content: url("../assets/images/arrr.png");
}

:deep(.el-sub-menu.is-opened > .el-sub-menu__title .el-sub-menu__icon-arrow) {
  transform: rotateZ(90deg);
}

.el-menu-item:hover {
  // background: transparent;
  background: #0077a9;
}

.el-menu-item,
.el-sub-menu-item {
  font-size: 18px;
  color: @main-font-color;
}

// .el-menu-item.is-active,
// .el-sub-menu-item.is-active {
//   color: #1077f5;
// }
.news {
  position: relative;

  .news_box {
    position: absolute;
    left: -160px;
    margin-top: 8px;
    width: 300px;
    height: 500px;
    background-color: #fff;

    .sanjiao {
      position: absolute;
      left: 170px;
      top: -15px;
      width: 0px;
      height: 0px;
      border: 8px solid transparent;
      border-bottom-color: #fff;
    }

    .news_item {
      display: flex;
      padding: 10px 10px;

      .user_img {
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
      }

      .box_content {
        padding-left: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
      }
    }
  }
}

.coll {
  position: absolute;
  right: 20px;
  top: 80px;
  z-index: 100;
}
</style>
