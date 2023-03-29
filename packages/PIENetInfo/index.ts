import type { App } from "vue";
import PIENetInfo from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIENetInfo.install = (app: App): void => {
  app.component("PIENetInfo", PIENetInfo);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIENetInfo;
