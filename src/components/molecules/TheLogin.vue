<script setup>
import { MESSAGES } from '@/utilities/Constants'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { reactive } from 'vue'
import * as yup from 'yup'

const props = defineProps({
  passwordType: String
})

const state = reactive({
  email: null,
  password: null
})

const schema = yup.object({
  email: yup.string().email(MESSAGES.EMAIL).required(MESSAGES.REQUIRED),
  pwd: yup.string().required(MESSAGES.REQUIRED).min(8, MESSAGES.MIN)
})

const emit = defineEmits(['dispatch', 'toggle'])

const login = async () => {
  emit('dispatch', { email: state.email, password: state.password })
}
const toggle = () => {
  emit('toggle')
}
</script>

<template>
  <Form :validation-schema="schema" @submit="login">
    <div class="flex flex-col">
      <label for="email">Email:</label>
      <Field type="email" id="email" name="email" v-model="state.email" />
      <ErrorMessage name="email" />
      <label for="pwd">Password:</label>
      <Field :type="props.passwordType" id="pwd" name="pwd" v-model="state.password" />
      <ErrorMessage name="pwd" />
      <div>
        <label for="toggle">Show password</label>
        <input id="toggle" type="checkbox" @click="toggle" />
      </div>
      <button class="btn">Login</button>
    </div>
  </Form>
</template>
