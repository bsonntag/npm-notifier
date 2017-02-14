import { get, has } from 'lodash'

function PackageUpdate(change) {
  const packageUpdate = {
    isValid,
    name: get(change, 'doc.name'),
    version: get(change, 'doc.dist-tags.latest'),
  }

  return packageUpdate

  function isValid() {
    return has(change, 'doc.name')
  }
}

export default PackageUpdate
