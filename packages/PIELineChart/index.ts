import type { App } from 'vue'
import PIELineChart from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIELineChart.install = (app: App): void => {
  app.component('PIELineChart', PIELineChart)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIELineChart
