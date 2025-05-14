<template>
  <h1 class="text-h4 mb-4">{{ $t('movies') }}</h1>
  <v-row>
    <v-col v-for="movie in store.movies" :key="movie.id" cols="12" md="4">
      <MediaCard :item="movie" type="movies" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useMediaStore } from '../store/media'
import MediaCard from '../components/MediaCard.vue'
import { onMounted } from 'vue'

const store = useMediaStore()

onMounted(async () => {
  if (store.movies.length === 0) {
    await store.fetchMedia()
  }
})
</script>
