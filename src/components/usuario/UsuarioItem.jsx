import React from 'react';

export const UsuarioItem = ({ usuario, onClickEvent, onDblClickEvent }) => {
  const { rowId, name, fullname, email } = usuario;

  return (
    <div
      id={rowId}
      className="list-group-item list-group-item-action"
      onClick={onClickEvent}
      onDoubleClick={onDblClickEvent}>
      <div className="d-flex justify-content-between">
        <h3 className="mb-1 text-uppercase font-weight-bolder">
          {name} &nbsp;
          <i className="fas fa-user fa-1x" />
        </h3>
        <div className="text-muted d-flex flex-column justify-content-between">
          <span>
            <i className="fas fa-at fa-1x mr-1" />
            {email}
          </span>
          <span>{fullname}</span>
        </div>
      </div>
    </div>
  );
};
