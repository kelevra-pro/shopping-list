const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

const isMac = process.platform === 'darwin';
let mainWindow;
let addWindow;

app.on('ready', function () {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  mainWindow.on('closed', function () {
    app.quit();
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createAddWindow () {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add Shopping List Item'
  });
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  addWindow.on('closed', function () {
    addWindow = null;
  });
}

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Item',
        click () {
          createAddWindow();
        }
      },
      {
        label: 'Clear Items'
      },
      {
        label: 'Quit',
        accelerator: isMac ? 'Command+Q' : 'Ctrl+Q',
        click () {
          app.quit();
        }
      }
    ]
  }
];

if (isMac) {
  mainMenuTemplate.unshift({
    label: app.name
  });
}

if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: isMac ? 'Command+I' : 'Ctrl+I',
        click (item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}