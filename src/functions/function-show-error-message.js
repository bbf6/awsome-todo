import { Dialog } from 'quasar'

export const showErrorMessage = (errorMessage) => {
  Dialog.create({
    title: 'Error',
    message: errorMessage
  })
}
