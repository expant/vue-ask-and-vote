import './assets/main.css'
import router from './router.js'
import { initializeApp } from 'firebase/app'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './utils/userData.js'
import './api.js'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
  authDomain: 'vue-surveys-96197.firebaseapp.com',
  projectId: 'vue-surveys-96197',
  storageBucket: 'vue-surveys-96197.firebasestorage.app',
  messagingSenderId: '174611854470',
  appId: '1:174611854470:web:bdf218026a7d9ed09a0d07',
}
const pinia = createPinia()

initializeApp(firebaseConfig)

createApp(App).use(pinia).use(router).mount('#app')
