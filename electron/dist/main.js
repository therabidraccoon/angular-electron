"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var fs = require("fs");
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/angular-electron/index.html"),
        protocol: 'file:',
        slashes: true,
    }));
    // win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
electron_1.ipcMain.on('save-file', function (event, data) {
    var basePath = 'C:/TEMP/';
    console.log(data);
    try {
        fs.writeFileSync(basePath + data['name'], data['content'], 'utf-8');
        event.webContents.send("fs-result", true);
    }
    catch (e) {
        console.error('Failed to save the file !');
        event.webContents.send("fs-result", false);
    }
});
//# sourceMappingURL=main.js.map