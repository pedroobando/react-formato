import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddNewItem } from '../ui/AddNewItem';
import {
  usuarioSetActive,
  usuarioStartLoading,
  usuarioClearActive,
} from '../../redux/actions/usuarios';

import { listaDptoStartLoading } from '../../redux/actions/listas';
import { UsuarioItem } from './UsuarioItem';

import { Paginate } from '../ui/Paginate';

const initialStatePage = { page: 1, limit: 10 };

export const UsuarioScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [stPage, setStPage] = useState(initialStatePage);
  const { collections: lstusuarios, totalPages } = useSelector(
    (state) => state.collection
  );

  useEffect(() => {
    dispatch(usuarioStartLoading(stPage.page, stPage.limit));
  }, [dispatch, stPage]);

  const handleOpenModal = () => {
    dispatch(listaDptoStartLoading());
    dispatch(usuarioClearActive());
    history.push('/datos/usuario/edit');
  };

  const handleClickEvent = (event) => {
    dispatch(listaDptoStartLoading());
    dispatch(usuarioSetActive(event.currentTarget.id));
    history.push('/datos/usuario/edit');
  };

  const handlePageClick = (event) => {
    setStPage({ ...stPage, page: event.selected + 1 });
  };

  return (
    <React.Fragment>
      <div className="row mt-1">
        {lstusuarios.map((item) => (
          <UsuarioItem key={item.id} usuario={item} onClickEvent={handleClickEvent} />
        ))}
        {totalPages >= 2 && (
          <Paginate pageCount={totalPages} handlePageClick={handlePageClick} />
        )}
      </div>

      <AddNewItem handleOpenModal={handleOpenModal} />
    </React.Fragment>
  );
};
