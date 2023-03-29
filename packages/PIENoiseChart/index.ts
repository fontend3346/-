import type { App } from 'vue'
import PIENoiseChart from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIENoiseChart.install = (app: App): void => {
  app.component('PIENoiseChart', PIENoiseChart)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIENoiseChart
