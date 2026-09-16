const { app, BrowserWindow, shell, Menu, clipboard } = require('electron');
const path = require('path');

app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('allow-insecure-localhost');
app.commandLine.appendSwitch('enable-features', 'NetworkService');
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, 'icon.ico'),
    titleBarOverlay: {
      color: '#1a1a1a',
      symbolColor: '#ffffff',
      height: 36
    },
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
      experimentalFeatures: true
    }
  });

  win.setMenuBarVisibility(false);
  win.removeMenu();
  win.loadFile('index.html');
}

const FORCE_EXTERNAL_HOSTS = [
  'google.com',
  'www.google.com',
  'startpage.com',
  'www.startpage.com',
  'search.brave.com',
  'kagi.com',
  'www.kagi.com',
  'swisscows.com'
];

function mustOpenExternally(url) {
  try {
    const u = new URL(url);
    return FORCE_EXTERNAL_HOSTS.some(host =>
      u.hostname === host || u.hostname.endsWith('.' + host)
    );
  } catch (e) {
    return false;
  }
}

function buildContextMenu(params, contents) {
  const template = [];
  const hasText = params.selectionText && params.selectionText.trim().length > 0;
  const isEditable = params.isEditable;

  if (params.linkURL) {
    template.push({
      label: 'Открыть ссылку в новой вкладке',
      click: () => {
        if (contents.hostWebContents) {
          contents.hostWebContents.send('create-tab', params.linkURL);
        }
      }
    });
    template.push({
      label: 'Открыть в системном браузере',
      click: () => shell.openExternal(params.linkURL)
    });
    template.push({
      label: 'Копировать адрес ссылки',
      click: () => clipboard.writeText(params.linkURL)
    });
    template.push({ type: 'separator' });
  }

  if (params.mediaType === 'image' && params.srcURL) {
    template.push({
      label: 'Открыть картинку в новой вкладке',
      click: () => {
        if (contents.hostWebContents) {
          contents.hostWebContents.send('create-tab', params.srcURL);
        }
      }
    });
    template.push({
      label: 'Копировать адрес картинки',
      click: () => clipboard.writeText(params.srcURL)
    });
    template.push({
      label: 'Сохранить картинку как...',
      click: () => contents.downloadURL(params.srcURL)
    });
    template.push({ type: 'separator' });
  }

  if (hasText) {
    template.push({ role: 'copy', label: 'Копировать' });
    template.push({
      label: 'Искать в Google',
      click: () => {
        const q = encodeURIComponent(params.selectionText);
        if (contents.hostWebContents) {
          contents.hostWebContents.send('create-tab', `https://www.google.com/search?q=${q}`);
        } else {
          shell.openExternal(`https://www.google.com/search?q=${q}`);
        }
      }
    });
    template.push({
      label: 'Искать в Яндексе',
      click: () => {
        const q = encodeURIComponent(params.selectionText);
        if (contents.hostWebContents) {
          contents.hostWebContents.send('create-tab', `https://yandex.ru/search/?text=${q}`);
        } else {
          shell.openExternal(`https://yandex.ru/search/?text=${q}`);
        }
      }
    });
    template.push({ type: 'separator' });
  }

  if (isEditable) {
    template.push({ role: 'cut', label: 'Вырезать' });
    template.push({ role: 'copy', label: 'Копировать' });
    template.push({ role: 'paste', label: 'Вставить' });
    template.push({ role: 'pasteAndMatchStyle', label: 'Вставить без форматирования' });
    template.push({ role: 'selectAll', label: 'Выделить всё' });
    template.push({ type: 'separator' });
  }

  template.push({
    label: 'Печать...',
    click: () => contents.print()
  });

  template.push({
    label: 'Эмодзи',
    click: () => {
      if (contents.hostWebContents) {
        contents.hostWebContents.send('open-emoji');
      }
    }
  });

  template.push({ type: 'separator' });

  template.push({
    label: 'Исследовать элемент',
    click: () => {
      contents.inspectElement(params.x, params.y);
      if (!contents.isDevToolsOpened()) {
        contents.openDevTools({ mode: 'right' });
      }
    }
  });

  return Menu.buildFromTemplate(template);
}

app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    if (!url || (!url.startsWith('http://') && !url.startsWith('https://'))) {
      return { action: 'deny' };
    }
    if (mustOpenExternally(url)) {
      shell.openExternal(url);
    } else {
      contents.loadURL(url);
    }
    return { action: 'deny' };
  });

  contents.on('context-menu', (e, params) => {
    const menu = buildContextMenu(params, contents);
    const win = BrowserWindow.fromWebContents(contents.hostWebContents || contents);
    menu.popup({ window: win });
  });
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});