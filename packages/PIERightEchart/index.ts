import type { App } from 'vue'
import PIERightEchart from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIERightEchart.install = (app: App): void => {
  app.component('PIERightEchart', PIERightEchart)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIERightEchart