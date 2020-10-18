import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddNewItem } from '../ui/AddNewItem';
import { PersonaModal } from './PersonaModal';
import { PersonaItem } from './PersonaItem';

import { uiOpenModal } from '../../redux/actions/ui';

import { personaSetActive } from '../../redux/actions/personas';

export const PersonaScreen = () => {
  const dispatch = useDispatch();
  const { personas } = useSelector((state) => state.persona);

  const handleOpenModal = () => {
    dispatch(uiOpenModal());
  };

  const handleClickEvent = (event) => {
    dispatch(personaSetActive(event.currentTarget.id));
    dispatch(uiOpenModal());
  };

  return (
    <div>
      <div className="row mt-1">
        {personas.map((item) => (
          <PersonaItem key={item.rowId} persona={item} onClickEvent={handleClickEvent} />
        ))}
      </div>

      <AddNewItem handleOpenModal={handleOpenModal} />
      <PersonaModal />
    </div>
  );
};
