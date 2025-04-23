<template>
  <v-container v-if="movie">
    <v-row>
      <v-col cols="12" md="4">
        <v-img :src="movie.image" height="300px"></v-img>
      </v-col>
      <v-col cols="12" md="8">
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.description }}</p>
        <v-btn @click="store.toggleFavorite(movie.id)" :color="movie.favorite ? 'red' : 'grey'">
          {{ movie.favorite ? 'Quitar de favoritos' : 'Añadir a favoritos' }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <div v-else>
    <v-alert type="error" class="ma-5">Película no encontrada.</v-alert>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useMovieStore } from '../store/movies'

const store = useMovieStore()
const route = useRoute()

const id = computed(() => Number(route.params.id))
const movie = computed(() => store.getMovieById(id.value))

onMounted(() => {
  if (store.movies.length === 0) {
    store.fetchMovies()
  }
})
</script>
