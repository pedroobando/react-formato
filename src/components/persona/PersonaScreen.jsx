import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddNewItem } from '../ui/AddNewItem';
import { PersonaModal } from './PersonaModal';
import { PersonaItem } from './PersonaItem';
import { Paginate } from '../ui/Paginate';

import { uiOpenModal } from '../../redux/actions/ui';

import {
  personaSetActive,
  personaStartLoading,
  personaStartInit,
} from '../../redux/actions/personas';

const initialState = { page: 1, limit: 10 };

export const PersonaScreen = () => {
  const dispatch = useDispatch();
  const [stPage, setStPage] = useState(initialState);
  const { collections: lstpersonas, totalPages } = useSelector(
    (state) => state.collection
  );

  useEffect(() => {
    dispatch(personaStartInit());
  }, [dispatch]);

  useEffect(() => {
    dispatch(personaStartLoading(stPage.page, stPage.limit));
  }, [dispatch, stPage]);

  const handleOpenModal = () => {
    dispatch(uiOpenModal());
    // dispatch(personaStartFaker(100));
  };

  const handleClickEvent = (event) => {
    dispatch(personaSetActive(event.currentTarget.id));
    dispatch(uiOpenModal());
  };

  const handlePageClick = (event) => {
    // console.log(event.selected);
    setStPage({ ...stPage, page: event.selected + 1 });
  };

  return (
    <React.Fragment>
      <div className="row mt-1">
        {lstpersonas.map((item) => (
          <PersonaItem key={item.id} persona={item} onClickEvent={handleClickEvent} />
        ))}
        {totalPages >= 2 && (
          <Paginate pageCount={totalPages} handlePageClick={handlePageClick} />
        )}
      </div>

      <AddNewItem handleOpenModal={handleOpenModal} />

      <PersonaModal
        listIndex={{
          page: stPage.page,
          limit: stPage.limit,
          inlist: lstpersonas.length,
          totalPages,
        }}
      />
    </React.Fragment>
  );
};
