import type { App } from 'vue'
import PIEPieChart from './src/index.vue'
// 安装
PIEPieChart.install = (app: App): void => {
  app.component('PIEPieChart', PIEPieChart)
}
export default PIEPieChart
