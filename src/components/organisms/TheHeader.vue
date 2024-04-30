<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const { getProfile, isLoggedIn } = storeToRefs(user)
</script>

<template>
  <header class="flex justify-between items-center h-20 px-5 md:px-20 mb-5 border-b-2">
    <div>
      <div v-if="isLoggedIn">
        Welcome <span class="font-semibold text-sage">{{ getProfile.firstName }}</span
        >!
      </div>
    </div>
    <div>
      <RouterLink to="/" :class="{ 'line-through text-gray-400 pointer-events-none': !isLoggedIn }"
        >Home</RouterLink
      >
      <RouterLink to="/account">Account</RouterLink>
    </div>
  </header>
</template>

<style scoped></style>
