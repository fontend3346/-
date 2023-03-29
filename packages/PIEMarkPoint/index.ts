import type { App } from 'vue'
import PIEMarkPoint from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIEMarkPoint.install = (app: App): void => {
  app.component("PIEMarkPoint", PIEMarkPoint);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEMarkPoint;
