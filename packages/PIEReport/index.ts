import type { App } from 'vue'
import PIEReport from './src/index.vue'

// 安装
PIEReport.install = (app: App): void => {
  app.component('PIEReport', PIEReport)
}

export default PIEReport
