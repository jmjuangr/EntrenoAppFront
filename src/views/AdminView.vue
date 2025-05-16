<template>
  <v-container class="text-center">
    <h1 class="text-h4 mb-6">{{ $t('title') }}</h1>

    <v-row>
      <v-col cols="12" md="6">
        <h2>Usuarios</h2>
        <v-list>
          <v-list-item v-for="usuario in store.usuarios" :key="usuario.id">
            {{ usuario.nombre }} ({{ usuario.nivel }})
            <v-btn icon @click="store.deleteUsuario(usuario.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" md="6">
        <h2>Categorías</h2>
        <v-list>
          <v-list-item v-for="cat in store.categorias" :key="cat.id">
            {{ cat.tipo }} - {{ cat.colorVisual }}
            <v-btn icon @click="store.deleteCategoria(cat.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useEntrenosStore } from '../store/entreno'

const store = useEntrenosStore()

onMounted(() => {
  store.fetchUsuarios()
  store.fetchCategorias()
})
</script>
