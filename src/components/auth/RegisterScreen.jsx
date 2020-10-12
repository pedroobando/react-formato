import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {
  return (
    <div className="bodylogin">
      <form className="form-signin">
        <div className="text-center mb-4">
          <i className="fas fa-5x fa-user-friends"></i>
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
          />
          <label htmlFor="inputName">Nombre</label>
        </div>

        <div className="form-label-group">
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required
          />
          <label htmlFor="inputEmail">Direccion de correo</label>
        </div>

        <div className="form-label-group">
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
          />
          <label htmlFor="inputPassword">Password</label>
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
