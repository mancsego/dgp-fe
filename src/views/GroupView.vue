<script setup>
const date = new Date()
const group = {
  name: `Group falafel`,
  isBudget: true,
  createdAt: date.toLocaleString('de-DE', { timeZone: 'UTC' }),
  updatedAt: date.toLocaleString('de-DE', { timeZone: 'UTC' }),
  _links: {
    group: {
      href: `http://localhost:8080/groups/1`
    }
  }
}
</script>

<template>
  <div class="flex justify-center">
    <div class="flex flex-col items-center w-2/5 *:w-full">
      <h1>{{ group.name }}</h1>
      <h2>{{ group.isBudget }}</h2>
      <div class="flex justify-between">
        <div>{{ group.createdAt }}</div>
        <div>{{ group.updatedAt }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
