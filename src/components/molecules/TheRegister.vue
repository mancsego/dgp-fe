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
  password: null,
  repeat_password: null,
  firstName: null,
  lastName: null
})

const schema = yup.object({
  email: yup.string().email(MESSAGES.EMAIL).required(MESSAGES.REQUIRED),
  pwd: yup.string().required(MESSAGES.REQUIRED).min(8, MESSAGES.MIN),
  're-pwd': yup
    .string()
    .required(MESSAGES.REQUIRED)
    .oneOf([yup.ref('pwd'), null], MESSAGES.MATCH),
  'first-name': yup.string().required(MESSAGES.REQUIRED),
  'last-name': yup.string().required(MESSAGES.REQUIRED)
})

const emit = defineEmits(['dispatch', 'toggle'])

const register = () => {
  emit('dispatch', {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    password: state.password
  })
}

const toggle = () => {
  emit('toggle')
}
</script>

<template>
  <Form :validation-schema="schema" @submit="register">
    <div class="flex flex-col">
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
      <Field :type="props.passwordType" id="pwd" name="pwd" v-model="state.password" />
      <ErrorMessage name="pwd" />
      <label for="re-pwd">Repeat password:</label>
      <Field :type="props.passwordType" id="re-pwd" name="re-pwd" v-model="state.repeat_password" />
      <ErrorMessage name="re-pwd" />
      <div>
        <label for="toggle">Show password</label>
        <input id="toggle" type="checkbox" @click="toggle" />
      </div>
      <button class="btn">Register</button>
    </div>
  </Form>
</template>

<style scoped></style>
