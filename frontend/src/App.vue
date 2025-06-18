<script setup>
import { ref, onMounted } from 'vue'

const memes = ref([])
const loading = ref(true)

const fetchMemes = async () => {
  try {
    const res = await fetch('http://localhost:3001/memes')
    memes.value = await res.json()
  } catch (err) {
    console.error('Error fetching memes:', err)
  } finally {
    loading.value = false
  }
}

const deleteMeme = async (id) => {
  try {
    const res = await fetch(`http://localhost:3001/memes/${id}`, {
      method: 'DELETE',
    })
    if (res.status === 204) {
      memes.value = memes.value.filter((meme) => meme._id !== id)
    } else {
      console.error('Failed to delete meme. Status:', res.status)
    }
  } catch (err) {
    console.error('Error deleting meme:', err)
  }
}

onMounted(fetchMemes)
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
          <br />
          <button @click="deleteMeme(meme._id)">🗑 Delete</button>
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
button {
  margin-top: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #c53030;
}
</style>
