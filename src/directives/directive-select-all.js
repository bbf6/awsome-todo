export const selectAll = {
  mounted: el => {
    const input = el.querySelector('.q-field__native')
    if (input.value.length)
      input.addEventListener('focus', ()=> input.select())
  }
}
