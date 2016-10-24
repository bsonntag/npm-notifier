var _ = require('lodash')
var ChangesStream = require('changes-stream')
var minimatch = require('minimatch')

var dbUrl = 'https://skimdb.npmjs.com/registry'
var subscribedPackages = [
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
]

function NpmFollower(callback) {
  let changes = new ChangesStream({
    db: dbUrl,
    include_docs: true,
    since: 'now',
  })

  changes.on('data', (change) => {
    if(isPackage(change) && isSubscribed(change)) {
      callback({
        name: packageName(change),
        version: latestPackageVersion(change),
      })
    }
  })
}

function isPackage(change) {
  return _.has(change, 'doc.name')
}

function isSubscribed(change) {
  //return subscribedPackages.some(packageMatches(packageName(change)))
  return true
}

var packageMatches = name => subscribedPackage => minimatch(name, subscribedPackage)

function packageName(change) {
  return _.get(change, 'doc.name')
}

function latestPackageVersion(change) {
  return _.get(change, 'doc.dist-tags.latest')
}

module.exports = NpmFollower
