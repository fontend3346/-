import type { App } from "vue";
import PIEDetectionEarth from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIEDetectionEarth.install = (app: App): void => {
  app.component("PIEDetectionEarth", PIEDetectionEarth);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEDetectionEarth;
