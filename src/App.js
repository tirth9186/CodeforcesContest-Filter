import React, { useState, useEffect } from 'react';
import CustomNavbar from './Components/CustomNavbar'
import Home from './Components/Home'
import Contests from './Components/Contests'
import Problems from './Components/Problems'
import { Route, Switch } from 'react-router-dom';
import { Navbar, Nav, Button, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import "react-bootstrap/dist/react-bootstrap.min.js";

function App() {  
  return (
    <div>
      <CustomNavbar />
      <ButtonToolbar className="custom-btn-toolbar">
        <LinkContainer to="/">
          <Button>Home</Button>
        </LinkContainer>
        <LinkContainer to="/about">
          <Button>About</Button>
        </LinkContainer>
        <LinkContainer to="/users">
          <Button>Users</Button>
        </LinkContainer>
      </ButtonToolbar>
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
