<template>
  <h1 class="text-h4 mb-4">{{ $t('favorites') }}</h1>

  <!-- Sección de Películas -->
  <div v-if="store.favoriteMovies.length > 0">
    <h2 class="text-h5 mb-2">{{ $t('movies') }}</h2>
    <v-row>
      <v-col v-for="movie in store.favoriteMovies" :key="movie.id" cols="12" md="4">
        <MovieCard :item="movie" type="movie" />
      </v-col>
    </v-row>
  </div>

  <!-- Sección de Series -->
  <div v-if="store.favoriteSeries.length > 0">
    <h2 class="text-h5 mt-6 mb-2">{{ $t('series') }}</h2>
    <v-row>
      <v-col v-for="serie in store.favoriteSeries" :key="serie.id" cols="12" md="4">
        <MovieCard :item="serie" type="series" />
      </v-col>
    </v-row>
  </div>

  <v-alert
    v-if="store.favoriteMovies.length === 0 && store.favoriteSeries.length === 0"
    type="info"
    class="ma-5"
  >
    {{ $t('no_favorites') }}
  </v-alert>
</template>

<script lang="ts" setup>
import { useMediaStore } from '../store/media'
import MovieCard from '../components/MediaCard.vue'
import { onMounted } from 'vue'

const store = useMediaStore()

onMounted(() => {
  if (store.movies.length === 0 || store.series.length === 0) {
    store.fetchMedia()
  }
})
</script>
