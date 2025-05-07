import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import MoviesView from '../views/MoviesView.vue'
import SeriesView from '../views/SeriesView.vue'
import StatisticsView from '../views/StatisticsView.vue'
import AdminMediaView from '../views/AdminMediaView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/detalle/:type/:id',
    name: 'detalle',
    component: DetailView,
  },
  {
    path: '/favoritas',
    name: 'favoritas',
    component: FavoritesView,
  },
  {
    path: '/peliculas',
    name: 'peliculas',
    component: MoviesView,
  },
  {
    path: '/series',
    name: 'series',
    component: SeriesView,
  },

  {
    path: '/estadisticas',
    name: 'estadisticas',
    component: StatisticsView,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminMediaView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
