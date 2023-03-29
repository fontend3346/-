import type { App } from 'vue'
import PIERealTime from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIERealTime.install = (app: App): void => {
  app.component('PIERealTime', PIERealTime)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIERealTime
