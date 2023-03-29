import type { App } from 'vue'
import PieButton from './src/index.vue'
import { SFCWithInstall } from './src/types'

// 安装
PieButton.install = (app: App): void => {
  app.component('PieButton', PieButton)
}
const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default InPieButton
