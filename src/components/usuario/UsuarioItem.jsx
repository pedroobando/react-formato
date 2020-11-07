import React from 'react';

export const UsuarioItem = ({ usuario, onClickEvent }) => {
  const { id, name, fullname, email, activo, departamento } = usuario;

  return (
    <div
      id={id}
      className="list-group-item list-group-item-action"
      onClick={onClickEvent}>
      <div className="d-flex justify-content-between">
        <h3
          className={`mb-1 text-uppercase font-weight-bolder ${
            !activo ? 'text-muted' : ''
          }`}>
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
