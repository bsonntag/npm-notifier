var { spawn } = require('child_process')
var path = require('path')

var childArgs = [
  path.resolve(__dirname, '..', 'cmd-notifier.js'),
]

var child = spawn('node', childArgs, {
  detached: true,
  stdio: 'ignore',
})

child.unref()
