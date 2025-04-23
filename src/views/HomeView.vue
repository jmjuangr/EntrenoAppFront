<template>
  <h1 class="text-h4 mb-4">Listado de Películas</h1>
  <v-row>
    <v-col v-for="movie in store.movies" :key="movie.id" cols="12" md="4">
      <MovieCard :movie="movie" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useMovieStore } from '../store/movies'
import MovieCard from '../components/MovieCard.vue'

const store = useMovieStore()

onMounted(() => {
  store.fetchMovies()
})
</script>
