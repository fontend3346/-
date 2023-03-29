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
    <div class="privilegesTotal-content">
      <PIELeftMenu
        :activeIndex="state.activeIndex"
        :leftMeuList="state.leftMeuList"
        @menuCkick="menuCkick"
      ></PIELeftMenu>
      <div class="home-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import basicHeader from "@/layouts/basicHeader.vue";
import { onMounted, ref, reactive, getCurrentInstance, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const {
  appContext: {
    config: { globalProperties },
  },
} = getCurrentInstance() as any;
const state = reactive({
  activeIndex: "/stationsInfoManage", //选中菜单名,
  openNames: [], //哪个Menuitem应该展开
  leftMeuList: [],
  // 顶部菜单
  menuList: [
    {
      id: "0",
      path: "/stationsInfoManage",
      label: "系统管理",
      childre: true,
      parentId: "stationsInfoManage",
      children: [
        {
          id: "1",
          path: "/stationsInfoManage",
          title: "台站信息管理",
          ischild: true,
          parentId: "stationsInfoManage",
          children: [
            {
              id: "2",
              path: "/stationsInfoManage",
              title: "站点信息管理",
              ischild: false,
              parentId: "stationsInfoManage",
            },
            {
              id: "3",
              path: "/stationMmaintenance",
              title: "台站维护管理",
              ischild: false,
              parentId: "stationsInfoManage",
            },
            {
              id: "4",
              path: "/instrumentRegistration",
              title: "设备管理",
              ischild: true,
              parentId: "stationsInfoManage",
              children: [
                {
                  id: "5",
                  path: "/instrumentRegistration",
                  title: "设备登记",
                  ischild: false,
                  parentId: "stationsInfoManage",
                },
                {
                  id: "6",
                  path: "/recordManage",
                  title: "设备备案管理",
                  ischild: false,
                  parentId: "stationsInfoManage",
                },
              ],
            },
            {
              id: "7",
              path: "/netManage",
              title: "台网管理",
              ischild: false,
              parentId: "stationsInfoManage",
            },
            {
              id: "8",
              path: "/stationArray",
              title: "台/阵元数据",
              ischild: false,
              parentId: "stationsInfoManage",
            },
            {
              id: "9",
              path: "/measurementPoint",
              title: "测点管理",
              ischild: false,
              parentId: "stationsInfoManage",
            },
            {
              id: "10",
              path: "/sampleManagement",
              title: "事件管理",
              ischild: false,
              parentId: "stationsInfoManage",
            },
          ],
        },
      ],
    },
    {
      id: "9",
      path: "/dutyManage",
      label: "值班管理",
      childre: true,
      parentId: "dutyManage",
      children: [
        {
          id: "10",
          path: "/dutyManage",
          title: "值班管理",
          ischild: true,
          parentId: "dutyManage",
          children: [
            {
              id: "11",
              path: "/dutyManage",
              title: "日报管理",
              ischild: false,
              parentId: "dutyManage",
            },
            {
              id: "12",
              path: "/shiftManage",
              title: "交接班管理",
              ischild: false,
              parentId: "dutyManage",
            },
            {
              id: "13",
              path: "/totalReportManage",
              title: "统计报表管理",
              ischild: false,
              parentId: "dutyManage",
            },
            {
              id: "14",
              path: "/outburstWarning",
              title: "突发事件及预警管理",
              ischild: true,
              parentId: "dutyManage",
              children: [
                {
                  id: "15",
                  path: "/disposalCheck",
                  title: "突发事件处置登记",
                  ischild: false,
                  parentId: "dutyManage",
                },
                {
                  id: "16",
                  path: "/warnInfoCheck",
                  title: "预警信息发布登记",
                  ischild: false,
                  parentId: "dutyManage",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "17",
      path: "/privilegesTotal",
      label: "用户管理",
      childre: true,
      parentId: "privilegesTotal",
      children: [
        {
          id: "18",
          path: "/privilegesTotal",
          title: "权限管理",
          ischild: true,
          parentId: "privilegesTotal",
          children: [
            // {
            //   id: 17,
            //   path: "privilegesTotal",
            //   title: "系统资源",
            //   ischild: false,
            // },
            {
              id: "19",
              path: "/privilegesTotal",
              title: " 群组管理",
              ischild: false,
              parentId: "privilegesTotal",
            },
            {
              id: "20",
              path: "/institutionManage",
              title: " 机构管理",
              ischild: false,
              parentId: "privilegesTotal",
            },
            {
              id: "21",
              path: "/roleManage",
              title: "角色管理",
              ischild: false,
              parentId: "privilegesTotal",
            },
            {
              id: "22",
              path: "/peopleManage",
              title: "用户管理",
              ischild: false,
              parentId: "privilegesTotal",
            },
            {
              id: "23",
              path: "/limitManage",
              title: "权限管理",
              ischild: false,
              parentId: "privilegesTotal",
            },
          ],
        },
      ],
    },
  ],
});
//点击顶部按钮
const changeTopMenu = (item: any) => {
  debugger;
  if (item.children.length > 0) {
    router.push(item.path);
    state.leftMeuList = item.children;
  }
};

// 点击每一项事件
const menuCkick = (item: any) => {
  router.push({
    path: item.path,
  });
  state.activeIndex = item.path;
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
onMounted(() => {
  topManu();
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
  background: rgba(10, 37, 88, 0.9);
  width: 100%;
  height: 94%;
  padding: 20px;
  overflow-y: auto;
  box-sizing: border-box;
  .home-content {
    height: 100%;
    overflow-y: auto;
    margin-left: 20px;
    width: 100%;
    border: 1px solid @global-header-bbg;
    // padding: 20px;
    box-sizing: border-box;
  }
}
</style>
