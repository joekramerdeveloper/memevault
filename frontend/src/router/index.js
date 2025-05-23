import { createRouter, createWebHistory } from 'vue-router'
import MemeList from '../views/MemeList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MemeList,
    },
  ],
})

export default router
