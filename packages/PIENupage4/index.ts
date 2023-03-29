import type { App } from 'vue'
import PIENupage4 from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIENupage4.install = (app: App): void => {
  app.component('PIENupage4', PIENupage4)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIENupage4
