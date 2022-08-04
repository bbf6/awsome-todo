import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

const defaultSettingsValues = {
  show12HourTimeFormat: false,
  showTasksInOneList: false
}

export const useSettingsStore = defineStore('counter', {
  state: () => ({
    settings: LocalStorage.getItem('settings') || defaultSettingsValues
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  }
})
