var _ = require('lodash')
var { ipcRenderer, shell } = require('electron')

var NpmFollower = require('../npm-follower')

NpmFollower(update => {
  console.log('npm update')
  notifyPackageUpdate(update)
})

function notifyPackageUpdate(update) {
  let body = update.name + '@' + update.version
  console.log(body)
  let notification = new Notification('NPM Notifier', { body })
}
