import type { App } from 'vue'
import PIEThreeBar from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEThreeBar.install = (app: App): void => {
  app.component('PIEThreeBar', PIEThreeBar)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEThreeBar
