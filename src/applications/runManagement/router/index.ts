import Vue from "vue";
import Router from "vue-router";
import routes from "./router";
import commonPage from "./commonPage";
import gateway from "public/static/config";
import store from "@/store";
import { createRouter, createWebHashHistory } from "vue-router";
let history = createWebHashHistory(
  (window as any).__POWERED_BY_QIANKUN__ ? "/runManagement/" : "./"
);

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  // routes: [...routes],
});
router.beforeEach((to, from, next) => {
  let token = store.state.user.engineToken;
  if (token) {
    next();
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
