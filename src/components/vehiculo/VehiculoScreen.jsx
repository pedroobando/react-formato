import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uiOpenModal } from '../../redux/actions/ui';
import { VehiculoItem } from './VehiculoItem';
import { VehiculoModal } from './VehiculoModal';
import { AddNewItem } from '../ui/AddNewItem';
import { Paginate } from '../ui/Paginate';

import {
  vehiculoSetActive,
  vehiculoStartInit,
  vehiculoStartLoading,
} from '../../redux/actions/vehiculos';
const initialState = { page: 1, limit: 10 };

export const VehiculoScreen = () => {
  const dispatch = useDispatch();
  const [stPage, setStPage] = useState(initialState);
  const { collections: lstVehiculos, totalPages } = useSelector(
    (state) => state.collection
  );

  useEffect(() => {
    dispatch(vehiculoStartInit());
  }, [dispatch]);

  useEffect(() => {
    dispatch(vehiculoStartLoading(stPage.page, stPage.limit));
  }, [dispatch, stPage]);

  const handleOpenModal = () => {
    dispatch(uiOpenModal());
  };

  const handleClickEvent = (event) => {
    dispatch(vehiculoSetActive(event.currentTarget.id));
    dispatch(uiOpenModal());
  };

  const handlePageClick = (event) => {
    // console.log(event.selected);
    setStPage({ ...stPage, page: event.selected + 1 });
  };

  return (
    <div>
      <div className="row mt-1">
        {lstVehiculos.map((item) => (
          <VehiculoItem key={item.id} vehiculo={item} onClickEvent={handleClickEvent} />
        ))}
        {totalPages >= 2 && (
          <Paginate pageCount={totalPages} handlePageClick={handlePageClick} />
        )}
      </div>

      <AddNewItem handleOpenModal={handleOpenModal} />
      <VehiculoModal
        listIndex={{
          page: stPage.page,
          limit: stPage.limit,
          inlist: lstVehiculos.length,
          totalPages,
        }}
      />
    </div>
  );
};
