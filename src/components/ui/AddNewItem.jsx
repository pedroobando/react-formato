import React from 'react';

export const AddNewItem = ({ handleOpenModal }) => {
  return (
    <button className="btn btn-primary btn-nuevo" onClick={handleOpenModal}>
      Nuevo <i className="fas fa-file fa-1x"></i>
    </button>
    //    <button className="btn btn-lg btn-primary btn-block" type="submit">
    //    Iniciar <i className="fas fa-sign-in-alt"></i>
    //  </button>
  );
};

// fa-feather-alt
// plus-circle
