import React, { useState, useEffect } from 'react';
import CustomNavbar from './Components/CustomNavbar';
import Home from './Components/Home';
import Contests from './Components/Contests';
import Problems from './Components/Problems';

import Admin from './auth/components/Admin';
import Login from './auth/components/Login';
import Register from './auth/components/Register';
import Profile from './auth/components/Profile';
import {FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Route, Switch } from 'react-router-dom';

import AuthService from "./auth/services/auth.service";

import "react-bootstrap/dist/react-bootstrap.min.js";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function App() {

  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  const logout = () => {
    AuthService.logout();
  };

  useEffect(() => {
    const user = AuthService.getUser();
    if (user != null) {
      setCurrentUser(user);
      setIsAdmin(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);


  return (
    <div className="container-fluid">
      <CustomNavbar user={currentUser} isAdmin={isAdmin} logout={logout} />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/contests" component={Contests} exact />
        <Route path="/problems" component={Problems} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/admin" component={Admin} exact />
        <Route component={Error} />
      </Switch>
      
      <div style={{
        position: 'relative',
        top:'5',
        left: '0',
        bottom: '0',
        width:'100%'
      }}>
        <footer className="footer bg-dark">
          <div className="container-fluid text-center">
            <a className="btn btn-dark" href="https://www.facebook.com/tirth.chaudhary.547"><FaFacebook size="20px" /></a>
            <a className="btn btn-dark" href="https://www.linkedin.com/in/tirth-chaudhary-49a026129/"><FaLinkedin size="20px" /></a>
            <a className="btn btn-dark" href="https://github.com/tirth9186"><FaGithub size="20px" /></a>
            <p className="text-light" >Copyright 2020 All rights reserved. Developed by Tirth.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
