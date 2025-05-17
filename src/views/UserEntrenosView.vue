<template>
  <v-container>
    <h2 class="mb-4">Mis entrenamientos</h2>

    <v-row>
      <!-- Formulario -->
      <v-col cols="12" md="4">
        <v-form @submit.prevent="submitEntrenamiento">
          <v-select
            v-model="categoriaId"
            :items="store.categorias"
            item-title="tipo"
            item-value="id"
            label="Categoría"
            required
          />

          <v-text-field v-model="descripcion" label="Descripción" required />
          <v-text-field
            v-model.number="duracion"
            type="number"
            label="Duración (minutos)"
            required
          />
          <v-select :items="intensidades" v-model="intensidad" label="Intensidad" required />
          <v-date-picker v-model="fecha" color="primary" show-adjacent-months />

          <v-btn type="submit" color="primary" class="mt-3">Añadir entrenamiento</v-btn>
        </v-form>
      </v-col>

      <v-col cols="12" md="8">
        <v-row>
          <v-col
            v-for="entreno in store.entrenamientos.filter(
              (e) => e.usuarioId === store.usuarioActual?.id,
            )"
            :key="entreno.id"
            cols="12"
            sm="6"
            md="6"
          >
            <EntrenoCard :entreno="entreno" @eliminar="store.deleteEntrenamiento(entreno.id)" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useEntrenosStore } from '../store/entreno'
import EntrenoCard from '../components/EntrenoCard.vue'

const store = useEntrenosStore()

// Campos del formulario
const descripcion = ref('')
const duracion = ref(30)
const intensidad = ref('')
const fecha = ref(new Date().toISOString().substr(0, 10))
const intensidades = ['baja', 'media', 'alta']
const categoriaId = ref<number | null>(null)

// Entrenamientos del usuario actual
const eventos = computed(() =>
  store.entrenamientos
    .filter((e) => e.usuarioId === store.usuarioActual?.id)

    .map((e) => ({
      title: e.descripcion,
      start: e.fecha,
      color: e.intensidad === 'alta' ? 'red' : e.intensidad === 'media' ? 'orange' : 'green',
    })),
)

onMounted(() => {
  store.fetchEntrenamientos()
  store.fetchCategorias()
})

async function submitEntrenamiento() {
  if (!store.usuarioActual || !categoriaId.value) return

  await store.addEntrenamiento({
    usuarioId: store.usuarioActual.id,
    categoriaEntrenamientoId: categoriaId.value,
    descripcion: descripcion.value,
    duracion: duracion.value,
    fecha: fecha.value,
    intensidad: intensidad.value,
    completado: false,
    puntosExperencia: 0,
  })

  // Limpiar el formulario
  descripcion.value = ''
  duracion.value = 30
  intensidad.value = ''
  categoriaId.value = null

  await store.fetchEntrenamientos() // ← vuelve a cargar los eventos
}
</script>
