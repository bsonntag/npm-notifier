import { app, BrowserWindow } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    show: false,
    titleBarStyle: 'hidden',
  });

  mainWindow.loadFile(require.resolve('../renderer/index.html'));
  // mainWindow.webContents.openDevTools();

  installExtension(REACT_DEVELOPER_TOOLS);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  return mainWindow;
}

app.on('ready', () => {
  createWindow();
});
