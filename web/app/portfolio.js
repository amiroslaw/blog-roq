(function () {
  'use strict'

  document.addEventListener('click', function (event) {
    var opener = event.target.closest('[data-dialog]')
    if (opener) {
      var dialog = document.getElementById(opener.getAttribute('data-dialog'))
      if (dialog && typeof dialog.showModal === 'function') {
        dialog.showModal()
      }
      return
    }

    var closer = event.target.closest('[data-close]')
    if (closer) {
      var openDialog = closer.closest('dialog')
      if (openDialog) {
        openDialog.close()
      }
      return
    }

    if (event.target.classList.contains('portfolio-dialog')) {
      event.target.close()
    }
  })
})()
