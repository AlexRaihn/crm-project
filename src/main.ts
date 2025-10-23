import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import './styles/globals.css'

import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia).use(router)


app.mount('#app')
