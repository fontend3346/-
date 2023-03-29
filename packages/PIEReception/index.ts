import type { App } from 'vue'
import PIEReception from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEReception.install = (app: App): void => {
  app.component('PIEReception', PIEReception)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEReception
