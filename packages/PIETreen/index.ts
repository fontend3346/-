import type { App } from "vue";
import PIETreen from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIETreen.install = (app: App): void => {
  app.component("PIETreen", PIETreen);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIETreen;
