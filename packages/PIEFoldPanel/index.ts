import type { App } from "vue";
import PIEFoldPanel from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIEFoldPanel.install = (app: App): void => {
  app.component("PIEFoldPanel", PIEFoldPanel);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEFoldPanel;
