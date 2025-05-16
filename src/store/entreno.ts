import { defineStore } from 'pinia'

const BASE_URL = 'http://localhost:5000/api'

// --- DTO Interfaces ---
export interface UsuarioDTO {
  id: number
  nombre: string
  edad: number
  genero: string
  nivel: string
  admin: boolean
}

export interface UsuarioCreateDTO {
  nombre: string
  edad: number
  genero: string
  nivel: string
  admin: boolean
  pass: string
}

export interface EntrenamientoDTO {
  id: number
  usuarioId: number
  usuarioNombre: string
  categoriaEntrenamientoId: number
  categoriaNombre: string
  descripcion: string
  duracion: number
  fecha: string // ISO string
  intensidad: string
  completado: boolean
  puntosExperencia: number
}

export interface EntrenamientoCreateDTO {
  usuarioId: number
  categoriaEntrenamientoId: number
  descripcion: string
  duracion: number
  fecha: string // ISO string
  intensidad: string
  completado: boolean
  puntosExperencia: number
}

export interface CategoriaEntrenamientoDTO {
  id: number
  tipo: string
  colorVisual: string
}

// --- STORE ---
export const useEntrenosStore = defineStore('entrenos', {
  state: () => ({
    usuarios: [] as UsuarioDTO[],
    entrenamientos: [] as EntrenamientoDTO[],
    categorias: [] as CategoriaEntrenamientoDTO[],
  }),

  actions: {
    // --- USUARIOS ---
    async fetchUsuarios() {
      const res = await fetch(`${BASE_URL}/usuario`)
      this.usuarios = await res.json()
    },

    async addUsuario(dto: UsuarioCreateDTO) {
      const res = await fetch(`${BASE_URL}/usuario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      })
      const nuevo = await res.json()
      this.usuarios.push(nuevo)
    },

    async deleteUsuario(id: number) {
      await fetch(`${BASE_URL}/usuario/${id}`, { method: 'DELETE' })
      this.usuarios = this.usuarios.filter((u) => u.id !== id)
    },

    // --- ENTRENAMIENTOS ---
    async fetchEntrenamientos(
      params: { intensidad?: string; completado?: boolean; orden?: string } = {},
    ) {
      const query = new URLSearchParams()
      if (params.intensidad) query.append('intensidad', params.intensidad)
      if (params.completado !== undefined) query.append('completado', String(params.completado))
      if (params.orden) query.append('orden', params.orden)

      const res = await fetch(`${BASE_URL}/entrenamiento?${query.toString()}`)
      this.entrenamientos = await res.json()
    },

    async addEntrenamiento(dto: EntrenamientoCreateDTO) {
      const res = await fetch(`${BASE_URL}/entrenamiento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      })
      const nuevo = await res.json()
      this.entrenamientos.push(nuevo)
    },

    async deleteEntrenamiento(id: number) {
      await fetch(`${BASE_URL}/entrenamiento/${id}`, { method: 'DELETE' })
      this.entrenamientos = this.entrenamientos.filter((e) => e.id !== id)
    },

    // --- CATEGORÍAS ---
    async fetchCategorias() {
      const res = await fetch(`${BASE_URL}/categoriaentrenamiento`)
      this.categorias = await res.json()
    },

    async addCategoria(dto: CategoriaEntrenamientoDTO) {
      const res = await fetch(`${BASE_URL}/categoriaentrenamiento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      })
      const nueva = await res.json()
      this.categorias.push(nueva)
    },

    async deleteCategoria(id: number) {
      await fetch(`${BASE_URL}/categoriaentrenamiento/${id}`, { method: 'DELETE' })
      this.categorias = this.categorias.filter((c) => c.id !== id)
    },
  },
})
