import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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
    </div><p id="CurrentAction"></p>
    <div id="buttonDiv">
      <button type="button" id="ChooseFolder">Select folder</button>
      <button type="button" id="makeWebp">Convert now !</button>
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
    <Router>
      <Switch>
        <Route path="/Licence" component={Licence} />
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
    // <Router>

    //   </Switch>
    // </Router>
  );
}
