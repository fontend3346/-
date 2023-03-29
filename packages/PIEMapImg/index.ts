import type { App } from 'vue'
import PIEMapImg from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEMapImg.install = (app: App): void => {
  app.component('PIEMapImg', PIEMapImg)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEMapImg
