import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../redux/actions/ui';

import { htmlAlertMessage } from '../../helpers/htmlAlertMessage';
// import { useForm } from '../../hooks/useForm';

import '../../styles/modal.css';
import {
  vehiculoClearActive,
  vehiculoStartDelete,
  vehiculoStartAddNew,
  vehiculoStartUpdate,
  vehiculoStartLoading,
} from '../../redux/actions/vehiculos';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const initialForm = {
  id: '',
  placa: '',
  marca: '',
  modelo: '',
  color: '',
  activo: true,
};

Modal.setAppElement('#root');

export const VehiculoModal = ({ listIndex }) => {
  const dispatch = useDispatch();

  const { modalOpen } = useSelector((state) => state.ui);
  const { active } = useSelector((state) => state.collection);

  const [formValues, setFormValues] = useState(initialForm);
  const { placa, marca, modelo, color, activo } = formValues;

  useEffect(() => {
    if (active !== null) {
      setFormValues(active);
    }
  }, [active]);

  const handleInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFormValues({ ...formValues, [target.name]: value });
  };

  const handleModalClose = () => {
    dispatch(uiCloseModal());
    dispatch(vehiculoClearActive());
    setFormValues(initialForm);
  };

  const handleDelete = () => {
    const { page, limit, inlist, totalPages } = listIndex;
    dispatch(vehiculoStartDelete(active));
    if (totalPages >= 2) {
      const newPage = inlist === 1 ? page - 1 : page;
      dispatch(vehiculoStartLoading(newPage, limit));
    }
    setFormValues(initialForm);
    dispatch(uiCloseModal());
  };

  const isFormValid = () => {
    let alertForm = [];

    if (placa === undefined || placa.trim().length <= 4) {
      alertForm = [...alertForm, `Placa ${placa} menos de 5 caracteres`];
    }

    if (marca === undefined || marca.trim().length <= 2) {
      alertForm = [...alertForm, `La marca del vehiculo es requerida.`];
    }

    if (modelo === undefined || modelo.trim().length <= 2) {
      alertForm = [...alertForm, `El modelo del vehiculo es solicitado.`];
    }

    if (color === undefined || color.trim().length <= 2) {
      alertForm = [...alertForm, `El color del vehiculo es solicitado.`];
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

    // console.log(!!active, !active, placa); // active;

    if (active) {
      dispatch(vehiculoStartUpdate(formValues));
    } else {
      dispatch(vehiculoStartAddNew(formValues));
    }
    dispatch(uiCloseModal());
  };

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleModalClose}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo">
        <form className="p-2" onSubmit={handleSubmit}>
          <div className="text-center text-uppercase">
            <h4>Datos del transporte / vehiculo</h4>
            <hr />
          </div>
          <div className="form-label-group">
            <input
              type="text"
              id="inputPlaca"
              className="form-control"
              placeholder="Placa del vehiculo"
              name="placa"
              value={placa}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="inputPlaca">Placa del vehiculo</label>
          </div>

          <div className="form-label-group">
            <input
              type="text"
              id="inputMarca"
              className="form-control"
              placeholder="Marca del vehiculo"
              name="marca"
              value={marca}
              onChange={handleInputChange}
            />
            <label htmlFor="inputMarca">Marca del vehiculo</label>
          </div>

          <div className="form-label-group">
            <input
              type="text"
              id="inputModelo"
              className="form-control"
              placeholder="Modelo del vehiculo"
              name="modelo"
              value={modelo}
              onChange={handleInputChange}
            />
            <label htmlFor="inputModelo">Modelo del vehiculo</label>
          </div>

          <div className="form-label-group">
            <input
              type="text"
              id="inputColor"
              className="form-control"
              placeholder="Color"
              autoComplete="off"
              name="color"
              value={color}
              onChange={handleInputChange}
            />
            <label htmlFor="inputColor">Color</label>
          </div>

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
      </Modal>
    </div>
  );
};
