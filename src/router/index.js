import { createRouter, createWebHistory } from 'vue-router'
import Index from "@/views/Container"

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register')
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/main',
    children: [
      {
        path: 'main',
        name: 'Main',
        component: () => import('@/views/Container/Main')
      },
      {
        path: 'news/:newsId',
        name: 'News',
        component: () => import('@/views/Container/News')
      },
      {
        path: ':pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/Container/NotFound.vue'),
        meta: {
          title: "啊！页面呢？！！！"
        },
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
