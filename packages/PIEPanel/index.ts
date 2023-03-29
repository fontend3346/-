import type { App } from 'vue'
import PIEPanel from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIEPanel.install = (app: App): void => {
  app.component('PIEPanel', PIEPanel)
}
// const InPieButton: SFCWithInstall<typeof PieButton> = PieButton // 增加类型

export default PIEPanel;
