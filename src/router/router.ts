export default [
  {
    path: "/",
    name: "home",
    // redirect: '/monitorMap',
    component: () => import("@/applications/runManagement/views/index.vue"),
    meta: {
      title: "整体布局",
    },
    children: [],
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
