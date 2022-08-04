<template lang="pug">
form(@submit.prevent="submitForm")
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

const email = ref('')
const password = ref('')

const props = defineProps({
  tab: String
})

const txtEmail = ref(null)
const txtPassword = ref(null)

const isLoginTab = () => props.tab === 'login'
const getButtonLabel = () => isLoginTab() ? 'Login' : 'Register'

const submitForm = () => {
  if (txtEmail.value.hasError || txtPassword.value.hasError) return false
  if (isLoginTab())
    console.log('login')
  else
    console.log('register')
}
</script>
