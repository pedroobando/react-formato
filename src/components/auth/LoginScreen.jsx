import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../redux/actions/auth';

const initialForm = {
  lemail: 'pedroobando@hotmail.com',
  lpassword: '123456',
};

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm(initialForm);
  const { lpassword, lemail } = formValues;
  // document.title = 'Login';

  const handleSubmit = (hevent) => {
    hevent.preventDefault();
    dispatch(startLogin(lemail, lpassword));

    // history.replace('/salida');
  };

  return (
    <div className="bodylogin">
      <form className="form-signin" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <i className="fas fa-lock fa-5x"></i>
          <h3 className="mt-2">Inciar Sesion</h3>
        </div>

        <div className="form-label-group">
          <input
            type="email"
            id="inputEmail"
            name="lemail"
            value={lemail}
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
            name="lpassword"
            value={lpassword}
            className="form-control"
            placeholder="Password"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="inputPassword">Password</label>
        </div>

        {/* <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Recuérdame
          </label>
        </div> */}
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Iniciar <i className="fas fa-sign-in-alt"></i>
        </button>
        {/* <FontAwesomeIcon className="ml-2" icon={faSignInAlt} /> */}
        <div className="d-flex justify-content-around my-4">
          <Link to="/auth/recovery">Olvido su password</Link>
        </div>
        <p className="mt-5 mb-3 text-muted text-center">&copy; 2017-2020</p>
      </form>
    </div>
  );
};
