const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs/promises");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true
    }
  });

  win.loadURL("http://localhost:5173");
}

app.whenReady().then(createWindow);

ipcMain.handle("select-file", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
    filters: [
      { name: "Documents", extensions: ["pdf", "png", "jpg", "tiff"] }
    ]
  });

  return result.filePaths;
});

ipcMain.handle("delete-file", async (_event, filePath) => {
  try {
    await fs.unlink(filePath);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});