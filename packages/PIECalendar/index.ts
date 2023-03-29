import type { App } from "vue";
import PIECalendar from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIECalendar.install = (app: App): void => {
  app.component("PIECalendar", PIECalendar);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIECalendar;
