<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const { getProfile } = storeToRefs(user)
const emit = defineEmits(['dispatch'])
const logout = () => {
  emit('dispatch')
}
</script>

<template>
  <div>
    <div class="flex flex-col">
      <div>Email: {{ getProfile.email }}</div>
      <div>First name: {{ getProfile.firstName }}</div>
      <div>Last name: {{ getProfile.lastName }}</div>
      <button class="btn" @click="logout">Logout</button>
    </div>
  </div>
</template>
