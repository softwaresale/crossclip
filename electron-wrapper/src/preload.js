
const { clipboard, contextBridge } = require('electron');

// Expose the clipboard api
contextBridge.exposeInMainWorld("electronClipboardApi", {
  readText: async () => clipboard.readText(),
  writeText: async msg => clipboard.writeText(msg)
});
