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
  router.push(props.href.match(/\/groups\/(\d+)/)[0])
}
</script>

<template>
  <tr class="item" @click="handle">
    <td>{{ props.name }}</td>
    <td>{{ props.isBudget }}</td>
    <td>{{ props.updatedAt }}</td>
    <td>{{ props.createdAt }}</td>
  </tr>
</template>
<style scoped>
.item {
  @apply cursor-pointer hover:bg-slate-100;
}
.item td {
  @apply py-3 border-b text-center;
}
</style>
