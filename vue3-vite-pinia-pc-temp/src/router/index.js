import { createRouter, createWebHistory } from 'vue-router'

import { userTokenStore } from '@/store/index.js'
const routes = [
  /**不允许在router主函数中书写路由格式,分模块引入路由 */
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/base/404.vue')
  },
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/home/home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const userData = userTokenStore()
  if (userData.isLogin) {
    await userData.checkTokenUserinfo()
  }
  next()
})

export default router
