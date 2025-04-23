<template>
  <v-card>
    <v-img :src="movie.image" height="200px"></v-img>
    <v-card-title>{{ movie.title }}</v-card-title>
    <v-card-text>{{ movie.description }}</v-card-text>
    <v-card-actions>
      <v-btn :to="`/detalle/${movie.id}`" color="primary">Ver más</v-btn>
      <v-btn icon @click="toggleFavorite(movie.id)" :color="movie.favorite ? 'red' : 'grey'">
        <v-icon>{{ movie.favorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { useMovieStore } from '../store/movies'
import type { Movie } from '../store/movies'

const props = defineProps<{
  movie: Movie
}>()

const { toggleFavorite } = useMovieStore()
</script>
