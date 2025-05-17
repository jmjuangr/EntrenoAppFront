<template>
  <v-app-bar app color="grey-darken-3" dark>
    <v-toolbar-title>Tu App de entreno</v-toolbar-title>

    <v-spacer />

    <!-- Botón de salir solo si hay usuario logueado -->
    <v-btn v-if="store.token" text @click="logout">
      Salir
      <v-icon end>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useEntrenosStore } from '../store/entreno'
import { useRouter } from 'vue-router'

const store = useEntrenosStore()
const router = useRouter()

function logout() {
  store.token = ''
  store.usuarioActual = null
  router.push('/')
}
</script>

<style scoped></style>
