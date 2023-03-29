<template>
  <div class="privilegesTotal-main">
    <!-- 头部 -->
    <header>
      <basic-header
        class="basic-header"
        title="运行管理分系统"
        :menuList="state.menuList"
        @changeMenu="changeTopMenu"
      >
      </basic-header>
    </header>
    <!-- 中间 -->
    <div
      class="privilegesTotal-content"
      :class="state.activeIndex == '/systemManage' ? 'map-box' : ''"
    >
      <div class="left-menu" v-show="state.activeIndex != '/systemManage'">
        <PIELeftMenu
          :activeIndex="state.activeIndex"
          :leftMeuList="state.leftMeuList"
          @menuCkick="menuCkick"
        >
        </PIELeftMenu>
      </div>

      <div class="home-content">
        <!-- <div class="home-content" v-if="state.isActive != '/systemControl'"> -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import baseMap from "@/plugins/lib/baseMaps";
import basicHeader from "@/layouts/basicHeader.vue";
import {
  onBeforeUnmount,
  onMounted,
  ref,
  reactive,
  getCurrentInstance,
  watch,
  nextTick,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";
import http from "@/api";
const router = useRouter();
const route = useRoute();
const {
  appContext: {
    config: { globalProperties },
  },
} = getCurrentInstance() as any;

const state = reactive({
  isActive: "/systemManage",
  activeIndex: "/stationsInfoManage", //选中菜单名,
  openNames: [], //哪个Menuitem应该展开
  leftMeuList: [],
  // 顶部菜单
  menuList: [
    {
      id: "0",
      path: "/systemManage",
      label: "首页",
      childre: true,
      parentId: "systemManage",
      isShowMenu: true,
      shake: true, // 是否设置防抖
      children: [
        {
          id: "1",
          path: "/systemManage",
          title: "台站信息管理",
          ischild: true,
          parentId: "systemManage",
          isShowMenu: false,
        },
      ],
    },
    {
      id: "25",
      path: "/systemControl",
      label: "系统管理",
      ischild: false,
      parentId: "netSystem",
      childre: true,
      isShowMenu: false,
      shake: true, // 是否设置防抖
      children: [
        {
          id: "26",
          path: "/netSystem",
          title: "台网管理",
          ischild: false,
          parentId: "netSystem",
          isShowMenu: true,
          value: 1,
          icon: "icon-taiwangdahui-shouye",
          shake: true,
        },
        {
          id: "27",
          path: "/stationSystem",
          title: "台站管理",
          ischild: false,
          parentId: "netSystem",
          isShowMenu: true,
          value: 2,
          icon: "icon-taizhanganraodu",
          shake: true,
        },
        {
          id: "28",
          path: "/placeSystem",
          title: "场地管理",
          ischild: false,
          parentId: "netSystem",
          isShowMenu: true,
          value: 3,
          icon: "icon-changdi",
        },
        {
          id: "29",
          path: "/measureSystem",
          title: "测点管理",
          ischild: false,
          parentId: "netSystem",
          isShowMenu: true,
          value: 4,
          icon: "icon-yanchanengguancedian",
        },
        {
          id: "30",
          path: "/deviceSystem",
          title: "设备管理",
          ischild: false,
          parentId: "netSystem",
          isShowMenu: true,
          value: 5,
          icon: "icon-shebei",
        },
        {
          id: "31",
          path: "/tagSystem",
          title: "事件库管理",
          ischild: false,
          parentId: "netSystem",
          isShowMenu: true,
          value: 6,
          icon: "icon-yangbenxinxidanjibenxinxi",
        },
        // {
        //   id: "32",
        //   path: "/dzSystem",
        //   title: "地震事件",
        //   ischild: false,
        //   parentId: "netSystem",
        //   isShowMenu: true,
        //   value: 7,
        //   icon: "icon-shijian1",
        // },
        {
          id: "33",
          path: "/metaDataManage",
          title: "元数据管理",
          ischild: true,
          parentId: "netSystem",
          isShowMenu: true,
          value: 7,
          icon: "icon-a-daochushebeibeifen2",
          children: [
            {
              id: "34",
              path: "/seismmometryType",
              title: "台站类型管理",
              ischild: false,
              parentId: "netSystem",
              isShowMenu: true,
            },
            {
              id: "35",
              path: "/instrumentType",
              title: "地震学科分类管理",
              ischild: false,
              parentId: "netSystem",
              isShowMenu: true,
            },
            {
              id: "36",
              path: "/typeManage",
              title: "仪器类型管理",
              ischild: false,
              parentId: "netSystem",
              isShowMenu: true,
            },
            {
              id: "37",
              path: "/fieldsInfo",
              title: "元字段类型信息管理",
              ischild: false,
              parentId: "netSystem",
              isShowMenu: true,
            },
            {
              id: "38",
              path: "/fieldsType",
              title: "数据分区表管理",
              ischild: false,
              parentId: "netSystem",
              isShowMenu: true,
            },
            {
              id: "39",
              path: "/tableManagement",
              title: "数据等级表管理",
              ischild: false,
              parentId: "netSystem",
              isShowMenu: true,
            },
          ],
        },
      ],
    },
    {
      id: "9",
      path: "/schedulingManage",
      label: "值班管理",
      childre: true,
      parentId: "dutyManage",
      icon: "icon-zhibanjilu",
      isShowMenu: false,
      children: [
        // {
        //   id: "10",
        //   path: "/dutyManage",
        //   title: "值班管理",
        //   ischild: true,
        //   parentId: "dutyManage",
        //   icon: "icon-zhibanjilu",
        //   children: [],
        // },
        {
          id: "11",
          path: "/dutyManage",
          title: "日报管理",
          ischild: false,
          parentId: "dutyManage",
          icon: "icon-ribao",
          isShowMenu: true,
        },
        {
          id: "22",
          path: "/watchList",
          title: "值班排班",
          ischild: false,
          parentId: "dutyManage",
          icon: "icon-zhibanjilubeifen",
          isShowMenu: true,
        },
        // {
        //   id: "12",
        //   path: "/shiftManage",
        //   title: "交接班管理",
        //   ischild: false,
        //   parentId: "dutyManage",
        //   icon: "icon-renyuanchurushenqing-zhuanyi-011",
        // },
        {
          id: "13",
          path: "/totalReportManage",
          title: "统计报表管理",
          ischild: false,
          parentId: "dutyManage",
          icon: "icon-navicon-tjb",
          isShowMenu: true,
        },
        {
          id: "14",
          path: "/checkAndWarn",
          title: "突发事件及预警管理",
          ischild: true,
          parentId: "dutyManage",
          icon: "icon-chongtufenxi",
          isShowMenu: true,

          children: [
            {
              id: "15",
              path: "/disposalCheck",
              title: "突发事件处置登记",
              ischild: false,
              parentId: "dutyManage",
              // icon: "icon-tufa",
              isShowMenu: true,
            },
            {
              id: "16",
              path: "/warnInfoCheck",
              title: "预警信息发布登记",
              ischild: false,
              parentId: "dutyManage",
              // icon: "icon-yujing",
              isShowMenu: true,
            },
          ],
        },
      ],
    },
    {
      id: "17",
      path: "/subscriberManage",
      label: "用户管理",
      childre: true,
      parentId: "staffManage",
      isShowMenu: false,
      children: [
        // {
        //   id: "18",
        //   path: "/peopleManage",
        //   title: "权限管理",
        //   ischild: true,
        //   parentId: "staffManage",
        //   icon: "icon-zhibanjilubeifen",
        //   children: [],
        // },
        {
          id: "25",
          path: "/staffManage",
          title: "人员管理",
          ischild: false,
          parentId: "staffManage",
          icon: "icon-renyuanguanli",
          isShowMenu: true,
        },
        {
          id: "19",
          path: "/peopleManage",
          title: "用户管理",
          ischild: false,
          parentId: "staffManage",
          icon: "icon-renyuanliebiao",
          isShowMenu: true,
        },
        // {
        //   id: "20",
        //   path: "/institutionManage",
        //   title: "组织管理",
        //   ischild: false,
        //   parentId: "staffManage",
        //   icon: "icon-jigouguanli",
        //   isShowMenu: true,
        // },
        // {
        //   id: "21",
        //   path: "/groupManage",
        //   title: "台站管理",
        //   ischild: false,
        //   parentId: "staffManage",
        //   icon: "icon-qunzu",
        //   isShowMenu: true,
        // },
        {
          id: "22",
          path: "/roleManage",
          title: "角色管理",
          ischild: false,
          parentId: "staffManage",
          icon: "icon-renyuanxinxi",
          isShowMenu: true,
        },
        {
          id: "23",
          path: "/limitManage",
          title: "权限管理",
          ischild: false,
          parentId: "staffManage",
          icon: "icon-quanxianbeifen",
          isShowMenu: true,
        },
        {
          id: "24",
          path: "/privilegesTotal",
          title: "系统资源",
          ischild: false,
          parentId: "staffManage",
          icon: "icon-wangluoxitong",
          isShowMenu: true,
        },
      ],
    },
    {
      id: "25",
      path: "/dispatchManage",
      label: "派单管理",
      childre: true,
      parentId: "dispatchOpen",
      isShowMenu: false,
      children: [
        {
          id: "26",
          path: "/dispatchOpen",
          title: "工单发起",
          ischild: true,
          parentId: "dispatchOpen",
          icon: "icon-gongdanguanli",
          isShowMenu: true,
          children: [
            {
              id: "27",
              path: "/myDispatch",
              title: "我要派单",
              ischild: false,
              parentId: "dispatchOpen",
              isShowMenu: true,
            },
          ],
        },
        {
          id: "28",
          path: "/dispatchDispose",
          title: "工单处理",
          ischild: true,
          parentId: "dispatchOpen",
          icon: "icon-gongdanqueren",
          isShowMenu: true,
          children: [
            {
              id: "29",
              path: "/dispatchPending",
              title: "待处理",
              ischild: false,
              parentId: "dispatchOpen",
              isShowMenu: true,
            },
            {
              id: "30",
              path: "/dispatchProcessing",
              title: "处理中",
              ischild: false,
              parentId: "dispatchOpen",
              isShowMenu: true,
            },
            {
              id: "31",
              path: "/dispatchSuspended",
              title: "已挂起",
              ischild: false,
              parentId: "dispatchOpen",
              isShowMenu: true,
            },
            {
              id: "32",
              path: "/dispatchCompleted",
              title: "已完成",
              ischild: false,
              parentId: "dispatchOpen",
              isShowMenu: true,
            },
          ],
        },
        // {
        //   id: "33",
        //   path: "/dispatchSearch",
        //   title: "工单查询",
        //   ischild: true,
        //   parentId: "dispatchOpen",
        //   icon: "icon-wodegongdan",
        //   isShowMenu: true,
        //   children: [
        //     {
        //       id: "34",
        //       path: "/dispatchList",
        //       title: "工单列表",
        //       ischild: false,
        //       parentId: "dispatchOpen",
        //       isShowMenu: true,
        //     },
        //   ],
        // },
      ],
    },
  ],
  menuListPort: [], //派单管理
});
//点击顶部按钮
// 初始化地图
let baseMapObj: any = null;
let map: any = null;
onMounted(() => {
  // initMap();
});
// onBeforeUnmount(() => {
//   baseMapObj.map = null;
//   let mapboxEarthquake: any = document.getElementById("mapContainer");
//   mapboxEarthquake.innerHTML = "";
// });
const initMap = () => {
  baseMapObj = new baseMap({
    container: "mapContainer",
    zoom: 8,
    center: [123.31054687499999, 36.38591277287651],
  });
  map = baseMapObj.map;
};
let topInterval: any = null;
const changeTopMenu = (item: any) => {
  let itemVal = state.menuListPort.filter((items: any) => {
    if (items.label == item.label) {
      return items;
    }
  });
  let url = itemVal[0].children.find((v: any) => v.isShowMenu == true);
  if (item.children.length > 0) {
    state.leftMeuList = item.children;
  }
  if (item.path == "/dispatchManage" || item.path == "/systemControl") {
    if (item.shake) {
      if (topInterval) {
        clearTimeout(topInterval);
      }
      topInterval = setTimeout(() => {
        router.push({ path: item.path, params: { children: item.children } });
        topInterval = null;
      }, 500);
    } else {
      router.push({ path: url.path });
    }
  } else {
    if (item.shake) {
      if (topInterval) {
        clearTimeout(topInterval);
      }
      topInterval = setTimeout(() => {
        router.push({ path: item.path, params: { children: item.children } });
        topInterval = null;
      }, 500);
    } else {
      router.push({ path: item.path, params: { children: item.children } });
    }
  }

  // let itemVal = state.menuListPort.filter((items: any) => {
  //   if (items.name == item.label) {
  //     return items;
  //   }
  // });
  // if (item.children.length > 0) {
  //   state.leftMeuList = item.children;
  // }
  // if (item.path == "/dispatchManage") {
  //   router.push({ path: itemVal[0].children[0].url });
  // } else {
  //   router.push({ path: item.path, params: { children: item.children } });
  // }
};
// 点击每一项事件
let interval: any = null;
const menuCkick = (item: any) => {
  if (item.path != "/checkAndWarn") {
    if (interval) {
      clearTimeout(interval);
    }
    if (item.shake) {
      interval = setTimeout(() => {
        router.push({
          path: item.path,
        });
        state.activeIndex = item.path;
        interval = null;
      }, 500);
    } else {
      router.push({
        path: item.path,
      });
      state.activeIndex = item.path;
      interval = null;
    }

    // nextTick(() => {
    //   router.push({
    //     path: item.path,
    //   });
    //   state.activeIndex = item.path;
    // });
  }
};
watch(
  () => globalProperties.$route,
  (newVal, oldVal) => {
    state.activeIndex = newVal.path;
  },
  {
    immediate: true,
    deep: true,
  }
);
//初始顶部菜单栏
const topManu = () => {
  state.menuList.find((item: any) => {
    if (route.meta.parentId == item.parentId) {
      state.leftMeuList = item.children;
      // state.activeIndex = item.children[0].path;
    } else {
      // state.activeIndex = item.path;
    }
  });
};

// 获取权限列表;
const getShowMenuList = () => {
  let param = {
    teamId: localStorage.getItem("engine-teamid"),
    userId: store.state.user.userId,
    resourceType: "menu", //资源类型
  };
  http.authorityLimit.account(param).then((res: any) => {
    if (res.code == 0) {
      if (res.data.length > 0) {
        let data = JSON.parse(JSON.stringify(res.data[0].children));
        state.menuList = filterData(state.menuList, data);
        state.menuListPort = JSON.parse(JSON.stringify(state.menuList));
      }
    } else {
      globalProperties.$message.error(res.message);
    }
  });
};
//过滤路由数据
function filterData(menuList: any, data: any) {
  for (let i = 0; i < menuList.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (menuList[i].path == data[j].url) {
        menuList[i].isShowMenu = true;
        if (menuList[i].children && data[j].children) {
          filterData(menuList[i].children, data[j].children);
        }
        break;
      } else {
        menuList[i].isShowMenu = false;
      }
    }
  }
  store.commit("SET_MENU_LIST", menuList);
  return menuList;
}

onMounted(() => {
  topManu();
  getShowMenuList(); //登录后用户权限
});
</script>

<style lang="less" scoped>
.privilegesTotal-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.privilegesTotal-content {
  display: flex;
  flex-direction: row !important;
  background: rgba(10, 37, 88, 0.9);
  flex-direction: row;
  width: 100%;
  height: 95%;
  padding: 0 20px 0 0;
  overflow-y: hidden;
  box-sizing: border-box;

  .home-content {
    height: 100%;
    overflow-y: hidden;
    margin-left: 20px;
    width: 100%;
    border: 1px solid @global-header-bbg;
    // padding: 20px;
    box-sizing: border-box;
  }

  .left-menu {
    flex: 1;
    width: 260px;
  }

  .system-contral {
    width: 100%;
    height: 100%;

    #mapContainer {
      width: 100%;
      height: 100%;
      z-index: 9999;
    }

    .bottom-table {
      position: fixed;
      bottom: 40px;
      left: 40px;
      width: 50vw;
      height: 40vh;
    }
  }
}

.map-box {
  padding: 0;

  .home-content {
    margin-left: 0;
    border: none;
  }
}
</style>
