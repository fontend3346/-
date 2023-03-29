import type { App } from 'vue'
import PIEExploratoryData from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEExploratoryData.install = (app: App): void => {
  app.component('PIEExploratoryData', PIEExploratoryData)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEExploratoryData
