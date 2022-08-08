<template lang="pug">
form(@submit.prevent="submitForm")
  .row.q-mb-md(v-if="authStore.loading")
    | Loading...
  .row.q-mb-md
    q-banner.bg-grey-3.col
      template(v-slot:avatar)
        q-icon(name="account_circle" color="accent")
      | {{ getButtonLabel() }} to acces your todos anywhere!

  .row.q-mb-md
    q-input.col(
      outlined
      v-model="email"
      ref="txtEmail"
      label="Email"
      type="email"
      :rules="[ val => validateEmail(val) || 'This email is invalid' ]"
    )

  .row.q-mb-md
    q-input.col(
      outlined
      v-model="password"
      ref="txtPassword"
      label="Password"
      type="password"
      lazy-rules
      :rules="[ val => val.length >= 6 || 'At least 6 characters are required' ]"
    )

  .row.q-mb-md.justify-end
    q-btn(
      color="primary"
      :label="getButtonLabel()"
      type="submit"
    )
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'

const email = ref('')
const password = ref('')

const authStore = useAuthStore()
const props = defineProps({
  tab: String
})

const txtEmail = ref(null)
const txtPassword = ref(null)

const isLoginTab = () => props.tab === 'login'
const getButtonLabel = () => isLoginTab() ? 'Login' : 'Register'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const validateEmail = email => email.toLowerCase().match(emailRegex)

const submitForm = () => {
  txtEmail.value.validate()
  txtPassword.value.validate()
  if (txtEmail.value.hasError || txtPassword.value.hasError) return false
  if (isLoginTab())
    authStore.loginUser(email.value, password.value)
  else
    authStore.registerUser(email.value, password.value)
}
</script>
