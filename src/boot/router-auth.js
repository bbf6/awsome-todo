import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar'

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    const loggedIn = !!LocalStorage.getItem('token')
    if (!loggedIn && to.path !== '/login')
      next('/login')
    else
      next()
  })
})

