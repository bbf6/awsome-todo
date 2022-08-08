import { defineStore } from 'pinia'
import { LocalStorage, Loading } from 'quasar'
import { api } from 'src/boot/axios'
import { showErrorMessage } from 'src/functions/function-show-error-message'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    loggedIn: !!LocalStorage.getItem('token'),
    token: LocalStorage.getItem('token') || null
  }),

  getters: {},

  actions: {
    registerUser(email, password) {
      const params = { email, password }
      this.loading = true
      Loading.show()
      api.post('/login', params)
        .then(console.log)
        .catch(error => {
          console.error(error)
          showErrorMessage(error.message)
        })
        .finally(() => {
          this.loading = false
          Loading.hide()
        })
    },
    loginUser(email, password) {
      const params = { email, password }
      this.loading = true
      Loading.show()
      api.post('/login', params)
        .then(response => {
          this.loggedIn = true
          this.token = response.data.token
          LocalStorage.set('token', this.token)
        })
        .catch(error => {
          console.error(error)
          showErrorMessage(error.message)
        })
        .finally(() => {
          this.loading = false
          Loading.hide()
          if (this.loggedIn)
            window.location.href = '/'
        })
    },
    logoutUser() {
      this.loggedIn = false
      this.token = null
      LocalStorage.remove('token')
    }
  }
})
