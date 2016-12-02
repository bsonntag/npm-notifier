function setupForm(onSubmit) {
  let form = document.getElementById('add-package')

  form.addEventListener('submit', event => {
    event.preventDefault()
    let formData = new FormData(form)
    onSubmit(formData.get('package'))
  })
}

module.exports = setupForm
