// @ts-nocheck

import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(<App />, document.getElementById('root'));

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

const { ipcRenderer } = require('electron'); 

document
  .querySelector('#ChooseFolder')
  .addEventListener('click', () => {
    ipcRenderer.send('ChooseFolder');
  });

  
  document
  .querySelector('#makeWebp')
  .addEventListener('click', () => {
    ipcRenderer.send('startWebpGen');
  });
  
  // document
  //   .querySelector('#quality')
  //   .addEventListener('change', () => {
  //     ipcRenderer.send('inputChanged', document.querySelector('#quality').value);
  //   });