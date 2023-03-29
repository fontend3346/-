import type { App } from 'vue'
import PIEMap from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEMap.install = (app: App): void => {
  app.component('PIEMap', PIEMap)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEMap
