import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';

import { htmlAlertMessage } from '../../helpers/htmlAlertMessage';
import {
  usuarioClearActive,
  usuarioStartAddNew,
  usuarioStartUpdate,
} from '../../redux/actions/usuarios';

const initialForm = {
  id: '',
  name: '',
  fullname: '',
  email: '',
  password: '',
  password2: '',
  departamento: {
    id: '',
    nombre: '',
  },
  activo: true,
};

export const UsuarioPass = ({ history, location }) => {
  const dispatch = useDispatch();
  const userName = location.pathname.slice('/datos/usuario/pass/'.length);

  // const { active, collections } = useSelector((state) => state.collection);
  // if (collections.length <= 0) history.push('/datos/usuario');

  const [formValues, setFormValues] = useState(initialForm);
  const { name, fullname, password, password2 } = formValues;

  useEffect(() => {
    // console.log(userName);
    if (userName !== null) {
      // setFormValues({
      //   ...active,
      // });
    }
  }, [userName]);

  const handleInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if (target.type === 'select-one') {
      setFormValues({ ...formValues, [target.name]: { id: value } });
    } else {
      setFormValues({ ...formValues, [target.name]: value });
    }
  };

  const handleModalClose = () => {
    dispatch(usuarioClearActive());
    history.goBack();
  };

  const isFormValid = () => {
    let alertForm = [];

    if (password === undefined || password.trim().length <= 4) {
      alertForm = [...alertForm, `El password debe contener 5 o mas caracteres.`];
    }

    if (password !== password2) {
      alertForm = [...alertForm, `Verifique su password, no coincide.`];
    }

    return alertForm;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValidData = isFormValid();

    if (isValidData.length >= 1) {
      Swal.fire({
        title: 'Verificar',
        html: htmlAlertMessage(isValidData),
        icon: 'warning',
      });
      return;
    }

    if (true) {
      dispatch(usuarioStartUpdate(formValues));
    } else {
      dispatch(usuarioStartAddNew(formValues));
    }
    handleModalClose();
  };

  return (
    <div className="card border-primary w-100 mb-3 my-4">
      <div className="card-header h5 text-mute text-uppercase">
        Cambio de Password o Contraseña
      </div>

      <form className="p-2" onSubmit={handleSubmit}>
        <div className="form-label-group">
          <label htmlFor="inputName">{name}</label>
        </div>

        <div className="form-label-group">
          <label htmlFor="inputName">{fullname}</label>
        </div>

        <React.Fragment>
          <div className="form-label-group">
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              autoComplete="off"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <label htmlFor="inputPassword">Password</label>
          </div>

          <div className="form-label-group">
            <input
              type="password"
              id="inputPassword2"
              className="form-control"
              placeholder="Verifique Password"
              autoComplete="off"
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
            <label htmlFor="inputPassword2">Verifique Password</label>
          </div>
        </React.Fragment>

        <div className="d-flex justify-content-between px-2">
          <button className="btn btn-success px-4" type="submit">
            Aceptar
          </button>
          <button
            className="btn btn-outline-secondary px-4"
            type="button"
            onClick={handleModalClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
