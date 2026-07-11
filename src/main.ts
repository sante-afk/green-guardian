import { createApp } from 'vue'
import { router } from '../src/router/router';
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app.use(router)
await router.isReady();

app.mount('#app')
