import React, { useState } from 'react';
import Modal from 'react-modal';
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

Modal.setAppElement('#root');

export const SalidaModal = () => {
  const [tabSelect, setTabSelect] = useState(1);
  // const [modalIsOpen, setModalIsOpen] = useState(true);

  const handleModalClose = () => {
    // setModalIsOpen(!modalIsOpen);
  };

  const handleTabPeople = (tabs) => {
    setTabSelect(tabs);
  };

  const tabMaterial = () => (
    <section className="border-bottom border-left border-right p-3 mb-5 bg-white rounded-bottom">
      <div className="form-label-group">
        <input
          type="text"
          id="inputMaterial"
          className="form-control"
          placeholder="Material o Equipo"
          autoComplete="off"
          required
        />
        <label for="inputMaterial">Material o Equipo</label>
      </div>

      <div className="form-label-group">
        <input
          type="text"
          id="inputMotivol"
          className="form-control"
          placeholder="Motivo de Salida"
          autoComplete="off"
          required
        />
        <label for="inputMotivo">Motivo de Salida</label>
      </div>

      <div className="form-label-group">
        <input
          type="text"
          id="inputDestino"
          className="form-control"
          placeholder="Destino del equipo / material"
          autoComplete="off"
          required
        />
        <label for="inputDestino">Destino del equipo / material</label>
      </div>

      <div className="checkbox mb-3">
        <label>
          <input type="checkbox" value="checkRetornara" /> Retornara
        </label>
      </div>
    </section>
  );

  const tabSolicitante = () => (
    <section className="border-bottom border-left border-right p-3 mb-5 bg-white rounded-bottom">
      <div className="form-label-group">
        <input
          type="text"
          id="inputPersona"
          className="form-control"
          placeholder="CI o RIF - Persona Solicitante"
          required
        />
        <label for="inputPersona">CI o RIF - Persona Solicitante</label>
      </div>
      <label for="inputPersonaNombre">Juan Martinez</label>

      <div className="form-label-group">
        <input
          type="text"
          id="inputTransporte"
          className="form-control"
          placeholder="Transporte - Placa"
          required
        />
        <label for="inputMotivo">Transporte - Placa</label>
      </div>
      <label for="inputPersonaNombre">Datos del Vehiculo</label>
    </section>
  );

  const tabAprobadores = () => (
    <section className="border-bottom border-left border-right p-3 mb-5 bg-white rounded-bottom">
      <div className="form-label-group">
        <input
          type="text"
          id="inputAprobadorAdm"
          className="form-control"
          placeholder="CI. Aprobador Supervisor"
          required
        />
        <label for="inputAprobadorAdm">CI. Aprobador Supervisor</label>
      </div>
      <label for="inputPersonaNombre">Juan Martinez</label>

      <div className="form-label-group">
        <input
          type="text"
          id="inputAprobadorSeg"
          className="form-control"
          placeholder="CI. Aprobador Proct y Bienes"
          required
        />
        <label for="inputAprobadorSeg">CI. Aprobador Proct y Bienes</label>
      </div>
      <label for="inputPersonaNombre">Datos del Vehiculo</label>
    </section>
  );

  return (
    <div>
      <Modal
        isOpen={true}
        onRequestClose={handleModalClose}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo">
        <form className="p-2">
          <ul className="nav nav-tabs">
            <li onClick={(event) => handleTabPeople(1)} className="nav-item">
              <button
                type="button"
                className={tabSelect === 1 ? 'nav-link active' : 'nav-link '}>
                Eqp / Material
              </button>
            </li>
            <li onClick={(event) => handleTabPeople(2)} className="nav-item">
              <button
                type="button"
                className={tabSelect === 2 ? 'nav-link active' : 'nav-link'}>
                Solicitante
              </button>
            </li>
            <li onClick={(event) => handleTabPeople(3)} className="nav-item">
              <button
                type="button"
                className={tabSelect === 3 ? 'nav-link active' : 'nav-link'}>
                Aprobadores
              </button>
            </li>
          </ul>

          {tabSelect === 1 && tabMaterial()}
          {tabSelect === 2 && tabSolicitante()}
          {tabSelect === 3 && tabAprobadores()}

          <div className="d-flex justify-content-around">
            <button className="btn btn-outline-secondary" type="button">
              Verificar
            </button>

            <button className="btn btn-primary" type="submit">
              Aceptar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
