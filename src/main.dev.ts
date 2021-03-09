/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
// @ts-nocheck

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 500,
    height: 400,
    autoHideMenuBar : true,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    resizable : false,
    frame:false,
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});


/***
 * 
 */

 const { ipcMain } = require('electron');
 var recursive = require("recursive-readdir");
 const webp = require('webp-converter');
 webp.grant_permission();
 const fs = require('fs')
 
 var FolderLocation : string = undefined;
 let exclusionFolder = ["node_modules"];
 let quality = 80;
 
 ipcMain.on('ChooseFolder', () => {
   dialog.showOpenDialog({ properties: ['openDirectory'] }).then((resolve)=> {
    console.log(resolve.canceled);
     
    if(resolve.canceled === false) {
      FolderLocation = resolve.filePaths[0];
      let folderSelected : string = resolve.filePaths[0].replace(/\\/g, "/");    
      mainWindow.webContents.executeJavaScript(`
          document.getElementById("Selected").innerHTML = '${folderSelected}'
      `)
     }
   })
 });
 
 ipcMain.on('inputChanged', (channel, inputValue) => {
   quality = inputValue;
  //  console.log(quality);
 });
 
 ipcMain.on('startWebpGen', () => {
   recursive(FolderLocation, [] , function (err : any, files : any) {
     let rst = files.filter(function(file : any) {
         if (path.extname(file).toLowerCase() === ".png") return true;
         if (path.extname(file).toLowerCase() === ".jpg") return true;
         if (path.extname(file).toLowerCase() === ".jpeg") return true;
         return false;
     });
     let i = 0;
     mainWindow.webContents.executeJavaScript(`
       document.getElementById("NbrFichierATransformerEnWebp").innerHTML = 'Génération des webp en cours ${i}' / '${rst.length}'
     `);
     rst.forEach((Element : any) => {
           const result = webp.cwebp(Element, path.dirname(Element) + "\\" + path.basename(Element, path.extname(Element))  + ".webp","-q " + quality);
           result.then((result : any) => {
           ++i;
           mainWindow.webContents.executeJavaScript(`
             document.getElementById("CurrentAction").innerHTML = 'Génération des webp en cours ${i} / ${rst.length}'
           `);
         });
       }); // Fin foreach
   }); // Fin recursive
 });