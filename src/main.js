import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import "./chart.js"

import router from './router'
import store from './store'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App).use(store).use(ElementPlus).use(router).mount('#app')

// main.ts
// import { createApp } from 'vue'

// import App from './App.vue'


