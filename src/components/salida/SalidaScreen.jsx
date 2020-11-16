import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SalidaItem } from './SalidaItem';

import { salidaSetActive, salidaStartLoading } from '../../redux/actions/salidas';

import {
  listaAprobAdmStartLoading,
  listaPersonaStartLoading,
  listaVehiculoStartLoading,
  listaAprobSegStartLoading,
} from '../../redux/actions/listas';

import { AddNewItem } from '../ui/AddNewItem';
import { Paginate } from '../ui/Paginate';

const initialStatePage = { page: 1, limit: 20 };

export const SalidaScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [stPage, setStPage] = useState(initialStatePage);
  const { salidas: lstOrdSalidas, totalPages } = useSelector((state) => state.ordsalida);

  useEffect(() => {
    dispatch(salidaStartLoading(stPage.page, stPage.limit));
  }, [stPage, dispatch]);

  const handleOpenModal = () => {
    dispatch(listaPersonaStartLoading(1));
    dispatch(listaVehiculoStartLoading(1));
    dispatch(listaAprobAdmStartLoading(1));
    dispatch(listaAprobSegStartLoading(1));
    // dispatch(salidaClearActive());
    history.push('/salida/nuevo');
  };

  const handleClickEvent = (event) => {
    dispatch(listaPersonaStartLoading(1));
    dispatch(listaVehiculoStartLoading(1));
    dispatch(listaAprobAdmStartLoading(1));
    dispatch(listaAprobSegStartLoading(1));
    dispatch(salidaSetActive(event.currentTarget.id));
    const selectOrden = lstOrdSalidas.find((item) => item.id === event.currentTarget.id);
    history.push(`/salida/${selectOrden.numerosec}`);
  };

  const handlePageClick = (event) => {
    setStPage({ ...stPage, page: event.selected + 1 });
  };
  // console.log(lstOrdSalidas);

  return (
    <React.Fragment>
      <div className="row my-1">
        {lstOrdSalidas.map((item) => (
          <SalidaItem key={item.id} ordsalida={item} onClickEvent={handleClickEvent} />
        ))}
        {totalPages >= 2 && (
          <span className="mt-2">
            <Paginate pageCount={totalPages} handlePageClick={handlePageClick} />
          </span>
        )}
      </div>
      <AddNewItem handleOpenModal={handleOpenModal} />
    </React.Fragment>
  );
};
