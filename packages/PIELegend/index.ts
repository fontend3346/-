import type { App } from "vue";
import PIELegend from "./src/index.vue";
// 安装
PIELegend.install = (app: App): void => {
  app.component("PIELegend", PIELegend);
};
export default PIELegend;
