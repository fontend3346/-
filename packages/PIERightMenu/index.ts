import type { App } from 'vue'
import PIERightMenu from './src/index.vue'

// 安装
PIERightMenu.install = (app: App): void => {
  app.component('PIERightMenu', PIERightMenu)
}

export default PIERightMenu;
