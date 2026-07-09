import { createApp } from 'vue'
import { router } from '../src/router/router';
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(App).use(router).mount('#app')
