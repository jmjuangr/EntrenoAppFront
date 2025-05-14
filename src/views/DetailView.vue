<template>
  <v-container v-if="media">
    <v-row>
      <v-col cols="12" md="4">
        <v-img :src="media.image" height="300px"></v-img>
      </v-col>
      <v-col cols="12" md="8">
        <h2>{{ media.title }}</h2>
        <p>{{ media.description }}</p>
        <v-btn @click="toggleFavorite()" :color="media.favorite ? 'red' : 'grey'">
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

const route = useRoute()

const type = computed(() => route.params.type as 'movies' | 'series')
const id = computed(() => Number(route.params.id))

const media = ref<any>(null)

async function loadMediaDirecto() {
  try {
    const res = await fetch(`http://localhost:3001/${type.value}/${id.value}`)
    if (!res.ok) throw new Error()
    media.value = await res.json()
  } catch {
    media.value = null
  }
}

async function toggleFavorite() {
  await fetch(`http://localhost:3001/${type.value}/${id.value}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ favorite: !media.value.favorite }),
  })
  await loadMediaDirecto()
}

watch([type, id], loadMediaDirecto)

onMounted(loadMediaDirecto)
</script>
