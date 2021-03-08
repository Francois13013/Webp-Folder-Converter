"use strict";
// @ts-nocheck
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var dialog = require('electron').dialog;
var mainWindow = undefined;
function openAboutWindow(file) {
    var win = new electron_1.BrowserWindow({
        height: 300,
        webPreferences: {
            devTools: false,
            nodeIntegration: false
        },
        width: 200,
        resizable: false,
        autoHideMenuBar: true
    });
    win.loadFile(path.join(__dirname, file));
}
;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        height: 400,
        webPreferences: {
            devTools: false,
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true
        },
        width: 560,
        resizable: false,
        autoHideMenuBar: false
    });
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
    var _a = require('electron'), app = _a.app, Menu = _a.Menu;
    var isMac = process.platform === 'darwin';
    var menuTemplate = [{ label: "Aide", submenu: [{ label: "A propos", click: function () { openAboutWindow("../APropos.html"); } },
                { label: "Licence", click: function () { openAboutWindow("../Licence.html"); } },] },];
    var menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}
electron_1.app.on("ready", function () {
    createWindow();
    electron_1.app.on("activate", function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
var ipcMain = require('electron').ipcMain;
var recursive = require("recursive-readdir");
var webp = require('webp-converter');
webp.grant_permission();
var fs = require('fs');
var FolderLocation = undefined;
var exclusionFolder = ["node_modules"];
var quality = 80;
ipcMain.on('ChooseFolder', function () {
    dialog.showOpenDialog({ properties: ['openDirectory'] }).then(function (resolve) {
        FolderLocation = resolve.filePaths[0];
        var hamdou = resolve.filePaths[0].replace(/\\/g, "/");
        mainWindow.webContents.executeJavaScript("\n        document.getElementById(\"Selected\").innerHTML = '" + hamdou + "'\n    ");
    });
});
ipcMain.on('inputChanged', function (channel, inputValue) {
    quality = inputValue;
    console.log(inputValue);
});
ipcMain.on('startWebpGen', function () {
    console.log("quality");
    // recursive(FolderLocation, [] , function (err : any, files : any) {
    //   let rst = files.filter(function(file : any) {
    //       if (path.extname(file).toLowerCase() === ".png") return true;
    //       if (path.extname(file).toLowerCase() === ".jpg") return true;
    //       if (path.extname(file).toLowerCase() === ".jpeg") return true;
    //       return false;
    //   });
    //   let i = 0;
    //   mainWindow.webContents.executeJavaScript(`
    //     document.getElementById("NbrFichierATransformerEnWebp").innerHTML = 'Génération des webp en cours ${i}' / '${rst.length}'
    //   `);
    //   rst.forEach((Element : any) => {
    //         const result = webp.cwebp(Element, path.dirname(Element) + "\\" + path.basename(Element, path.extname(Element))  + ".webp","-q 80");
    //         result.then((result : any) => {
    //         ++i;
    //         mainWindow.webContents.executeJavaScript(`
    //           document.getElementById("CurrentAction").innerHTML = 'Génération des webp en cours ${i} / ${rst.length}'
    //         `);
    //       });
    //     }); // Fin foreach
    // }); // Fin recursive
});
//# sourceMappingURL=main.js.map