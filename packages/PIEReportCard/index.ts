import type { App } from 'vue'
import PIEReportCard from './src/index.vue'

// 安装
PIEReportCard.install = (app: App): void => {
  app.component('PIEReportCard', PIEReportCard)
}

export default PIEReportCard
