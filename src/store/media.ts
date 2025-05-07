import { defineStore } from 'pinia'

export interface MediaItem {
  id: number
  title: string
  description: string
  image: string
  favorite: boolean
}

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
    async fetchMedia() {
      // Simulación de datos desde el backend
      this.movies = [
        {
          id: 1,
          title: 'El Padrino',
          description:
            'América, años 40. Don Vito Corleone (Marlon Brando) es el respetado y temido jefe de una de las cinco familias de la mafia de Nueva York. Tiene cuatro hijos: Connie (Talia Shire), el impulsivo Sonny (James Caan), el pusilánime Fredo (John Cazale) y Michael (Al Pacino), que no quiere saber nada de los negocios de su padre. Cuando Corleone, en contra de los consejos de "Il consigliere" Tom Hagen (Robert Duvall), se niega a participar en el negocio de las drogas, el jefe de otra banda ordena su asesinato. Empieza entonces una violenta y cruenta guerra entre las familias mafiosas.',
          image: 'https://pics.filmaffinity.com/the_godfather-488102675-large.jpg',
          favorite: true,
        },
        {
          id: 2,
          title: 'Uno de los nuestros',
          description:
            'EHenry Hill, hijo de padre irlandés y madre siciliana, vive en Brooklyn y se siente fascinado por la vida que llevan los gángsters de su barrio, donde la mayoría de los vecinos son inmigrantes. Paul Cicero, el patriarca de la familia Pauline, es el protector del barrio. A los trece años, Henry decide abandonar la escuela y entrar a formar parte de la organización mafiosa como chico de los recados; muy pronto se gana la confianza de sus jefes, gracias a lo cual irá subiendo de categoría.',
          image: 'https://pics.filmaffinity.com/goodfellas-343032101-large.jpg',
          favorite: true,
        },
        {
          id: 3,
          title: 'Apocalypse Now',
          description:
            'Durante la guerra de Vietnam, al joven Capitán Willard, un oficial de los servicios de inteligencia del ejército estadounidense, se le ha encomendado entrar en Camboya con la peligrosa misión de eliminar a Kurtz, un coronel renegado que se ha vuelto loco. El capitán deberá ir navegar por el río hasta el corazón de la selva, donde parece ser que Kurtz reina como un buda despótico sobre los miembros de la tribu Montagnard, que le adoran como a un dios.',
          image: 'https://pics.filmaffinity.com/apocalypse_now-915115475-large.jpg',
          favorite: true,
        },
        {
          id: 4,
          title: 'Cónclave',
          description:
            'Tras la inesperada muerte del Sumo Pontífice, el cardenal Lawrence es designado como responsable para liderar uno de los rituales más secretos y antiguos del mundo: la elección de un nuevo Papa. Cuando los líderes más poderosos de la Iglesia Católica se reúnen en los salones del Vaticano, Lawrence se ve atrapado dentro de una compleja conspiración a la vez que descubre un secreto que podría sacudir los cimientos de la Iglesia.',
          image: 'https://pics.filmaffinity.com/conclave-496920745-large.jpg',
          favorite: false,
        },
      ]
      this.series = [
        {
          id: 101,
          title: 'Breaking Bad',
          description:
            'Tras cumplir 50 años, Walter White (Bryan Cranston), un profesor de química de un instituto de Albuquerque, Nuevo México, se entera de que tiene un cáncer de pulmón incurable. Casado con Skyler (Anna Gunn) y con un hijo discapacitado (RJ Mitte), la brutal noticia lo impulsa a dar un drástico cambio a su vida: decide, con la ayuda de un antiguo alumno (Aaron Paul), fabricar anfetaminas y ponerlas a la venta.',
          image: 'https://pics.filmaffinity.com/breaking_bad-504442815-large.jpg',
          favorite: true,
        },
        {
          id: 102,
          title: 'Juego de Tronos',
          description:
            ' La historia se desarrolla en un mundo ficticio de carácter medieval donde hay Siete Reinos. Hay tres líneas argumentales principales: la crónica de la guerra civil dinástica por el control de Poniente entre varias familias nobles que aspiran al Trono de Hierro; la creciente amenaza de "los otros", seres desconocidos que viven al otro lado de un inmenso muro de hielo que protege el Norte de Poniente; y el viaje de Daenerys Targaryen, la hija exiliada del rey que fue asesinado en una guerra civil anterior, y que pretende regresar a Poniente para reclamar sus derechos dinásticos.',
          image: 'https://pics.filmaffinity.com/game_of_thrones-293142110-large.jpg',
          favorite: false,
        },
      ]
    },
    toggleFavorite(type: 'movie' | 'series', id: number) {
      if (type === 'movie') {
        const movie = this.movies.find((m) => m.id === id)
        if (movie) movie.favorite = !movie.favorite
      } else if (type === 'series') {
        const serie = this.series.find((s) => s.id === id)
        if (serie) serie.favorite = !serie.favorite
      }
    },

    addMovie(newMovie: Omit<MediaItem, 'id'>) {
      const newId = this.movies.length ? Math.max(...this.movies.map((m) => m.id)) + 1 : 1

      this.movies.push({
        ...newMovie,
        id: newId,
      })
    },

    removeMovie(id: number) {
      this.movies = this.movies.filter((m) => m.id !== id)
    },

    addSeries(newSeries: Omit<MediaItem, 'id'>) {
      const newId = this.series.length ? Math.max(...this.series.map((s) => s.id)) + 1 : 101

      this.series.push({
        ...newSeries,
        id: newId,
      })
    },

    removeSeries(id: number) {
      this.series = this.series.filter((s) => s.id !== id)
    },
  },
})
