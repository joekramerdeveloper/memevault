<script setup>
import { ref, onMounted } from 'vue'

const memes = ref([])
const loading = ref(true)

// Your schema only uses `url`, `caption`, and optional `date`
const form = ref({
  url: '',
  caption: '',
})

const submitMeme = async () => {
  try {
    const response = await fetch('http://localhost:3001/memes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...form.value, date: new Date() }), // optionally send current date
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to submit meme')
    }

    const result = await response.json()
    console.log('Meme submitted:', result)
    form.value = { url: '', caption: '' }
    fetchMemes() // Refresh the list
  } catch (err) {
    console.error('Submission failed:', err.message)
  }
}

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

    <section>
      <h2>Add Meme</h2>
      <form @submit.prevent="submitMeme">
        <label>
          Image URL:
          <input type="url" v-model="form.url" required />
        </label>

        <label>
          Caption:
          <input type="text" v-model="form.caption" />
        </label>

        <button type="submit">Submit Meme</button>
      </form>
    </section>

    <section v-if="loading">Loading...</section>
    <section v-else>
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
    </section>
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
form {
  margin-bottom: 2rem;
}
label {
  display: block;
  margin: 0.5rem 0;
}
input {
  display: block;
  padding: 0.4rem;
  width: 100%;
  max-width: 400px;
}
</style>
