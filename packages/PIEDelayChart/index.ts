import type { App } from 'vue'
import PIEDelayChart from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEDelayChart.install = (app: App): void => {
  app.component('PIEDelayChart', PIEDelayChart)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEDelayChart
