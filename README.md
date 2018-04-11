# flowdock-electron
CA Flowdock unofficial electron app

There is a [critical issue](https://flowdock.uservoice.com/forums/36827-general/suggestions/5631691-allow-pasting-images-from-the-clipboard?page=1&per_page=20) on Flowdock official Mac app: User can't paste images from the clipboard, so user can only use Flowdock web version.

This Electron app use WebContent to load `https://www.flowdock.com/app` and add an `Edit` menu on ApplicationMenu to let user can copy and paste content to the app.

# Known issues

1. ~~Stay logged in session will missing after application restart~~
2. ~~Open link with `electron.shell.openExternal(url)` will trigger twice~~
3. ~~App will be quitted when window is closed~~
4. App cannot be quitted via dock contextual menu
5. Based on Known issues 4, shutdown and restart will be interrupted

# Install

## OS X

[Download](https://github.com/DonaldChiang/flowdock-electron/releases/latest), unzip it, move Flowdock Electron.app to /Applications directory.

## Linux

1. Download the zipfile and extract its contents to the `/opt` folder (you'll need sudo)
2. Changed the name of the folder in `/opt` to "flowdock" to keep things simple
3. Add a desktop entry under `/usr/share/application` called `flowdock.desktop`
4. Add the following content to the file:
```
[Desktop Entry]
Encoding=UTF-8
Name=Flowdock
Exec=/opt/flowdock/Flowdock\ Electron
Terminal=false
Type=Application
Icon=/opt/flowdock/resources/app/static/flowdock.png
Categories=Internet;
StartupWMClass=flowdock electron
```

## Windows

[Download](https://github.com/DonaldChiang/flowdock-electron/releases/latest), unzip it

## Thanks and reference

I am a beginner of [Electron](https://github.com/electron/electron), some structs in this app was referred from [trello-desktop](https://github.com/danielchatfield/trello-desktop)

Thanks [CA Flowdock](https://www.flowdock.com) and [USERVOICE](https://flowdock.uservoice.com/forums/36827-general/suggestions/5631691-allow-pasting-images-from-the-clipboard)
