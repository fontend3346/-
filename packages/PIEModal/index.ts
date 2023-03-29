import type { App } from 'vue'
import PIEModal from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEModal.install = (app: App): void => {
  app.component('PIEModal', PIEModal)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEModal
