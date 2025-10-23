import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'

import { publicViews } from './public'
import { privateViews } from './private'

const routes: RouteRecordRaw[] = [
  ...publicViews,
  ...privateViews,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if(!to.meta.guest) {
    const isAuthenticated = localStorage.getItem('user')

    if (!isAuthenticated) {
      return { name: 'AuthView' }
    }
  }
  document.title = to.meta.title as string || 'CRM'
  return true
})

export default router