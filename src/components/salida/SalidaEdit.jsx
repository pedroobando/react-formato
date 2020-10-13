import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { htmlAlertMessage } from '../../helpers/htmlAlertMessage';
import { useForm } from '../../hooks/useForm';

const initialForm = {
  fechaemision: Date.now(),
  material: '',
  motivo: '',
  retornara: true,
  destino: '',
  solicitante: '',
  transporte: '',
  aprobadorAdm: '',
  aprobadorSeg: '',
  creador: '',
  comentario: '',
};

const initialValid = {
  material: true,
  solicitante: true,
  transporte: true,
  aprobadorAdm: true,
  aprobadorSeg: true,
};

export const SalidaEdit = () => {
  const [formValues, handleInputChange] = useForm(initialForm);
  const [validState, setValidState] = useState(initialValid);
  const [tabSelect, setTabSelect] = useState(1);
  const {
    material,
    motivo,
    retornara,
    destino,
    solicitante,
    transporte,
    aprobadorAdm,
    aprobadorSeg,
    comentario,
  } = formValues;

  const handleTabPeople = (tabs) => {
    setTabSelect(tabs);
  };

  const isFormValid = () => {
    let alertForm = [];

    setValidState((estate) => ({ ...estate, material: true }));
    if (material === undefined || material.trim().length <= 4) {
      setValidState((estate) => ({ ...estate, material: false }));
      alertForm = [...alertForm, `Material o equipo ${material} mas de 4 caracteres`];
    }

    setValidState((estate) => ({ ...estate, solicitante: true }));
    if (solicitante === undefined || solicitante.trim().length <= 4) {
      setValidState((estate) => ({ ...estate, solicitante: false }));
      alertForm = [
        ...alertForm,
        `La CI / RIF del solicitante ${solicitante} no es valido.`,
      ];
    }

    setValidState((estate) => ({ ...estate, transporte: true }));
    if (transporte === undefined || transporte.trim().length <= 4) {
      setValidState((estate) => ({ ...estate, transporte: false }));
      alertForm = [...alertForm, `Placa del transporte ${transporte} no es valido.`];
    }

    setValidState((estate) => ({ ...estate, aprobadorAdm: true }));
    if (aprobadorAdm === undefined || aprobadorAdm.trim().length <= 4) {
      setValidState((estate) => ({ ...estate, aprobadorAdm: false }));
      alertForm = [
        ...alertForm,
        `CI del aprobador supervisor ${aprobadorAdm} no es valido.`,
      ];
    }

    setValidState((estate) => ({ ...estate, aprobadorSeg: true }));
    if (aprobadorSeg === undefined || aprobadorSeg.trim().length <= 4) {
      setValidState((estate) => ({ ...estate, aprobadorSeg: false }));
      alertForm = [
        ...alertForm,
        `CI del aprobador seguridad ${aprobadorSeg} no es valido.`,
      ];
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
        icon: 'error',
      });
      return;
    }
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
          name="material"
          value={material}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="inputMaterial">Material o Equipo</label>
      </div>

      <div className="form-label-group">
        <input
          type="text"
          id="inputMotivol"
          className="form-control"
          placeholder="Motivo de Salida"
          autoComplete="off"
          name="motivo"
          value={motivo}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="inputMotivo">Motivo de Salida</label>
      </div>

      <div className="form-label-group">
        <input
          type="text"
          id="inputDestino"
          className="form-control"
          placeholder="Destino del equipo / material"
          autoComplete="off"
          name="destino"
          value={destino}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="inputDestino">Destino del equipo / material</label>
      </div>

      <div className="checkbox mb-3">
        <label>
          <input
            type="checkbox"
            name="retornara"
            value={retornara}
            onChange={handleInputChange}
          />{' '}
          Retornara
        </label>
      </div>

      <div className="form-label-group">
        <textarea
          id="inputComentario"
          name="comentario"
          value={comentario}
          onChange={handleInputChange}
          placeholder="Comentario sobre la salida"
          className="form-control"
          cols="30"
          rows="3"></textarea>
      </div>
    </section>
  );

  const tabSolicitante = () => (
    <section className="border-bottom border-left border-right p-3 mb-5 bg-white rounded-bottom">
      <div className="form-label-group">
        <input
          type="text"
          id="inputPersona"
          className={`form-control ${!validState.solicitante && 'is-invalid'}`}
          placeholder="CI o RIF - Persona Solicitante"
          name="solicitante"
          value={solicitante}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="inputPersona">CI o RIF - Persona Solicitante</label>
      </div>

      <div className="form-label-group">
        <input
          type="text"
          id="inputTransporte"
          className={`form-control ${!validState.transporte && 'is-invalid'}`}
          placeholder="Placa del Transporte"
          name="transporte"
          value={transporte}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="inputMotivo">Placa del Transporte</label>
      </div>
    </section>
  );

  const tabAprobadores = () => (
    <section className="border-bottom border-left border-right p-3 mb-5 bg-white rounded-bottom">
      <div className="form-label-group">
        <input
          type="text"
          id="inputAprobadorAdm"
          className={`form-control ${!validState.aprobadorAdm && 'is-invalid'}`}
          placeholder="CI. Aprobador Supervisor"
          name="aprobadorAdm"
          value={aprobadorAdm}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="inputAprobadorAdm">CI. Aprobador Supervisor</label>
      </div>

      <div className="form-label-group">
        <input
          type="text"
          id="inputAprobadorSeg"
          className={`form-control ${!validState.aprobadorSeg && 'is-invalid'}`}
          placeholder="CI. Aprobador Proct y Bienes"
          name="aprobadorSeg"
          value={aprobadorSeg}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="inputAprobadorSeg">CI. Aprobador Proct y Bienes</label>
      </div>
    </section>
  );

  return (
    <div className="card border-primary w-100 mb-3 my-4">
      <div className="card-header h5 text-mute">Orden de Salida</div>
      <form className="card-body" onSubmit={handleSubmit}>
        <ul className="nav nav-tabs">
          <li onClick={(event) => handleTabPeople(1)} className="nav-item">
            <button
              type="button"
              className={tabSelect === 1 ? 'nav-link active' : 'nav-link text-info'}>
              Eqp / Material
            </button>
          </li>
          <li onClick={(event) => handleTabPeople(2)} className="nav-item">
            <button
              type="button"
              className={tabSelect === 2 ? 'nav-link active' : 'nav-link text-info'}>
              Solicitante
            </button>
          </li>
          <li onClick={(event) => handleTabPeople(3)} className="nav-item">
            <button
              type="button"
              className={tabSelect === 3 ? 'nav-link active' : 'nav-link text-info'}>
              Aprobadores
            </button>
          </li>
        </ul>

        {tabSelect === 1 && tabMaterial()}
        {tabSelect === 2 && tabSolicitante()}
        {tabSelect === 3 && tabAprobadores()}
        <div className="d-flex justify-content-between p-2">
          <button className="btn btn-ourline-secondary" type="button">
            Cancelar
          </button>

          <button className="btn btn-success" type="submit">
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
};
