import React from 'react';

export const VehiculoItem = ({ vehiculo, onClickEvent, onDblClickEvent }) => {
  const { rowId, placa, marca, modelo, color } = vehiculo;

  return (
    <div
      id={rowId}
      className="list-group-item list-group-item-action"
      onClick={onClickEvent}
      onDoubleClick={onDblClickEvent}>
      <div className="d-flex justify-content-between">
        <h5 className="mb-1 text-uppercase font-weight-bolder">
          {placa} &nbsp;
          <i className="fas fa-shuttle-van fa-1x" />
        </h5>
        <div className="text-muted d-flex justify-content-between">
          <p>
            Marca: {marca} / Modelo: {modelo} / Color: {color}
          </p>
        </div>
      </div>
    </div>
  );
};