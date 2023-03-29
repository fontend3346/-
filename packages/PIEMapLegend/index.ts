import type { App } from 'vue'
import PIEMapLegend from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEMapLegend.install = (app: App): void => {
  app.component('PIEMapLegend', PIEMapLegend)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEMapLegend
