<script setup>
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed, reactive, ref } from 'vue'
import * as yup from 'yup'

const TYPES = {
  SHOW: 'text',
  HIDE: 'password'
}

const ACTIONS = {
  LOGIN: 'Login',
  REGISTER: 'Register'
}

const MSG = {
  REQUIRED: 'This field is required'
}

const showPw = ref(false)
const action = ref(ACTIONS.LOGIN)
const state = reactive({
  email: null,
  password: null,
  repeat_password: null,
  firstName: null,
  lastName: null
})

const user = useUserStore()

const toggle = () => {
  showPw.value = !showPw.value
}

const changeAction = () => {
  Object.keys(state).forEach((key) => {
    state[key] = null
  })
  if (action.value === ACTIONS.LOGIN) {
    action.value = ACTIONS.REGISTER
    return
  }
  action.value = ACTIONS.LOGIN
}

const login = async () => {
  const payload = { email: state.email, password: state.password }
  await user.login(payload)
  await router.push({ path: '/' })
}

const register = async () => {
  const payload = {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    password: state.password
  }
  await user.register(payload)
}

const submit = () => {
  isLogin.value ? login() : register()
}

const isLogin = computed(() => action.value === ACTIONS.LOGIN)
const schema = computed(() => {
  const base = {
    email: yup.string().email().required(MSG.REQUIRED),
    pwd: yup.string().required(MSG.REQUIRED).min(8, 'Must be at least 8 characters')
  }
  if (isLogin.value) return yup.object(base)

  return yup.object({
    ...base,
    're-pwd': yup
      .string()
      .required(MSG.REQUIRED)
      .oneOf([yup.ref('pwd'), null], 'Passwords must match'),
    'first-name': yup.string().required(MSG.REQUIRED),
    'last-name': yup.string().required(MSG.REQUIRED)
  })
})
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
      <Form class="card" :validation-schema="schema" @submit="submit">
        <!-- Login -->
        <div v-if="isLogin" class="flex flex-col">
          <label for="email">Email:</label>
          <Field type="email" id="email" name="email" v-model="state.email" />
          <ErrorMessage name="email" />
          <label for="pwd">Password:</label>
          <Field
            :type="showPw ? TYPES.SHOW : TYPES.HIDE"
            id="pwd"
            name="pwd"
            v-model="state.password"
          />
          <ErrorMessage name="pwd" />
          <div>
            <label for="toggle">Show password</label>
            <input id="toggle" type="checkbox" @click="toggle" />
          </div>
          <button class="btn">Login</button>
        </div>
        <!-- Register -->
        <div v-else class="flex flex-col">
          <label for="email">Email:</label>
          <Field type="email" id="email" name="email" v-model="state.email" />
          <ErrorMessage name="email" />
          <label for="first-name">First name:</label>
          <Field type="text" id="first-name" name="first-name" v-model="state.firstName" />
          <ErrorMessage name="first-name" />
          <label for="last-name">Last name:</label>
          <Field type="text" id="last-name" name="last-name" v-model="state.lastName" />
          <ErrorMessage name="last-name" />
          <label for="pwd">Password:</label>
          <Field
            :type="showPw ? TYPES.SHOW : TYPES.HIDE"
            id="pwd"
            name="pwd"
            v-model="state.password"
          />
          <ErrorMessage name="pwd" />
          <label for="re-pwd">Repeat password:</label>
          <Field
            :type="showPw ? TYPES.SHOW : TYPES.HIDE"
            id="re-pwd"
            name="re-pwd"
            v-model="state.repeat_password"
          />
          <ErrorMessage name="re-pwd" />
          <div>
            <label for="toggle">Show password</label>
            <input id="toggle" type="checkbox" @click="toggle" />
          </div>
          <button class="btn">Register</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped></style>
