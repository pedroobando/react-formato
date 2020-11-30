import React, { useState } from 'react';

export const SalidaSearch = ({ handleNewOrden, handleSearchOrden }) => {
  const [stSearch, setStSearch] = useState({ sMaterial: '' });
  const { sMaterial } = stSearch;

  const handleInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setStSearch({ ...stSearch, [target.name]: value });
  };

  return (
    <React.Fragment>
      <form className="w-100" onSubmit={(e) => handleSearchOrden(e, sMaterial)}>
        <div className="d-flex justify-content-between">
          <div className="mr-2">
            <button
              className="btn btn-primary mt-1"
              type="button"
              onClick={handleNewOrden}>
              Nuevo <i className="fas fa-file fa-1x"></i>
            </button>
          </div>
          <div className="form-label-group w-75">
            <input
              type="text"
              id="inputBuscar"
              className="form-control"
              placeholder="Buscar"
              autoComplete="on"
              name="sMaterial"
              value={sMaterial}
              onChange={handleInputChange}
            />
            <label htmlFor="inputMotivo">Buscar</label>
          </div>
          <div className="ml-2">
            <button className="btn btn-secondary mt-1" type="submit">
              Buscar <i className="fas fa-search fa-1x"></i>
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
