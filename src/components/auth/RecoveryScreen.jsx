import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
// import { startLogin } from '../../redux/actions/auth';

import { Link } from 'react-router-dom';

const initialForm = {
  lemail: 'pedroobando@hotmail.com',
  lpassword: '123456',
};

export const RecoveryScreen = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm(initialForm);
  const { lpassword, lemail } = formValues;

  return (
    <div className="bodylogin">
      <form className="form-signin">
        <div className="text-center mb-4">
          <i className="fas fa-5x fa-unlock-alt"></i>
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
          <label htmlFor="inputEmail">Direccion de correo</label>
        </div>

        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Enviar <i className="fas fa-paper-plane"></i>
        </button>
        <div className="my-4">
          <Link to="/auth/login">Iniciar Sesion</Link>
        </div>
        <p className="mt-5 mb-3 text-muted text-center">&copy; 2017-2020</p>
      </form>
    </div>
  );
};
