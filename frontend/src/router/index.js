import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddGame from '../views/AddGame.vue'
import Statistics from '../views/Statistics.vue'
import Profile from '../views/Profile.vue'
import CompositionDetail from '../views/CompositionDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '金铲铲助手' }
  },
  {
    path: '/add-game',
    name: 'AddGame',
    component: AddGame,
    meta: { title: '添加对局' }
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics,
    meta: { title: '统计分析' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { title: '个人中心' }
  },
  {
    path: '/composition/:id',
    name: 'CompositionDetail',
    component: CompositionDetail,
    meta: { title: '阵容详情' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router 
