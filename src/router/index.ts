import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
console.log(createWebHistory(process.env.BASE_URL))
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'/taotao'
  },
  {
    path:'/taotao',
    name:'taotao',
    component:()=>import('@/taotao/readonly.vue')
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
