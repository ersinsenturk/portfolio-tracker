import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from '@/includes/fontawesome'
import Card from '@/components/global/Card.vue'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
const toastOptions = {
  position: 'bottom-right',
  timeout: 2000,
  closeButton: false,
  icon: false,
  pauseOnHover: true,
  closeOnClick: true
}

const app = createApp(App)

app.component('fa-icon', FontAwesomeIcon)
app.component('card', Card)
app.use(createPinia())
app.use(router)
app.use(Toast, toastOptions)

app.mount('#app')
