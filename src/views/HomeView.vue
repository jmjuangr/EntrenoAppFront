<template>
  <v-container class="text-center">
    <h1 class="text-h4 mb-6">{{ $t('title') }}</h1>

    <!-- Buscador -->
    <v-text-field
      v-model="search"
      :label="$t('search_label')"
      class="mb-10"
      clearable
      prepend-icon="mdi-magnify"
      @click:clear="search = ''"
    />

    <!-- Título del carrusel -->
    <h2
      class="text-h5 mb-4 py-2 px-4 text-white"
      style="background-color: #6200ea; border-radius: 8px; display: inline-block"
    >
      {{ $t('latest_movies') }}
    </h2>

    <!-- Carrusel de últimas películas -->
    <div class="mx-auto mb-10" style="max-width: 600px">
      <v-carousel height="300" hide-delimiter-background cycle show-arrows>
        <v-carousel-item v-for="movie in latestMovies" :key="movie.id">
          <div class="d-flex flex-column align-center">
            <v-img :src="movie.image" height="220px" width="100%" cover class="rounded-lg mb-2" />
            <h3 class="text-subtitle-1 text-center">{{ movie.title }}</h3>
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>

    <!-- Accesos a peliculas y series -->
    <v-row justify="center" align="center" class="mb-10">
      <v-col cols="12" md="4">
        <v-card class="elevation-4">
          <v-img :src="movieImage" height="200px" cover />
          <v-card-title>{{ $t('movies') }}</v-card-title>
          <v-card-actions>
            <v-btn color="primary" :to="'/peliculas'" block>{{ $t('view_movies') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="elevation-4">
          <v-img :src="seriesImage" height="200px" cover />
          <v-card-title>{{ $t('series') }}</v-card-title>
          <v-card-actions>
            <v-btn color="secondary" :to="'/series'" block>{{ $t('view_series') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Resultados de búsqueda de películas -->
    <div v-if="filteredMovies.length > 0" class="mb-10">
      <h2
        class="text-h5 mb-2 py-2 px-4 text-white"
        style="background-color: #3f51b5; border-radius: 8px; display: inline-block"
      >
        {{ $t('movies') }}
      </h2>
      <v-row>
        <v-col v-for="movie in filteredMovies" :key="'movie-' + movie.id" cols="12" md="4">
          <MediaCard :item="movie" type="movies" />
        </v-col>
      </v-row>
    </div>

    <!-- Resultados de búsquedade series -->
    <div v-if="filteredSeries.length > 0" class="mb-10">
      <h2
        class="text-h5 mt-6 mb-2 py-2 px-4 text-white"
        style="background-color: #0097a7; border-radius: 8px; display: inline-block"
      >
        {{ $t('series') }}
      </h2>
      <v-row>
        <v-col v-for="serie in filteredSeries" :key="'series-' + serie.id" cols="12" md="4">
          <MediaCard :item="serie" type="series" />
        </v-col>
      </v-row>
    </div>

    <v-alert
      v-if="search && filteredMovies.length === 0 && filteredSeries.length === 0"
      type="info"
      class="ma-10"
    >
      {{ $t('no_results') }}
    </v-alert>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useMediaStore } from '../store/media'
import MediaCard from '../components/MediaCard.vue'
import movieImage from '@/assets/img/movies.jpg'
import seriesImage from '@/assets/img/series.jpg'

const store = useMediaStore()

const search = ref('')

const filteredMovies = computed(() => {
  if (!search.value.trim()) return []
  return store.movies.filter((m) =>
    `${m.title} ${m.description}`.toLowerCase().includes(search.value.toLowerCase()),
  )
})

const filteredSeries = computed(() => {
  if (!search.value.trim()) return []
  return store.series.filter((s) =>
    `${s.title} ${s.description}`.toLowerCase().includes(search.value.toLowerCase()),
  )
})

const latestMovies = computed(() => {
  return [...store.movies].slice(-3).reverse()
})

onMounted(async () => {
  if (store.movies.length === 0 || store.series.length === 0) {
    await store.fetchMedia()
  }
})
</script>
