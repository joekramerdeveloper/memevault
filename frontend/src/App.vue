<script setup>
import { ref, onMounted } from 'vue'

const memes = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3001/memes')
    memes.value = await res.json()
  } catch (err) {
    console.error('Error fetching memes:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main>
    <h1>MemeVault</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="memes.length === 0">No memes found.</div>
      <ul v-else>
        <li v-for="meme in memes" :key="meme._id">
          <img :src="meme.url" alt="meme" width="200" />
          <p>{{ meme.caption }}</p>
          <small>{{ new Date(meme.date).toLocaleDateString() }}</small>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
img {
  max-width: 100%;
  margin-bottom: 0.5rem;
}
li {
  list-style: none;
  margin: 1rem 0;
}
</style>
