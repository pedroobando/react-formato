import React, { useState } from 'react';
import { VehiculoItem } from './VehiculoItem';
import { VehiculoModal } from './VehiculoModal';
import { AddNewItem } from '../ui/AddNewItem';

const lstVehiculos = [
  {
    rowId: '001',
    placa: 'bah-12p',
    marca: 'toyota',
    modelo: 'starlet',
    color: 'plata',
  },
  {
    rowId: '003',
    placa: 'DER39823',
    marca: 'toyota',
    modelo: 'COROLLA',
    color: 'BLANCO',
  },
];

export const VehiculoScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleClickEvent = (event) => {
    // setSelectItem(event.currentTarget.id);
  };

  const handleDobleClick = (event) => {
    console.log(event.currentTarget.id, 'pressdblclick');
  };

  return (
    <div>
      <div className="row mt-1">
        {lstVehiculos.map((item) => (
          <VehiculoItem
            key={item.rowId}
            vehiculo={item}
            onClickEvent={handleClickEvent}
            onDblClickEvent={handleDobleClick}
          />
        ))}
      </div>
      <AddNewItem handleOpenModal={handleOpenModal} />
      <VehiculoModal xstate={modalOpen} />
    </div>
  );
};
