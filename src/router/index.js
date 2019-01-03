import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';

import history from '../lib/history';

import PrivateRoute from '../containers/PrivateRoute';

import Test from '../views/Test';

const router = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" component={Test} />
    </Switch>
  </Router>
);

export default router;
