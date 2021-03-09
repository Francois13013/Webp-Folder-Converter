import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import icon from '../assets/icon.svg';
import './App.global.css';
import Input from './Input';
import AppBar from './AppBar';

const Hello = () => {
  return (
    <>
    <AppBar></AppBar>
    <div>
      <p>Folder selected :</p>
      <p id="Selected">No folder selected</p>
      <Input></Input>
        {/* <input  type='text' /> */}
    </div><p id="CurrentAction"></p>
    <div id="buttonDiv">
      <button type="button" id="ChooseFolder">Select folder</button>
      <button type="button" id="makeWebp">Convert now !</button>
    </div>
    </>
  );
};

const Licence = () => {
  return (
    <>
    <div>
      <p>Dossier choisi :</p>
      <p id="Selected">No folder selected</p>
    </div>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
        <Route path="/Licence" component={Licence} />
      </Switch>
    </Router>
  );
}
