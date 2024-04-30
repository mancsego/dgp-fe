import { defineStore } from 'pinia'

const TOKEN = 'token'

let cache
let cleanUp

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: {
      firstName: '',
      lastName: '',
      email: ''
    },
    token: {
      value: null,
      expiresIn: 0
    }
  }),
  getters: {
    getProfile: ({ profile }) => profile,
    getToken: ({ token: { value } }) => value,
    isLoggedIn: () => sessionStorage.getItem(TOKEN) ?? null
  },
  actions: {
    checkToken() {
      const { value, expiresIn } = JSON.parse(sessionStorage.getItem(TOKEN)) ?? {}

      if (Date.now() < Date.now() + (expiresIn ?? 0)) {
        this.token = { value, expiresIn }
        _invalidateIfExpires(expiresIn)
        return { token: value, expiresIn }
      }

      _removeToken()
      return null
    },
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
        const { token: value, expiresIn } =
          this.checkToken() ?? (await sendPost(AUTH.LOGIN, { email, password }))
        console.log(value)

        _invalidateIfExpires(expiresIn)
        const data = { value, expiresIn }
        this.token = data
        sessionStorage.setItem(TOKEN, JSON.stringify(data))
      } catch (e) {
        alert('Boing')
        console.error(e)
        await this.logout()
      }
    },
    logout() {
      _removeToken()
    },
    async fetchProfile() {
      const { USER, sendGet } = await _getDependencies()
      const { firstName, lastName, email } = await sendGet(USER.PROFILE)
      this.profile = { firstName, lastName, email }
    }
  }
})

const _invalidateIfExpires = (expiresIn) => {
  clearTimeout(cleanUp)
  cleanUp = setTimeout(_removeToken, expiresIn)
}

const _removeToken = () => {
  sessionStorage.removeItem(TOKEN)
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
