import type { App } from 'vue'
import PIEReportPop from './src/index.vue'

// 安装
PIEReportPop.install = (app: App): void => {
  app.component('PIEReportPop', PIEReportPop)
}

export default PIEReportPop
