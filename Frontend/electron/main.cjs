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
      { name: "Documents", extensions: ["pdf", "png", "jpg", "tiff", "tif"] }
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

ipcMain.handle("get-preview-image", async (_event, folderPath, pageIndex) => {
  try {
    const files = await fs.readdir(folderPath);

    const pageFiles = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".png", ".jpg", ".jpeg"].includes(ext);
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    if (pageIndex < 0 || pageIndex >= pageFiles.length) {
      return { success: false, error: "Page index out of bounds" };
    }

    const fullPath = path.join(folderPath, pageFiles[pageIndex]);
    const ext = path.extname(fullPath).toLowerCase();

    let mimeType = "image/png";
    if (ext === ".jpg" || ext === ".jpeg") mimeType = "image/jpeg";

    const fileBuffer = await fs.readFile(fullPath);
    const base64 = fileBuffer.toString("base64");

    return {
      success: true,
      src: `data:${mimeType};base64,${base64}`,
      fileName: pageFiles[pageIndex]
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
});