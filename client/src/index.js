// import React, { Component } from "react";
// import { render } from "react-dom";
// import ParticlesBg from "particles-bg";
// import Album from "./views/Components/Album";
// import Admin from "./views/Admin/Admin.js";
// import Lecturer from "./views/Lecturer/Lecturer.js";
// import Student from "./views/Student/Student.js";
// import SighIn from './views/Student/logIn/signIn';
// import {  Route,Switch, BrowserRouter} from 'react-router-dom';
// import "./style.css";
// import Register from "views/Student/logIn/Register";

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "React"
//     };
//   }

//   render() {
//     return (
     
//       // <Album> <ParticlesBg type="random" bg={true}/></Album>
//       <BrowserRouter>
//       <Switch>
//       <Route exact path = "/" component = {  Album }> <Album> <ParticlesBg type="random" bg={true}/></Album></Route>
        
//          <Route path = "/Admin" component = {Admin} />
//          <Route path = "/Lecturer" component = {Lecturer} />
         
//          <Route path = "/Student/" component = {Student} />
                
//          </Switch>
//       </BrowserRouter>
   
//     );
//   }
// }

// render(<App />, document.getElementById("root"));

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <App />,
  rootElement
);