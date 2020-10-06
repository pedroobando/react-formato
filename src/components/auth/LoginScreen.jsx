import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import './login.css';

export const LoginScreen = ({ history }) => {
  // document.title = 'Login';

  const handleSubmit = (hevent) => {
    hevent.preventDefault();
    history.replace('/salida');
  };

  return (
    <div className="bodylogin">
      <form className="form-signin" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <FontAwesomeIcon icon={faLock} size="5x" />
          <h3 className="mt-2">Inciar Sesion</h3>
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

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Recuérdame
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Iniciar <FontAwesomeIcon className="ml-2" icon={faSignInAlt} />
        </button>
        <div className="d-flex justify-content-around my-4">
          <Link to="/auth/recovery">Olvido su password</Link>
          <Link to="/auth/register">Registro de usuario</Link>
        </div>
        <p className="mt-5 mb-3 text-muted text-center">&copy; 2017-2020</p>
      </form>
    </div>
  );
};
