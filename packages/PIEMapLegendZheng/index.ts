import type { App } from 'vue'
import PIEMapLegendZheng from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEMapLegendZheng.install = (app: App): void => {
  app.component('PIEMapLegendZheng', PIEMapLegendZheng)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEMapLegendZheng
