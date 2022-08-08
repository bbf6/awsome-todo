import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

const defaultSettingsValues = {
  show12HourTimeFormat: false,
  showTasksInOneList: false
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: LocalStorage.getItem('settings') || defaultSettingsValues
  }),

  getters: {},

  actions: {}
})
