import React, { useState, useEffect } from 'react';
import CustomNavbar from './Components/CustomNavbar';
import Home from './Components/Home';
import Contests from './Components/Contests';
import Problems from './Components/Problems';

import Admin from './auth/components/Admin';
import Login from './auth/components/Login';
import Register from './auth/components/Register';
import Profile from './auth/components/Profile';

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
    </div>
  );
};

export default App;
