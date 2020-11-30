import React from 'react';

export const SearchItem = ({ handleOpenModal }) => {
  return (
    <button className="btn btn-info btn-buscar" onClick={handleOpenModal}>
      Buscar <i className="fas fa-search fa-1x"></i>
    </button>
  );
};

// fa-feather-alt
// plus-circle
