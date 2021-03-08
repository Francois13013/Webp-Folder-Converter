// @ts-nocheck

import { app, BrowserWindow, Menu, MenuItem, MenuItemConstructorOptions } from "electron";
import * as path from "path";

const { dialog } = require('electron')

let mainWindow : any = undefined;

function openAboutWindow(file : string) {
  const win = new BrowserWindow({
    height: 300,
    webPreferences: {
      devTools : false,
      nodeIntegration: false,
    },
    width: 200,
    resizable : false,
    autoHideMenuBar : true,
  })
  win.loadFile(path.join(__dirname, file));
};

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 400,
    webPreferences: {
      devTools : false,
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    width: 560,
    resizable : false,
    autoHideMenuBar : false,
  });

  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  const { app, Menu } = require('electron')

  const isMac = process.platform === 'darwin'
    
  let menuTemplate = [{label: "Aide",submenu: [{ label: "A propos",click() {openAboutWindow("../APropos.html")}},
                      { label: "Licence",click() {openAboutWindow("../Licence.html")}},]},];
  
  let menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

app.on("ready", () => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow(); 
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

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
    FolderLocation = resolve.filePaths[0];
    let hamdou : string = resolve.filePaths[0].replace(/\\/g, "/");    
    mainWindow.webContents.executeJavaScript(`
        document.getElementById("Selected").innerHTML = '${hamdou}'
    `)
  })
});

ipcMain.on('inputChanged', (channel, inputValue) => {
  quality = inputValue;
  console.log(inputValue);
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