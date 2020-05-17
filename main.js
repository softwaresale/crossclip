
const { BrowserWindow, app, clipboard, ipcMain } = require('electron');

let win;
let clipboardWorker;

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  win.loadURL(`file://${__dirname}/dist/crossclip/index.html`);

  win.on('closed', () => {
    win = null;
    clipboardWorker = null;
  });
}

function createClipboardWatcher() {
  clipboardWorker = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true },
  });

  // The script to run is wrapped in the html file
  clipboardWorker.loadURL(`file://${__dirname}/clipboard-watcher-wrapper.html`);
}

app.on('ready', () => {
  // Create the processes
  createWindow();
  createClipboardWatcher();

  // Add redux dev tool
  BrowserWindow.addDevToolsExtension('/home/charlie/.config/google-chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0');

  // Listen for clipboard events and route them to the child process
  ipcMain.on('clipboard-changed', (event, nextText) => {
    win.webContents.send('clipboard-changed', nextText);
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }

  if (clipboardWorker === null) {
    createClipboardWatcher();
  }
});
