const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  selectFile: () => ipcRenderer.invoke("select-file"),
  deleteFile: (filePath) => ipcRenderer.invoke("delete-file", filePath),
  countPages: (folderPath) => ipcRenderer.invoke("count-pages", folderPath),
  getPreviewPath: (folderPath, pageIndex) =>
    ipcRenderer.invoke("get-preview-image", folderPath, pageIndex),
});