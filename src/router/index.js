import { createRouter, createWebHistory } from 'vue-router'

const AccountView = () => import('@/views/AccountView.vue')
const HomeView = () => import('@/views/HomeView.vue')
const GroupView = () => import('@/views/GroupView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/account',
      name: 'account',
      component: AccountView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/groups/:id',
      name: 'group',
      component: GroupView
    }
  ]
})

export default router
