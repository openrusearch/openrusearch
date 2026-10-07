const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('openru', {
  // Downloads
  onDownloadStarted: (cb) => ipcRenderer.on('download-started', (e, d) => cb(d)),
  onDownloadProgress: (cb) => ipcRenderer.on('download-progress', (e, d) => cb(d)),
  onDownloadDone: (cb) => ipcRenderer.on('download-done', (e, d) => cb(d)),
  onDownloadError: (cb) => ipcRenderer.on('download-error', (e, d) => cb(d)),
  cancelDownload: (id) => ipcRenderer.invoke('cancel-download', id),
  openDownload: (p) => ipcRenderer.invoke('open-download', p),
  showInFolder: (p) => ipcRenderer.invoke('show-in-folder', p),
  clearDownloads: () => ipcRenderer.invoke('clear-downloads'),
  getDownloads: () => ipcRenderer.invoke('get-downloads'),

  // DevTools
  openDevTools: (wcId) => ipcRenderer.invoke('open-devtools', wcId),
  closeDevTools: (wcId) => ipcRenderer.invoke('close-devtools', wcId),

  // Window controls
  windowMinimize: () => ipcRenderer.invoke('window-minimize'),
  windowMaximize: () => ipcRenderer.invoke('window-maximize'),
  windowClose: () => ipcRenderer.invoke('window-close'),
  windowIsMaximized: () => ipcRenderer.invoke('window-is-maximized'),
  onWindowMaximized: (cb) => ipcRenderer.on('window-maximized', (e, v) => cb(v)),

  // Extensions
  extList: () => ipcRenderer.invoke('ext-list'),
  extAddUnpacked: () => ipcRenderer.invoke('ext-add-unpacked'),
  extAddPacked: () => ipcRenderer.invoke('ext-add-packed'),
  extToggle: (p, on) => ipcRenderer.invoke('ext-toggle', p, on),
  extRemove: (p) => ipcRenderer.invoke('ext-remove', p),
  extOpenPage: (p, which) => ipcRenderer.invoke('ext-open-page', p, which),
  extPageUrl: (p, which) => ipcRenderer.invoke('ext-page-url', p, which),

  // Open in new tab from main process
  onOpenInNewTab: (cb) => ipcRenderer.on('open-in-new-tab', (e, url) => cb(url))
});
