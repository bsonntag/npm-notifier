var _ = require('lodash')
var { ipcRenderer, shell } = require('electron')

var NpmFollower = require('../lib/npm-follower')

var dbUrl = 'https://skimdb.npmjs.com/registry'
var subscribedPackages = [
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

var follower = NpmFollower({ dbUrl })

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
