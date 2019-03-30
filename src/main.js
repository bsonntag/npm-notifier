import { app, BrowserWindow } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';

function createWindow() {
  const mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadFile(require.resolve('./index.html'));
  mainWindow.webContents.openDevTools();

  installExtension(REACT_DEVELOPER_TOOLS);

  return mainWindow;
}

app.on('ready', createWindow);
