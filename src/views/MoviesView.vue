<template>
  <h1 class="text-h4 mb-4">{{ $t('movies') }}</h1>
  <v-row>
    <v-col v-for="movie in store.movies" :key="movie.id" cols="12" md="4">
      <MovieCard :item="movie" type="movie" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useMediaStore } from '../store/media'
import MovieCard from '../components/MediaCard.vue'
import { onMounted } from 'vue'

const store = useMediaStore()

onMounted(() => {
  if (store.movies.length === 0) {
    store.fetchMedia()
  }
})
</script>
