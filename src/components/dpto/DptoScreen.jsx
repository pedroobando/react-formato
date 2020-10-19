import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../redux/actions/ui';
import { dptoSetActive } from '../../redux/actions/vehiculos';
import { DptoItem } from './DptoItem';
import { DptoModal } from './DptoModal';
import { AddNewItem } from '../ui/AddNewItem';

export const DptoScreen = () => {
  const dispatch = useDispatch();
  const { vehiculos: lstVehiculos } = useSelector((state) => state.vehiculo);

  const handleOpenModal = () => {
    dispatch(uiOpenModal());
  };

  const handleClickEvent = (event) => {
    dispatch(dptoSetActive(event.currentTarget.id));
    dispatch(uiOpenModal());
  };

  return (
    <div>
      <div className="row mt-1">
        {lstVehiculos.map((item) => (
          <DptoItem key={item.rowId} vehiculo={item} onClickEvent={handleClickEvent} />
        ))}
      </div>

      <AddNewItem handleOpenModal={handleOpenModal} />
      <DptoModal />
    </div>
  );
};
