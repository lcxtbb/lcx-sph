import { createApp } from 'vue'
import App from './App.vue'
import "./reset.css"
import './assets/font/font.css'
import router from './router'
import { createPinia } from 'pinia'
import './api/mock/mock'
import 'swiper/css';
import 'swiper/css/bundle'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueLazyload from 'vue-lazyload'
import atm from "./assets/images/1.gif"
//pinia 实例
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)  // pinia 数据持久化

const app = createApp(App)

app.use(pinia)

app.use(router)

app.use(ElementPlus)

app.use(VueLazyload, {
    //懒加载默认的图片
    loading:atm
})

app.mount('#app')
