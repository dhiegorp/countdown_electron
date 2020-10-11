const electron = require('electron')
const countdown = require('./countdown.js')

const { app, BrowserWindow, ipcMain } = electron;

let windows = [];

app.on('ready', () => {
    [1, 2, 3].forEach(_ => {
        let win = new BrowserWindow({
            height: 400,
            width: 400
        })
        win.loadURL(`file://${__dirname}/countdown.html`);

        app.on('closed', () => {
            win = null;
        });

        windows.push(win);
    })
});




ipcMain.on('countdown-start', _ => {
    countdown(count => {
        windows.forEach(win => {
            win.webContents.send('countdown', count);
        })

    });
})