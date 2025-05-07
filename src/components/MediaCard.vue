<template>
  <v-card class="mx-auto my-2 elevation-4" max-width="400">
    <v-img :src="item.image" height="200px"></v-img>
    <v-card-title>{{ item.title }}</v-card-title>
    <v-card-text>{{ item.description }}</v-card-text>
    <v-card-actions>
      <v-btn :to="`/detalle/${type}/${item.id}`" color="primary"> {{ $t('view_more') }}</v-btn>

      <v-btn
        icon
        @click="store.toggleFavorite(type, item.id)"
        :color="item.favorite ? 'red' : 'grey'"
      >
        <v-icon>{{ item.favorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { useMediaStore } from '../store/media'
import type { MediaItem } from '../store/media'

const props = defineProps<{
  item: MediaItem
  type: 'movie' | 'series'
}>()

const store = useMediaStore()
</script>
