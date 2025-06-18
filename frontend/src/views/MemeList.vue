<script setup>
// import { ref, onMounted } from 'vue'
// import axios from 'axios'

// const memes = ref([])

// onMounted(async () => {
//   const res = await axios.get('http://localhost:3001/memes')
//   memes.value = res.data
// })

// const deleteMeme = async (id) => {
//   try {
//     const res = await axios.delete(`http://localhost:3001/memes/${id}`)
//     if (res.status === 204) {
//       memes.value = memes.value.filter((meme) => meme._id !== id)
//     }
//   } catch (err) {
//     console.error('Failed to delete meme:', err)
//   }
// }
</script>

<template>
  <div>this component is not used</div>
  <!-- <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Meme Vault</h1>
    <ul class="space-y-4">
      <li v-for="meme in memes" :key="meme._id" class="border p-3 rounded">
        <img :src="meme.url" alt="meme" class="max-w-sm rounded mb-2" />
        <p class="text-sm text-gray-600">{{ meme.caption }}</p>
        <p class="text-xs text-gray-400">{{ new Date(meme.date).toLocaleDateString() }}</p>
        <button
          @click="deleteMeme(meme._id)"
          class="bg-red-500 text-white px-2 py-1 mt-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </li>
    </ul>
  </div> -->
</template>
