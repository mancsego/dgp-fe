<script setup>
const props = defineProps({
  totalPages: Number
})
const hash = Math.floor(Math.random() * 10000)
const emit = defineEmits(['change'])

const handle = (page) => {
  emit('change', page)
}
</script>

<template>
  <div class="flex py-5">
    <button
      class="pagination-item"
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
</style>
