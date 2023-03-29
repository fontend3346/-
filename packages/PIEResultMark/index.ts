import type { App } from "vue";
import PIEResultMark from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIEResultMark.install = (app: App): void => {
  app.component("PIEResultMark", PIEResultMark);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEResultMark;
