import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../redux/actions/ui';

import { htmlAlertMessage } from '../../helpers/htmlAlertMessage';

import '../../styles/modal.css';
import {
  personaClearActive,
  personaStartAddNew,
  personaStartDelete,
  personaStartLoading,
  personaStartUpdate,
} from '../../redux/actions/personas';

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
  nombre: '',
  dni: '',
  telefono: '',
  comentario: '',
  activo: false,
  aprobadoradm: false,
  aprobadorseg: false,
  creador: '',
};

Modal.setAppElement('#root');

export const PersonaModal = ({ listIndex }) => {
  const dispatch = useDispatch();

  const { modalOpen } = useSelector((state) => state.ui);
  const { activePersona } = useSelector((state) => state.persona);

  const [formValues, setFormValues] = useState(initialForm);
  const {
    nombre,
    dni,
    telefono,
    comentario,
    activo,
    aprobadoradm,
    aprobadorseg,
  } = formValues;

  useEffect(() => {
    if (activePersona !== null) {
      setFormValues(activePersona);
    }
  }, [activePersona]);

  const handleInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFormValues({ ...formValues, [target.name]: value });
  };

  const handleModalClose = () => {
    try {
      dispatch(uiCloseModal());
      dispatch(personaClearActive());
      setFormValues(initialForm);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleDelete = () => {
    const { page, limit, inlist, totalPages } = listIndex;
    dispatch(personaStartDelete(activePersona));
    if (totalPages >= 2) {
      const newPage = inlist === 1 ? page - 1 : page;
      dispatch(personaStartLoading(newPage, limit));
    }
    setFormValues(initialForm);
    dispatch(uiCloseModal());
  };

  const isFormValid = () => {
    let alertForm = [];

    if (dni === undefined || dni.trim().length <= 4) {
      alertForm = [...alertForm, `Identifacion ${dni} mas de 4 caracteres`];
    }

    if (nombre === undefined) {
      alertForm = [...alertForm, `El nombre completo es solicitado.`];
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

    if (activePersona) {
      dispatch(personaStartUpdate(formValues));
    } else {
      dispatch(personaStartAddNew(formValues));
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
            <h4>Datos de la Persona</h4>
            <hr />
          </div>
          <div className="form-label-group">
            <input
              type="text"
              id="inputDni"
              className="form-control"
              placeholder="Identificacion"
              autoComplete="off"
              name="dni"
              value={dni}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="inputMaterial">Identificacion</label>
          </div>

          <div className="form-label-group">
            <input
              type="text"
              id="inputNombre"
              className="form-control"
              placeholder="Nombre Completo"
              autoComplete="off"
              name="nombre"
              value={nombre}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="inputNombre">Nombre Completo</label>
          </div>

          <div className="form-label-group">
            <input
              type="text"
              id="inputTelefono"
              className="form-control"
              placeholder="Telefono(s)"
              autoComplete="off"
              name="telefono"
              value={telefono}
              onChange={handleInputChange}
            />
            <label htmlFor="inputTelefono">Telefono(s)</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input
                type="checkbox"
                name="aprobadoradm"
                checked={aprobadoradm}
                onChange={handleInputChange}
              />{' '}
              Aprobador Admin
            </label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input
                type="checkbox"
                name="aprobadorseg"
                checked={aprobadorseg}
                onChange={handleInputChange}
              />{' '}
              Aprobador Seguridad
            </label>
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

          <div className="form-label-group">
            <textarea
              name="comentario"
              value={comentario}
              onChange={handleInputChange}
              rows="2"
              id="inputComentario"
              className="form-control"
              placeholder="Comentario(s)"></textarea>
          </div>
          <div className="d-flex justify-content-between px-2">
            <div>
              <button
                className="btn btn-outline-secondary px-4"
                type="button"
                onClick={handleModalClose}>
                Cancelar
              </button>
              {activePersona && (
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
