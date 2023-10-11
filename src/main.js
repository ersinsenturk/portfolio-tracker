import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from '@/includes/fontawesome'
import Card from '@/components/global/Card.vue'

const app = createApp(App)

app.component('fa-icon', FontAwesomeIcon)
app.component('card', Card)
app.use(createPinia())
app.use(router)

app.mount('#app')
