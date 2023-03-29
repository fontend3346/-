import type { App } from 'vue'
import PIEFacility from './src/index.vue'
// 安装
PIEFacility.install = (app: App): void => {
  app.component('PIEFacility', PIEFacility)
}
export default PIEFacility
