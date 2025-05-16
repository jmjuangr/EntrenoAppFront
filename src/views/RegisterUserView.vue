<template>
  <v-container>
    <h1
      class="text-h5 mb-6 py-2 px-4 text-white"
      style="background-color: #6200ea; border-radius: 8px"
    >
      {{ $t('Registro usuario') }}
    </h1>

    <v-row justify="center">
      <v-col cols="12" lg="6" md="8" sm="10">
        <v-form v-model="formValid" @submit.prevent="submit">
          <v-card>
            <v-card-text>
              <v-text-field
                v-model="name"
                :rules="[required]"
                label="Nombre"
                placeholder="Juan Pérez"
                required
              />

              <v-text-field
                v-model="edad"
                :rules="edadRules"
                type="number"
                label="Edad"
                placeholder="25"
                required
              />

              <v-text-field
                v-model="genero"
                :rules="[required]"
                label="Género"
                placeholder="Masculino/Femenino/Otro"
                required
              />

              <v-text-field
                v-model="pass"
                :rules="[required]"
                label="Contraseña"
                type="password"
                placeholder="Ingresa tu contraseña"
                required
              />

              <v-autocomplete
                v-model="nivel"
                :items="levels"
                :rules="[required]"
                label="Nivel"
                placeholder="Selecciona tu nivel"
                required
              />
            </v-card-text>

            <v-divider class="mt-4" />

            <v-card-actions>
              <v-btn variant="text" @click="resetForm">Cancelar</v-btn>
              <v-spacer />
              <v-btn color="primary" type="submit" variant="elevated">Registrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useEntrenosStore } from '../store/entreno'

const store = useEntrenosStore()

const formValid = ref(false)
const name = ref('')
const edad = ref<number | null>(null)
const genero = ref('')
const pass = ref('')
const nivel = ref('')
const levels = ['Principiante', 'Intermedio', 'Avanzado']

const required = (v: string | number | null) => !!v || 'Este campo es requerido'

const edadRules = [
  (v: number | null) => !!v || 'Este campo es requerido',
  (v: number | null) => !v || (v > 0 && v < 120) || 'Edad no válida',
]

const resetForm = () => {
  name.value = ''
  edad.value = null
  genero.value = ''
  nivel.value = ''
  pass.value = ''
  formValid.value = false
}

const submit = async () => {
  if (!formValid.value) return

  const newUser = {
    nombre: name.value,
    edad: edad.value ?? 0,
    genero: genero.value,
    nivel: nivel.value,
    admin: false,
    pass: pass.value,
  }

  await store.addUsuario(newUser)
  alert('Usuario registrado correctamente')
  resetForm()
}
</script>
