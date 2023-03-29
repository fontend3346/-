import type { App } from 'vue'
import PIETimeLine from './src/index.vue'
// 安装
PIETimeLine.install = (app: App): void => {
  app.component('PIETimeLine', PIETimeLine)
}
export default PIETimeLine
