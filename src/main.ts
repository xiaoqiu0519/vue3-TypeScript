import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import TagNav from '@/components/tagnav/tagnav.vue'
import './style/index.less'
const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.component('TagNav',TagNav)
app.mount('#app')
