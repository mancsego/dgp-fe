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
    <div class="profile flex flex-col">
      <div>
        <h1>Email:</h1>
        <span>{{ getProfile.email }}</span>
      </div>
      <div>
        <h2>First name:</h2>
        <span>{{ getProfile.firstName }}</span>
      </div>
      <div>
        <h2>Last name:</h2>
        <span>{{ getProfile.lastName }}</span>
      </div>
      <button class="btn" @click="logout">Logout</button>
    </div>
  </div>
</template>
<style scoped>
.profile > div {
  @apply flex justify-between;
}
</style>
