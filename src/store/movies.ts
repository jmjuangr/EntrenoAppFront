import { defineStore } from 'pinia'

export interface Movie {
  id: number
  title: string
  description: string
  image: string
  favorite: boolean
}

export const useMovieStore = defineStore('movies', {
  state: () => ({
    movies: [] as Movie[],
  }),
  getters: {
    favoriteMovies(state): Movie[] {
      return state.movies.filter((m) => m.favorite)
    },
    getMovieById: (state) => {
      return (id: number) => state.movies.find((m) => m.id === id)
    },
  },
  actions: {
    async fetchMovies() {
      // Simulación de petición al "backend"
      this.movies = [
        {
          id: 1,
          title: 'Inception',
          description: 'Un ladrón que roba secretos mediante sueños.',
          image: 'https://image.tmdb.org/t/p/w200//qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
          favorite: false,
        },
        {
          id: 2,
          title: 'Interstellar',
          description: 'Exploradores viajan a través de un agujero de gusano.',
          image: 'https://image.tmdb.org/t/p/w200//gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
          favorite: true,
        },
      ]
    },
    toggleFavorite(id: number) {
      const movie = this.movies.find((m) => m.id === id)
      if (movie) {
        movie.favorite = !movie.favorite
      }
    },
  },
})
