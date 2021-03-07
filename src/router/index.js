import { createRouter, createWebHistory } from 'vue-router'
import Index from "@/views"

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/news/:newsId',
    name: 'News',
    component: ()=>import('@/views/News')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: "啊！页面呢？！！！"
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
