import type { App } from 'vue'
import PIEPieStatistical from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEPieStatistical.install = (app: App): void => {
  app.component('PIEPieStatistical', PIEPieStatistical)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEPieStatistical
