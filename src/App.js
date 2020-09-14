import React from 'react';
import CustomNavbar from './Components/CustomNavbar'
import Home from './Components/Home'
import Contests from './Components/Contests'
import Problems from './Components/Problems'
import { Route, Switch } from 'react-router-dom';
import {Button, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import "react-bootstrap/dist/react-bootstrap.min.js";

function App() {  
  return (
    <div className="container-fluid">
      <CustomNavbar />
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/contests" component={Contests} />
        <Route path="/problems" component={Problems} />
        <Route component={Error}/>
      </Switch>
    </div>
  );
};
 
export default App;
