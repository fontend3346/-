import type { App } from "vue";
import PIERunRouter from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIERunRouter.install = (app: App): void => {
  app.component("PIERunRouter", PIERunRouter);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIERunRouter;
