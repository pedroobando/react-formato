import React from 'react';

export const PersonaItem = ({ persona, onClickEvent, onDblClickEvent, style }) => {
  const { rowId, nombre, dni, telefono, comentario } = persona;

  return (
    <div
      id={rowId}
      className={style}
      onClick={onClickEvent}
      onDoubleClick={onDblClickEvent}>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1 text-uppercase font-weight-bolder">{nombre}</h5>
        <div className="text-mute">
          <small>
            <i className="fas fa-id-card fa-1x" />
            &nbsp;
            {dni}
          </small>
          &nbsp;
          <small>
            <i className="fas fa-phone fa-1x" />
            &nbsp;{telefono}
          </small>
        </div>
      </div>
      <div></div>
      <p className="mb-1 font-italic">{comentario}</p>
    </div>
  );
};
