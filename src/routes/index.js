import { createMemoryHistory, createRouter } from 'vue-router'
import { verifyToken } from '@/helpers/authetication.helper'

import Home from '../views/Home/HomeView.vue'
import Classes from '../views/Classes/ClasseView.vue'
import Employee from '../views/Employees/EmployeeView.vue'
import Login from '../views/Login/LoginView.vue'

const routes = [
  { path: '/', component: Home, meta: { title: 'Painel', requiresAuth: true } },
  { path: '/classes', component: Classes, meta: { title: 'Turmas', requiresAuth: true } },
  { path: '/employess', component: Employee, meta: { title: 'Funcionários', requiresAuth: true } },
  {
    path: '/login',
    component: Login,
    meta: { title: 'Área de acesso 🔒' }
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

const DEFAULT_TITLE = 'Universidade Inovação'
router.beforeEach((to, from, next) => {
  if (to.fullPath === '/login' && verifyToken()) {
    next('/')
    return
  }

  document.title = to.meta.title || DEFAULT_TITLE
  if (to.meta.requiresAuth && !verifyToken()) {
    next('/login')
    return
  } else {
    next()
    return
  }
})

export default router
