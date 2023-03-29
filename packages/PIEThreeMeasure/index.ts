import type { App } from 'vue'
import PIEThreeMeasure from './src/index.vue'

// 安装
PIEThreeMeasure.install = (app: App): void => {
  app.component('PIEThreeMeasure', PIEThreeMeasure)
}

export default PIEThreeMeasure
