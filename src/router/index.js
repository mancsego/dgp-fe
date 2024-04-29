import { createRouter, createWebHistory } from 'vue-router'

let cache

const AccountView = () => import('@/views/AccountView.vue')
const HomeView = () => import('@/views/HomeView.vue')
const GroupView = () => import('@/views/GroupView.vue')

const _checkSession = async (_t, _f, next) => {
  const { user } = await _getDependencies()
  if (user.isLoggedIn) {
    next()
    return
  }

  next({ name: 'account' })
}

const _getDependencies = async () => {
  if (cache) return cache

  const [{ useUserStore }] = await Promise.all([await import('@/stores/user')])

  cache = {
    user: useUserStore()
  }

  return cache
}

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
      component: HomeView,
      beforeEnter: [_checkSession]
    },
    {
      path: '/groups/:id',
      name: 'group',
      component: GroupView,
      beforeEnter: [_checkSession]
    }
  ]
})

export default router
