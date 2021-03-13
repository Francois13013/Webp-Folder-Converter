//@ts-nocheck

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter } from 'react-router-dom';
// import icon from '../assets/icon.svg';
import './App.global.css';
import Input from './Input';
import AppBar from './AppBar';
import { shell } from 'electron';

const { ipcRenderer, remote } = require('electron'); 

const openChooseFolder = (e) => {
  e.preventDefault();
  ipcRenderer.send("ChooseFolder");
}
const startWebpGen = (e) => {
  e.preventDefault();
  ipcRenderer.send("startWebpGen");
}
      

const Hello = () => {
  return (
    <>
    <AppBar></AppBar>
    <div>
      <p>Folder selected :</p>
      <p id="Selected">No folder selected</p>
      <Input></Input>
    </div><p id="CurrentAction"></p>
    <div id="buttonDiv">
      <button type="button" id="ChooseFolder" onClick={openChooseFolder}>Select folder</button>
      <button type="button" id="makeWebp" onClick={startWebpGen}>Convert now !</button>
    </div>
    <footer>
      <Link to="/Licence">Licence</Link>
    </footer>
    </>
  );
};

const openLink = (e, str) => {
  e.preventDefault();
  shell.openExternal(str);
} 

const Licence = () => {
  return (
    <>
    <AppBar></AppBar>
    <div id="LicenceDiv">
      <p>License :</p>
      <p>This program was made for educational purpose</p>
      <p>© MIT</p>

      <a onClick={ e => openLink(e,"https://www.electronjs.org/")}>Electron</a>
      <a onClick={ e => openLink(e,"https://reactjs.org/")}>React</a>
      <a onClick={ e => openLink(e,"https://material-ui.com/")}>React Material UI</a>
      <a onClick={ e => openLink(e,"https://github.com/electron-react-boilerplate/electron-react-boilerplate")}>Electron React Boilerplate</a>
      <a onClick={ e => openLink(e,"https://www.npmjs.com/package/recursive-readdir")}>recursive-readdir</a>
      <a onClick={ e => openLink(e,"https://www.npmjs.com/package/webp-converter")}>webp-converter</a>

      <a onClick={ e => openLink(e,"https://www.siderikoudis.fr")}>siderikoudis.fr</a>
    </div>
    <Link to="/">Home</Link>
    </>
  );
};

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/Licence" component={Licence} />
        <Route path="/" component={Hello} />
      </Switch>
    </HashRouter>
  );
}
