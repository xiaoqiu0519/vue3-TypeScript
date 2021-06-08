import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path:'/taotao',
    name:'taotao',
    component:()=>import('@/taotao/ref_reactive.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/tablelist',
    name: 'Tablelist',
    component: () => import('@/views/tablelist/tablelist.vue')
  },
  {
    path: '/positionmatrix',
    name: 'positionmatrix',
    component: () => import('@/views/positionmatrix/index.vue')
  },
  {
    path: '/matchdetail/matchid/:matchid',
    name: 'MatchDetail',
    component: () => import('@/views/matchdetail/detail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
