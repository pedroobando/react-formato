import React from 'react';
import { relativeTime } from '../../helpers/relativeTime';

export const SalidaItem = React.memo(
  ({ ordsalida, onClickEvent, onDblClickEvent, style }) => {
    const {
      rowId,
      fecha,
      material,
      motivo,
      responsableNombre,
      transportePlaca,
      user = { name: '' },
    } = ordsalida;

    return (
      <div
        id={rowId}
        className={style}
        // className="list-group-item list-group-item-action"
        onClick={onClickEvent}
        onDoubleClick={onDblClickEvent}>
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1 text-uppercase font-weight-bolder">{material}</h5>
          <small>{relativeTime(fecha)}</small>
        </div>
        <p className="mb-1">
          {motivo}
          <span className="font-italic">varius blandit.</span>
        </p>
        <div className="d-flex w-100 justify-content-between">
          <span className="font-italic font-weight-bold">
            {responsableNombre + ' - ' + transportePlaca}
          </span>
          <small className="text-lowercase">{user.name}</small>
        </div>
      </div>
    );
  }
);
