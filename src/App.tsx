//@ts-nocheck

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter } from 'react-router-dom';
// import icon from '../assets/icon.svg';
import './App.global.css';
import Input from './Input';
import AppBar from './AppBar';

const { ipcRenderer } = require('electron'); 
const { remote } = require('electron'); 


// const sendIpc = (e, whichIpc : string) => {
//   e.preventDefault();
//   ipcRenderer.send(whichIpc);
// }

const openChooseFolder = (e) => {
  e.preventDefault();
  ipcRenderer.send("ChooseFolder");
}
const startWebpGen = (e) => {
  e.preventDefault();
  ipcRenderer.send("startWebpGen");
}
      
// document.querySelector("#minBtn").addEventListener("click", function (e) {
//   const window = remote.getCurrentWindow();
//   window.minimize(); 
// });
        
// document.querySelector("#closeBtn").addEventListener("click", function (e) {
//   const window = remote.getCurrentWindow();
//   window.close();
// }); 
      

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

const Licence = () => {
  return (
    <>
    <AppBar></AppBar>
    <div>
      <p>Licence :</p>
      <p></p>
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
