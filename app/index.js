var _ = require('lodash')
var { ipcRenderer, shell } = require('electron')

ipcRenderer.on('npm-update', (event, arg) => {
  let body = arg.name + '@' + arg.version
  console.log(body)
  let notification = new Notification('NPM Notifier', { body })
})
