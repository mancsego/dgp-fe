<script setup>
import { computed, reactive, ref } from 'vue';

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

const state = reactive({
  email: null,
  password: null,
  repeat_password: null,
  first_name: null,
  last_name: null
})

const toggle = () => {
  showPw.value = !showPw.value
}

const changeAction = () => {
  if (action.value === ACTIONS.LOGIN) {
    action.value = ACTIONS.REGISTER
    return
  }
  action.value = ACTIONS.LOGIN
}

const login = () => {
  console.log('login')
}

const register = () => {
  console.log('register')
}

const isLogin = computed(() => action.value === ACTIONS.LOGIN)
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-col items-center">
      <p>{{ isLogin ? 'Don\'t have an account yet?' : 'Already have an account?' }}</p>
      <button class="btn" @click="changeAction">
        {{ isLogin ? ACTIONS.REGISTER : ACTIONS.LOGIN }}
      </button>
    </div>
    <div class="flex justify-center items-end">
      <div class="card">
        <!-- Login -->
        <div v-if="isLogin" class="flex flex-col">
          <label for="email">Email:</label>
          <input type="text" id="email" name="email" v-model="state.email">
          <label for="pwd">Password:</label>
          <input :type="showPw ? TYPES.SHOW : TYPES.HIDE" id="pwd" name="pwd" v-model="state.password">
          <div>
            <label for="toggle">Show password</label>
            <input id="toggle" type="checkbox" @click="toggle" />
          </div>
          <button class="btn" @click="login">
            Login
          </button>
        </div>
        <!-- Register -->
        <div v-else class="flex flex-col">
          <label for="email">Email:</label>
          <input type="text" id="email" name="email" v-model="state.email">
          <label for="first-name">First name:</label>
          <input type="text" id="first-name" name="first-name" v-model="state.first_name">
          <label for="last-name">Last name:</label>
          <input type="text" id="last-name" name="last-name" v-model="state.last_name">
          <label for="pwd">Password:</label>
          <input :type="showPw ? TYPES.SHOW : TYPES.HIDE" id="pwd" name="pwd" v-model="state.password">
          <label for="re-pwd">Repeat password:</label>
          <input :type="showPw ? TYPES.SHOW : TYPES.HIDE" id="re-pwd" name="re-pwd" v-model="state.repeat_password">
          <div>
            <label for="toggle">Show password</label>
            <input id="toggle" type="checkbox" @click="toggle" />
          </div>
          <button class="btn" @click="register">
            Register
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
