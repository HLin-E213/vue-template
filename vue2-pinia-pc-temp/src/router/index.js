import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/home/home.vue')
  }
]
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: '',
  routes
})

router.beforeEach(async (to, from, next) => {
  next()
})

export default router
