import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uiOpenModal } from '../../redux/actions/ui';
import { DptoItem } from './DptoItem';
import { DptoModal } from './DptoModal';
import { AddNewItem } from '../ui/AddNewItem';
import { Paginate } from '../ui/Paginate';

import {
  departamentoSetActive,
  departamentoStartLoading,
} from '../../redux/actions/departamentos';

const initialState = { page: 1, limit: 10 };

export const DptoScreen = () => {
  const dispatch = useDispatch();
  const [stPage, setStPage] = useState(initialState);
  const { collections: lstDepartamentos, totalPages } = useSelector(
    (state) => state.collection
  );

  useEffect(() => {
    dispatch(departamentoStartLoading(stPage.page, stPage.limit));
  }, [dispatch, stPage]);

  const handleOpenModal = () => {
    dispatch(uiOpenModal());
  };

  const handleClickEvent = (event) => {
    dispatch(departamentoSetActive(event.currentTarget.id));
    dispatch(uiOpenModal());
  };

  const handlePageClick = (event) => {
    setStPage({ ...stPage, page: event.selected + 1 });
  };

  return (
    <div>
      <div className="row mt-1">
        {lstDepartamentos.map((item) => (
          <DptoItem key={item.id} departamento={item} onClickEvent={handleClickEvent} />
        ))}
        {totalPages >= 2 && (
          <Paginate pageCount={totalPages} handlePageClick={handlePageClick} />
        )}
      </div>

      <AddNewItem handleOpenModal={handleOpenModal} />
      <DptoModal
        listIndex={{
          page: stPage.page,
          limit: stPage.limit,
          inlist: lstDepartamentos.length,
          totalPages,
        }}
      />
    </div>
  );
};
