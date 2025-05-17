<template>
  <v-container class="d-flex justify-center">
    <v-sheet class="bg-deep-purple pa-12" rounded>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-form v-model="formRef" @submit.prevent="onSubmit">
          <v-text-field
            v-model="name"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            label="Nombre"
            clearable
          />
          <v-text-field
            v-model="pass"
            :readonly="loading"
            :rules="[required]"
            label="Contraseña"
            placeholder="Contraseña..."
            type="password"
            clearable
          />
          <br />
          <v-btn
            :loading="loading"
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            block
          >
            Iniciar sesión
          </v-btn>
          <v-btn
            to="/register"
            :loading="loading"
            color="primary"
            size="large"
            variant="elevated"
            block
          >
            Registrarse
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useEntrenosStore } from '../store/entreno'
import { useRouter } from 'vue-router'

const formRef = ref() // para enlazar con v-form sin bloquear por booleano
const name = ref('')
const pass = ref('')
const loading = ref(false)

const store = useEntrenosStore()
const router = useRouter()

function required(v: string) {
  return !!v || 'Campo obligatorio'
}

async function onSubmit() {
  if (!name.value || !pass.value) return

  loading.value = true
  try {
    await store.loginUsuario(name.value, pass.value)

    loading.value = false
    if (store.usuarioActual?.admin) {
      router.push('/admin')
    } else {
      router.push('/mis-entrenos')
    }
  } catch (error) {
    loading.value = false
    alert('Credenciales incorrectas')
  }
}
</script>
