import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../redux/actions/ui';

import { htmlAlertMessage } from '../../helpers/htmlAlertMessage';

import '../../styles/modal.css';
import {
  departamentoAddNew,
  departamentoClearActive,
  departamentoDelete,
  departamentoUpdated,
} from '../../redux/actions/departamentos';

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

export const DptoModal = () => {
  const dispatch = useDispatch();

  const { modalOpen } = useSelector((state) => state.ui);
  const { active } = useSelector((state) => state.departamento);

  const [formValues, setFormValues] = useState(initialForm);
  const { nombre, abreviacion, nrosalida } = formValues;

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
    dispatch(departamentoClearActive());
    setFormValues(initialForm);
  };

  const handleDelete = () => {
    dispatch(departamentoDelete());
    handleModalClose();
  };

  const isFormValid = () => {
    let alertForm = [];

    if (nombre === undefined || nombre.trim().length <= 4) {
      alertForm = [...alertForm, `Nombre ${nombre} menos de 5 caracteres`];
    }

    if (abreviacion === undefined || abreviacion.trim().length >= 4) {
      alertForm = [...alertForm, `Abreviacion mas de 3 caracteres.`];
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
      dispatch(departamentoUpdated(formValues));
    } else {
      dispatch(
        departamentoAddNew({
          ...formValues,
          rowId: new Date().getTime().toString(),
          user: {
            _id: '001',
            name: 'pedro',
          },
        })
      );
    }

    handleModalClose();
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
            <h4>{!active ? 'Nuevo Departamento' : 'Datos Departamento'}</h4>
            <hr />
          </div>
          <div className="form-label-group">
            <input
              type="text"
              id="inputDpto"
              className="form-control"
              placeholder="Nombre del Departamento"
              name="nombre"
              value={nombre}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="inputDpto">Nombre del Departamento</label>
          </div>

          <div className="form-label-group">
            <input
              type="text"
              id="inputAbrev"
              className="form-control"
              placeholder="Abreviacion"
              name="abreviacion"
              value={abreviacion}
              onChange={handleInputChange}
            />
            <label htmlFor="inputAbrev">Abreviacion</label>
          </div>

          <div className="form-label-group">
            <input
              type="text"
              id="inputNroSalida"
              className="form-control"
              placeholder="Nro Salida"
              name="nrosalida"
              value={nrosalida}
              onChange={handleInputChange}
            />
            <label htmlFor="inputNroSalida">Nro Salida</label>
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
