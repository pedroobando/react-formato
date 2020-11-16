import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

// import { useParams } from 'react-router-dom';

import Swal from 'sweetalert2';
import Select from 'react-select';

import { htmlAlertMessage } from '../../helpers/htmlAlertMessage';
import {
  salidaLoadNroOrden,
  salidaStartAddNew,
  salidaStartDelete,
  salidaStartUpdate,
  listaSalidaComboLoading,
} from '../../redux/actions/salidas';

const initialForm = {
  id: '',
  numerosec: '',
  fechaemision: '',
  material: '',
  motivo: '',
  destino: '',
  estatus: 'SIRETORNA',
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

const initialStateCombos = {
  slcPersonas: [],
  slcVehiculos: [],
  slcAprobAdm: [],
  slcAprobSeg: [],
};

export const SalidaEdit = ({ history, location }) => {
  const dispatch = useDispatch();
  const nroOrden = location.pathname.slice('/salida/'.length);
  // const { nroOrden } = location.pathname;
  const isMountedlst = useRef(false);

  const [slcCombos, setSlcCombos] = useState(initialStateCombos);

  const { slcPersonas, slcVehiculos, slcAprobAdm, slcAprobSeg } = slcCombos;

  const [formValues, setFormValues] = useState(initialForm);
  const {
    numerosec,
    material,
    motivo,
    estatus,
    destino,
    solicitante,
    transporte,
    aprobadoradm,
    aprobadorseg,
    comentario,
  } = formValues;

  useEffect(() => {
    isMountedlst.current = true;

    if (nroOrden !== 'nuevo') {
      salidaLoadNroOrden(nroOrden).then((retVal) => {
        if (isMountedlst.current) {
          setFormValues({ ...retVal });
        }
      });
    }

    listaSalidaComboLoading(1, 500).then((retVal) => {
      if (isMountedlst.current) {
        setSlcCombos({
          slcPersonas: retVal.personas,
          slcVehiculos: retVal.vehiculos,
          slcAprobAdm: retVal.aprobAdms,
          slcAprobSeg: retVal.aprobSegs,
        });
      }
    });
    return () => (isMountedlst.current = false);
  }, [nroOrden]);

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
    history.goBack();
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

  const handleDelete = () => {
    Swal.fire({
      title: `Borrar ${nroOrden}.?`,
      text: `¡No podrás revertir esto!  ¿Estás seguro?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, seguro de borrar !',
      cancelButtonText: 'No borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(salidaStartDelete(formValues));
        handleClose();
      }
    });
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

    // console.log(formValues);

    if (nroOrden === 'nuevo') {
      dispatch(salidaStartAddNew(formValues));
    } else {
      dispatch(salidaStartUpdate(formValues));
    }
    handleClose();
  };

  const handleEstatusOrden = ({ target }) => {
    setFormValues({ ...formValues, estatus: target.name });
  };

  // if (!isMountedlst.current) return <h2>Loading</h2>;

  const tabMaterial = () => (
    <React.Fragment>
      <Select
        className="mb-3"
        placeholder="Persona solicitante..."
        onChange={handleSolicitanteChange}
        isClearable={true}
        isSearchable={true}
        options={slcPersonas}
        name="solicitante"
        value={slcPersonas.filter((option2) => option2.value === solicitante.id)}
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
        value={slcVehiculos.filter((item) => item.value === transporte.id)}
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

      <div>
        <label className="font-weight-bolder mr-2 d-block">{material}</label>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label
            className={estatus === 'SIRETORNA' ? `btn btn-primary` : `btn btn-secondary`}>
            <input
              type="radio"
              name="SIRETORNA"
              id="optionEstatus"
              value={estatus}
              checked="off"
              onChange={handleEstatusOrden}
            />
            SI RETORNA
          </label>
          <label
            className={estatus === 'NORETORNA' ? `btn btn-primary` : `btn btn-secondary`}>
            <input
              type="radio"
              name="NORETORNA"
              id="optionEstatus"
              value={estatus}
              checked="off"
              onChange={handleEstatusOrden}
            />
            NO RETORNA
          </label>
          <label
            className={estatus === 'YARETORNO' ? `btn btn-primary` : `btn btn-secondary`}>
            <input
              type="radio"
              name="YARETORNO"
              id="optionEstatus"
              value={estatus}
              checked="off"
              onChange={handleEstatusOrden}
            />
            YA RETORNO
          </label>
        </div>
      </div>

      {/* <div className="checkbox mb-3">
        <label>
          <input
            type="checkbox"
            name="retornara"
            checked={retornara}
            onChange={handleInputChange}
          />{' '}
          El material o equipo retornara.!
        </label>
      </div> */}

      <hr />
      <div className="row">
        <div className="col-md">
          <Select
            className=""
            placeholder="Aprobador Supervisor..."
            onChange={handleAprobAdmChange}
            isClearable={true}
            isSearchable={true}
            value={slcAprobAdm.filter((item) => item.value === aprobadoradm.id)}
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
            value={slcAprobSeg.filter((item) => item.value === aprobadorseg.id)}
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
            {nroOrden !== 'nuevo' && (
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
