import { defineStore } from 'pinia'

const TOKEN = 'token'

let cache
let cleanUp

export const useUserStore = defineStore('user', {
  state: () => ({
    errors: {
      register: '',
      login: ''
    },
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
    getErrors: ({ errors }) => errors,
    getProfile: ({ profile }) => profile,
    getToken: ({ token: { value } }) => value,
    isLoggedIn: ({ token: { value } }) => sessionStorage.getItem(TOKEN) ?? value ?? null
  },
  actions: {
    checkToken() {
      const { value, expiresIn } = JSON.parse(sessionStorage.getItem(TOKEN)) ?? {}

      if (Date.now() < Date.now() + (expiresIn ?? 0)) {
        this.token = { value, expiresIn }

        _invalidateIfExpires(expiresIn)
        void this.fetchProfile()

        return { token: value, expiresIn }
      }

      _removeToken()
      return null
    },
    async register(payload) {
      this.errors.register = ''
      const { AUTH, sendPost } = await _getDependencies()

      try {
        await sendPost(AUTH.REGISTER, payload)
        await this.login({ email: payload.email, password: payload.password })
      } catch ({ message }) {
        this.errors.register = message
      }
    },
    async login({ email, password }) {
      this.errors.login = ''
      const { AUTH, sendPost, router } = await _getDependencies()

      try {
        const { token: value, expiresIn } = await sendPost(AUTH.LOGIN, { email, password })

        _invalidateIfExpires(expiresIn)
        const data = { value, expiresIn }
        this.token = data

        sessionStorage.setItem(TOKEN, JSON.stringify(data))
        await this.fetchProfile()

        router.push({ path: '/' })
      } catch ({ message }) {
        this.errors.login = message

        await this.logout()
      }
    },
    async logout() {
      const { router } = await _getDependencies()
      this.token = { value: null, expiresIn: 0 }
      _removeToken()
      router.push({ path: '/account' })
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

  const [{ sendPost, sendGet }, { AUTH, USER }, { default: router }] = await Promise.all([
    await import('@/utilities/RequestHelper'),
    await import('@/utilities/UrlCollection'),
    await import('@/router/index')
  ])
  cache = { sendPost, sendGet, AUTH, USER, router }
  return cache
}
