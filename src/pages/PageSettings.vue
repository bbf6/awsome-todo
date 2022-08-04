<template lang="pug">
q-page(padding)

  q-list(bordered padding)
    q-item-label(header)="Settings"
    q-item(tag="label" v-ripple)
      q-item-section
        q-item-label="Show 12 hour time format"
      q-item-section(side)
        q-toggle(v-model="settingsStore.settings.show12HourTimeFormat")
    q-item(tag="label" v-ripple)
      q-item-section
        q-item-label="Show tasks in one list"
      q-item-section(side)
        q-toggle(v-model="settingsStore.settings.showTasksInOneList")

  q-list(bordered padding)
    q-item-label(header)="More"
    q-item(tag="label" v-ripple to="/settings/help")
      q-item-section
        q-item-label="Help"
      q-item-section(side)
        q-icon(name="chevron_right")
    q-item(tag="label" v-ripple @click="visitOurwebsite")
      q-item-section
        q-item-label="Visit our website"
      q-item-section(side)
        q-icon(name="chevron_right")
    q-item(tag="label" v-ripple @click="emailUs")
      q-item-section
        q-item-label="Email us"
      q-item-section(side)
        q-icon(name="chevron_right")

</template>

<script setup>
import { watch } from 'vue'
import { LocalStorage, openURL } from 'quasar'
import { useSettingsStore } from 'src/stores/settings'

const settingsStore = useSettingsStore()
watch(settingsStore.settings, val => (
  LocalStorage.set('settings', val), { deep: true }
))
const visitOurwebsite = () => openURL('https://devartiral.com')
const emailUrl = 'alex.guajardo@inroute.com.mx'
const emailUs = () => window.location.href = `mailto:${emailUrl}?subject=Awesome Todo feedback`
</script>
