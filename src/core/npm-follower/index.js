import { defaults, isArray, isFunction, isString } from 'lodash'
import ChangesStream from 'changes-stream'
import PackageUpdate from './package-update'
import Subscriptions from './subscriptions'

const DEFAULT_OPTIONS = {
  dbUrl: 'https://skimdb.npmjs.com/registry',
  since: 'now',
}

function NpmFollower(options = {}) {
  defaults(options, DEFAULT_OPTIONS)

  let callbacks = []
  const changes = new ChangesStream({
    db: options.dbUrl,
    include_docs: true,
    since: options.since,
  })
  const follower = {
    follow,
    onUpdate,
  }
  const subscriptions = Subscriptions()

  changes.on('data', change => handlePackageUpdate(PackageUpdate(change)))

  return follower

  function follow(packageName) {
    if(isString(packageName)) {
      subscriptions.add(packageName)
    }
    if(isArray(packageName)) {
      packageName.forEach(name => subscriptions.add(name))
    }
  }

  function onUpdate(callback)  {
    if(isFunction(callback)) {
      callbacks = callbacks.concat(callback)
    }
  }

  function handlePackageUpdate(packageUpdate) {
    if(packageUpdate.isValid() && subscriptions.isSubscribed(packageUpdate.name)) {
      callbacks.forEach(callback => callback(packageUpdate))
    }
  }
}

export default NpmFollower
