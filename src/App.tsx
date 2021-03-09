import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import icon from '../assets/icon.svg';
import './App.global.css';
import Input from './Input';

const Hello = () => {
  return (
    <>
    <div id="title-bar">
    <div id="title">Folder Webp Converter</div>
      <div id="title-bar-btns">
        <button id="minBtn">-</button>
        <button id="closeBtn">x</button>
      </div>
    </div>
    <div>
      <p>Dossier choisi :</p>
      <p id="Selected">No folder selected</p>
      <Input></Input>
        {/* <input  type='text' /> */}
    </div><p id="CurrentAction"></p>
    <div id="buttonDiv">
      <button type="button" id="ChooseFolder">Choisir dossier</button>
      <button type="button" id="makeWebp">Make webp</button>
    </div></>
  );
};

// const Licence = () => {
//   return (
//     <>
//     <div>
//       <p>Dossier choisi :</p>
//       <p id="Selected">No folder selected</p>
//     </div><div>
//         <p>Quality</p>
//         <input id="quality" type='text' />
//     </div><p id="CurrentAction"></p>
//     <div id="buttonDiv">
//       <button type="button" id="ChooseFolder">Choisir dossier</button>
//       <button type="button" id="makeWebp">Make webp</button>
//     </div></>
//   );
// };

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
        {/* <Route path="/Licence" component={Licence} /> */}
      </Switch>
    </Router>
  );
}
