import type { App } from 'vue'
import PIEWaveFilter from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEWaveFilter.install = (app: App): void => {
  app.component('PIEWaveFilter', PIEWaveFilter)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEWaveFilter
