import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../redux/actions/ui';
import { vehiculoSetActive } from '../../redux/actions/vehiculos';
import { VehiculoItem } from './VehiculoItem';
import { VehiculoModal } from './VehiculoModal';
import { AddNewItem } from '../ui/AddNewItem';

export const VehiculoScreen = () => {
  const dispatch = useDispatch();
  const { vehiculos: lstVehiculos } = useSelector((state) => state.vehiculo);

  const handleOpenModal = () => {
    dispatch(uiOpenModal());
  };

  const handleClickEvent = (event) => {
    dispatch(vehiculoSetActive(event.currentTarget.id));
    dispatch(uiOpenModal());
  };

  return (
    <div>
      <div className="row mt-1">
        {lstVehiculos.map((item) => (
          <VehiculoItem
            key={item.rowId}
            vehiculo={item}
            onClickEvent={handleClickEvent}
          />
        ))}
      </div>

      <AddNewItem handleOpenModal={handleOpenModal} />
      <VehiculoModal />
    </div>
  );
};
