import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import Swal from 'sweetalert2';
import Select from 'react-select';

import { htmlAlertMessage } from '../../helpers/htmlAlertMessage';
import {
  salidaClearActive,
  salidaDelete,
  salidaStartAddNew,
  salidaStartUpdate,
} from '../../redux/actions/salidas';

const initialForm = {
  id: '',
  numerosec: '',
  fechaemision: '',
  material: '',
  motivo: '',
  retornara: true,
  destino: '',
  departamento: {
    id: '',
  },
  solicitante: {
    id: '-1',
  },
  transporte: {
    id: '-1',
  },
  aprobadoradm: {
    id: '-1',
  },
  aprobadorseg: {
    id: '',
  },
  creador: {
    id: '',
    toString: '',
  },
  comentario: '',
};

export const SalidaEdit = ({ history, params }) => {
  const dispatch = useDispatch();
  const { nroOrden } = useParams();

  const { active } = useSelector((state) => state.ordsalida);
  // if (salidas.length <= 0) history.push('/salida');

  const { slcPersonas, slcVehiculos, slcAprobAdm, slcAprobSeg } = useSelector(
    (state) => state.listas
  );

  const [formValues, setFormValues] = useState(initialForm);
  const {
    numerosec,
    // fechaemision,
    material,
    motivo,
    retornara,
    destino,
    // departamento,
    solicitante,
    transporte,
    aprobadoradm,
    aprobadorseg,
    // creador,
    // comentarios,
    comentario,
  } = formValues;

  useEffect(() => {
    if (nroOrden !== 'nuevo') {
      setFormValues(active);
    }
  }, []);

  const handleInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFormValues({ ...formValues, [target.name]: value });
  };

  const handleSolicitanteChange = (target) => {
    if (target !== null) {
      setFormValues((formV) => ({
        ...formV,
        solicitante: { id: target.value, nombre: target.label },
      }));
    } else {
      setFormValues((formV) => ({ ...formV, solicitante: { id: '-1', nombre: '' } }));
    }
  };

  const handleTransporteChange = (target) => {
    if (target !== null) {
      setFormValues((formV) => ({
        ...formV,
        transporte: { id: target.value, nombre: target.label },
      }));
    } else {
      setFormValues((formV) => ({ ...formV, transporte: { id: '-1', nombre: '' } }));
    }
  };

  const handleAprobAdmChange = (target) => {
    if (target !== null) {
      setFormValues((formV) => ({
        ...formV,
        aprobadoradm: { id: target.value, nombre: target.label },
      }));
    } else {
      setFormValues((formV) => ({ ...formV, aprobadoradm: { id: '-1', nombre: '' } }));
    }
  };

  const handleAprobSegChange = (target) => {
    if (target !== null) {
      setFormValues((formV) => ({
        ...formV,
        aprobadorseg: { id: target.value, nombre: target.label },
      }));
    } else {
      setFormValues((formV) => ({ ...formV, aprobadorseg: { id: '-1', nombre: '' } }));
    }
  };

  const handleClose = () => {
    // dispatch(usuarioClearActive);
    // dispatch(listaDptoClear());
    dispatch(salidaClearActive());
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

    if (solicitante.id === '' || solicitante.id.trim().length <= 4) {
      alertForm = [...alertForm, `Solicitante no es valido.`];
    }

    if (aprobadoradm.id === '' || aprobadoradm.id.trim().length <= 4) {
      alertForm = [...alertForm, `Aprobador no es valido.`];
    }

    if (aprobadorseg.id === '' || aprobadorseg.id.trim().length <= 4) {
      alertForm = [...alertForm, `Pesonal de seguridad no es valido.`];
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
      dispatch(salidaStartUpdate(formValues));
    } else {
      dispatch(salidaStartAddNew(formValues));
    }
    handleClose();
  };

  const selectOptionDefault = (lista, itemId) => {
    let retIndex = -1;
    if (itemId.trim().length >= 1)
      retIndex = lista.findIndex((item) => item.value === itemId);
    return retIndex;
  };

  const tabMaterial = () => (
    <React.Fragment>
      <Select
        className="mb-3"
        placeholder="Persona solicitante..."
        onChange={handleSolicitanteChange}
        isClearable={true}
        isSearchable={true}
        defaultValue={slcPersonas[selectOptionDefault(slcPersonas, solicitante.id)]}
        options={slcPersonas}
        name="solicitante"
        required
      />
      <hr />
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

      <Select
        className="mb-3"
        placeholder="Transporte a usar..."
        onChange={handleTransporteChange}
        isClearable={true}
        isSearchable={true}
        defaultValue={slcVehiculos[selectOptionDefault(slcVehiculos, transporte.id)]}
        options={slcVehiculos}
        name="transporte"
      />

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
          El material o equipo retornara.!
        </label>
      </div>

      <hr />
      <div className="row">
        <div className="col-md">
          <Select
            className=""
            placeholder="Aprobador Supervisor..."
            onChange={handleAprobAdmChange}
            isClearable={true}
            isSearchable={true}
            defaultValue={slcAprobAdm[selectOptionDefault(slcAprobAdm, aprobadoradm.id)]}
            options={slcAprobAdm}
            name="aprobadorAdm"
          />
        </div>
        <div className="col-md">
          <Select
            className=""
            placeholder="Personal de seguridad..."
            onChange={handleAprobSegChange}
            isClearable={true}
            isSearchable={true}
            defaultValue={slcAprobSeg[selectOptionDefault(slcAprobSeg, aprobadorseg.id)]}
            options={slcAprobSeg}
            name="aprobadorSeg"
          />
        </div>
      </div>

      <hr />

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
    </React.Fragment>
  );

  if (slcPersonas.length <= 0 || (solicitante.id === '' && active !== null))
    return <h5>loading...</h5>;
  console.log(solicitante);
  console.log(params);
  return (
    <div className="card border-primary w-100 mb-3 my-4">
      <div className="d-flex justify-content-between card-header h5 text">
        <span className="">Orden de Salida</span>
        <span className="text-primary">{numerosec}</span>
      </div>

      <form className="card-body" onSubmit={handleSubmit}>
        {tabMaterial()}
        <div className="d-flex justify-content-between px-2">
          <button className="btn btn-success px-4" type="submit">
            Aceptar
          </button>

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
        </div>
      </form>
    </div>
  );
};
