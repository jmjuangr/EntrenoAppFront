import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// i18n
import { createI18n } from 'vue-i18n'

const messages = {
  es: {
    title: 'Tu App de entreno',
    search_label: 'Buscar películas o series',
    no_results: 'No se encontraron resultados.',
    movies: 'Películas',
    series: 'Series',
    view_movies: 'Ver Películas',
    view_series: 'Ver Series',
    admin: 'Admin',
    statistics: 'Estadísticas',
    favorite_movies: 'Películas favoritas',
    favorite_series: 'Series favoritas',
    spanish: 'Español',
    english: 'Inglés',
    view_more: 'Ver más',
    content_not_found: 'Contenido no encontrado',
    add_to_favorites: 'Añadir a favoritos',
    remove_from_favorites: 'Quitar de favoritos',
    no_favorites: 'No tienes películas ni series marcadas como favoritas.',
    favorites_chart: 'Contenido marcado como favorito',
    totals_chart: 'Total de contenido disponible',
    total_items: 'Totales',
    latest_movies: 'Últimas películas añadidas',
    admin_title: 'Añadir películas y series',
    admin_select_label: '¿Qué quieres añadir?',
    admin_title_label: 'Título',
    admin_description_label: 'Descripción',
    admin_image_label: 'URL de la imagen',
    admin_favorite_label: '¿Es favorita?',
    admin_add_button: 'Añadir',
    admin_movies_list: 'Películas',
    admin_series_list: 'Series',
  },
  en: {
    title: 'Tu App de entreno',
    admin: 'Admin',
    search_label: 'Search movies or series',
    no_results: 'No results found.',
    movies: 'Movies',
    series: 'Series',
    view_movies: 'View Movies',
    view_series: 'View Series',
    favorites: 'Favorites',
    statistics: 'Statistics',
    favorite_movies: 'Favorite movies',
    favorite_series: 'Favorite series',
    spanish: 'Spanish',
    english: 'English',
    view_more: 'View more',
    content_not_found: 'Content not found',
    add_to_favorites: 'Add to favorites',
    remove_from_favorites: 'Remove from favorites',
    no_favorites: 'You have no movies or series marked as favorites.',
    favorites_chart: 'Marked as favorite',
    totals_chart: 'Total available content',
    total_items: 'Totals',
    latest_movies: 'Latest movies added',
    admin_title: 'Add Movies and Series',
    admin_select_label: 'What do you want to add?',
    admin_title_label: 'Title',
    admin_description_label: 'Description',
    admin_image_label: 'Image URL',
    admin_favorite_label: 'Is it a favorite?',
    admin_add_button: 'Add',
    admin_movies_list: 'Movies',
    admin_series_list: 'Series',
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages,
})

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(vuetify)
app.mount('#app')
