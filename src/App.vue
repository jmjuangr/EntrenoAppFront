<template>
  <v-app>
    <Header />
    <v-main>
      <v-container class="py-4">
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts" setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>
