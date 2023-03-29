export default [
  {
    path: "/",
    name: "index",
    redirect: "/systemManage",
    component: () => import("@/applications/runManagement/views/index.vue"),
    meta: {
      title: "主页面",
    },
    children: [
      {
        path: "/systemManage",
        name: "systemManage",
        component: () =>
          // import("@/applications/runManagement/views/systemManage/index.vue"),
          import("@/mainView/index.vue"),//pieEarth球
        // import("@/mainView/index.vue"),//mapbox球
        meta: {
          title: "主页面",
          parentId: "systemManage",
        },
      },
      // {
      //   path: "/stationsInfoManage",
      //   name: "stationsInfoManage",
      //   component: () =>
      //     import(
      //       "@/applications/runManagement/views/stationsInfoManage/stationsInfoManage.vue"
      //     ),
      //   meta: {
      //     title: "站点信息管理",
      //     parentId: "stationsInfoManage",
      //   },
      // },
      // {
      //   path: "/stationsDetails",
      //   name: "stationsDetails",
      //   component: () =>
      //     import(
      //       "@/applications/runManagement/views/stationsInfoManage/stationsDetails.vue"
      //     ),
      //   meta: {
      //     title: "站点信息详情页",
      //     parentId: "stationsInfoManage",
      //   },
      // },
      // {
      //   path: "/stationMmaintenance",
      //   name: "stationMmaintenance",
      //   component: () =>
      //     import(
      //       "@/applications/runManagement/views/stationsInfoManage/stationMmaintenance.vue"
      //     ),
      //   meta: {
      //     title: "台站维护管理",
      //     parentId: "stationsInfoManage",
      //   },
      // },
      // {
      //   path: "/instrumentRegistration",
      //   name: "instrumentRegistration",
      //   component: () =>
      //     import(
      //       "@/applications/runManagement/views/stationsInfoManage/instrumentRegistration.vue"
      //     ),
      //   meta: {
      //     title: "观测仪器登记",
      //     parentId: "stationsInfoManage",
      //   },
      // },
      // {
      //   path: "/recordManage",
      //   name: "recordManage",
      //   component: () =>
      //     import(
      //       "@/applications/runManagement/views/stationsInfoManage/recordManage.vue"
      //     ),
      //   meta: {
      //     title: "观测仪器备案管理",
      //     parentId: "stationsInfoManage",
      //   },
      // },
      // {
      //   path: "/netManage",
      //   name: "netManage",
      //   component: () =>
      //     import(
      //       "@/applications/runManagement/views/stationsInfoManage/netManage.vue"
      //     ),
      //   meta: {
      //     title: "台网管理",
      //     parentId: "stationsInfoManage",
      //   },
      // },
      // {
      //   path: "/stationArray",
      //   name: "stationArray",
      //   component: () =>
      //     import(
      //       "@/applications/runManagement/views/stationsInfoManage/stationArray.vue"
      //     ),
      //   meta: {
      //     title: "台/阵元数据",
      //     parentId: "stationsInfoManage",
      //   },
      // },
      // {
      //   path: "/measurementPoint",
      //   name: "measurementPoint",
      //   component: () =>
      //     import(
      //       "@/applications/runManagement/views/stationsInfoManage/measurementPoint.vue"
      //     ),
      //   meta: {
      //     title: "测点管理",
      //     parentId: "stationsInfoManage",
      //   },
      // },
      {
        path: "/netSystem",
        name: "netSystem",
        component: () =>
          import("@/applications/runManagement/views/netManage/netManage.vue"),//pieEarth球
        // import("@/applications/runManagement/views/netManageTest/netManage.vue"),//mapbox球
        meta: {
          title: "台网管理",
          parentId: "netSystem",
          shake: true,
        },
      },
      {
        path: "/stationSystem",
        name: "stationSystem",
        component: () =>
          import(
            "@/applications/runManagement/views/stationManage/stationList.vue"//pieEarth球
            // "@/applications/runManagement/views/stationManage/stationList.vue"//mapbox球
          ),
        meta: {
          title: "台站管理",
          parentId: "netSystem",
          shake: true,
        },
      },
      {
        path: "/placeSystem",
        name: "placeSystem",
        component: () =>
          import("@/applications/runManagement/views/placeManage/index.vue"),
        meta: {
          title: "场地管理",
          parentId: "netSystem",
        },
      },
      {
        path: "/measureSystem",
        name: "measureSystem",
        component: () =>
          import(
            "@/applications/runManagement/views/measureManage/measurementList.vue"
          ),
        meta: {
          title: "测点管理",
          parentId: "netSystem",
        },
      },
      {
        path: "/deviceSystem",
        name: "deviceSystem",
        component: () =>
          import(
            "@/applications/runManagement/views/instrumentManage/instrumentRegistration.vue"
          ),
        meta: {
          title: "设备管理",
          parentId: "netSystem",
        },
      },
      {
        path: "/tagSystem",
        name: "tagSystem",
        component: () =>
          import("@/applications/runManagement/views/eventManage/index.vue"),
        meta: {
          title: "事件库管理",
          parentId: "netSystem",
        },
      },
      {
        path: "/dzSystem",
        name: "dzSystem",
        component: () =>
          import(
            "@/applications/runManagement/views/earthquakeEvent/index.vue"
          ),
        meta: {
          title: "地震事件",
          parentId: "netSystem",
        },
      },
      {
        path: "/metaDataManage",
        name: "metaDataManage",
        component: () =>
          import(
            "@/applications/runManagement/views/seismmometryType/index.vue"
          ),
        meta: {
          title: "元数据管理",
          parentId: "netSystem",
        },
      },
      {
        path: "/seismmometryType",
        name: "seismmometryType",
        component: () =>
          import(
            "@/applications/runManagement/views/seismmometryType/index.vue"
          ),
        meta: {
          title: "测震类型管理",
          parentId: "netSystem",
        },
      },
      {
        path: "/instrumentType",
        name: "instrumentType",
        component: () =>
          import("@/applications/runManagement/views/instrumentType/index.vue"),
        meta: {
          title: "仪器类型管理",
          parentId: "netSystem",
        },
      },
      {
        path: "/typeManage",
        name: "typeManage",
        component: () =>
          import("@/applications/runManagement/views/typeManage/index.vue"),
        meta: {
          title: "类型管理",
          parentId: "netSystem",
        },
      },
      {
        path: "/fieldsInfo",
        name: "fieldsInfo",
        component: () =>
          import("@/applications/runManagement/views/fieldsInfo/index.vue"),
        meta: {
          title: "元字段类型信息管理",
          parentId: "netSystem",
        },
      },
      {
        path: "/fieldsType",
        name: "fieldsType",
        component: () =>
          import("@/applications/runManagement/views/fieldsType/index.vue"),
        meta: {
          title: "数据分区表管理",
          parentId: "netSystem",
        },
      },
      {
        path: "/tableManagement",
        name: "tableManagement",
        component: () =>
          import(
            "@/applications/runManagement/views/tableManagement/index.vue"
          ),
        meta: {
          title: "数据等级表管理",
          parentId: "netSystem",
        },
      },
      // {
      //   path: "/sampleManagement",
      //   name: "sampleManagement",
      //   component: () =>
      //     import(
      //       "@/applications/runManagement/views/stationsInfoManage/sampleManagement.vue"
      //     ),
      //   meta: {
      //     title: "样本管理",
      //     parentId: "stationsInfoManage",
      //   },
      // },
      // 值班管理
      {
        path: "/schedulingManage",
        name: "schedulingManage",
        redirect: "/dutyManage",
        component: () =>
          import("@/applications/runManagement/views/dailyMange/index.vue"),
        meta: {
          title: "日报管理",
          parentId: "dutyManage",
        },
      },
      {
        path: "/dutyManage",
        name: "dutyManage",
        component: () =>
          import("@/applications/runManagement/views/dailyMange/index.vue"),
        meta: {
          title: "日报管理",
          parentId: "dutyManage",
        },
      },
      {
        path: "/watchList",
        name: "watchList",
        component: () =>
          import("@/applications/runManagement/views/watchList/watchList.vue"),
        meta: {
          title: "值班排班",
          parentId: "dutyManage",
        },
      },
      {
        path: "/shiftManage",
        name: "shiftManage",
        component: () =>
          import(
            "@/applications/runManagement/views/dutyManage/shiftManage.vue"
          ),
        meta: {
          title: "交接班管理",
          parentId: "dutyManage",
        },
      },
      {
        path: "/totalReportManage",
        name: "totalReportManage",
        component: () =>
          import(
            "@/applications/runManagement/views/totalReportManage/reportAnalyse.vue"
          ),
        meta: {
          title: "统计报表管理",
          parentId: "dutyManage",
        },
      },
      // {
      //   path: "/reportAnalyse",
      //   name: "reportAnalyse",
      //   component: () =>
      //     import(
      //       "@/applications/runManagement/views/dutyManage/reportAnalyse.vue"
      //     ),
      //   meta: {
      //     title: "报表分析",
      //     parentId: "dutyManage",
      //   },
      // },
      {
        path: "/disposalCheck",
        name: "disposalCheck",
        component: () =>
          import(
            "@/applications/runManagement/views/disposalCheck/disposalCheck.vue"
          ),
        meta: {
          title: "突发事件处置登记",
          parentId: "dutyManage",
        },
      },
      {
        path: "/warnInfoCheck",
        name: "warnInfoCheck",
        component: () =>
          import(
            "@/applications/runManagement/views/dutyManage/warnInfoCheck.vue"
          ),
        meta: {
          title: "预警信息发布登记",
          parentId: "dutyManage",
        },
      },
      // 权限管理/用户管理
      {
        path: "/subscriberManage",
        name: "subscriberManage",
        redirect: "/staffManage",
        component: () =>
          import(
            "@/applications/runManagement/views/peopleManage/peopleManage.vue"
          ),
        meta: {
          title: "用户管理",
          parentId: "staffManage",
        },
      },
      {
        path: "/privilegesTotal",
        name: "privilegesTotal",
        component: () =>
          import(
            "@/applications/runManagement/views/privilegesTotal/systematicSource.vue"
          ),
        meta: {
          title: "系统资源",
          parentId: "staffManage",
        },
      },
      // {
      //   path: "/groupManage",
      //   name: "groupManage",
      //   component: () =>
      //     import(
      //       "@/applications/runManagement/views/privilegesTotal/groupManage.vue"
      //     ),
      //   meta: {
      //     title: "群组管理",
      //     parentId: "staffManage",
      //   },
      // },
      // {
      //   path: "/institutionManage",
      //   name: "institutionManage",
      //   component: () =>
      //     import(
      //       "@/applications/runManagement/views/privilegesTotal/institutionManage.vue"
      //     ),
      //   meta: {
      //     title: "机构管理",
      //     parentId: "staffManage",
      //   },
      // },
      {
        path: "/roleManage",
        name: "roleManage",
        component: () =>
          import(
            "@/applications/runManagement/views/roleManage/roleManage.vue"
          ),
        meta: {
          title: "角色管理",
          parentId: "staffManage",
        },
      },
      {
        path: "/peopleManage",
        name: "peopleManage",
        component: () =>
          import(
            "@/applications/runManagement/views/peopleManage/peopleManage.vue"
          ),
        meta: {
          title: "用户管理",
          parentId: "staffManage",
        },
      },
      {
        path: "/limitManage",
        name: "limitManage",
        component: () =>
          import(
            "@/applications/runManagement/views/limitManage/limitManage.vue"
          ),
        meta: {
          title: "权限管理",
          parentId: "staffManage",
        },
      },
      {
        path: "/staffManage",
        name: "staffManage",
        component: () =>
          import(
            "@/applications/runManagement/views/staffManage/staffManage.vue"
          ),
        meta: {
          title: "人员管理",
          parentId: "staffManage",
        },
      },
      {
        path: "/systemControl",
        name: "systemControl",
        redirect: "/netSystem",
        component: () =>
          import("@/applications/runManagement/views/systemControl/index.vue"),
        meta: {
          title: "系统管理",
          parentId: "netSystem",
        },
      },
      {
        path: "/dispatchManage",
        name: "dispatchManage",
        redirect: "/myDispatch",
        component: () =>
          import("@/applications/runManagement/views/dispatchOpen/index.vue"),
        meta: {
          title: "派单管理",
          parentId: "dispatchOpen",
        },
      },
      {
        path: "/dispatchOpen",
        name: "dispatchOpen",
        component: () =>
          import("@/applications/runManagement/views/dispatchOpen/index.vue"),
        meta: {
          title: "工单发起",
          parentId: "dispatchOpen",
        },
      },
      {
        path: "/myDispatch",
        name: "myDispatch",
        component: () =>
          import("@/applications/runManagement/views/dispatchOpen/index.vue"),
        meta: {
          title: "我要派单",
          parentId: "dispatchOpen",
        },
      },
      {
        path: "/dispatchDispose",
        name: "dispatchDispose",
        component: () =>
          import(
            "@/applications/runManagement/views/dispatchPending/index.vue"
          ),
        meta: {
          title: "工单处理",
          parentId: "dispatchOpen",
        },
      },
      {
        path: "/dispatchPending",
        name: "dispatchPending",
        component: () =>
          import(
            "@/applications/runManagement/views/dispatchPending/index.vue"
          ),
        meta: {
          title: "待处理",
          parentId: "dispatchOpen",
        },
      },
      {
        path: "/dispatchProcessing",
        name: "dispatchProcessing",
        component: () =>
          import(
            "@/applications/runManagement/views/dispatchProcessing/index.vue"
          ),
        meta: {
          title: "处理中",
          parentId: "dispatchOpen",
        },
      },
      {
        path: "/dispatchSuspended",
        name: "dispatchSuspended",
        component: () =>
          import(
            "@/applications/runManagement/views/dispatchSuspended/index.vue"
          ),
        meta: {
          title: "已挂起",
          parentId: "dispatchOpen",
        },
      },
      {
        path: "/dispatchCompleted",
        name: "dispatchCompleted",
        component: () =>
          import(
            "@/applications/runManagement/views/dispatchCompleted/index.vue"
          ),
        meta: {
          title: "已完成",
          parentId: "dispatchOpen",
        },
      },
      {
        path: "/dispatchSearch",
        name: "dispatchSearch",
        component: () =>
          import("@/applications/runManagement/views/dispatchList/index.vue"),
        meta: {
          title: "工单查询",
          parentId: "dispatchOpen",
        },
      },
      {
        path: "/dispatchList",
        name: "dispatchList",
        component: () =>
          import("@/applications/runManagement/views/dispatchList/index.vue"),
        meta: {
          title: "工单列表",
          parentId: "dispatchOpen",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/layouts/login.vue"),
    meta: {
      title: "登录",
    },
  },
];
