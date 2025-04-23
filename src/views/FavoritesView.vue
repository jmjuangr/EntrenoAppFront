<template>
  <h1 class="text-h4 mb-4">Mis Películas Favoritas</h1>
  <v-row>
    <v-col v-for="movie in store.favoriteMovies" :key="movie.id" cols="12" md="4">
      <MovieCard :movie="movie" />
    </v-col>
  </v-row>

  <v-alert v-if="store.favoriteMovies.length === 0" type="info" class="ma-5">
    No tienes películas favoritas todavía.
  </v-alert>
</template>

<script lang="ts" setup>
import { useMovieStore } from '../store/movies'
import MovieCard from '../components/MovieCard.vue'

const store = useMovieStore()
</script>
