import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Tabs from './components/Tabs';
import Users from './components/Users';
import Login from './components/Login';
import useToken from './useToken';

export const Routes = () => {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>
      <Switch>
        <Route exact path="/Orders" render={(props) => <Tabs status={'orders'} {...props} /> } />
        <Route exact path="/">
          <Redirect to="/Orders" render={(props) => <Tabs status={'orders'} {...props} /> } />
        </Route>
        <Route path="/Picking/:id"  render={(props) => <Tabs status={'picking'} {...props} /> }/>
        <Route exact path="/Picking" render={(props) => <Tabs status={'picklist'} {...props} /> } />
        <Route exact path="/Users" component={Users} />
      </Switch>
    </div>
  );
};