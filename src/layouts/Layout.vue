<template lang="pug">
q-layout(view='hHh LpR fFf')
  q-header(elevated)
    q-toolbar
      q-toolbar-title.absolute-center.text-grey-8 Awesome Todo
      q-btn.absolute-right.text-grey-8(
        v-if="!authStore.loggedIn"
        flat
        icon-right="account_circle"
        label="Login"
        to="/login"
      )
      q-btn.absolute-right.text-grey-8(
        v-if="authStore.loggedIn"
        flat
        icon-right="account_circle"
        label="Logout"
        @click="logout"
      )
  q-footer
    q-tabs.text-grey-8
      q-route-tab(
        v-for='link in linksList'
        :key='link.title'
        :icon='link.icon'
        :label='link.title'
        :to='link.link'
      )
  q-drawer.bg-primary(
    v-model='leftDrawerOpen'
    show-if-above=''
    :width='250'
    :breakpoint='767'
  )
    q-list
      q-item-label.text-grey-8(header) Navigation
      EssentialLink(
        v-for='link in linksList'
        :key='link.title'
        v-bind='link'
      )
      q-item(
        v-if="$q.platform.is.electron"
        @click="quitApp"
        class="text-grey-8 absolute-bottom"
        clickable
      )
        q-item-section(avatar)
          q-icon(name="power_settings_new")
        q-item-section
          q-item-label="Quit"
  q-page-container
    router-view
</template>

<script setup>
import { useQuasar } from 'quasar'
import EssentialLink from "components/EssentialLink.vue"
import { useAuthStore } from "src/stores/auth"

const $q = useQuasar()

const linksList = [
  {
    title: "Todo",
    icon: "list",
    link: "/"
  },
  {
    title: "Settings",
    icon: "settings",
    link: "/settings"
  }
]
const leftDrawerOpen = false
const authStore = useAuthStore()
const logout = () => {
  authStore.logoutUser()
  window.location.href = '/login'
}
const quitApp = () => {
  $q.dialog({
    title: 'Confirm',
    message: 'Really quit Awesome Todo?',
    cancel: true,
    persistent: true
  })
    .onOk(() => {
      // require('electron').ipcRenderer.send('quit-app')
    })
}
</script>

<style lang="sass">
.q-drawer
  .q-router-link--exact-active
    color: $primary !important
    background-color: $white


@media screen and (min-width: 768px)
  .q-footer
    display: none
</style>
