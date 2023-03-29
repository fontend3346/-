import type { App } from "vue";
import PIEMonitorBorder from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIEMonitorBorder.install = (app: App): void => {
  app.component("PIEMonitorBorder", PIEMonitorBorder);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEMonitorBorder;
