import { createApp, nextTick } from "vue";
import App from "./App.vue";
import routes from "./router/index";
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

import store from "@/store/index";
// import "@/styles/index.less";
import utils from "../../utils/utils"; // 导入api接口
import PIEUI from "~/index"; // 开发
import "~/theme-default/index.less"; // 开发
import "@/assets/css/mapbox-gl.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import "@/assets/iconfont/iconfont.css";
import "@/utils/rem";
import "@/public-path";

let instance: any = null;

let router: any = null;
function render(props: any): void {
  const { container } = props;
  let history = createWebHashHistory(
    (window as any).__POWERED_BY_QIANKUN__ ? "/login/" : "./"
  );

  // router = createRouter({
  //   history,
  //   routes,
  // });
  // const router = routeHash(qiankunWindow.__POWERED_BY_QIANKUN__ ? `/` : '/')
  instance = createApp(App);

  instance.config.globalProperties.$utils = utils;
  // app.use(router);

  instance.use(PIEUI);
  instance.use(store);
  // app.use(ElementPlus, { size: "small", zIndex: 3000 });
  // app.mount("#mainApp");
  instance.use(ElementPlus, { size: "small", zIndex: 3000, locale: zhCn });
  instance.use(routes);
  instance.mount(
    container
      ? container.querySelector("#childrenContainer")
      : "#childrenContainer"
  );
}
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({ container: "" });
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}

export async function mount(props) {
  console.log("[vue] props from main framework", props);
  // window.viewer = props.viewer;
  // commonStore.globalRegister(store, props)
  // _this.$nextTick(() => {
  //   createEarthModule().then(function () {

  //     PlotDraw.PIEInstance.setPIE(PIE);

  //   })
  // })

  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}
