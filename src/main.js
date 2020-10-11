const electron = require('electron')
const countdown = require('./countdown.js')

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400
    })
    mainWindow.loadURL(`file://${__dirname}/countdown.html`);
    //  countdown();
});

app.on('closed', () => {
    mainWindow = null;
});


ipcMain.on('countdown-start', _ => {
    countdown(count => {
        mainWindow.webContents.send('countdown', count);
    });
})