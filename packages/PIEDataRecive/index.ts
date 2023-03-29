import type { App } from "vue";
import PIEDataRecive from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIEDataRecive.install = (app: App): void => {
  app.component("PIEDataRecive", PIEDataRecive);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEDataRecive;
