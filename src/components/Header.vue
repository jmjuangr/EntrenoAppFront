<template>
  <v-app-bar app color="deep-purple-accent-4" dark>
    <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" text>{{ $t('home') }}</v-btn>
    <v-btn to="/favoritas" text>{{ $t('favorites') }}</v-btn>
    <v-btn to="/admin" text>Admin</v-btn>
    <v-btn to="/estadisticas" text>{{ $t('statistics') }}</v-btn>

    <!-- Selector de idioma -->
    <v-btn text @click="$i18n.locale = 'es'">ES</v-btn>
    <v-btn text @click="$i18n.locale = 'en'">EN</v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup></script>

<style scoped></style>
