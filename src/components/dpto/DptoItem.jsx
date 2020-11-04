import React from 'react';

export const DptoItem = ({ departamento, onClickEvent, onDblClickEvent }) => {
  const { id, nombre, abreviacion, nrosalida } = departamento;

  return (
    <div
      id={id}
      className="list-group-item list-group-item-action"
      onClick={onClickEvent}
      onDoubleClick={onDblClickEvent}>
      <div className="d-flex justify-content-between">
        <h5 className="mb-1 text-uppercase font-weight-bolder">
          {nombre}
          <span className="text-muted ml-2">({abreviacion})</span>
          <i className="fas fa-layer-group fa-1x ml-2" />
        </h5>
        <div className="text-muted d-flex justify-content-between">
          <span className="mr-2"># {nrosalida}</span>
        </div>
      </div>
    </div>
  );
};
