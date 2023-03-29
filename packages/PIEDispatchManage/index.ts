import type { App } from "vue";
import PIEDispatchManage from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIEDispatchManage.install = (app: App): void => {
  app.component("PIEDispatchManage", PIEDispatchManage);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEDispatchManage;
