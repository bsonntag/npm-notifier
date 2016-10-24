var notifier = require('node-notifier')

var NpmFollower = require('./npm-follower')

NpmFollower(update => {
  let message = update.name + '@' + update.version
  notifier.notify({
    title: 'NPM Notifier',
    message: message,
    sound: true,
  })
})
