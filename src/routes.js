import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Tabs from './components/Tabs';
import Users from './components/Users';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import { AuthContext } from './context/auth';

export const Routes = (props) => {
  const [authTokens, setAuthTokens] = useState();
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
          <Route exact path="/">
            <Redirect to="/Orders" render={(props) => <Tabs status={'orders'} {...props} /> } />
          </Route>
          <Route path="/Login" render={props => (<Login {...props} state={"/"} /> )} />
          <PrivateRoute path="/Orders" component={Tabs} status={'orders'} {...props} />
          <PrivateRoute exact path="/Picking/:id" component={Tabs} status={'picking'} {...props} />
          <PrivateRoute exact path="/Picking" component={Tabs} status={'picklist'} {...props} />
          <AdminRoute exact path="/Users" component={Users} />
      </Router>
    </AuthContext.Provider>
  );
};