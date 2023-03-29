import type { App } from 'vue'
import PIEStation from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEStation.install = (app: App): void => {
  app.component('PIEStation', PIEStation)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEStation
