const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  selectFile: () => ipcRenderer.invoke("select-file"),
  deleteFile: (filePath) => ipcRenderer.invoke("delete-file", filePath),
});