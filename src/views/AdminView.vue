<template>
  <v-container class="text-center">
    <h1 class="text-h4 mb-6">Zona de administración</h1>

    <v-row>
      <!-- GESTIÓN DE USUARIOS -->
      <v-col cols="12" md="6">
        <h2>Usuarios</h2>

        <!-- Formulario de alta -->
        <v-form @submit.prevent="crearUsuario">
          <v-text-field v-model="nuevoUsuario.nombre" label="Nombre" required />
          <v-text-field v-model="nuevoUsuario.edad" type="number" label="Edad" required />
          <v-text-field v-model="nuevoUsuario.genero" label="Género" required />
          <v-select v-model="nuevoUsuario.nivel" :items="niveles" label="Nivel" required />
          <v-text-field v-model="nuevoUsuario.pass" type="password" label="Contraseña" required />
          <v-btn type="submit" color="primary" class="mb-4">Registrar usuario</v-btn>
        </v-form>

        <!-- Lista de usuarios -->
        <v-list>
          <v-list-item v-for="usuario in store.usuarios" :key="usuario.id">
            {{ usuario.nombre }} ({{ usuario.nivel }})
            <v-btn icon @click="store.deleteUsuario(usuario.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- GESTIÓN DE CATEGORÍAS -->
      <v-col cols="12" md="6">
        <h2>Categorías</h2>

        <!-- Formulario nueva categoría -->
        <v-form @submit.prevent="crearCategoria">
          <v-text-field v-model="nuevaCategoria.tipo" label="Tipo" required />
          <v-text-field v-model="nuevaCategoria.colorVisual" label="Color (CSS)" required />
          <v-btn type="submit" color="success" class="mb-4">Crear categoría</v-btn>
        </v-form>

        <!-- Lista de categorías -->
        <v-list>
          <v-list-item v-for="cat in store.categorias" :key="cat.id">
            {{ cat.tipo }} - <span :style="{ color: cat.colorVisual }">{{ cat.colorVisual }}</span>
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
import { onMounted, ref } from 'vue'
import { useEntrenosStore } from '../store/entreno'

const store = useEntrenosStore()

// Alta de usuario
const nuevoUsuario = ref({
  nombre: '',
  edad: 0,
  genero: '',
  nivel: '',
  pass: '',
  admin: false,
})
const niveles = ['principiante', 'intermedio', 'avanzado']

// Alta de categoría
const nuevaCategoria = ref({
  tipo: '',
  colorVisual: '',
})

async function crearUsuario() {
  await store.addUsuario(nuevoUsuario.value)
  store.fetchUsuarios()
  Object.assign(nuevoUsuario.value, {
    nombre: '',
    edad: 0,
    genero: '',
    nivel: '',
    pass: '',
    admin: false,
  })
}

async function crearCategoria() {
  await store.addCategoria(nuevaCategoria.value)
  store.fetchCategorias()
  Object.assign(nuevaCategoria.value, { tipo: '', colorVisual: '' })
}

onMounted(() => {
  store.fetchUsuarios()
  store.fetchCategorias()
})
</script>
