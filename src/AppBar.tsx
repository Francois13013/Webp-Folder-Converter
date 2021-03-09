import { remote } from 'electron';
import React from 'react';


const MinimizeWindow = (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  const window = remote.getCurrentWindow();
  window.minimize(); 
}
const CloseWindow = (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  const window = remote.getCurrentWindow();
  window.close();
} 

export default function ButtonAppBar() {
  return (
              <div id="title-bar">
                <h3 id="title">
                  Folder Webp Converter
                </h3>
                <div id="title-bar-btns">
                  <button id="minBtn" onClick={MinimizeWindow}>-</button>
                  <button id="closeBtn" onClick={CloseWindow}>x</button>
                </div>
              </div>
  );
}