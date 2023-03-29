import type { App } from 'vue'
import PIECounter from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIECounter.install = (app: App): void => {
  app.component('PIECounter', PIECounter)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIECounter
