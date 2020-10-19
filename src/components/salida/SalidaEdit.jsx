import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { htmlAlertMessage } from '../../helpers/htmlAlertMessage';
import { salidaAddNew, salidaDelete, salidaUpdated } from '../../redux/actions/salidas';

// const initialForm2 = {
//   fechaemision: Date.now(),
//   material: '',
//   motivo: '',
//   retornara: true,
//   destino: '',
//   solicitante: '',
//   transporte: '',
//   aprobadorAdm: '',
//   aprobadorSeg: '',
//   creador: '',
//   comentario: '',
// };

const initialForm = {
  rowId: '',
  numerosec: '',
  fechaemision: '',
  material: '',
  motivo: '',
  retornara: true,
  destino: '',
  solicitante: {
    id: '',
    toString: '',
  },
  transporte: {
    id: '',
    toString: '',
  },
  aprobadoradm: {
    id: '',
    toString: '',
  },
  aprobadorseg: {
    id: '',
    toString: '',
  },
  creador: {
    id: '',
    toString: '',
  },
  solicitanteTo: '',
  transporteTo: '',
  aprobadoradmTo: '',
  aprobadorsegTo: '',
  comentarioinicial: '',
  comentarios: [
    {
      fecha: new Date().getDate(),
      nota: '',
      usuario: {
        id: '',
        toString: '',
      },
    },
  ],
};

export const SalidaEdit = ({ history }) => {
  const dispatch = useDispatch();

  const { active } = useSelector((state) => state.ordsalida);
  const [tabSelect, setTabSelect] = useState(1);

  const [formValues, setFormValues] = useState(initialForm);
  const {
    numerosec,
    fechaemision,
    material,
    motivo,
    retornara,
    destino,
    solicitante,
    transporte,
    aprobadoradm,
    aprobadorseg,
    solicitanteTo,
    transporteTo,
    aprobadoradmTo,
    aprobadorsegTo,
    creador,
    comentarios,
    comentarioinicial,
  } = formValues;

  useEffect(() => {
    if (active !== null) {
      setFormValues(active);
    }
  }, [active]);

  const handleInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFormValues({ ...formValues, [target.name]: value });
  };

  const handleTabPeople = (tabs) => {
    setTabSelect(tabs);
  };

  const handleSearchSolicitante = () => {
    setFormValues((e) => ({ ...e, solicitante: { id: 22, toString: 'Luis Martinez' } }));
  };

  const handleSearchTransporte = () => {
    setFormValues((e) => ({ ...e, transporte: { id: 102, toString: 'NAU3648D' } }));
  };

  const handleSchAprobAdm = () => {
    setFormValues((e) => ({
      ...e,
      aprobadoradm: { id: 684, toString: 'Aprobador Adminitrador' },
    }));
  };

  const handleSchAprobSeg = () => {
    setFormValues((e) => ({
      ...e,
      aprobadorseg: { id: 367, toString: 'Aprobador Seguridad' },
    }));
  };

  const handleClose = () => {
    history.goBack();
  };

  const handleDelete = () => {
    dispatch(salidaDelete());
    handleClose();
  };

  const isFormValid = () => {
    let alertForm = [];

    if (material === undefined || material.trim().length <= 4) {
      alertForm = [...alertForm, `Material o equipo ${material} mas de 4 caracteres`];
    }

    if (solicitanteTo === undefined || solicitanteTo.trim().length <= 4) {
      alertForm = [
        ...alertForm,
        `La CI / RIF del solicitante ${solicitanteTo} no es valido.`,
      ];
    }

    if (transporteTo === undefined || transporteTo.trim().length <= 4) {
      alertForm = [...alertForm, `Placa del transporte ${transporteTo} no es valido.`];
    }

    if (aprobadoradmTo === undefined || aprobadoradmTo.trim().length <= 4) {
      alertForm = [
        ...alertForm,
        `CI del aprobador supervisor ${aprobadoradmTo} no es valido.`,
      ];
    }

    if (aprobadorsegTo === undefined || aprobadorsegTo.trim().length <= 4) {
      alertForm = [
        ...alertForm,
        `CI del aprobador seguridad ${aprobadorsegTo} no es valido.`,
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
        icon: 'warning',
      });
      return;
    }

    if (active) {
      dispatch(salidaUpdated(formValues));
    } else {
      dispatch(
        salidaAddNew({
          ...formValues,
          rowId: new Date().getTime().toString(),
          comentarios: [
            {
              fecha: new Date().getDate(),
              nota: comentarioinicial,
              usuario: {
                id: '001',
                toString: 'pedro',
              },
            },
          ],
          creador: {
            _id: '001',
            name: 'pedro',
          },
        })
      );
    }

    handleClose();
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
            checked={retornara}
            onChange={handleInputChange}
          />{' '}
          Retornara
        </label>
      </div>

      <div className="form-label-group">
        <textarea
          id="inputComentario"
          name="comentarioinicial"
          value={comentarioinicial}
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
          className="form-control d-inline w-50"
          placeholder="CI o RIF - Persona Solicitante"
          name="solicitanteTo"
          value={solicitanteTo}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="inputPersona">CI o RIF - Persona Solicitante</label>
        <button
          type="button"
          className="btn btn-outline-info d-inline ml-2"
          onClick={handleSearchSolicitante}>
          <i className="fa fa-search"></i>
        </button>
        <span className="ml-4">{solicitante.toString}</span>
      </div>

      <div className="form-label-group">
        <input
          type="text"
          id="inputTransporte"
          className="form-control d-inline w-50"
          placeholder="Placa del Transporte"
          name="transporteTo"
          value={transporteTo}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="inputMotivo">Placa del Transporte</label>
        <button
          type="button"
          className="btn btn-outline-info d-inline ml-2"
          onClick={handleSearchTransporte}>
          <i className="fa fa-search"></i>
        </button>
        <span className="ml-4">{transporte.toString}</span>
      </div>
    </section>
  );

  const tabAprobadores = () => (
    <section className="border-bottom border-left border-right p-3 mb-5 bg-white rounded-bottom">
      <div className="form-label-group">
        <input
          type="text"
          id="inputAprobadorAdm"
          className="form-control d-inline w-50"
          placeholder="CI. Aprobador Supervisor"
          name="aprobadoradmTo"
          value={aprobadoradmTo}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="inputAprobadorAdm">CI. Aprobador Supervisor</label>
        <button
          type="button"
          className="btn btn-outline-info d-inline ml-2"
          onClick={handleSchAprobAdm}>
          <i className="fa fa-search"></i>
        </button>
        <span className="ml-4">{aprobadoradm.toString}</span>
      </div>

      <div className="form-label-group">
        <input
          type="text"
          id="inputAprobadorSeg"
          className="form-control d-inline w-50"
          placeholder="CI. Aprobador Proct y Bienes"
          name="aprobadorsegTo"
          value={aprobadorsegTo}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="inputAprobadorSeg">CI. Aprobador Proct y Bienes</label>
        <button
          type="button"
          className="btn btn-outline-info d-inline ml-2"
          onClick={handleSchAprobSeg}>
          <i className="fa fa-search"></i>
        </button>
        <span className="ml-4">{aprobadorseg.toString}</span>
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
        <div className="d-flex justify-content-between px-2">
          <div>
            <button
              className="btn btn-outline-secondary px-4"
              type="button"
              onClick={handleClose}>
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
