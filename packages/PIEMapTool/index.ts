import type { App } from 'vue'
import PIEMapTool from './src/index.vue';
// import { SFCWithInstall } from './src/types'

// 安装
PIEMapTool.install = (app: App): void => {
  app.component('PIEMapTool', PIEMapTool)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEMapTool
