import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SalidaItem } from './SalidaItem';

import { salidaClearActive, salidaSetActive } from '../../redux/actions/salidas';
import { AddNewItem } from '../ui/AddNewItem';

import { Paginate } from '../ui/Paginate';

export const SalidaScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { salidas: lstOrdSalidas } = useSelector((state) => state.ordsalida);

  const handleOpenModal = () => {
    dispatch(salidaClearActive());
    history.push('/salida/nuevo');
  };

  const handleClickEvent = (event) => {
    dispatch(salidaSetActive(event.currentTarget.id));
    history.push('/salida/nuevo');
  };

  return (
    <div>
      <div className="row my-1">
        {lstOrdSalidas.map((iten) => (
          <SalidaItem key={iten.rowId} ordsalida={iten} onClickEvent={handleClickEvent} />
        ))}
      </div>
      <AddNewItem handleOpenModal={handleOpenModal} />
    </div>
  );
};
