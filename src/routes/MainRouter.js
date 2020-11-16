import React from 'react';
import { NavbarTop } from '../components/ui/NavbarTop';
import { Switch, Redirect, Route } from 'react-router-dom';

import { SalidaScreen } from '../components/salida/SalidaScreen';
import { SalidaEdit } from '../components/salida/SalidaEdit';

import { PersonaScreen } from '../components/persona/PersonaScreen';
import { VehiculoScreen } from '../components/vehiculo/VehiculoScreen';
import { UsuarioScreen } from '../components/usuario/UsuarioScreen';
import { UsuarioEdit } from '../components/usuario/UsuarioEdit';
import { UsuarioPass } from '../components/usuario/UsuarioPass';
import { DptoScreen } from '../components/dpto/DptoScreen';

export const MainRouter = () => {
  return (
    <>
      <NavbarTop />
      <div className="container-xl">
        <Switch>
          <Route exact path="/salida" component={SalidaScreen} />
          <Route exact path="/salida/:nroOrden" component={SalidaEdit} />
          <Route exact path="/datos/persona" component={PersonaScreen} />
          <Route exact path="/datos/vehiculo" component={VehiculoScreen} />
          <Route exact path="/datos/departamento" component={DptoScreen} />
          <Route exact path="/datos/usuario" component={UsuarioScreen} />
          <Route exact path="/datos/usuario/edit" component={UsuarioEdit} />
          <Route exact path="/datos/usuario/pass/:userName" component={UsuarioPass} />
          <Redirect to="/salida" />
        </Switch>
      </div>
    </>
  );
};
