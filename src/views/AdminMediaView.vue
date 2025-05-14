<template>
  <v-container>
    <h1
      class="text-h5 mb-6 py-2 px-4 text-white"
      style="background-color: #6200ea; border-radius: 8px"
    >
      {{ $t('admin_title') }}
    </h1>

    <!-- Formulario crear -->
    <v-form @submit.prevent="addMoviesSeries">
      <v-select
        v-model="type"
        :items="['movie', 'series']"
        :label="$t('admin_select_label')"
        class="mb-4"
        required
      />
      <v-text-field v-model="title" :label="$t('admin_title_label')" required />
      <v-textarea v-model="description" :label="$t('admin_description_label')" required />
      <v-text-field v-model="image" :label="$t('admin_image_label')" required />
      <v-switch v-model="favorite" :label="$t('admin_favorite_label')" />
      <v-btn type="submit" color="primary" class="mt-3">
        {{ $t('admin_add_button') }}
      </v-btn>
    </v-form>

    <v-divider class="my-6" />

    <!-- Lista de películas -->
    <h2 class="text-h6 mb-4">{{ $t('admin_movies_list') }}</h2>
    <v-row>
      <v-col v-for="movie in store.movies" :key="movie.id" cols="12" md="4">
        <v-card class="elevation-2">
          <v-img :src="movie.image" height="150px" cover />
          <v-card-title>{{ movie.title }}</v-card-title>
          <v-card-text>{{ movie.description }}</v-card-text>
          <v-card-actions>
            <v-btn icon color="error" @click="removeMedia('movies', movie.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Lista de series -->
    <h2 class="text-h6 mt-8 mb-4">{{ $t('admin_series_list') }}</h2>
    <v-row>
      <v-col v-for="serie in store.series" :key="serie.id" cols="12" md="4">
        <v-card class="elevation-2">
          <v-img :src="serie.image" height="150px" cover />
          <v-card-title>{{ serie.title }}</v-card-title>
          <v-card-text>{{ serie.description }}</v-card-text>
          <v-card-actions>
            <v-btn icon color="error" @click="removeMedia('series', serie.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useMediaStore } from '../store/media'

const store = useMediaStore()

const type = ref<'movies' | 'series'>('movies')
const title = ref('')
const description = ref('')
const image = ref('')
const favorite = ref(false)

// Antes: addMovie / addSeries solo en memoria
/*
function addMoviesSeries() {
  ...
  if (type.value === 'movie') {
    store.addMovie(newItem)
  } else {
    store.addSeries(newItem)
  }
}
*/

//  Ahora: uso store.addMedia que guarda en backend
async function addMoviesSeries() {
  if (!title.value || !description.value || !image.value) return

  const currentList = type.value === 'movies' ? store.movies : store.series
  const ids = currentList.map((m) => Number(m.id))
  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1

  const newItem = {
    id: newId.toString(),
    title: title.value,
    description: description.value,
    image: image.value,
    favorite: favorite.value,
  }

  await store.addMedia(type.value, newItem)
  await store.fetchMedia()

  title.value = ''
  description.value = ''
  image.value = ''
  favorite.value = false
}

// nueva función para borrar
async function removeMedia(type: 'movies' | 'series', id: number) {
  await store.deleteMedia(type, id)
}
</script>
