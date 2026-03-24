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

ipcMain.handle("count-pages", async (_event, folderPath) => {
  try {
    const files = await fs.readdir(folderPath);

    const pageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".png", ".jpg", ".jpeg", ".tif", ".tiff"].includes(ext);
    });

    return { success: true, count: pageFiles.length };
  } catch (error) {
    return { success: false, error: error.message, count: 0 };
  }
});

ipcMain.handle("get-preview-path", async (_event, folderPath, pageIndex) => {
  try {
    const files = await fs.readdir(folderPath);

    const pageFiles = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".png", ".jpg", ".jpeg", ".tif", ".tiff"].includes(ext);
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    if (pageIndex < 0 || pageIndex >= pageFiles.length) {
      return { success: false, error: "Page index out of bounds" };
    }

    const fullPath = path.join(folderPath, pageFiles[pageIndex]);

    return {
      success: true,
      path: `file:///${fullPath.replace(/\\/g, "/")}`
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
});