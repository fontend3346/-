import type { App } from "vue";
import PIEDetection from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIEDetection.install = (app: App): void => {
  app.component("PIEDetection", PIEDetection);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEDetection;
