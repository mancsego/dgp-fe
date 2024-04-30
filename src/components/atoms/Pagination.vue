<script setup>
import { computed } from 'vue'

const props = defineProps({
  totalPages: Number,
  current: Number
})
const hash = Math.floor(Math.random() * 10000)
const emit = defineEmits(['change'])

const handle = (page) => {
  const newPage = page - 1
  if (newPage === props.current) return
  emit('change', newPage)
}

const activePage = computed(() => props.current + 1)
</script>

<template>
  <div class="flex py-5">
    <button
      class="pagination-item"
      :class="{ 'active-page': activePage === i }"
      v-for="i in props.totalPages"
      :key="`${hash}-${i}`"
      @click="handle(i)"
    >
      {{ i }}
    </button>
  </div>
</template>
<style scoped>
.pagination-item {
  @apply px-3 py-1 mx-2 border;
}
.pagination-item:hover {
  @apply bg-slate-200 scale-125;
}
.active-page {
  @apply font-bold bg-slate-100 border-2 border-slate-500;
}
</style>
