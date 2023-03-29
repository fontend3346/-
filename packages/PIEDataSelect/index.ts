import type { App } from 'vue'
import PIEDataSelect from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEDataSelect.install = (app: App): void => {
  app.component('PIEDataSelect', PIEDataSelect)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEDataSelect
