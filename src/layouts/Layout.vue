<template lang="pug">
q-layout(view='hHh LpR fFf')
  q-header(elevated)
    q-toolbar
      q-toolbar-title.absolute-center.text-grey-8="Awesome Todo"
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
      q-item-label.text-grey-8(header)="Navigation"
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
