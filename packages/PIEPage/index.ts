import type { App } from 'vue'
import PIEPage from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEPage.install = (app: App): void => {
  app.component('PIEPage', PIEPage)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEPage
