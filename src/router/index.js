import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import FavoritesView from '../views/FavoritesView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/detalle/:id',
    name: 'detalle',
    component: DetailView,
  },
  {
    path: '/favoritas',
    name: 'favoritas',
    component: FavoritesView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
