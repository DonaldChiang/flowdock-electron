'use strict';

const electron = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

const app = electron.app;

require('electron-debug')();
require('electron-dl')();
require('electron-context-menu')();

let mainWindow;

function createWindow () {
    const main_window = new electron.BrowserWindow({
        width: 1280,
        height: 800,
        tabbingIdentifier: 'flowdock',
        webPreferences: {
            nodeIntegration: false,
            plugins: true
        }
    })

    if (process.platform === 'darwin') {
        main_window.setSheetOffset(40);
    }
    main_window.loadURL('https://www.flowdock.com/app')

    main_window.on('close', e => {
        if (process.platform === 'darwin') {
            app.hide();
        } else {
            app.quit();
        }
    });

    return main_window;
}

app.on('ready', () => {
    mainWindow = createWindow();
    const page = mainWindow.webContents;

    page.on('dom-ready', () => {
        page.insertCSS(fs.readFileSync(path.join(__dirname, './browser.css'), 'utf8'));
        mainWindow.show();
    });
    page.openDevTools();

    page.on('new-window', (e, url) => {
        e.preventDefault();
        electron.shell.openExternal(url);
    });

    mainWindow.webContents.session.on('will-download', (event, item) => {
        const totalBytes = item.getTotalBytes();

        item.on('updated', () => {
            mainWindow.setProgressBar(item.getReceivedBytes() / totalBytes);
        });

        item.on('done', (e, state) => {
            mainWindow.setProgressBar(-1);

            if (state === 'interrupted') {
                electron.Dialog.showErrorBox('Download error', 'The download was interrupted');
            }
        });
    });

    const template = [
        {
            label: 'Application',
            submenu: [
                {label: 'About Application', selector: 'orderFrontStandardAboutPanel:'},
                {type: 'separator'},
                {
                    label: 'Quit', accelerator: 'Command+Q', click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:'},
                {label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:'},
                {type: 'separator'},
                {label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:'},
                {label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:'},
                {label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:'},
                {label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:'}
            ]
        },
        {
            label: 'View',
            submenu: [
                {role: 'reload'},
                {role: 'forcereload'},
                {role: 'toggledevtools'},
                {type: 'separator'},
                {role: 'resetzoom'},
                {role: 'zoomin'},
                {role: 'zoomout'},
                {type: 'separator'},
                {role: 'togglefullscreen'}
            ]
        },
        {
            role: 'window',
            submenu: [
                {role: 'minimize'},
                {role: 'close'}
            ]
        }
    ];

    electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(template));
})

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    mainWindow.show();
});