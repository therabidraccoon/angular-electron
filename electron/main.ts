import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

let win: BrowserWindow;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, `/../../dist/angular-electron/index.html`),
            protocol: 'file:',
            slashes: true,
        })
    );

    // win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    });
}

app.on('ready', createWindow);

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

ipcMain.on('save-file', (event, data) => {
    let basePath = 'C:/TEMP/';
    console.log(data);
    try {
        fs.writeFileSync(basePath + data['name'], data['content'], 'utf-8');
    }
    catch (e) {
        console.error('Failed to save the file !');
    }
});