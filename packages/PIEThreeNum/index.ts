import type { App } from 'vue'
import PIEThreeNum from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEThreeNum.install = (app: App): void => {
  app.component('PIEThreeNum', PIEThreeNum)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEThreeNum
