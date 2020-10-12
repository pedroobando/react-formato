import React from 'react';

export const AddNewTicket = ({ handleOpenModal }) => {
  return (
    <button className="btn btn-primary fab" onClick={handleOpenModal}>
      <i className="fas fa-lock fa-2x"></i>
    </button>
  );
};
