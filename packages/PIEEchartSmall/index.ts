import type { App } from 'vue'
import PIEEchartSmall from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEEchartSmall.install = (app: App): void => {
  app.component('PIEEchartSmall', PIEEchartSmall)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEEchartSmall
