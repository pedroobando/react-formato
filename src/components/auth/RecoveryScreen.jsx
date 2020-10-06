import React from 'react';
import { Link } from 'react-router-dom';

export const RecoveryScreen = () => {
  return (
    <div className="bodylogin">
      <form className="form-signin">
        <div className="text-center mb-4">
          <i class="fas fa-5x fa-unlock-alt"></i>
          <h3 className="mt-2">Recuperar</h3>
          <p>Ingrese los datos para recuperar su password.</p>
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

        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Enviar <i class="fas fa-paper-plane"></i>
        </button>
        <div className="my-4">
          <Link to="/auth/login">Iniciar Sesion</Link>
        </div>
        <p className="mt-5 mb-3 text-muted text-center">&copy; 2017-2020</p>
      </form>
    </div>
  );
};
