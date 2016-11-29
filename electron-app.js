var { app, BrowserWindow, Menu, MenuItem, Tray } = require('electron')
var path = require('path')

app.on('ready', () => {
  let browserWindow = createWindow()
  //createTrayIcon(window)
})

function createWindow() {
  let browserWindow = new BrowserWindow({
    //show: false,
    width: 800,
    height: 600,
  })

  browserWindow.loadURL(`file://${__dirname}/app/index.html`)

  browserWindow.webContents.openDevTools()

  browserWindow.on('closed', () => {
    browserWindow = null
    process.exit(0)
  })

  return browserWindow
}

function createTrayIcon(browserWindow) {
  let tray = new Tray(path.join(__dirname, 'icon.png'))
  tray.setToolTip('NPM Notifier')
  tray.setContextMenu(createTrayMenu(browserWindow))
  return tray
}

function createTrayMenu(browserWindow) {
  let menu = new Menu()
  menu.append(new MenuItem({
    label: 'Exit',
    click() {
      browserWindow.close()
    },
  }))
  return menu
}
