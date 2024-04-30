<script setup>
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { computed, ref } from 'vue'

import TheLogin from '@/components/molecules/TheLogin.vue'
import TheRegister from '@/components/molecules/TheRegister.vue'

const TYPES = {
  SHOW: 'text',
  HIDE: 'password'
}

const ACTIONS = {
  LOGIN: 'Login',
  REGISTER: 'Register'
}

const showPw = ref(false)
const action = ref(ACTIONS.LOGIN)

const user = useUserStore()

const toggle = () => {
  showPw.value = !showPw.value
}

const changeAction = () => {
  showPw.value = false
  if (action.value === ACTIONS.LOGIN) {
    action.value = ACTIONS.REGISTER
    return
  }
  action.value = ACTIONS.LOGIN
}

const login = async (payload) => {
  await user.login(payload)
  await router.push({ path: '/' })
}

const register = async (payload) => {
  await user.register(payload)
  await login({ email: payload.email, password: payload.password })
}
const isLogin = computed(() => action.value === ACTIONS.LOGIN)
const passwordType = computed(() => (showPw.value ? TYPES.SHOW : TYPES.HIDE))
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-col items-center">
      <p>{{ isLogin ? "Don't have an account yet?" : 'Already have an account?' }}</p>
      <button class="btn" @click="changeAction">
        {{ isLogin ? ACTIONS.REGISTER : ACTIONS.LOGIN }}
      </button>
    </div>
    <div class="flex justify-center items-end">
      <TheLogin
        class="card"
        v-if="isLogin"
        @dispatch="login"
        @toggle="toggle"
        :password-type="passwordType"
      />
      <TheRegister
        class="card"
        v-else
        @dispatch="register"
        @toggle="toggle"
        :password-type="passwordType"
      />
    </div>
  </div>
</template>

<style scoped></style>
