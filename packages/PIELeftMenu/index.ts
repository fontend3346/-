import type { App } from "vue";
import PIELeftMenu from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIELeftMenu.install = (app: App): void => {
  app.component("PIELeftMenu", PIELeftMenu);
};

export default PIELeftMenu;
