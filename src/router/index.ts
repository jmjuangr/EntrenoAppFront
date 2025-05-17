import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '../views/AdminView.vue'
import LoginUserView from '../views/LoginUserView.vue'
import RegisterUserView from '../views/RegisterUserView.vue'
import UserEntrenosView from '../views/UserEntrenosView.vue'
import { useEntrenosStore } from '../store/entreno'

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
  {
    path: '/mis-entrenos',
    name: 'mis-entrenos',
    component: UserEntrenosView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const store = useEntrenosStore()

  if (to.name === 'admin' && (!store.usuarioActual || !store.usuarioActual.admin)) {
    alert('Acceso restringido. Debes ser administrador.')
    return next({ name: 'home' })
  }

  next()
})

export default router
