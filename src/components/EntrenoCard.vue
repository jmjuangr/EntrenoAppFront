<template>
  <v-card class="entreno-card">
    <v-card-title class="text-h6">{{ entreno.descripcion }}</v-card-title>
    <v-card-subtitle>{{ new Date(entreno.fecha).toLocaleDateString() }}</v-card-subtitle>

    <v-card-text>
      <v-chip class="ma-1 categoria-chip" :style="{ backgroundColor: entreno.colorVisual }">
        Categoría: {{ entreno.categoriaNombre }}
      </v-chip>

      <v-chip class="ma-1 duracion-chip" color="green" text-color="white">
        Duración: {{ entreno.duracion }} min
      </v-chip>

      <v-chip class="ma-1" :color="colorIntensidad" text-color="white">
        Intensidad: {{ entreno.intensidad }}
      </v-chip>

      <v-chip class="ma-1" :color="entreno.completado ? 'success' : 'grey'" text-color="white">
        <v-icon start>{{ entreno.completado ? 'mdi-check-circle' : 'mdi-progress-clock' }}</v-icon>
        {{ entreno.completado ? 'Completado' : 'Pendiente' }}
      </v-chip>
    </v-card-text>

    <v-card-actions>
      <v-btn color="error" @click="emitirEliminar">Eliminar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  entreno: {
    intensidad: string
    categoriaNombre: string
    descripcion: string
    duracion: number
    fecha: string
    completado: boolean
    colorVisual: string
  }
}>()

const emit = defineEmits<{
  (e: 'eliminar'): void
}>()

function emitirEliminar() {
  emit('eliminar')
}

const colorIntensidad = computed(() => {
  if (props.entreno.intensidad === 'alta') return 'red'
  if (props.entreno.intensidad === 'media') return 'orange'
  return 'green'
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/variables' as *;

.entreno-card {
  @include sombra-suave;
  @include texto-claro;
  border: 2px solid transparent;
  transition: border-color 0.3s;

  &:hover {
    border-color: $primary-color;
  }

  .v-card-title,
  .v-card-subtitle {
    color: $text-dark;
  }
}
</style>
