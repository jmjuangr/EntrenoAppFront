<template>
  <v-container class="text-center">
    <h1 class="text-h4 mb-6">{{ $t('statistics') }}</h1>
    <Chart />
  </v-container>
</template>

<script lang="ts" setup>
import Chart from '../components/Chart.vue'
</script>
