<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="p-4 border-b mb-6 flex items-center justify-between">
    <h1 class="text-xl font-bold">MemeVault</h1>
    <nav>
      <RouterLink to="/" class="mr-4 text-blue-600 hover:underline">Home</RouterLink>
    </nav>
  </header>

  <main class="p-4">
    <RouterView />
  </main>
</template>

<style scoped>
/* minimal styling */
</style>
