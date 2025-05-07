<template>
  <div style="max-width: 600px; margin: 0 auto">
    <!-- Gráfico de favoritas -->
    <h3 class="text-h6 my-4">{{ $t('favorites_chart') }}</h3>
    <BarChart :chartData="favoritesData" :options="chartOptions" />

    <!-- Gráfico de totales -->
    <h3 class="text-h6 my-8">{{ $t('totals_chart') }}</h3>
    <BarChart :chartData="totalsData" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { useMediaStore } from '../store/media'
import { useI18n } from 'vue-i18n'

Chart.register(...registerables)

export default defineComponent({
  name: 'Chart',
  components: { BarChart },
  setup() {
    const store = useMediaStore()
    const { t } = useI18n()

    const favoritesData = computed(() => ({
      labels: [t('favorite_movies'), t('favorite_series')],
      datasets: [
        {
          label: t('favorites'),
          data: [store.favoriteMovies.length, store.favoriteSeries.length],
          backgroundColor: ['#6200ea', '#00bcd4'],
        },
      ],
    }))

    const totalsData = computed(() => ({
      labels: [t('movies'), t('series')],
      datasets: [
        {
          label: t('total_items'),
          data: [store.movies.length, store.series.length],
          backgroundColor: ['#9575cd', '#4dd0e1'],
        },
      ],
    }))

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        },
      },
    }

    return {
      favoritesData,
      totalsData,
      chartOptions,
    }
  },
})
</script>
