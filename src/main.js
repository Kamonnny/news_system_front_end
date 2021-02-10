import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setupAntd from './lib/setupAntd'

import '@/assets/less/global.less'

createApp(App).use(store).use(router).use(setupAntd).mount('#app')
