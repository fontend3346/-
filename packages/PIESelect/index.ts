import type { App } from 'vue'
import PIESelect from './src/index.vue';
// import { SFCWithInstall } from './src/types'

// 安装
PIESelect.install = (app: App): void => {
  app.component('PIESelect', PIESelect)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIESelect
