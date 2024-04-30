<script setup>
import { useRoute } from 'vue-router'
import { defineAsyncComponent, onBeforeMount, reactive } from 'vue'

const LoadingAnimation = defineAsyncComponent(
  () => import('@/components/atoms/LoadingAnimation.vue')
)

let cache

const route = useRoute()
const group = reactive({
  isLoading: true,
  name: '',
  isBudget: false,
  createdAt: '',
  updatedAt: ''
})
const _getDependecies = async () => {
  if (cache) return cache

  const [{ sendGet }, { GROUPS }] = await Promise.all([
    await import('@/utilities/RequestHelper'),
    await import('@/utilities/UrlCollection')
  ])

  cache = { sendGet, GROUPS }
  return cache
}

onBeforeMount(async () => {
  const { sendGet, GROUPS } = await _getDependecies()
  const { name, isBudget, createdAt, updatedAt } = await sendGet(
    GROUPS.BASE + `/${route.params.id}`
  )
  group.name = name
  group.isBudget = isBudget
  group.createdAt = new Date(createdAt).toDateString()
  group.updatedAt = new Date(updatedAt).toDateString()

  setTimeout(() => {
    group.isLoading = false
  }, 500)
})
</script>

<template>
  <div class="flex justify-center">
    <LoadingAnimation v-if="group.isLoading" />
    <div class="card flex flex-col items-center w-2/5 *:w-full" v-else>
      <div>
        <h1>Group name</h1>
        <span>{{ group.name }}</span>
      </div>
      <div>
        <h2>Is a budget list?</h2>
        <span>{{ group.isBudget ? 'Yes' : 'No' }}</span>
      </div>
      <div>
        <h3>Created at</h3>
        <span>{{ group.createdAt }}</span>
      </div>
      <div>
        <h3>Last modified</h3>
        <span>{{ group.updatedAt }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card > div {
  @apply flex justify-between px-5;
}
</style>
