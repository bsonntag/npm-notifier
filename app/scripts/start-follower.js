const NpmFollower = require('../../lib/npm-follower')

function startFollower(subscribedPackages) {
  let follower = NpmFollower()

  follower.follow(subscribedPackages)

  follower.onUpdate(update => {
    console.log('npm update')
    notifyPackageUpdate(update)
  })

  return follower

  function notifyPackageUpdate(update) {
    let body = update.name + '@' + update.version
    console.log(body)
    let notification = new Notification('NPM Notifier', { body })
  }
}

module.exports = startFollower
