import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';

import { useDispatch, useSelector } from 'react-redux';
// import { uiCloseModal } from '../../redux/actions/ui';

import Swal from 'sweetalert2';
import Select from 'react-select';

import { htmlAlertMessage } from '../../helpers/htmlAlertMessage';
// import { useForm } from '../../hooks/useForm';

// import '../../styles/modal.css';
import {
  // usuarioClearActive,
  usuarioStartAddNew,
  usuarioStartDelete,
  // usuarioStartLoading,
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

export const UsuarioEdit = ({ history }) => {
  const dispatch = useDispatch();

  const { active, collections } = useSelector((state) => state.collection);
  if (collections.length <= 0) history.push('/datos/usuario');

  const { slcDepartamentos } = useSelector((state) => state.listas);

  const [formValues, setFormValues] = useState(initialForm);
  const { name, fullname, email, password, password2, departamento, activo } = formValues;

  useEffect(() => {
    if (active !== null) {
      setFormValues({
        ...active,
        // deptName: active.departamento.nombre,
        departamento:
          active.departamento != null
            ? { id: active.departamento.id, nombre: active.departamento.nombre }
            : { id: '', nombre: '' },
      });
    }
  }, [active]);

  // useEffect(() => {
  //   const xxx = departamentoStartLoading(1, 500);

  //   xxx().then((result) => {
  //     if (result.length >= 1) {
  //       setLstDepartamento([
  //         ...result.map((item) => ({
  //           value: item.id,
  //           label: item.nombre,
  //         })),
  //       ]);
  //     }
  //   });
  //   // return () => {
  //   //   setLstDepartamento([]);
  //   // };
  // }, []);

  const handleChange = (target) => {
    // this.setState({ selectedOption });
    console.log(`Option selected:`, target);
    setFormValues((formV) => ({ ...formV, departamento: { id: target.value } }));
  };

  const handleInputChange = ({ target }) => {
    // console.log(target.name, target.type, target.value, target.checked);
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if (target.type === 'select-one') {
      setFormValues({ ...formValues, [target.name]: { id: value } });
    } else {
      setFormValues({ ...formValues, [target.name]: value });
    }
  };

  const handleModalClose = () => {
    // dispatch(usuarioClearActive());
    history.goBack();
    // history.push('/datos/usuario');
    // setFormValues(initialForm);
  };

  const handleDelete = () => {
    // const { page, limit, inlist, totalPages } = listIndex;
    dispatch(usuarioStartDelete(active));
    // if (totalPages >= 2) {
    //   const newPage = inlist === 1 ? page - 1 : page;
    //   dispatch(usuarioStartLoading(newPage, limit));
    // }
    setFormValues(initialForm);
    // dispatch(uiCloseModal());
  };

  const isFormValid = () => {
    let alertForm = [];

    if (name === undefined || name.trim().length <= 4) {
      alertForm = [...alertForm, `Nombre ${name} menos de 5 caracteres`];
    }

    if (fullname === undefined || fullname.trim().length <= 2) {
      alertForm = [...alertForm, `El nombre completo es requerido.`];
    }

    if (email === undefined || email.trim().length <= 2) {
      alertForm = [...alertForm, `El email del usuario es requerido.`];
    }

    if (departamento.id === '' || departamento.id.trim() <= 2) {
      alertForm = [...alertForm, `El departamento es requerido.`];
    }

    if (!active && (password === undefined || password.trim().length <= 4)) {
      alertForm = [...alertForm, `El password debe contener 5 o mas caracteres.`];
    }

    if (!active && password !== password2) {
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

    if (active) {
      dispatch(usuarioStartUpdate(formValues));
    } else {
      dispatch(usuarioStartAddNew(formValues));
    }

    history.goBack();
  };

  if (slcDepartamentos.length <= 0 || departamento.id === '') return <h5>loading...</h5>;

  console.log(departamento.id);

  return (
    <div className="card border-primary w-100 mb-3 my-4">
      <div className="card-header h5 text-mute text-uppercase">
        {active ? 'Datos Usuario' : 'Nuevo Usuario'}
      </div>

      <form className="p-2" onSubmit={handleSubmit}>
        <div className="form-label-group">
          <input
            type="text"
            id="inputName"
            className="form-control"
            placeholder="Usuario"
            name="name"
            value={name}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="inputName">Usuario</label>
        </div>

        <div className="form-label-group">
          <input
            type="text"
            id="inputFullName"
            className="form-control"
            placeholder="Nombre Completo"
            name="fullname"
            value={fullname}
            onChange={handleInputChange}
          />
          <label htmlFor="inputFullName">Nombre Completo</label>
        </div>

        <div className="form-label-group">
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="inputEmail">Email</label>
        </div>

        <Select
          className="mb-4"
          classNamePrefix="select"
          placeholder="Un departamento..."
          onChange={handleChange}
          isClearable={true}
          isSearchable={true}
          defaultValue={
            slcDepartamentos[
              slcDepartamentos.findIndex((item) => item.value === active.departamento.id)
            ]
          }
          options={slcDepartamentos}
          name="departamento"
        />

        {!active && (
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
        )}

        <div className="checkbox mb-3">
          <label>
            <input
              type="checkbox"
              name="activo"
              checked={activo}
              onChange={handleInputChange}
            />{' '}
            Activo
          </label>
        </div>

        <div className="d-flex justify-content-between px-2">
          <div>
            <button
              className="btn btn-outline-secondary px-4"
              type="button"
              onClick={handleModalClose}>
              Cancelar
            </button>
            {active && (
              <button
                className="btn btn-outline-danger px-4 ml-2"
                type="button"
                onClick={handleDelete}>
                Borrar
              </button>
            )}
          </div>

          <button className="btn btn-success px-4" type="submit">
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
};
