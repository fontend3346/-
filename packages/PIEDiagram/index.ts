import type { App } from 'vue'
import PIEDiagram from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEDiagram.install = (app: App): void => {
  app.component('PIEDelayChart', PIEDiagram)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEDiagram
