export default [
  {
    path: "/",
    name: "index",
    redirect: "/logins",
    component: () => import("@/applications/login/views/index.vue"),
    meta: {
      title: "登录",
    },
    children: [
      {
        path: "/logins",
        name: "logins",
        component: () => import("@/applications/login/views/index.vue"),
        meta: {
          title: "登录",
          parentId: "logins",
        },
      },
    ],
  },
];
