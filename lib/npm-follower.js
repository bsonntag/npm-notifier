var _ = require('lodash')
var ChangesStream = require('changes-stream')

const PackageUpdate = require('./package-update')
const Subscriptions = require('./subscriptions')

const DEFAULT_OPTIONS = {
  since: 'now',
}

function NpmFollower(options = {}) {
  _.defaults(options, DEFAULT_OPTIONS)

  let callbacks = []
  let changes = new ChangesStream({
    db: options.dbUrl,
    include_docs: true,
    since: options.since,
  })
  let follower = {
    follow,
    onUpdate,
  }
  let subscriptions = Subscriptions()

  changes.on('data', change => handlePackageUpdate(PackageUpdate(change)))

  return follower

  function follow(packageName) {
    if(_.isString(packageName)) {
      subscriptions.add(packageName)
    }
    if(_.isArray(packageName)) {
      packageName.forEach(name => subscriptions.add(name))
    }
  }

  function onUpdate(callback)  {
    if(_.isFunction(callback)) {
      callbacks = callbacks.concat(callback)
    }
  }

  function handlePackageUpdate(packageUpdate) {
    if(packageUpdate.isValid() && subscriptions.isSubscribed(packageUpdate.name)) {
      callbacks.forEach(callback => callback(packageUpdate))
    }
  }
}

module.exports = NpmFollower
