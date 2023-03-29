import type { App } from "vue";
import PIEThematicLegend from "./src/index.vue";
// 安装
PIEThematicLegend.install = (app: App): void => {
  app.component("PIEThematicLegend", PIEThematicLegend);
};
export default PIEThematicLegend;
