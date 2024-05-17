import { Dialog, Notify } from 'quasar'

const showOkMessage = (message, title = 'Información') =>
  Dialog.create({ title, message })

const showErrorMessage = message =>
  Dialog.create({ title: 'Error', message })

const showOkAlert = message =>
  Notify.create({
    icon: 'check',
    position: 'top-right',
    color: 'positive',
    message
  })

const showErrorAlert = message =>
  Notify.create({
    icon: 'close',
    position: 'top-right',
    color: 'negative',
    message
  })

const showManyErrorsAlert = messages =>
  messages.forEach(message =>
    Notify.create({
      icon: 'close',
      position: 'top-right',
      color: 'negative',
      message
    }))

const confirmAction = (
  question = '',
  okCallback = () => {},
  cancelCallback = () => {},
  dismissCallback = () => {},
  advertence = ''
) =>
  Dialog.create({
    title: question,
    message: advertence,
    cancel: true,
    persistent: true,
    ok: { push: true, color: 'primary' },
    cancel: { push: true, color: 'grey' }
  })
    .onOk(okCallback)
    .onCancel(cancelCallback)
    .onDismiss(dismissCallback)

export {
  showOkMessage,
  showErrorMessage,
  showOkAlert,
  showErrorAlert,
  showManyErrorsAlert,
  confirmAction
}
