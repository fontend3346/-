import type { App } from "vue";
import PIEPlaneSelect from "./src/index.vue";
// import { SFCWithInstall } from './src/types'

// 安装
PIEPlaneSelect.install = (app: App): void => {
  app.component("PIEPlaneSelect", PIEPlaneSelect);
};
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEPlaneSelect;
