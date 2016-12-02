const _ = require('lodash')

const displaySubscribedPackages = require('./scripts/display-subscribed-packages')
const setupForm = require('./scripts/setup-form')
const startFollower = require('./scripts/start-follower')

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
  ].sort()

  let follower = startFollower(subscribedPackages)

  displaySubscribedPackages(subscribedPackages)

  setupForm(newPackage => {
    follower.follow(newPackage)
    subscribedPackages = subscribedPackages.concat(newPackage)
      .sort()
    displaySubscribedPackages(subscribedPackages)
  })
})
