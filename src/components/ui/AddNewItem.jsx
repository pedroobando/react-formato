import React from 'react';

export const AddNewItem = ({ handleOpenModal }) => {
  return (
    <button className="btn btn-primary fab" onClick={handleOpenModal}>
      <i className="fas fa-feather-alt fa-2x"></i>
    </button>
  );
};
