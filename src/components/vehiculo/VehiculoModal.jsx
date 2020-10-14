import React, { useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { htmlAlertMessage } from '../../helpers/htmlAlertMessage';
import { useForm } from '../../hooks/useForm';

import '../../styles/modal.css';

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
  rowId: '',
  placa: '',
  marca: '',
  modelo: '',
  color: '',
  activo: false,
};

Modal.setAppElement('#root');

export const VehiculoModal = () => {
  const [openModal, setOpenModal] = useState(true);
  const [formValues, handleInputChange] = useForm(initialForm);
  const { placa, marca, modelo, color, activo } = formValues;

  const handleModalClose = () => {
    setOpenModal(false);
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

    setOpenModal(false);
  };

  return (
    <div>
      <Modal
        isOpen={openModal}
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
                value={activo}
                onChange={handleInputChange}
              />{' '}
              Activo
            </label>
          </div>

          <div className="d-flex justify-content-between px-2">
            <button
              className="btn btn-secondary px-4"
              type="button"
              onClick={handleModalClose}>
              Cancelar
            </button>
            <button className="btn btn-success px-4" type="submit">
              Aceptar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
