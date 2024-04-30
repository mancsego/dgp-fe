<script setup>
import router from '@/router'

const props = defineProps({
  name: String,
  isBudget: Boolean,
  createdAt: String,
  updatedAt: String,
  href: String
})
const handle = () => {
  router.push({ path: props.href.match(/\/groups\/(\d+)/)[0] })
}
</script>

<template>
  <tr class="item" @click="handle">
    <td>{{ props.name }}</td>
    <td>{{ props.isBudget ? 'Yes' : 'No' }}</td>
    <td>{{ new Date(props.updatedAt).toDateString() }}</td>
    <td>{{ new Date(props.createdAt).toDateString() }}</td>
  </tr>
</template>
<style scoped>
.item {
  @apply cursor-pointer hover:bg-sage hover:text-zinc-50;
}
.item td {
  @apply py-3 border-b text-center;
}
</style>
