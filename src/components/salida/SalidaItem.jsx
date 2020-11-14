import React from 'react';
import { relativeTime } from '../../helpers/relativeTime';

export const SalidaItem = ({ ordsalida, onClickEvent }) => {
  const {
    id,
    numerosec,
    fechaemision,
    material,
    motivo,
    destino,
    solicitante,
    transporte,
    comentario,
    // aprobadoradm,
    // aprobadorseg,
    // solicitanteTo,
    // transporteTo,
    // aprobadoradmTo,
    // aprobadorsegTo,
    // creador,
    // user = { name: '' },
  } = ordsalida;

  return (
    <div
      id={id}
      className="list-group-item list-group-item-action"
      onClick={onClickEvent}>
      <div className="d-flex w-100 justify-content-between">
        <div className="d-flex flex-column">
          <h5 className="mb-1 text-uppercase font-weight-bolder">{material}</h5>
          <div className="font-weight-bold">
            <span className="font-italic">{motivo}</span>
            <span className="mx-2">/</span>
            <span className="text-muted">{destino}</span>
          </div>
        </div>

        <div className="d-flex flex-column align-items-end">
          <small className="d-block">{numerosec}</small>
          <small className="d-block">{relativeTime(fechaemision)}</small>
        </div>
      </div>
      <div className="mt-2 d-flex flex-row w-100 justify-content-between">
        <small className="font-italic">{comentario}</small>
        <div className="d-flex flex-row">
          <span className="font-weight-bold text-capitalize mr-4">
            <i className="fa fa-user mr-1" />
            {!!solicitante && solicitante.nombre}
          </span>

          <span className="font-weight-bold text-uppercase">
            <i className="fa fa-truck mr-1" />
            {!!transporte && transporte.placa}
          </span>
        </div>
      </div>
    </div>
  );
};
