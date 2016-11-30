var minimatch = require('minimatch')

function Subscriptions() {
  let packageMatches = name => subscribedPackage => minimatch(name, subscribedPackage)
  let subscribedPackages = []
  let subscriptions = {
    add,
    isSubscribed,
  }

  return subscriptions

  function add(packageName) {
    subscribedPackages = subscribedPackages.concat(packageName);
    return subscriptions
  }

  function isSubscribed(packageName) {
    return subscribedPackages.some(packageMatches(packageName))
  }
}

module.exports = Subscriptions
