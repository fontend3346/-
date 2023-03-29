import type { App } from 'vue'
import PIEBarChart from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEBarChart.install = (app: App): void => {
  app.component('PIEBarChart', PIEBarChart)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEBarChart
