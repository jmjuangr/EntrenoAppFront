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
  pass?: string
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
  colorVisual: string
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
    // usuarioLogueado: null as UsuarioDTO | null,
    token: '' as string,
    usuarioActual: null as UsuarioDTO | null,
  }),

  actions: {
    // --- USUARIOS ---
    async fetchUsuarios() {
      const res = await fetch(`${BASE_URL}/usuario`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      this.usuarios = await res.json()
    },

    async addUsuario(dto: UsuarioCreateDTO) {
      const res = await fetch(`${BASE_URL}/usuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(dto),
      })

      const nuevo = await res.json()
      this.usuarios.push(nuevo)
    },

    async deleteUsuario(id: number) {
      await fetch(`${BASE_URL}/usuario/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })

      this.usuarios = this.usuarios.filter((u) => u.id !== id)
    },

    async loginUsuario(nombre: string, pass: string) {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, pass }),
      })

      if (!res.ok) {
        throw new Error('Login incorrecto')
      }

      const data = await res.json()
      this.token = data.token
      this.usuarioActual = data.usuario
    },

    logoutUsuario() {
      this.token = ''
      this.usuarioActual = null
    },

    // --- ENTRENAMIENTOS ---
    async fetchEntrenamientos(
      params: { intensidad?: string; completado?: boolean; orden?: string } = {},
    ) {
      const query = new URLSearchParams()
      if (params.intensidad) query.append('intensidad', params.intensidad)
      if (params.completado !== undefined) query.append('completado', String(params.completado))
      if (params.orden) query.append('orden', params.orden)

      const res = await fetch(`${BASE_URL}/entrenamiento?${query.toString()}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })

      this.entrenamientos = await res.json()
    },

    async addEntrenamiento(dto: EntrenamientoCreateDTO) {
      const res = await fetch(`${BASE_URL}/entrenamiento`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(dto),
      })

      const nuevo = await res.json()
      this.entrenamientos.push(nuevo)
    },

    async deleteEntrenamiento(id: number) {
      await fetch(`${BASE_URL}/entrenamiento/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })

      this.entrenamientos = this.entrenamientos.filter((e) => e.id !== id)
    },

    // --- CATEGORÍAS ---
    async fetchCategorias() {
      const res = await fetch(`${BASE_URL}/categoriaentrenamiento`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      this.categorias = await res.json()
    },

    async addCategoria(dto: Omit<CategoriaEntrenamientoDTO, 'id'>) {
      const res = await fetch(`${BASE_URL}/categoriaentrenamiento`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(dto),
      })

      const nueva = await res.json()
      this.categorias.push(nueva)
    },

    async deleteCategoria(id: number) {
      await fetch(`${BASE_URL}/categoriaentrenamiento/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })

      this.categorias = this.categorias.filter((c) => c.id !== id)
    },
  },
})
