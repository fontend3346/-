import type { App } from "vue";
import PIEHeatMap from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIEHeatMap.install = (app: App): void => {
  app.component("PIEFoldPanel", PIEHeatMap);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEHeatMap;
