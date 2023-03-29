import Vue from "vue";
import Router from "vue-router";
import routes from "./router";
// import gateway from "public/static/config";
// import store from "@/store/index";
import { createRouter, createWebHashHistory } from 'vue-router';
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});
// router.beforeEach((to, from, next) => { 
//     if (store.state.user.userInfo) {
//         next()
//     } else {
//          let redirectUrl = window.location.href;
//       window.location.href =
//        gateway.redUrl+ redirectUrl;
//     }
// })

export default router;
