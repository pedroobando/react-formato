import React from 'react';

export const DeleteItem = ({ handleOpenModal }) => {
  return (
    <button className="btn btn-danger fab fab-danger" onClick={handleOpenModal}>
      <i className="fas fa-trash fa-2x"></i>
    </button>
  );
};
