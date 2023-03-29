import type { App } from 'vue'
import PIENucleusWarn from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIENucleusWarn.install = (app: App): void => {
  app.component('PIENucleusWarn', PIENucleusWarn)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIENucleusWarn
