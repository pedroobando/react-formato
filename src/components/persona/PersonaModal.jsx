import React from 'react';
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
  nombre: '',
  dni: '',
  telefono: '',
  comentario: '',
  activo: false,
};

Modal.setAppElement('#root');

export const PersonaModal = () => {
  // const [openModal, setOpenModal] = useState(true);
  const [formValues, handleInputChange] = useForm(initialForm);
  const { nombre, dni, telefono, comentario, activo } = formValues;

  const handleModalClose = () => {
    // setOpenModal(false);
    console.log('cerrar modal');
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

    console.log(isValidData);
    if (isValidData.length >= 1) {
      Swal.fire({
        title: 'Verificar',
        html: htmlAlertMessage(isValidData),
        icon: 'warning',
      });
      return;
    }

    handleModalClose();
  };

  return (
    <div>
      <Modal
        isOpen={true}
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
                name="activo"
                value={activo}
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
              rows="3"
              id="inputComentario"
              className="form-control"
              placeholder="Comentario(s)"></textarea>
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
