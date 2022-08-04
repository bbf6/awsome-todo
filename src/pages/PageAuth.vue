<template lang="pug">
q-page(padding)
  q-card.auth-tabs
    q-tabs.text-grey(
      v-model="tab"
      dense
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    )
      q-tab(name="login" label="Login")
      q-tab(name="register" label="Register")

    q-separator

    q-tab-panels(
      v-model="tab"
      animated
    )
      q-tab-panel(name="login")
        login-register(:tab="tab")
      q-tab-panel(name="register")
        login-register(:tab="tab")
</template>

<script setup>
import { ref } from 'vue'
import LoginRegister from 'src/components/Auth/LoginRegister'

const tab = ref('register')
</script>

<style lang="sass">
.auth-tabs
  max-width: 500px
  margin: 0 auto
</style>
