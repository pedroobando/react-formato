import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { PrivateRouter, PublicRouter } from './ProtectRouter';
// import { LoginScreen } from '../components/auth/LoginScreen';

import { AuthRouter } from './AuthRouter';
import { MainRouter } from './MainRouter';

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <PublicRouter
            // exact
            isAuthenticated={false}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRouter
            // exact
            isAuthenticated={true}
            path="/"
            component={MainRouter}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
