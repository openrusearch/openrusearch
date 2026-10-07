const { app, BrowserWindow, shell, Menu, globalShortcut, session, ipcMain, webContents, dialog, clipboard } = require('electron');
const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');
const path = require('path');

let mainWindow;
const downloads = new Map();
let downloadCounter = 0;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 700,
    minHeight: 500,
    title: 'Open RU Search',
    backgroundColor: '#0E1013',
    icon: path.join(__dirname, 'favicon.ico'),
    frame: false,
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true,
      nativeWindowOpen: true,
      devTools: true
    }
  });

  mainWindow.loadFile('index.html');
  Menu.setApplicationMenu(null);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    mainWindow.webContents.send('open-in-new-tab', url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('file://')) event.preventDefault();
  });

  mainWindow.on('maximize', () => send('window-maximized', true));
  mainWindow.on('unmaximize', () => send('window-maximized', false));

  mainWindow.on('closed', () => { mainWindow = null; });
}

function setupDownloads() {
  session.defaultSession.on('will-download', (event, item, wc) => {
    const id = ++downloadCounter;
    const filename = item.getFilename();
    const totalBytes = item.getTotalBytes();
    const savePath = path.join(app.getPath('downloads'), filename);
    item.setSavePath(savePath);

    const data = {
      id, filename,
      url: item.getURL(),
      savePath, totalBytes,
      receivedBytes: 0,
      state: 'progressing',
      startTime: Date.now()
    };
    downloads.set(id, { item, data });
    send('download-started', { ...data });

    item.on('updated', (e, state) => {
      const rec = downloads.get(id);
      if (!rec) return;
      rec.data.receivedBytes = item.getReceivedBytes();
      rec.data.totalBytes = item.getTotalBytes();
      rec.data.state = state === 'interrupted' ? 'error' : 'progressing';
      const elapsed = (Date.now() - rec.data.startTime) / 1000;
      rec.data.speed = elapsed > 0 ? rec.data.receivedBytes / elapsed : 0;
      send('download-progress', {
        id,
        receivedBytes: rec.data.receivedBytes,
        totalBytes: rec.data.totalBytes,
        speed: rec.data.speed,
        state: rec.data.state
      });
    });

    item.once('done', (e, state) => {
      const rec = downloads.get(id);
      if (!rec) return;
      rec.data.state = state === 'completed' ? 'done' : 'error';
      rec.data.receivedBytes = item.getReceivedBytes();
      rec.data.totalBytes = item.getTotalBytes();
      if (state === 'completed') {
        send('download-done', { id, savePath: rec.data.savePath, filename: rec.data.filename });
      } else {
        send('download-error', { id, state });
      }
    });
  });
}

// ==== КОНТЕКСТНОЕ МЕНЮ (правая кнопка) ====
function setupContextMenu() {
  app.on('web-contents-created', (e, wc) => {
    wc.on('context-menu', (event, params) => {
      const menu = Menu.buildFromTemplate(buildContextTemplate(wc, params));
      menu.popup({ window: BrowserWindow.fromWebContents(wc) });
    });
  });
}

function buildContextTemplate(wc, params) {
  const template = [];
  const isWebview = wc.getType() === 'webview';

  // --- Картинка: скачать ---
  if (params.mediaType === 'image' && params.srcURL) {
    template.push({
      label: 'Сохранить изображение',
      click: () => wc.downloadURL(params.srcURL)
    });
    template.push({
      label: 'Копировать ссылку на изображение',
      click: () => clipboard.writeText(params.srcURL)
    });
    template.push({
      label: 'Открыть изображение в новой вкладке',
      click: () => send('open-in-new-tab', params.srcURL)
    });
    template.push({ type: 'separator' });
  }

  // --- Ссылка ---
  if (params.linkURL) {
    template.push({
      label: 'Открыть ссылку в новой вкладке',
      click: () => send('open-in-new-tab', params.linkURL)
    });
    template.push({
      label: 'Копировать адрес ссылки',
      click: () => clipboard.writeText(params.linkURL)
    });
    template.push({ type: 'separator' });
  }

  // --- Выделенный текст ---
  if (params.selectionText && params.selectionText.trim()) {
    const q = params.selectionText.trim();
    const short = q.length > 30 ? q.slice(0, 30) + '…' : q;
    template.push({
      label: `Найти «${short}» в Яндексе`,
      click: () => send('open-in-new-tab', 'https://yandex.ru/search/?text=' + encodeURIComponent(q))
    });
    template.push({
      label: `Найти «${short}» в Google`,
      click: () => send('open-in-new-tab', 'https://www.google.com/search?q=' + encodeURIComponent(q))
    });
    template.push({
      label: 'Копировать',
      role: 'copy'
    });
    template.push({ type: 'separator' });
  }

  // --- Редактирование (только если есть поле ввода) ---
  if (params.isEditable) {
    template.push({ role: 'undo', label: 'Отменить' });
    template.push({ role: 'redo', label: 'Повторить' });
    template.push({ type: 'separator' });
    template.push({ role: 'cut', label: 'Вырезать' });
    template.push({ role: 'copy', label: 'Копировать' });
    template.push({ role: 'paste', label: 'Вставить' });
    template.push({ role: 'pasteAndMatchStyle', label: 'Вставить как обычный текст' });
    template.push({ role: 'selectAll', label: 'Выделить всё' });
    template.push({ type: 'separator' });
  } else if (!params.selectionText) {
    // Если ничего не выделено и не редактируемо — базовые пункты
    if (isWebview) {
      template.push({
        label: 'Назад',
        enabled: wc.canGoBack(),
        click: () => wc.goBack()
      });
      template.push({
        label: 'Вперёд',
        enabled: wc.canGoForward(),
        click: () => wc.goForward()
      });
      template.push({
        label: 'Обновить',
        click: () => wc.reload()
      });
      template.push({ type: 'separator' });
    }
    template.push({
      label: 'Копировать адрес страницы',
      click: () => clipboard.writeText(params.pageURL || wc.getURL())
    });
    template.push({ type: 'separator' });
  }

  // --- Проверка правописания ---
  if (params.misspelledWord) {
    template.push({
      label: `Проверка правописания: «${params.misspelledWord}»`,
      enabled: false
    });
    (params.dictionarySuggestions || []).slice(0, 5).forEach(s => {
      template.push({
        label: '   ' + s,
        click: () => wc.replaceMisspelling(s)
      });
    });
    template.push({ type: 'separator' });
  }

  // --- Просмотреть код (DevTools) ---
  template.push({
    label: 'Просмотреть код',
    click: () => {
      try { wc.openDevTools({ mode: 'detach', activate: true }); } catch (e) {}
    }
  });
  if (wc.isDevToolsOpened && wc.isDevToolsOpened()) {
    template.push({
      label: 'Закрыть DevTools',
      click: () => { try { wc.closeDevTools(); } catch (e) {} }
    });
  }

  return template;
}

function send(channel, payload) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(channel, payload);
  }
}

// ==== НОВЫЕ ВКЛАДКИ ИЗ WEBVIEW (в Electron 28 событие new-window у webview удалено) ====
app.on('web-contents-created', (e, wc) => {
  if (wc.getType() === 'webview') {
    wc.setWindowOpenHandler(({ url }) => { send('open-in-new-tab', url); return { action: 'deny' }; });
  }
});

// ==== РАСШИРЕНИЯ ====
const extFile = () => path.join(app.getPath('userData'), 'extensions.json');
const extRoot = () => path.join(app.getPath('userData'), 'extensions');
let extStore = [];
const loadedExt = new Map();

function saveExtStore() {
  try { fs.writeFileSync(extFile(), JSON.stringify(extStore.map(({ error, ...r }) => r), null, 2)); } catch (e) {}
}
function readManifest(dir) {
  const m = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8').replace(/^\uFEFF/, ''));
  const msg = (v) => {
    const k = /^__MSG_(.+)__$/.exec(v || '');
    if (!k) return v || '';
    for (const l of [m.default_locale, 'en', 'ru']) {
      try {
        const j = JSON.parse(fs.readFileSync(path.join(dir, '_locales', l, 'messages.json'), 'utf8').replace(/^\uFEFF/, ''));
        const key = Object.keys(j).find(x => x.toLowerCase() === k[1].toLowerCase());
        if (key) return j[key].message;
      } catch (e) {}
    }
    return v;
  };
  return { m, name: msg(m.name), description: msg(m.description) };
}
async function enableExt(rec) {
  try {
    const ext = await session.defaultSession.loadExtension(rec.path, { allowFileAccess: true });
    loadedExt.set(rec.path, ext);
    rec.error = null;
  } catch (err) { rec.error = String(err.message || err); }
}
function disableExt(rec) {
  const ext = loadedExt.get(rec.path);
  if (ext) { try { session.defaultSession.removeExtension(ext.id); } catch (e) {} loadedExt.delete(rec.path); }
}
async function initExtensions() {
  try { extStore = JSON.parse(fs.readFileSync(extFile(), 'utf8')); } catch (e) { extStore = []; }
  for (const rec of extStore) if (rec.enabled) await enableExt(rec);
}
function extInfo(rec) {
  const o = { path: rec.path, enabled: !!rec.enabled, packed: !!rec.packed, error: rec.error || null };
  try {
    const { m, name, description } = readManifest(rec.path);
    const act = m.action || m.browser_action || {};
    Object.assign(o, {
      name, description, version: m.version || '', mv: m.manifest_version,
      popup: act.default_popup || null,
      options: m.options_page || (m.options_ui && m.options_ui.page) || null,
      swOnly: m.manifest_version === 3 && !!(m.background && m.background.service_worker)
    });
  } catch (e) { o.name = path.basename(rec.path); o.error = o.error || 'Не удалось прочитать manifest.json'; }
  const ext = loadedExt.get(rec.path);
  if (ext) o.id = ext.id;
  return o;
}
function findManifestDir(dir) {
  if (fs.existsSync(path.join(dir, 'manifest.json'))) return dir;
  const subs = fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory());
  for (const d of subs) if (fs.existsSync(path.join(dir, d.name, 'manifest.json'))) return path.join(dir, d.name);
  return null;
}
function crxToZip(buf) {
  if (buf.toString('latin1', 0, 4) !== 'Cr24') return buf;
  const v = buf.readUInt32LE(4);
  if (v === 3) return buf.subarray(12 + buf.readUInt32LE(8));
  if (v === 2) return buf.subarray(16 + buf.readUInt32LE(8) + buf.readUInt32LE(12));
  throw new Error('Неизвестная версия CRX');
}
function unzipTo(buf, dest) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('Файл не является ZIP/CRX-архивом');
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const root = path.resolve(dest);
  for (let n = 0; n < count; n++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('Архив повреждён');
    const method = buf.readUInt16LE(p + 10), csize = buf.readUInt32LE(p + 20);
    const nlen = buf.readUInt16LE(p + 28), elen = buf.readUInt16LE(p + 30), clen = buf.readUInt16LE(p + 32);
    const lho = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nlen);
    p += 46 + nlen + elen + clen;
    const target = path.resolve(root, name);
    if (target !== root && !target.startsWith(root + path.sep)) continue;
    if (name.endsWith('/')) { fs.mkdirSync(target, { recursive: true }); continue; }
    const start = lho + 30 + buf.readUInt16LE(lho + 26) + buf.readUInt16LE(lho + 28);
    const data = buf.subarray(start, start + csize);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, method === 0 ? data : zlib.inflateRawSync(data));
  }
}
async function registerExt(dir, packed) {
  const real = findManifestDir(dir);
  if (!real) return { ok: false, error: 'В выбранном месте нет manifest.json' };
  if (extStore.some(r => r.path === real)) return { ok: false, error: 'Это расширение уже добавлено' };
  try { readManifest(real); } catch (e) { return { ok: false, error: 'manifest.json повреждён' }; }
  const rec = { path: real, enabled: true, packed };
  await enableExt(rec);
  extStore.push(rec);
  saveExtStore();
  return rec.error ? { ok: true, warn: rec.error } : { ok: true };
}

ipcMain.handle('ext-list', () => extStore.map(extInfo));
ipcMain.handle('ext-add-unpacked', async () => {
  const r = await dialog.showOpenDialog(mainWindow, { title: 'Папка с распакованным расширением', properties: ['openDirectory'] });
  if (r.canceled || !r.filePaths[0]) return { canceled: true };
  return registerExt(r.filePaths[0], false);
});
ipcMain.handle('ext-add-packed', async () => {
  const r = await dialog.showOpenDialog(mainWindow, {
    title: 'Файл расширения', properties: ['openFile'],
    filters: [{ name: 'Расширения (.crx, .zip)', extensions: ['crx', 'zip'] }]
  });
  if (r.canceled || !r.filePaths[0]) return { canceled: true };
  try {
    const raw = fs.readFileSync(r.filePaths[0]);
    const dest = path.join(extRoot(), crypto.createHash('sha1').update(raw).digest('hex').slice(0, 12));
    if (!fs.existsSync(dest)) { fs.mkdirSync(dest, { recursive: true }); unzipTo(crxToZip(raw), dest); }
    return await registerExt(dest, true);
  } catch (err) { return { ok: false, error: String(err.message || err) }; }
});
ipcMain.handle('ext-toggle', async (e, p, on) => {
  const rec = extStore.find(r => r.path === p);
  if (!rec) return false;
  rec.enabled = !!on;
  if (on) await enableExt(rec); else disableExt(rec);
  saveExtStore();
  return true;
});
ipcMain.handle('ext-remove', (e, p) => {
  const i = extStore.findIndex(r => r.path === p);
  if (i < 0) return false;
  const rec = extStore[i];
  disableExt(rec);
  extStore.splice(i, 1);
  saveExtStore();
  if (rec.packed && rec.path.startsWith(extRoot())) {
    const top = path.join(extRoot(), path.relative(extRoot(), rec.path).split(path.sep)[0]);
    try { fs.rmSync(top, { recursive: true, force: true }); } catch (err) {}
  }
  return true;
});
ipcMain.handle('ext-open-page', (e, p, which) => {
  const rec = extStore.find(r => r.path === p);
  const ext = loadedExt.get(p);
  if (!rec || !ext) return false;
  const info = extInfo(rec);
  const page = which === 'options' ? info.options : info.popup;
  if (!page) return false;
  send('open-in-new-tab', `chrome-extension://${ext.id}/${page.replace(/^\//, '')}`);
  return true;
});

// URL страницы расширения (popup / options), чтобы открыть её поверх страницы в окне браузера
ipcMain.handle('ext-page-url', (e, p, which) => {
  const rec = extStore.find(r => r.path === p);
  const ext = loadedExt.get(p);
  if (!rec || !ext) return null;
  const info = extInfo(rec);
  const page = which === 'options' ? info.options : info.popup;
  if (!page) return null;
  return `chrome-extension://${ext.id}/${page.replace(/^\//, '')}`;
});

// ==== DOWNLOAD IPC ====
ipcMain.handle('cancel-download', (e, id) => {
  const rec = downloads.get(id);
  if (rec) { try { rec.item.cancel(); } catch (err) {} downloads.delete(id); return true; }
  return false;
});
ipcMain.handle('open-download', (e, p) => { shell.openPath(p); return true; });
ipcMain.handle('show-in-folder', (e, p) => { shell.showItemInFolder(p); return true; });
ipcMain.handle('clear-downloads', () => { downloads.clear(); return true; });
ipcMain.handle('get-downloads', () => Array.from(downloads.values()).map(r => r.data));

// ==== DEVTOOLS IPC ====
ipcMain.handle('open-devtools', (e, wcId) => {
  const target = webContents.getAllWebContents().find(wc => wc.id === wcId);
  if (target) { try { target.openDevTools({ mode: 'detach', activate: true }); } catch (err) {} return true; }
  return false;
});
ipcMain.handle('close-devtools', (e, wcId) => {
  const target = webContents.getAllWebContents().find(wc => wc.id === wcId);
  if (target) { try { target.closeDevTools(); } catch (err) {} return true; }
  return false;
});

// ==== WINDOW CONTROLS IPC ====
ipcMain.handle('window-minimize', () => { if (mainWindow) mainWindow.minimize(); });
ipcMain.handle('window-maximize', () => {
  if (!mainWindow) return;
  if (mainWindow.isMaximized()) mainWindow.unmaximize();
  else mainWindow.maximize();
});
ipcMain.handle('window-close', () => { if (mainWindow) mainWindow.close(); });
ipcMain.handle('window-is-maximized', () => mainWindow ? mainWindow.isMaximized() : false);

app.whenReady().then(async () => {
  setupDownloads();
  setupContextMenu();
  await initExtensions();
  createWindow();

  globalShortcut.register('CommandOrControl+Shift+Space', () => {
    if (!mainWindow) return;
    if (mainWindow.isVisible()) mainWindow.hide();
    else { mainWindow.show(); mainWindow.focus(); }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('will-quit', () => { globalShortcut.unregisterAll(); });