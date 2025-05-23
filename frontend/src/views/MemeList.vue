<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const memes = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/memes')
  memes.value = res.data
})
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Meme Vault</h1>
    <ul class="space-y-4">
      <li v-for="meme in memes" :key="meme._id" class="border p-3 rounded">
        <img :src="meme.url" alt="meme" class="max-w-sm rounded mb-2" />
        <p class="text-sm text-gray-600">{{ meme.caption }}</p>
        <p class="text-xs text-gray-400">{{ new Date(meme.date).toLocaleDateString() }}</p>
      </li>
    </ul>
  </div>
</template>
