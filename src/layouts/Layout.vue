<template lang="pug">
q-layout(view='hHh LpR fFf')
  q-header(elevated)
    q-toolbar
      q-toolbar-title.absolute-center.text-grey-8 Awesome Todo
      q-btn.absolute-right.text-grey-8(
        flat
        icon-right="account_circle"
        label="Login"
        to="/login"
      )
  q-footer
    q-tabs.text-grey-8
      q-route-tab(
        v-for='link in essentialLinks'
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
        v-for='link in essentialLinks'
        :key='link.title'
        v-bind='link'
      )
  q-page-container
    router-view
</template>

<script>
import { defineComponent, ref } from "vue"
import EssentialLink from "components/EssentialLink.vue"

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

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
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
