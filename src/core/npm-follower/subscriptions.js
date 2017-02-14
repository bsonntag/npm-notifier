import minimatch from 'minimatch'

const packageMatches = name => subscribedPackage => minimatch(name, subscribedPackage)

function Subscriptions() {
  let subscribedPackages = []
  const subscriptions = {
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

export default Subscriptions
