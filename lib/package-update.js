var _ = require('lodash')

function PackageUpdate(change) {
  let packageUpdate = {
    isValid,
    name: _.get(change, 'doc.name'),
    version: _.get(change, 'doc.dist-tags.latest'),
  }

  return packageUpdate

  function isValid() {
    return _.has(change, 'doc.name')
  }
}

module.exports = PackageUpdate
