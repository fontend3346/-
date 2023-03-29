import type { App } from "vue";
import PIEDatamonitor from "./src/index.vue";
// 安装
PIEDatamonitor.install = (app: App): void => {
  app.component("PIEDatamonitor", PIEDatamonitor);
};
export default PIEDatamonitor;
