import React from 'react';

export const PersonaItem = ({ persona, onClickEvent }) => {
  const {
    id: rowId,
    nombre,
    dni,
    telefono,
    comentario,
    activo,
    aprobadoradm,
    aprobadorseg,
  } = persona;

  return (
    <div
      id={rowId}
      className="list-group-item list-group-item-action"
      onClick={onClickEvent}>
      <div className="d-flex w-100 justify-content-between">
        <h5
          className={`mb-1 text-uppercase font-weight-bolder ${
            !activo ? 'text-muted' : ''
          }`}>
          {nombre}{' '}
          {aprobadoradm && <i className="fa fa-user-tie" style={{ color: '#598f07' }} />}{' '}
          {aprobadorseg && (
            <i className="fa fa-user-shield" style={{ color: '#8c1107' }} />
          )}
        </h5>
        <div className="text-mute">
          <small className="d-inline-block">
            <i className="fas fa-id-card fa-1x" />
            &nbsp;
            {dni}
          </small>
          &nbsp;
          <small className="d-inline-block">
            <i className="fas fa-phone fa-1x" />
            &nbsp;{telefono}
          </small>
        </div>
      </div>
      <p className="mb-1 font-italic">{comentario}</p>
    </div>
  );
};
