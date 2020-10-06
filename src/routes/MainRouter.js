import React from 'react';
import { NavbarTop } from '../components/ui/NavbarTop';
import { Switch, Redirect, Route } from 'react-router-dom';

import { SalidaScreen } from '../components/salida/SalidaScreen';

import { PersonaScreen } from '../components/datos/PersonaScreen';
import { VehiculoScreen } from '../components/datos/VehiculoScreen';
import { UsuarioScreen } from '../components/datos/UsuarioScreen';

export const MainRouter = () => {
  return (
    <>
      <NavbarTop />
      <div className="container-xl">
        <Switch>
          <Route exact path="/salida" component={SalidaScreen} />
          <Route exact path="/datos/persona" component={PersonaScreen} />
          <Route exact path="/datos/persona" component={VehiculoScreen} />
          <Route exact path="/datos/usuario" component={UsuarioScreen} />
          <Redirect to="/salida" />
        </Switch>
      </div>
    </>
  );
};
