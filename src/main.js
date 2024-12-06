import './assets/main.css'
import router from './router.js'
import { initializeApp } from 'firebase/app'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

const firebaseConfig = {
  apiKey: 'AIzaSyCamcC2oou2Sj0NAw0PO7ulyv9Sh6f1La0',
  authDomain: 'vue-surveys-96197.firebaseapp.com',
  projectId: 'vue-surveys-96197',
  storageBucket: 'vue-surveys-96197.firebasestorage.app',
  messagingSenderId: '174611854470',
  appId: '1:174611854470:web:bdf218026a7d9ed09a0d07',
}
const pinia = createPinia()

initializeApp(firebaseConfig)

createApp(App).use(pinia).use(router).mount('#app')
