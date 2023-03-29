import type { App } from 'vue'
import PIEEchartBox from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEEchartBox.install = (app: App): void => {
  app.component('PIEEchartBox', PIEEchartBox)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEEchartBox
