<script setup>
import TheBody from '@/components/organisms/TheBody.vue'
import TheHeader from '@/components/organisms/TheHeader.vue'
import TheFooter from '@/components/organisms/TheFooter.vue'
import { onBeforeMount } from 'vue'
import { useUserStore } from '@/stores/user'

onBeforeMount(() => {
  const user = useUserStore()
  user.checkToken()
})
</script>

<template>
  <TheHeader />
  <TheBody />
  <TheFooter />
</template>
