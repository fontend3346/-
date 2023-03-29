import type { App } from 'vue'
import PIEEchartWrap from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIEEchartWrap.install = (app: App): void => {
  app.component("PIEEchartWrap", PIEEchartWrap);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEEchartWrap;
