import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { startRegister } from '../../redux/actions/auth';

const initialForm = {
  rname: 'pedro',
  remail: 'pedroobando@hotmail.com',
  rpassword: '123456',
};

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm(initialForm);
  const { rpassword, remail, rname } = formValues;

  const handleSubmit = (hevent) => {
    hevent.preventDefault();
    dispatch(startRegister(rname, remail, rpassword));
  };
  return (
    <div className="bodylogin">
      <form className="form-signin" onSubmit={handleSubmit}>
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
            name="rname"
            value={rname}
            className="form-control"
            placeholder="nombre usuario"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="inputName">Nombre</label>
        </div>

        <div className="form-label-group">
          <input
            type="email"
            id="inputEmail"
            name="remail"
            value={remail}
            className="form-control"
            placeholder="Email address"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="inputEmail">Direccion de correo</label>
        </div>

        <div className="form-label-group">
          <input
            type="password"
            id="inputPassword"
            name="rpassword"
            value={rpassword}
            className="form-control"
            placeholder="Password"
            onChange={handleInputChange}
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
