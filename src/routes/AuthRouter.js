import React from 'react';
// import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RecoveryScreen } from '../components/auth/RecoveryScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

import '../styles/auth.css';

export const AuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/auth/login" component={LoginScreen} />
        <Route exact path="/auth/recovery" component={RecoveryScreen} />
        <Route exact path="/auth/register" component={RegisterScreen} />
        <Redirect to="/auth/login" />
      </Switch>
    </div>
  );
};
