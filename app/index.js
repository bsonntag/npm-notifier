const _ = require('lodash')
const { ipcRenderer } = require('electron')

const NpmFollower = require('../lib/npm-follower')

window.addEventListener('load', () => {
  let subscribedPackages = [
    '*angular*',
    'eslint*',
    '*express*',
    'gulp*',
    'lodash*',
    'minimatch',
    'mongoose',
    'react*',
    'request',
    '*webpack*',
  ]

  startFollower(subscribedPackages)

  displaySubscribedPackages(subscribedPackages)
})

function startFollower(subscribedPackages) {
  let follower = NpmFollower()

  follower.follow(subscribedPackages)

  follower.onUpdate(update => {
    console.log('npm update')
    notifyPackageUpdate(update)
  })

  function notifyPackageUpdate(update) {
    let body = update.name + '@' + update.version
    console.log(body)
    let notification = new Notification('NPM Notifier', { body })
  }
}

function displaySubscribedPackages(subscribedPackages) {
  let container = document.getElementById('subscribed-packages')
  let packageList = document.createElement('ul')

  subscribedPackages.map(createPackageListItem)
    .forEach(packageListItem => packageList.appendChild(packageListItem))

  container.appendChild(packageList)
}

function createPackageListItem(subscribedPackage) {
  let packageListItem = document.createElement('li')
  let text = document.createTextNode(subscribedPackage);
  packageListItem.appendChild(text)
  return packageListItem
}
