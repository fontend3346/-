import type { App } from "vue";
import PIECoverage from "./src/index.vue";
// 安装
PIECoverage.install = (app: App): void => {
  app.component("PIECoverage", PIECoverage);
};
export default PIECoverage;
