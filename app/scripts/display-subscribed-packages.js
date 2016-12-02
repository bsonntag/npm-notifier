function displaySubscribedPackages(subscribedPackages) {
  let container = document.getElementById('subscribed-packages')

  removeOldPackageList(container)

  createPackageList(container, subscribedPackages)
}

function removeOldPackageList(container) {
  let childLists = container.getElementsByTagName('ul')

  if(childLists.length > 0) {
    let packageList = childLists[0]
    container.removeChild(packageList)
  }
}

function createPackageList(container, subscribedPackages) {
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

module.exports = displaySubscribedPackages
