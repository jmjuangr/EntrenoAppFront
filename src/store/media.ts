import { defineStore } from 'pinia'

export interface MediaItem {
  id: number
  title: string
  description: string
  image: string
  favorite: boolean
}

//base del backend json-server
const BASE_URL = 'http://localhost:3001'

export const useMediaStore = defineStore('media', {
  state: () => ({
    movies: [] as MediaItem[],
    series: [] as MediaItem[],
  }),

  getters: {
    favoriteMovies(state): MediaItem[] {
      return state.movies.filter((m) => m.favorite)
    },
    favoriteSeries(state): MediaItem[] {
      return state.series.filter((s) => s.favorite)
    },
    getMovieById: (state) => {
      return (id: number) => state.movies.find((m) => m.id === id)
    },
    getSeriesById: (state) => {
      return (id: number) => state.series.find((s) => s.id === id)
    },
  },

  actions: {
    // Antes: Datos estáticos

    // cargamos desde json
    async fetchMedia() {
      const [moviesRes, seriesRes] = await Promise.all([
        fetch(`${BASE_URL}/movies`),
        fetch(`${BASE_URL}/series`),
      ])
      this.movies = await moviesRes.json()
      this.series = await seriesRes.json()
    },

    // Antes: solo cambiaba el valor favorite en memoria

    // Ahora: actualiza el favorito y lo guarda en json-server
    async toggleFavorite(type: 'movies' | 'series', id: number) {
      const list = type === 'movies' ? this.movies : this.series
      const item = list.find((i) => i.id === id)
      if (!item) return

      item.favorite = !item.favorite

      await fetch(`${BASE_URL}/${type}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorite: item.favorite }),
      })
    },

    // Antes: añadía solo al array local

    // Ahora:  POST a json-server y luego se guarda en el array
    async addMedia(type: 'movies' | 'series', media: Omit<MediaItem, 'id'>) {
      const res = await fetch(`${BASE_URL}/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(media),
      })
      const newItem = await res.json()
      if (type === 'movies') {
        this.movies.push(newItem)
      } else {
        this.series.push(newItem)
      }
    },

    //Antes: solo quitaba del array local

    //borro del json-server
    async deleteMedia(type: 'movies' | 'series', id: number) {
      await fetch(`${BASE_URL}/${type}/${id}`, {
        method: 'DELETE',
      })
      if (type === 'movies') {
        this.movies = this.movies.filter((m) => m.id !== id)
      } else {
        this.series = this.series.filter((s) => s.id !== id)
      }
    },
  },
})
