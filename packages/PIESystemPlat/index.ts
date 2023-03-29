import type { App } from 'vue'
import PIESystemPlat from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIESystemPlat.install = (app: App): void => {
  app.component('PIESystemPlat', PIESystemPlat)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIESystemPlat
