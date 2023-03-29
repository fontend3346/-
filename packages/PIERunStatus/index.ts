import type { App } from 'vue'
import PIERunStatus from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIERunStatus.install = (app: App): void => {
  app.component('PIERunStatus', PIERunStatus)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIERunStatus
