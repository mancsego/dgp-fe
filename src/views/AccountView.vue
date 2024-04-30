<script setup>
import { useUserStore } from '@/stores/user'
import { computed, defineAsyncComponent, ref } from 'vue'

const TheLogin = defineAsyncComponent(() => import('@/components/molecules/TheLogin.vue'))
const TheRegister = defineAsyncComponent(() => import('@/components/molecules/TheRegister.vue'))
const TheProfileView = defineAsyncComponent(
  () => import('@/components/molecules/TheProfileView.vue')
)

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
}

const register = async (payload) => {
  await user.register(payload)
}

const logout = () => {
  user.logout()
}

const isLogin = computed(() => action.value === ACTIONS.LOGIN)
const passwordType = computed(() => (showPw.value ? TYPES.SHOW : TYPES.HIDE))
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-col items-center" v-if="!user.isLoggedIn">
      <p>{{ isLogin ? "Don't have an account yet?" : 'Already have an account?' }}</p>
      <button class="btn btn-secondary" @click="changeAction">
        {{ isLogin ? ACTIONS.REGISTER : ACTIONS.LOGIN }}
      </button>
    </div>
    <div class="flex flex-col justify-end items-center">
      <TheProfileView class="card" v-if="user.isLoggedIn" @dispatch="logout" />
      <TheLogin
        class="card"
        v-else-if="isLogin"
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
      <span role="alert" v-if="!user.isLoggedIn">
        {{ isLogin ? user.getErrors.login : user.getErrors.register }}
      </span>
    </div>
  </div>
</template>

<style scoped></style>
