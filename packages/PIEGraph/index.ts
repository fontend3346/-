import type { App } from "vue";
import PIEGraph from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIEGraph.install = (app: App): void => {
  app.component("PIEFoldPanel", PIEGraph);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEGraph;
