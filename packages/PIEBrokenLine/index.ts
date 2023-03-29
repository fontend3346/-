import type { App } from 'vue'
import PIEBrokenLine from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEBrokenLine.install = (app: App): void => {
  app.component('PIEBrokenLine', PIEBrokenLine)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEBrokenLine
