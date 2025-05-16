import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '../views/AdminView.vue'
import LoginUserView from '../views/LoginUserView.vue'
import RegisterUserView from '../views/RegisterUserView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginUserView,
  },

  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
  },

  {
    path: '/register',
    name: 'register',
    component: RegisterUserView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
