import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
// import Home from './views/Home.vue'
import Web from '@/views/web'
import About from './views/About.vue'
import AdminLogin from './views/admin/AdminLogin.vue'
import Secure from './components/Secure.vue'
import Register from './components/Register.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'web',
      component: Web
    },
    {
      path: '/admin/login',
      name: 'login',
      component: AdminLogin
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/secure',
      name: 'secure',
      component: Secure,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router