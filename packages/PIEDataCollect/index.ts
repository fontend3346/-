import type { App } from 'vue'
import PIETable from './src/index.vue'
// import { SFCWithInstall } from './src/types'

// 安装
PIETable.install = (app: App): void => {
  app.component('PIETable', PIETable)
}

export default PIETable