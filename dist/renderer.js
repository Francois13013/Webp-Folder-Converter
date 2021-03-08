// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.
// @ts-nocheck
var ipcRenderer = require('electron').ipcRenderer;
document
    .querySelector('#ChooseFolder')
    .addEventListener('click', function () {
    ipcRenderer.send('ChooseFolder');
});
document
    .querySelector('#quality')
    .addEventListener('keyup', function () {
    ipcRenderer.send('inputChanged', document.querySelector('#quality').value);
});
document
    .querySelector('#makeWebp')
    .addEventListener('click', function () {
    ipcRenderer.send('startWebpGen');
});
//# sourceMappingURL=renderer.js.map