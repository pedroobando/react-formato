import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddNewItem } from '../ui/AddNewItem';
import { PersonaModal } from './PersonaModal';
import { PersonaItem } from './PersonaItem';
import { Paginate } from '../ui/Paginate';

import { uiOpenModal } from '../../redux/actions/ui';

import { personaSetActive, personaStartLoading } from '../../redux/actions/personas';

export const PersonaScreen = () => {
  const dispatch = useDispatch();
  const { personas: lstpersonas } = useSelector((state) => state.persona);

  useEffect(() => {
    dispatch(personaStartLoading());
  }, [dispatch]);

  const handleOpenModal = () => {
    dispatch(uiOpenModal());
  };

  const handleClickEvent = (event) => {
    dispatch(personaSetActive(event.currentTarget.id));
    dispatch(uiOpenModal());
  };

  const handlePageClick = (event) => {
    console.log(event.selected);
  };

  return (
    <React.Fragment>
      <div className="row mt-1">
        {lstpersonas.map((item) => (
          <PersonaItem key={item.id} persona={item} onClickEvent={handleClickEvent} />
        ))}
        {lstpersonas.length >= 10 && (
          <Paginate pageCount={10} handlePageClick={handlePageClick} />
        )}
      </div>

      <AddNewItem handleOpenModal={handleOpenModal} />

      <PersonaModal />
    </React.Fragment>
  );
};
