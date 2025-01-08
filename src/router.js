import { createWebHistory, createRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'
import HomeView from './views/HomeView.vue'
import UserProfile from './views/UserProfile.vue'
import PasswordReset from './views/PasswordReset.vue'
import ActionHandler from './views/ActionHandler.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn,
    meta: {
      auth: false,
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    meta: {
      auth: false,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfile,
    meta: {
      auth: true,
    },
  },
  {
    path: '/password_reset',
    name: 'passwordReset',
    component: PasswordReset,
    meta: {
      auth: false,
    },
  },
  {
    path: '/action',
    name: 'action',
    component: ActionHandler,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // if (to.name === 'home') {
  //   next()
  //   return
  // }


  if (to.name === 'action') {
    next(false)
  }

  if (to.meta.auth && !authStore.userInfo.token) {
    next('/signin')
    return
  }
  if (!to.meta.auth && authStore.userInfo.token) {
    next('/')
    return
  }
  next()
})

export default router
