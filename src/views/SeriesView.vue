<template>
  <h1 class="text-h4 mb-4">{{ $t('series') }}</h1>
  <v-row>
    <v-col v-for="serie in store.series" :key="serie.id" cols="12" md="4">
      <MediaCard :item="serie" type="series" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useMediaStore } from '../store/media'
import MediaCard from '../components/MediaCard.vue'
import { onMounted } from 'vue'

const store = useMediaStore()

onMounted(async () => {
  if (store.series.length === 0) {
    await store.fetchMedia()
  }
})
</script>
