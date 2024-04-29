import { defineStore } from 'pinia'

const TOKEN = 'token'

let cache

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: {
      firstName: '',
      lastName: '',
      email: ''
    },
    token: {
      value: null,
      expires: 0
    }
  }),
  getters: {
    getProfile: ({ profile }) => profile,
    getToken: ({ token: { value } }) => value,
    isLoggedIn: () => sessionStorage.getItem(TOKEN) ?? null
  },
  actions: {
    async register(payload) {
      const { AUTH, sendPost } = await _getDependencies()

      try {
        await sendPost(AUTH.REGISTER, payload)
      } catch (_) {
        alert('boing')
      }
    },
    async login({ email, password }) {
      const { AUTH, sendPost } = await _getDependencies()

      try {
        const data = _getTokenFromSession() ?? (await sendPost(AUTH.LOGIN, { email, password }))
        const token = { value: data.token, expires: Date.now() + data.expiresIn }
        this.token = token
        sessionStorage.setItem(TOKEN, JSON.stringify(token))
      } catch (e) {
        alert('Boing')
        console.error(e)
        await this.logout()
      }
    },
    logout() {
      sessionStorage.removeItem(TOKEN)
    },
    async fetchProfile() {
      const { USER, sendGet } = await _getDependencies()
      const { firstName, lastName, email } = await sendGet(USER.PROFILE)
      this.profile = { firstName, lastName, email }
    }
  }
})

const _getTokenFromSession = () => {
  const data = JSON.parse(sessionStorage.getItem(TOKEN))

  if (Date.now() > data?.expires ?? 0) return data

  localStorage.removeItem(TOKEN)
  return null
}

const _getDependencies = async () => {
  if (cache) return cache

  const [{ sendPost, sendGet }, { AUTH, USER }] = await Promise.all([
    await import('@/utilities/RequestHelper'),
    await import('@/utilities/UrlCollection')
  ])
  cache = { sendPost, sendGet, AUTH, USER }
  return cache
}
