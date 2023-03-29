import type { App } from "vue";
import PIEMapDevice from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIEMapDevice.install = (app: App): void => {
  app.component("PIEMapDevice", PIEMapDevice);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEMapDevice;
