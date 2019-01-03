import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';

import history from '../lib/history';

import PrivateRoute from '../containers/PrivateRoute';

import Home from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';

const router = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </Router>
);

export default router;
