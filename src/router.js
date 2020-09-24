import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Web from '@/views/web'
import AdminLogin from './views/admin/AdminLogin.vue'
import Secure from './components/Secure.vue'
import Register from './components/Register.vue'
import AdminLayout from './views/admin/AdminLayout.vue'
import { autoLogin } from '@/api/UserApi';
Vue.use(Router)

let routes = [
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
      requiredAuth: true,
      adminAuth: true,
      userAuth: false
    }
  },
  {
    path: '/admin/layout',
    component: AdminLayout,
    meta: {
      requiredAuth: true,
      adminAuth: true,
      userAuth: false
    }
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

async function reciveData() {
  try {
    const response = await autoLogin();
    return response;
  } catch (e) {
    
    console.log("Token Expried");
  }
}

router.beforeEach(async (to, from, next) => {
  // console.log(store)

  if (to.meta.requiredAuth) {

    //Return data after send token
    const response = await reciveData();
    if(response === undefined){
      next({ name: '/' })
    }
    // console.log(response.data.payload)
    const authRole = response.data.payload.role
    

    //Check token
    const authUser = store.state.auth
    if (!authUser || !authUser.token) {
      next({ name: '/' })
    }
    if (to.meta.adminAuth) {

      if (authRole === 'ADMIN') {
        next()
      } else {
        next('/')
      }
    }
    else if (to.meta.userAuth) {
      if (authRole === 'USER' || authRole === 'MEMBER') {
        next('/')
      } else {
        console.log("This is admin")
        next('/admin/layout')
      }
    }
  }
  else {
    next()
  }
})

export default router