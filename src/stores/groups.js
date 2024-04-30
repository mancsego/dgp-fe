import { defineStore } from 'pinia'

let cache
export const useGroupsStore = defineStore('groups', {
  state: () => ({
    groups: [],
    page: {
      size: 0,
      totalElements: 0,
      totalPages: 0,
      number: 0
    }
  }),
  getters: {
    getGroups: ({ groups }) => groups,
    getPageInfo: ({ page }) => page
  },
  actions: {
    async fetchGroups() {
      const { sendGet, GROUPS } = await _getDependencies()

      const {
        _embedded: { groups },
        page
      } = await sendGet(GROUPS.BASE)

      this.groups = groups
      this.page = page
    }
  }
})

const _getDependencies = async () => {
  if (cache) return cache

  const [{ sendPost, sendGet }, { GROUPS }] = await Promise.all([
    await import('@/utilities/RequestHelper'),
    await import('@/utilities/UrlCollection')
  ])
  cache = { sendPost, sendGet, GROUPS }
  return cache
}
