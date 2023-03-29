import type { App } from 'vue'
import PIEMultiChart from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEMultiChart.install = (app: App): void => {
  app.component('PIEMultiChart', PIEMultiChart)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEMultiChart
