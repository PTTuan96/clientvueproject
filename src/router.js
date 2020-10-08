import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Web from '@/views/web'
import AdminLogin from './views/admin/AdminLogin.vue'
import AdminHome from './views/admin/Home.vue'
import LayoutUser from '@/views/admin/user/LayoutUser'
import User from '@/views/admin/user/User'
import Detail from '@/views/admin/user/Detail'

import LayoutSchedule from '@/views/admin/schedule/LayoutSchedule'
import Schedule from '@/views/admin/schedule/Schedule'
import DetailSchedule from '@/views/admin/schedule/DetailSchedule'


import LayoutTournament from '@/views/admin/tournament/LayoutTournament'
import Tournament from '@/views/admin/tournament/Tournament'
import DetailTournament from '@/views/admin/tournament/DetailTournament'

import LayoutTeam from '@/views/admin/team/LayoutTeam'
import Teams from '@/views/admin/team/Teams'
import CreateTeam from '@/views/admin/team/TeamCreate'
import TeamDetail from '@/views/admin/team/TeamDetail'

import AllSports from '@/views/web/contents/AllSports'
import Soccer from '@/views/web/contents/Soccer'
Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'web',
    component: Web,
    redirect: '/sports',
    children: [
      {
        path: '/sports',
        name: 'allsports',
        component: AllSports,
      },
      {
        path: '/soccer',
        name: 'soccer',
        component: Soccer,
      },
    ]
  },
  {
    path: '/admin/login',
    name: 'login',
    component: AdminLogin
  },


  {
    path: '/admin/home',
    name: 'Home',
    component: AdminHome,
    redirect: '/LayoutUser',
    children: [
      {
        path: "/LayoutUser",
        component: LayoutUser,
        children: [
          {
            path: "/",
            component: User,
            name: "User",
            meta: {
              requiredAuth: true,
              adminAuth: true,
              userAuth: false
            }
          },
          {
            path: "/Detail/:id",
            component: Detail,
            meta: {
              requiredAuth: true,
              adminAuth: true,
              userAuth: false
            }
          }
        ],
        meta: {
          requiredAuth: true,
          adminAuth: true,
          userAuth: false
        }
      },

      {
        path: "/LayoutSchedule",
        component: LayoutSchedule,
        children: [
          {
            path: "/",
            component: Schedule,
            name: 'Schedule',
            meta: {
              requiredAuth: true,
              adminAuth: true,
              userAuth: false
            }
          },
          {
            path: "/DetailSchedule/:id",
            component: DetailSchedule,
            meta: { requiresAuth: true },
            meta: {
              requiredAuth: true,
              adminAuth: true,
              userAuth: false
            }
          }

        ],
        meta: {
          requiredAuth: true,
          adminAuth: true,
          userAuth: false
        }

      },
      {
        path: "/LayoutTeam",
        component: LayoutTeam,
        children: [
          {
            path: "/",
            component: Teams,
            name: "Teams",
            meta: {
              requiredAuth: true,
              adminAuth: true,
              userAuth: false
            }
          },
          {
            path: "/create",
            component: CreateTeam,
            name: "CreateTeam",
            meta: {
              requiredAuth: true,
              adminAuth: true,
              userAuth: false
            }
          },
          {
            path: "/edit/:id",
            component: TeamDetail,
            name: "TeamDetail",
            meta: {
              requiredAuth: true,
              adminAuth: true,
              userAuth: false
            }
          }
        ],
        meta: {
          requiredAuth: true,
          adminAuth: true,
          userAuth: false
        }
      },
      {
        path: "/LayoutTournament",
        component: LayoutTournament,
        name: "LayoutTournament",
        children: [
          {
            path: "/",
            component: Tournament,
            name: "Tournament",
            meta: {
              requiredAuth: true,
              adminAuth: true,
              userAuth: false
            }
          },
          {
            path: "/DetailTournament/:id",
            component: DetailTournament,
            name: "DetailTournament",
            meta: {
              requiredAuth: true,
              adminAuth: true,
              userAuth: false
            }
          }
        ],
        meta: {
          requiredAuth: true,
          adminAuth: true,
          userAuth: false
        }
      }
    ],
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

router.beforeEach(async (to, from, next) => {
  if (store.state.auth.token != '' && store.state.user.userInfo == null) {
    store.commit('user/user_profile')
    await store.dispatch("user/autoLogin")
  } else {
    next()
  }

  if (to.meta.requiredAuth) {
    const authUser = store.state.auth
    if (!authUser || !authUser.token) {
      next()
    }

    if (to.meta.adminAuth) {
      let role = store.state.user.userInfo.role;
      if (role === 'ROLE_ADMIN') {
        next()
      } else {
        next('/admin/login')
      }
    }
  }
  else {
    next()
  }
})

export default router