import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

import './login.css';

export const RegisterScreen = () => {
  return (
    <div className="bodylogin">
      <form className="form-signin">
        <div className="text-center mb-4">
          <FontAwesomeIcon icon={faUserFriends} size="5x" />
          <h3 className="mt-2">Por favor, registrese</h3>
          <p>
            <small>
              Ingrese los datos para registrarse como usuario de la aplicacion.
            </small>
          </p>
        </div>
        <div className="form-label-group">
          <input
            type="text"
            id="inputName"
            className="form-control"
            placeholder="nombre usuario"
            required
            autofocus
          />
          <label for="inputName">Nombre</label>
        </div>

        <div className="form-label-group">
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required
          />
          <label for="inputEmail">Direccion de correo</label>
        </div>

        <div className="form-label-group">
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
          />
          <label for="inputPassword">Password</label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Registrar usuario
        </button>
        <div className="my-4">
          <Link to="/auth/login">Iniciar Sesion</Link>
        </div>
        <p className="mt-5 mb-3 text-muted text-center">&copy; 2017-2020</p>
      </form>
    </div>
  );
};
