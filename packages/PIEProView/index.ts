import type { App } from "vue";
import PIEProView from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIEProView.install = (app: App): void => {
  app.component("PIEProView", PIEProView);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEProView;
