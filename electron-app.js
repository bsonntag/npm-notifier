var { app, BrowserWindow, Menu, MenuItem, Tray } = require('electron')
var path = require('path')

var NpmFollower = require('./npm-follower')

var window

app.on('ready', () => {
  createWindow()
  //createTrayIcon()

  NpmFollower(update => {
    console.log('npm update');
    console.log(update)
    window.webContents.send('npm-update', update)
  })
})

function createWindow() {
  window = new BrowserWindow({
    //show: false,
    width: 800,
    height: 600,
  })

  window.loadURL(`file://${__dirname}/app/index.html`)

  window.webContents.openDevTools()

  window.on('closed', () => {
    window = null
    process.exit(0)
  })

  return window
}

function createTrayIcon() {
  let tray = new Tray(path.join(__dirname, 'icon.png'))
  tray.setToolTip('NPM Notifier')
  tray.setContextMenu(createTrayMenu())
  return tray
}

function createTrayMenu() {
  let menu = new Menu()
  menu.append(new MenuItem({
    label: 'Exit',
    click() {
      window.close()
    },
  }))
  return menu
}
