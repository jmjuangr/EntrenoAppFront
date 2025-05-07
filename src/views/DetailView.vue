<template>
  <v-container v-if="media">
    <v-row>
      <v-col cols="12" md="4">
        <v-img :src="media.image" height="300px"></v-img>
      </v-col>
      <v-col cols="12" md="8">
        <h2>{{ media.title }}</h2>
        <p>{{ media.description }}</p>
        <v-btn
          @click="store.toggleFavorite(type, media.id)"
          :color="media.favorite ? 'red' : 'grey'"
        >
          {{ media.favorite ? $t('remove_from_favorites') : $t('add_to_favorites') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <v-alert v-else type="error" class="ma-5">
    {{ $t('content_not_found') }}
  </v-alert>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMediaStore } from '../store/media'

const route = useRoute()
const store = useMediaStore()

const type = computed(() => route.params.type as 'movie' | 'series')
const id = computed(() => Number(route.params.id))

const media = ref<any>(null)

const loadMedia = () => {
  if (type.value === 'movie') {
    media.value = store.getMovieById(id.value) || null
  } else if (type.value === 'series') {
    media.value = store.getSeriesById(id.value) || null
  } else {
    media.value = null
  }
}

onMounted(async () => {
  if (store.movies.length === 0 || store.series.length === 0) {
    await store.fetchMedia()
  }
  loadMedia()
})

watch([type, id], loadMedia)
</script>
