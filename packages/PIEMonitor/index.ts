import type { App } from 'vue'
import PIEEcharWave from './src/index.vue'
// 安装
PIEEcharWave.install = (app: App): void => {
  app.component('PIEEcharWave', PIEEcharWave)
}
export default PIEEcharWave
