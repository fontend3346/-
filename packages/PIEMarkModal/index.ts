import type { App } from 'vue'
import PIEMarkModal from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEMarkModal.install = (app: App): void => {
  app.component('PIEMarkModal', PIEMarkModal)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEMarkModal
