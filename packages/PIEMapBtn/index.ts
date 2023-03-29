import type { App } from 'vue'
import PIEStationList from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEStationList.install = (app: App): void => {
  app.component('PIEStationList', PIEStationList)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEStationList
