import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PrivateRouter, PublicRouter } from './ProtectRouter';

import { AuthRouter } from './AuthRouter';
import { MainRouter } from './MainRouter';
import { startCheckin } from '../redux/actions/auth';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startCheckin());
  }, [dispatch]);

  console.log(!!uid);
  if (checking) {
    return <h5>Espere..</h5>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRouter
            // exact
            isAuthenticated={!!uid}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRouter
            // exact
            isAuthenticated={!!uid}
            notAuthenticatedRedirectTo="auth/login"
            path="/"
            component={MainRouter}
          />
          <Redirect to="/auth" />
        </Switch>
      </div>
    </Router>
  );
};
